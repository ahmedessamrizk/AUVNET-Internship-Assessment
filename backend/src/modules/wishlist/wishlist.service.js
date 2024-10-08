import { wishlistModel } from '../../../DB/models/wishlist.model.js';
import * as productsService from '../products/products.service.js';
import { paginate } from '../../utils/pagination.js';

export const addToWishList = async (product, currUser) => {
  //check if product exists
  const checkProduct = await productsService.checkValidProduct({
    _id: product
  });
  if (!checkProduct.status) {
    throw new Error(checkProduct.message, { cause: checkProduct.cause });
  }

  //check if product already in wishlist
  const existingEntry = await wishlistModel.findOne({
    user: currUser._id,
    product
  });
  if (existingEntry) {
    throw new Error('product already in wishlist', { cause: 400 });
  }

  //add to wishlist
  return await wishlistModel.create({ user: currUser._id, product });
};

export const getWishList = async (query, currUser) => {
  const { limit, skip } = paginate(query.page, query.size);

  const [products, totalProducts] = await Promise.all([
    wishlistModel
      .find({ user: currUser._id })
      .limit(limit)
      .skip(skip)
      .populate([
        {
          path: 'product',
          select: 'name description category',
          populate: [
            {
              select: 'name',
              path: 'category'
            }
          ]
        }
      ])
      .select('product'),
    wishlistModel.countDocuments({ user: currUser._id })
  ]);

  // Calculate the number of pages available
  const totalPages = Math.ceil(totalProducts / limit);
  const wishlist = [];
  products.map(item => {
    wishlist.push(item.product);
  });

  return { total: totalProducts, totalPages, wishlist };
};

export const removeFromWishList = async (product, currUser) => {
  //check if product exists
  const checkProduct = await productsService.checkValidProduct({
    _id: product
  });
  if (!checkProduct.status) {
    throw new Error(checkProduct.message, { cause: checkProduct.cause });
  }

  const checkDeleted = await wishlistModel.findOneAndDelete({
    user: currUser._id,
    product
  });
  if (!checkDeleted) {
    throw new Error('product not found in wishlist', { cause: 400 });
  }
};

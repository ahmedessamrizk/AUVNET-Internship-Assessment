import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Pagination } from '@mui/material';
import { toast } from 'react-toastify';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  const fetchProducts = async () => {
    // try {
    //   const response = await axios.get(`/api/products?page=${page}&size=9`);
    //   setProducts(response.data.products);
    //   setTotalPages(response.data.totalPages);
    // } catch (error) {
    //   toast.error(error.response?.data?.message || "Something went wrong", {
    //     theme: "dark",
    //   });
    // }
    setProducts([
      {
        _id: "1",
        name: "Laptop Pro",
        description: "High-performance laptop with 16GB RAM and 512GB SSD.",
        price: 2000,
        category: "Electronics"
      },
      {
        _id: "2",
        name: "Smartphone XL",
        description: "Latest smartphone with a 6.7-inch display and 128GB storage.",
        price: 1200,
        category: "Mobile"
      },
      {
        _id: "3",
        name: "Wireless Headphones",
        description: "Noise-cancelling over-ear headphones with 30-hour battery life.",
        price: 300,
        category: "Accessories"
      },
      {
        _id: "4",
        name: "Gaming Console",
        description: "Next-gen console with 4K gaming and 1TB storage.",
        price: 500,
        category: "Gaming"
      },
      {
        _id: "5",
        name: "Smartwatch Series 5",
        description: "Fitness-focused smartwatch with heart rate monitor and GPS.",
        price: 400,
        category: "Wearables"
      },
      {
        _id: "6",
        name: "4K TV",
        description: "55-inch 4K UHD Smart TV with HDR support.",
        price: 1500,
        category: "Home Entertainment"
      },
      {
        _id: "7",
        name: "Bluetooth Speaker",
        description: "Portable Bluetooth speaker with 360-degree sound and waterproof design.",
        price: 150,
        category: "Audio"
      },
      {
        _id: "8",
        name: "Tablet Pro",
        description: "10.5-inch tablet with 256GB storage and stylus support.",
        price: 900,
        category: "Tablets"
      },
      {
        _id: "9",
        name: "Gaming Laptop",
        description: "15.6-inch gaming laptop with RTX 3060 GPU and 16GB RAM.",
        price: 1800,
        category: "Gaming"
      },
      {
        _id: "10",
        name: "Smart Refrigerator",
        description: "Wi-Fi enabled refrigerator with smart cooling and touchscreen display.",
        price: 2500,
        category: "Appliances"
      },
    ])    
  };
  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="flex-1 p-4 bg-gray-100 dark:bg-gray-900">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card key={product._id} className="bg-white dark:bg-gray-800 shadow-md rounded-lg">
            <CardContent>
              <Typography variant="h6" component="div" className="font-semibold text-gray-900 dark:text-gray-200">
                {product.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" className="dark:text-gray-400">
                {product.category}
              </Typography>
              <Typography variant="body1" color="textPrimary" className="font-semibold text-gray-700 dark:text-gray-300 mt-2">
                ${product.price.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="textSecondary" className="dark:text-gray-400 mt-2">
                {product.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChange}
          color="primary"
          className="dark:text-gray-200"
        />
      </div>
    </div>
  );
};

export default Products;

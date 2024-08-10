import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Pagination } from "@mui/material";
import { toast } from "react-toastify";
import axios from "../../API/axios.js";
import LoadingScreen from "../../common/Loading.jsx";
import ErrorText from "../../common/Error.jsx";

const Products = () => {
  const [products, setProducts] = useState("loading");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`/products?page=${page}&size=9`);
      setProducts(response.data.data.products);
      setTotalPages(response.data.data.totalPages);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setProducts("error");
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      {products === "loading" ? (
        <LoadingScreen />
      ) : products === "error" ? (
        <ErrorText handleRefresh={fetchProducts} />
      ) : !products?.length ? (
        <ErrorText handleRefresh={fetchProducts} text="No Products found" />
      ) : (
        <div className="flex-1 p-4 bg-gray-100 dark:bg-gray-900">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products?.map((product) => (
              <Card
                key={product._id}
                className="bg-white dark:bg-gray-800 shadow-md rounded-lg"
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    className="font-semibold text-gray-900 dark:text-gray-200"
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className="dark:text-gray-400"
                  >
                    {product.category?.name}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textPrimary"
                    className="font-semibold text-gray-700 dark:text-gray-300 mt-2"
                  >
                    ${product.price.toFixed(2)}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className="dark:text-gray-400 mt-2"
                  >
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
      )}
    </>
  );
};

export default Products;

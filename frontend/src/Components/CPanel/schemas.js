import * as Yup from "yup";

export const addProductSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
  category: Yup.string().required("Category is required"),
});

export const editProductSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
  category: Yup.string().required("Category is required"),
});

export const addCategorySchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  parentCategory: Yup.string().required("Description is required"),
});
export const addUserSchema = Yup.object().shape({
  userName: Yup.string()
    .min(2, "userName must be at least 2 characters")
    .max(30, "userName must be at most 30 characters")
    .required("userName is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(30, "Password must not exceed 30 characters")
    .required("Password is required"),
});

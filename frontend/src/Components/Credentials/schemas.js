import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
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

export const loginSchema = Yup.object().shape({
  userName: Yup.string()
    .min(2, "Username must be at least 2 characters")
    .max(30, "Username must be at most 30 characters")
    .required("Username is required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .max(30, "Password must not exceed 30 characters")
    .required("Password is required"),
});

import React from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& label.Mui-focused": {
    color: theme.palette.mode === "dark" ? "#90caf9" : "#1976d2", // Adjust focus label color for dark mode
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: theme.palette.mode === "dark" ? "#90caf9" : "#1976d2", // Adjust underline color for dark mode
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.mode === "dark" ? "#6b7280" : "#d1d5db", // Adjust border color based on mode
    },
    "&:hover fieldset": {
      borderColor: theme.palette.mode === "dark" ? "#b3e5fc" : "#1976d2", // Hover color
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.mode === "dark" ? "#90caf9" : "#1976d2", // Focused color
    },
  },
}));

export default function InputField({ field, labelName, formik, type = "text" }) {
  return (
    <div>
      <StyledTextField
        fullWidth
        variant="outlined"
        id={field}
        name={field}
        label={labelName}
        type={type}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[field]}
        error={formik.touched[field] && Boolean(formik.errors[field])}
        helperText={formik.touched[field] && formik.errors[field]}
        InputProps={{
          className: `bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white`, // Tailwind CSS classes for dark mode
        }}
        InputLabelProps={{
          className: `text-gray-900 dark:text-white`, // Tailwind CSS classes for label color in dark mode
        }}
      />
    </div>
  );
}

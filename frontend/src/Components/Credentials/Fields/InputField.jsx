import React from "react";


export default function InputField({
  field,
  labelName,
  formik,
  type = "text",
}) {
  const borderHandle = (field) => {
    if (formik.touched[field]) {
      return formik.errors[field] ? "border-red-500" : "border-green-500";
    }
    return "border-gray-300 dark:border-gray-600";
  };
  return (
    <div>
      <label htmlFor={field} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labelName}</label>
      <input
        name={field}
        type={type}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[field]}
        className={`bg-gray-50 text-gray-900 border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${borderHandle(
          field
        )}`}
        placeholder=""
      />


      {formik.touched[field] && formik.errors[field] ? (
        <div className="text-red-600 mt-1 text-sm">{formik.errors[field]}</div>
      ) : null}
    </div>
  );
}

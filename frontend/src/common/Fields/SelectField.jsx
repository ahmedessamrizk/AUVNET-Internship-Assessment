import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';

export default function SelectField({ field, labelName, formik, selections }) {
    return (
        <FormControl fullWidth variant="outlined" error={formik.touched[field] && Boolean(formik.errors[field])}>
            <InputLabel className='text-gray-900 dark:text-white'>{labelName}</InputLabel>
            <Select
                className='bg-gray-50 text-gray-900  focus:ring-primary-600 focus:border-primary-600  dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 '
                name={field}
                value={formik.values[field]}
                onChange={(e) => formik.setFieldValue(field, e.target.value)}
            >
                {selections?.map((selection, idx) => (
                    <MenuItem key={idx} value={selection._id}>
                        {selection.name}
                    </MenuItem>
                ))}
            </Select>
            {formik.touched[field] && formik.errors[field] && (
                <FormHelperText>{formik.errors[field]}</FormHelperText>
            )}
        </FormControl>
    );
}

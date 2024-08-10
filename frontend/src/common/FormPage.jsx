import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import { MdArrowBack } from 'react-icons/md';
import InputField from './Fields/InputField.jsx';
import SelectField from './Fields/SelectField.jsx';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { addProductSchema, addCategorySchema, addUserSchema } from './../Components/CPanel/schemas';
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for notifications
import axios from '../API/axios.js'
import LoadingScreen from './Loading.jsx';

export default function FormPage() {

    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);


    const determineType = () => {
        if (currentPath.includes('products')) return 'products';
        if (currentPath.includes('categories')) return 'categories';
        if (currentPath.includes('users')) return 'admins';
        return '';
    };
    const type = determineType(); // Get the type
    const title = type.charAt(0).toUpperCase() + type.slice(1); // Capitalize the type for the title

    // Define the form data based on the type
    const data = {
        products: {
            inputs: ['name', 'description', 'price'],
            dropSelect: { selectName: 'category', selections: categories },
        },
        categories: {
            inputs: ['name'],
            dropSelect: { selectName: 'parentCategory', selections: categories },

        },
        admins: {
            inputs: ['userName', 'email', 'password'],
            // dropSelect: { selectName: 'role', selections: ['Admin', 'User'] },
            dropSelect: null,
        }
    }[type] || {}; // Use the data for the current type


    const fetchCategories = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`/categories?page=1&size=100`);
            setCategories(response.data.data.categories);
        } catch (error) {
            toast.error('Failed to fetch categories. Please try again later.');
            setCategories([]); // Set an empty array if there's an error            
        } finally {
            setLoading(false)
        }
    };
    useEffect(() => {
        if (type === 'products' || type === 'categories') {
            fetchCategories();
        }
        setLoading(false)
    }, []);

    const onAdd = async (values) => {
        try {
            setLoading(true)
            let response = await axios.post(`/${type}`, values);
            console.log(response)
            if (response.status === 201) {
                toast.success(`${title} Added Successfully`)
            }
            navigate(`/cpanel/${type === 'admins' ? 'users' : type}`)
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || `Failed to Add ${title} Please try again later.`); // Show error toast            
        } finally {
            setLoading(false)
        }
    };

    const addFormik = useFormik({
        initialValues: data.inputs.reduce((acc, field) => {
            acc[field] = '';
            return acc;
        }, {}),
        validationSchema: type === 'products' ? addProductSchema : type === 'categories' ? addCategorySchema : addUserSchema,
        onSubmit: values => onAdd(values)
    });




    return <>
        {loading && <LoadingScreen fullScreen={true} />}
        <Box className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg mx-auto mt-12 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
                <Link to={`/cpanel/${type === 'admins' ? 'users' : type}`}>
                    <MdArrowBack className='text-slate-900 dark:text-slate-50' />
                </Link>
                <Typography variant="h6" className="text-gray-900 dark:text-gray-200">
                    Add New {title}
                </Typography>
            </div>

            <form className='space-y-4 md:space-y-6' onSubmit={addFormik.handleSubmit}>
                {data.inputs && data.inputs.map((field) => (
                    <div key={field}>
                        <InputField
                            key={field}
                            type={field === 'price' ? 'number' : field === 'password' ? 'password' : 'text'}
                            field={field}
                            formik={addFormik}
                            labelName={field.charAt(0).toUpperCase() + field.slice(1)}
                        />
                    </div>
                ))}
                {data.dropSelect && (
                    <SelectField
                        field={data.dropSelect.selectName}
                        labelName={data.dropSelect.selectName}
                        formik={addFormik}
                        selections={data.dropSelect.selections}
                    />
                )}
                <div className="flex justify-end mt-6 space-x-2">
                    <Button
                        variant="contained"
                        className="bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                    >
                        Add {title}
                    </Button>
                </div>
            </form>
        </Box>
    </>
}

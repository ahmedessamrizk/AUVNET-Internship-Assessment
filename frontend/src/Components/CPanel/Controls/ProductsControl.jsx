import React, { useContext, useEffect, useState } from 'react';
import DataTable from '../DataTable.jsx';
import LoadingScreen from './../../../common/Loading';
import axios from './../../../API/axios';
import { toast } from 'react-toastify';
import ErrorText from './../../../common/Error';
import { AuthContext } from './../../../context/AuthProvider';
import { allRoles } from './../../../Routes/ProtectedRoute';
import useChangeTitle from './../../../hooks/useChangeTitle';
import { addProductSchema, editProductSchema } from '../schemas.js';

const ProductsControl = () => {
    useChangeTitle('Products Control')
    const [products, setProducts] = useState('loading');
    const [totalProducts, setTotalProducts] = useState(0);
    const [pages, setPages] = useState(0);
    const [isUser, setIsUser] = useState(false);
    const { auth } = useContext(AuthContext)
    const [categories, setCategories] = useState('loading');

    const fetchProducts = async (page = 1, size = 5, role = '') => {
        try {
            let response;
            if (auth.role === allRoles.U) {
                response = await axios.get(`/products?page=${page}&size=${size}&createdBy=${auth._id}`);
            } else {
                response = await axios.get(`/products?page=${page}&size=${size}`);
            }
            setProducts(response.data.data.products)
            setTotalProducts(response.data.data.total)
            setPages(response.data.data.totalPages)
        } catch (error) {
            toast.error('Failed to fetch products. Please try again later.'); // Show error toast
            setProducts('error')
        }
    };
    useEffect(() => {
        fetchProducts()
        setIsUser(auth.role === allRoles.U)
    }, [])




    const handleDelete = async (type, id, page, size, filter) => {
        try {
            let response = await axios.delete(`/products/${id}`);

            if (response.status === 204) {
                const msg = type === 'remove' ? 'Deleted' : 'Restored'
                toast.success(`Product ${msg} Successfully`)
            }
            await fetchProducts(page, size, filter)
        } catch (error) {
            console.log(error)
            const msg = type === 'remove' ? 'delete' : 'restore'
            toast.error(`Failed to ${msg} Product Please try again later.`); // Show error toast
            setProducts('error')
        }
    };

    const handleEdit = async () => {

    }


    return (
        <div className="px-4">
            {products === 'loading' ? <LoadingScreen /> :
                products === 'error' ? <ErrorText handleRefresh={fetchProducts} /> :
                    !products?.length ? <ErrorText handleRefresh={fetchProducts} text='No products found' /> :
                        <DataTable
                            title='Products Control'
                            data={products}
                            fetchData={fetchProducts}
                            total={totalProducts}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                            rows={['name', 'description', 'price', 'createdBy', 'category']}
                            actions={isUser ? ['edit', 'delete', 'add'] : ['edit', 'delete']}
                        />
            }
        </div>
    );
};

export default ProductsControl;

import React, { useContext, useEffect, useState } from 'react';
import DataTable from '../DataTable.jsx';
import LoadingScreen from './../../../common/Loading';
import axios from './../../../API/axios';
import { toast } from 'react-toastify';
import ErrorText from './../../../common/Error';
import { AuthContext } from './../../../context/AuthProvider';
import { allRoles } from './../../../Routes/ProtectedRoute';
import useChangeTitle from './../../../hooks/useChangeTitle';


const CategoriesControl = () => {
    useChangeTitle('Categories Control')
    const [categories, setCategories] = useState('loading');
    const [totalCategories, setTotalCategories] = useState(0);
    const [pages, setPages] = useState(0);
    const { auth } = useContext(AuthContext)

    const fetchCategories = async (page = 1, size = 5, role = '') => {
        try {
            const response = await axios.get(`/categories?page=${page}&size=${size}`);
            setCategories(response.data.data.categories)
            setTotalCategories(response.data.data.total)
            setPages(response.data.data.totalPages)
        } catch (error) {
            toast.error('Failed to fetch categories. Please try again later.'); // Show error toast
            setCategories('error')
        }
    };
    useEffect(() => {
        fetchCategories()
    }, [])


    const handleDelete = async (type, id, page, size, filter) => {
        try {
            let response = await axios.delete(`/categories/${id}`);

            if (response.status === 204) {
                const msg = type === 'remove' ? 'Deleted' : 'Restored'
                toast.success(`Category ${msg} Successfully`)
            }
            await fetchCategories(page, size, filter)
        } catch (error) {
            console.log(error)
            const msg = type === 'remove' ? 'delete' : 'restore'
            toast.error(error.response?.data?.message || `Failed to ${msg} category Please try again later.`);
            setCategories('error')
        }
    };

    const handleEdit = async () => {

    }


    return (
        <div className="px-4">
            {categories === 'loading' ? <LoadingScreen /> :
                categories === 'error' ? <ErrorText handleRefresh={fetchCategories} /> :
                    !categories?.length ? <ErrorText handleRefresh={fetchCategories} text='No categories found' /> :
                        <DataTable
                            title='Categories Control'
                            data={categories}
                            fetchData={fetchCategories}
                            total={totalCategories}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                            rows={['name', 'createdBy']}
                            actions={['edit', 'delete', 'add']}                            
                        />
            }
        </div>
    );
};

export default CategoriesControl;

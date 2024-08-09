import React, { useEffect, useState } from 'react';
import DataTable from '../DataTable.jsx';
import LoadingScreen from './../../../common/Loading';
import axios from './../../../API/axios';
import { toast } from 'react-toastify';
import ErrorText from './../../../common/Error';


const AdminsControl = () => {
    const [admins, setAdmins] = useState('loading');
    const [totalAdmins, setTotalAdmins] = useState(0);
    const [pages, setPages] = useState(0);

    const fetchAdmins = async (page = 1, size = 5) => {
        try {
            const response = await axios.get(`/admins?page=${page}&size=${size}`);
            setAdmins(response.data.data.admins)
            setTotalAdmins(response.data.data.total)
            setPages(response.data.data.totalPages)
        } catch (error) {
            toast.error('Failed to fetch admins. Please try again later.'); // Show error toast
            setAdmins('error')
        }
    };
    useEffect(() => {
        fetchAdmins()
    }, [])


    const handleEdit = (row) => {
        console.log('Edit:', row);
        // Implement edit functionality
    };

    const handleDelete = async (id, page, size) => {
        try {
            // console.log(page, size)
            const response = await axios.patch(`/admins/${id}/remove`);

            if (response.data?.statusCode === 200) {
                toast.success("Admin Deleted Successfully")
            }
            await fetchAdmins(page, size)
        } catch (error) {
            console.log(error)
            toast.error('Failed to delete admin. Please try again later.'); // Show error toast
            setAdmins('error')
        }
    };
    const handleUnDelete = async (id, page, size) => {
        try {
            // console.log(page, size)
            const response = await axios.patch(`/admins/${id}/unremove`);
            if (response.data?.statusCode === 200) {
                toast.success("Admin Restored Successfully")
            }
            await fetchAdmins(page, size)
        } catch (error) {
            toast.error('Failed to restore admin. Please try again later.'); // Show error toast
            setAdmins('error')
        }
    };

    return (
        <div className="px-4">
            {admins === 'loading' ? <LoadingScreen /> :
                admins === 'error' ? <ErrorText handleRefresh={fetchAdmins} /> :
                    !admins?.length ? <ErrorText handleRefresh={fetchAdmins} text='No admins found' /> :
                        <DataTable
                            title='Admins Control'
                            data={admins}
                            fetchData={fetchAdmins}
                            pages={pages}
                            total={totalAdmins}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onUnDelete={handleUnDelete}
                            rows={['userName', 'email', 'role']}
                            actions={['edit', 'delete']}
                        />
            }
        </div>
    );
};

export default AdminsControl;

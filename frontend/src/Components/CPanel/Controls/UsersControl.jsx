import React, { useEffect, useState } from 'react';
import DataTable from '../DataTable.jsx';
import LoadingScreen from './../../../common/Loading';
import axios from './../../../API/axios';
import { toast } from 'react-toastify';
import ErrorText from './../../../common/Error';


const UsersControl = () => {
    const [users, setUsers] = useState('loading');
    const [totalUsers, setTotalUsers] = useState(0);
    const [pages, setPages] = useState(0);

    const fetchUsers = async (page = 1, size = 5) => {
        try {
            const response = await axios.get(`/users?page=${page}&size=${size}`);
            setUsers(response.data.data.users)
            setTotalUsers(response.data.data.total)
            setPages(response.data.data.totalPages)
        } catch (error) {
            toast.error('Failed to fetch users. Please try again later.'); // Show error toast
            setUsers('error')
        }
    };
    useEffect(() => {
        fetchUsers()
    }, [])


    const handleDelete = async (id) => {
        try {
            const response = await axios.patch(`/users/${id}/remove`);

            if (response.data?.statusCode === 200) {
                toast.success("User Deleted Successfully")
            }
            await fetchUsers()
        } catch (error) {
            console.log(error)
            toast.error('Failed to delete user. Please try again later.'); // Show error toast
            setUsers('error')
        }
    };
    const handleUnDelete = async (id) => {
        try {
            const response = await axios.patch(`/users/${id}/unremove`);
            if (response.data?.statusCode === 200) {
                toast.success("User Restored Successfully")
            }
            await fetchUsers()
        } catch (error) {
            toast.error('Failed to restore user. Please try again later.'); // Show error toast
            setUsers('error')
        }
    };

    return (
        <div className="px-4">
            {users === 'loading' ? <LoadingScreen /> :
                users === 'error' ? <ErrorText handleRefresh={fetchUsers} /> :
                    !users?.length ? <ErrorText handleRefresh={fetchUsers} text='No users found' /> :
                        <DataTable
                            title='Users Control'
                            data={users}
                            fetchData={fetchUsers}
                            pages={pages}
                            total={totalUsers}
                            onDelete={handleDelete}
                            onUnDelete={handleUnDelete}
                            rows={['userName', 'email']}
                            actions={['delete']}
                        />
            }
        </div>
    );
};

export default UsersControl;

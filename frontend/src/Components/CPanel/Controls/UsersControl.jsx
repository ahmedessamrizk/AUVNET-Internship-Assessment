import React, { useContext, useEffect, useState } from 'react';
import DataTable from '../DataTable.jsx';
import LoadingScreen from './../../../common/Loading';
import axios from './../../../API/axios';
import { toast } from 'react-toastify';
import ErrorText from './../../../common/Error';
import { AuthContext } from './../../../context/AuthProvider';
import { allRoles } from './../../../Routes/ProtectedRoute';
import useChangeTitle from './../../../hooks/useChangeTitle';

const UsersControl = () => {
    useChangeTitle('Users Control')
    const [users, setUsers] = useState('loading');
    const [totalUsers, setTotalUsers] = useState(0);
    const [pages, setPages] = useState(0);
    const { auth } = useContext(AuthContext)
    const [isSA, setIsSA] = useState(false);

    const fetchUsers = async (page = 1, size = 5, role = '') => {
        try {
            let response;
            if (auth.role === allRoles.SA) {
                const roleQuery = role !== '' ? `&role=${role}` : ''
                response = await axios.get(`/admins?page=${page}&size=${size}${roleQuery}`);
            } else if (auth.role === allRoles.A) {
                response = await axios.get(`/users?page=${page}&size=${size}`);
            }
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
        setIsSA(auth.role === allRoles.SA)

    }, [])


    const handleDelete = async (type, id, page, size, filter) => {
        try {
            let response;
            if (auth.role === allRoles.SA) {
                response = await axios.patch(`/admins/${id}/${type}`);
            } else if (auth.role === allRoles.A) {
                response = await axios.patch(`/users/${id}/${type}`);
            }

            if (response.data?.statusCode === 200) {
                const msg = type === 'remove' ? 'Deleted' : 'Restored'
                toast.success(`User ${msg} Successfully`)
            }
            await fetchUsers(page, size, filter)
        } catch (error) {
            console.log(error)
            const msg = type === 'remove' ? 'delete' : 'restore'
            toast.error(`Failed to ${msg} user. Please try again later.`); // Show error toast
            setUsers('error')
        }
    };

    const handleEdit = async () => {

    }


    return (
        <div className="px-4">
            {users === 'loading' ? <LoadingScreen /> :
                users === 'error' ? <ErrorText handleRefresh={fetchUsers} /> :
                    !users?.length ? <ErrorText handleRefresh={fetchUsers} text='No users found' /> :
                        <DataTable
                            title='Users Control'
                            data={users}
                            fetchData={fetchUsers}
                            total={totalUsers}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                            rows={['userName', 'email', 'role']}
                            actions={isSA ? ['edit', 'delete', 'add'] : ['delete']}
                            userFilter={isSA ? true : false}
                        />
            }
        </div>
    );
};

export default UsersControl;

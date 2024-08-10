import React, { useContext, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, IconButton, Paper, Tooltip, Typography, MenuItem, InputLabel, FormControl, Select, Button, Modal, Box, TextField } from '@mui/material';
import { useFormik } from 'formik';

import { MdAdd, MdArrowBack, MdClose, MdDelete, MdEdit, MdRestore } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import LoadingScreen from '../../common/Loading.jsx';
import { allRoles } from '../../Routes/ProtectedRoute.jsx';


const DataTable = ({ title, data, fetchData, total, addInputs, onEdit, onDelete, rows, actions, userFilter = false }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState(''); // Filter state

    const handleChangePage = async (event, newPage) => {
        setLoading(true)
        setPage(newPage);
        await fetchData(newPage + 1, rowsPerPage, filter)
        setLoading(false)
    };

    const handleChangeRowsPerPage = async (event) => {
        setLoading(true)
        setRowsPerPage(parseInt(event.target.value, 10));
        await fetchData(1, parseInt(event.target.value, 10), filter)
        setPage(0);
        setLoading(false)
    };

    const handleFilterChange = async (event) => {
        setLoading(true);
        setFilter(event.target.value);
        await fetchData(1, rowsPerPage, event.target.value); // Fetch data based on filter
        setPage(0);
        setLoading(false);
    };

    const handleDelete = async (type, id) => {
        setLoading(true)
        await onDelete(type, id, page + 1, rowsPerPage, filter)
        setLoading(false)
    }
    const navigate = useNavigate();

    // When you want to navigate with data:
    const handleOpenPage = () => {
        const nav = title.split(' ')[0]
        navigate(`/cpanel/${nav.charAt(0).toLowerCase() + nav.slice(1)}/add`);
    };


    return <>
        <div className="mb-4 flex items-center justify-between">
            <Link
                to='/cpanel'
                className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-colors duration-300"
            >
                <MdArrowBack className="mr-2" />
                <span>Back to CPanel</span>
            </Link>

            {actions?.includes('add') && <Button
                variant='contained'
                size="large"
                color='success'
                startIcon={<MdAdd />}
                className="bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md"
                onClick={handleOpenPage}
            >
                Add New
            </Button>}
        </div>


        <Paper className="dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-center space-x-4">
                <Typography variant="h6" className="text-gray-900 dark:text-gray-200 mb-4">
                    {title}
                </Typography>
                {userFilter && <FormControl variant="outlined" className="w-48">
                    <InputLabel className="text-gray-900 dark:text-gray-200">Filter By</InputLabel>
                    <Select
                        value={filter}
                        onChange={handleFilterChange}
                        className="text-gray-900 dark:text-gray-200 border dark:border-slate-100 "
                        label="Filter By"
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value={allRoles.U}>Users</MenuItem>
                        <MenuItem value={allRoles.A}>Admins</MenuItem>
                    </Select>
                </FormControl>}

            </div>
            <TableContainer className='relative'>
                {loading &&
                    <div className='absolute w-full h-full z-50 flex items-center justify-center bg-black bg-opacity-50'>
                        <LoadingScreen />
                    </div>}
                <Table >
                    <TableHead>
                        <TableRow>
                            {rows.map((row, idx) =>
                                <TableCell key={idx} className="font-semibold text-gray-900 dark:text-gray-200">{row}</TableCell>
                            )}
                            {actions?.includes('edit') && <TableCell className="font-semibold text-gray-900 dark:text-gray-200">Edit</TableCell>}
                            {actions?.includes('delete') && <TableCell className="font-semibold text-gray-900 dark:text-gray-200">Delete</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, idx) => (
                            <TableRow key={idx}>
                                {rows.map((key) => {
                                    const value = row[key];
                                    return (
                                        <TableCell key={key} className="text-gray-900 dark:text-gray-200">
                                            {typeof value === 'object' && value !== null ?
                                                value.userName || value.name || "N/A"
                                                :
                                                value // Otherwise, just display the value
                                            }
                                        </TableCell>
                                    );
                                })}
                                {actions?.includes('edit') && <TableCell>
                                    {row.role === allRoles.SA ? '' :
                                        <Tooltip title="edit" arrow placement="top">
                                            <IconButton onClick={() => onEdit(row._id)} color="primary">
                                                <MdEdit size={25} />
                                            </IconButton>
                                        </Tooltip>}
                                </TableCell>}
                                {actions?.includes('delete') && <TableCell>
                                    {row.isDeleted ?
                                        <Tooltip title="Restore" arrow placement="top">
                                            <IconButton onClick={() => handleDelete('unremove', row._id)} color="success">
                                                <MdRestore size={25} />
                                            </IconButton>
                                        </Tooltip>
                                        :
                                        row.role === allRoles.SA ? '' :
                                            <Tooltip title="Delete" arrow placement="top">
                                                <IconButton onClick={() => handleDelete('remove', row._id)} color="secondary">
                                                    <MdDelete size={25} />
                                                </IconButton>
                                            </Tooltip>

                                    }
                                </TableCell>}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
                component="div"
                count={total}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                className="text-gray-900 dark:text-gray-200"
            />
        </Paper >

        {/* {addInputs&&<CustomModal type='Add' title={title} inputs={addInputs} setModalOpen={setModalOpen} isModalOpen={isModalOpen} formik={addFormik} dropSelect={addDropSelect} />} */}
        {/* {editInputs && <CustomModal type='Edit' title={title} inputs={editInputs} setModalOpen={setModalOpen} isModalOpen={isModalOpen} formik={editFormik} dropSelect={editDropSelect} />} */}

    </>
};

export default DataTable;

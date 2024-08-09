import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, IconButton, Paper, Tooltip, Typography } from '@mui/material';

import { MdArrowBack, MdDelete, MdEdit, MdRestore } from "react-icons/md";
import { Link } from 'react-router-dom';
import LoadingScreen from '../../common/Loading.jsx';


const DataTable = ({title, data, fetchData, pages, total, onEdit, onDelete, onUnDelete, rows, actions }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [loading, setLoading] = useState(false);

    const handleChangePage = async (event, newPage) => {
        setLoading(true)
        setPage(newPage);
        await fetchData(newPage + 1, rowsPerPage)
        setLoading(false)
    };

    const handleChangeRowsPerPage = async (event) => {
        setLoading(true)
        setRowsPerPage(parseInt(event.target.value, 10));
        await fetchData(1, parseInt(event.target.value, 10))
        setPage(0);
        setLoading(false)
    };

    const handleDelete = async (id) => {
        setLoading(true)
        await onDelete(id, page + 1, rowsPerPage)
        setLoading(false)
    }
    const handleUnDelete = async (id) => {
        setLoading(true)
        await onUnDelete(id, page + 1, rowsPerPage)
        setLoading(false)
    }

    return <>
        <div className="mb-4 flex items-center ">
            <Link
                to='/cpanel'
                className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-colors duration-300"
            >
                <MdArrowBack className="mr-2" />
                <span>Back to CPanel</span>
            </Link>
        </div>

        <Paper className="dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <Typography variant="h6" className="text-gray-900 dark:text-gray-200 mb-4">
                {title}
            </Typography>
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
                                {rows.map((key) => (
                                    row.hasOwnProperty(key) && ( // Check if the row contains the key
                                        <TableCell key={key} className="text-gray-900 dark:text-gray-200">
                                            {row[key]}
                                        </TableCell>
                                    )
                                ))}
                                {actions?.includes('edit') && <TableCell>
                                    <Tooltip title="edit" arrow placement="top">
                                        <IconButton onClick={() => onEdit(row._id)} color="primary">
                                            <MdEdit size={25} />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>}
                                {actions?.includes('delete') && <TableCell>
                                    {row.isDeleted ?
                                        <Tooltip title="Restore" arrow placement="top">
                                            <IconButton onClick={() => handleUnDelete(row._id)} color="success">
                                                <MdRestore size={25} />
                                            </IconButton>
                                        </Tooltip>
                                        :
                                        <Tooltip title="Delete" arrow placement="top">
                                            <IconButton onClick={() => handleDelete(row._id)} color="secondary">
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
                count={rowsPerPage * pages}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                className="text-gray-900 dark:text-gray-200"
            />
        </Paper >
    </>
};

export default DataTable;

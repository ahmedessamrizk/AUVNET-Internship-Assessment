import React, { useState } from 'react';
import DataTable from '../DataTable.jsx';

const initialData = [
    { name: 'John Doe', email: 'john@example.com' },
    { name: 'Jane Smith', email: 'jane@example.com' },
    { name: 'Bob Johnson', email: 'bob@example.com' },
    { name: 'Alice Williams', email: 'alice@example.com' },
    { name: 'Charlie Brown', email: 'charlie@example.com' },
    { name: 'David Davis', email: 'david@example.com' },
    { name: 'Eva Green', email: 'eva@example.com' },
];

const CategoriesControl = () => {
    const [data, setData] = useState(initialData);

    const handleEdit = (row) => {
        console.log('Edit:', row);
        // Implement edit functionality
    };

    const handleDelete = (id) => {
        setData(data.filter(item => item.id !== id));
    };

    return (
        <div className="px-4">
            <DataTable
                data={data}
                onEdit={handleEdit}
                onDelete={handleDelete}
                rows={['name', 'email']}
            />
        </div>
    );
};

export default CategoriesControl;

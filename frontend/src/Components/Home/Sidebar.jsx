import React, { useState, useEffect } from 'react';
import { Collapse, FormControlLabel, Checkbox, List, ListItem, ListItemText, Pagination, Typography } from '@mui/material';
import { MdExpandMore, MdExpandLess } from "react-icons/md";

const Sidebar = () => {
  const [categories, setCategories] = useState([]);
  const [openCategories, setOpenCategories] = useState({}); // Track open/closed state by _id
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCategories = async () => {
    // Your fetching logic here
    setCategories([
      {
        "_id": "66b52a31db51ee225127404e",
        "name": "Laptop",
        "subCategories": [
          {
            "_id": "66b52a4cdb51ee2251274055",
            "name": "Dell",
            "subCategories": []
          },
          {
            "_id": "66b52a51db51ee225127405a",
            "name": "Lenovo",
            "subCategories": [
              {
                "_id": "66b52a60db51ee2251274061",
                "name": "A51",
                "subCategories": []
              },
              {
                "_id": "66b52a63db51ee2251274066",
                "name": "A52",
                "subCategories": []
              }
            ]
          }
        ]
      },
      {
        "_id": "66b52a31db51ee225127404f",
        "name": "Computer",
        "subCategories": [
          {
            "_id": "66b52a4cdb51ee2251274056",
            "name": "Dell",
            "subCategories": []
          },
          {
            "_id": "66b52a51db51ee225127405b",
            "name": "Lenovo",
            "subCategories": [
              {
                "_id": "66b52a60db51ee2251274062",
                "name": "A51",
                "subCategories": []
              },
              {
                "_id": "66b52a63db51ee2251274067",
                "name": "A52",
                "subCategories": []
              }
            ]
          }
        ]
      }
    ]);
    // Handle pagination logic if needed
    setTotalPages(2); // Example value; set it based on your response
  };

  useEffect(() => {
    fetchCategories();
  }, [page]);

  const handleToggle = (id) => {
    setOpenCategories(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const renderSubCategories = (subCategories, level = 1) => (
    <List component="div" disablePadding>
      {subCategories.map((subcat) => (
        <div key={subcat._id}>
          <ListItem
            style={{ marginLeft: `${level * 20}px` }} // Indentation to the right
            className="flex justify-between"
          >
            <FormControlLabel
              control={<Checkbox className="dark:text-gray-200" />}
              label={<span className='text-xs md:text-lg'>{subcat.name}</span>}
            />
            {subcat.subCategories.length > 0 && (
              <span onClick={() => handleToggle(subcat._id)}>
                {openCategories[subcat._id] ? <MdExpandLess /> : <MdExpandMore />}
              </span>
            )}
          </ListItem>
          {openCategories[subcat._id] && renderSubCategories(subcat.subCategories, level + 1)}
        </div>
      ))}
    </List>
  );

  return (
    <div className="w-40 md:w-64 bg-gray-200 dark:bg-gray-800 md:p-4 p-1 rounded-lg shadow-md ">
      <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-900 dark:text-gray-200 p-2">Categories</h2>
      <List>
        {categories.map((category) => (
          <div key={category._id}>
            <ListItem
              onClick={() => handleToggle(category._id)}
              className="flex justify-between text-gray-900 dark:text-gray-200"
            >
              <FormControlLabel
                className='text-xs'
                control={<Checkbox className="dark:text-gray-200" />}
                label={<span className='text-xs md:text-lg'>{category.name}</span>}
              />
              {category.subCategories.length > 0 && (
                <span>
                  {openCategories[category._id] ? <MdExpandLess /> : <MdExpandMore />}
                </span>
              )}
            </ListItem>
            {openCategories[category._id] && renderSubCategories(category.subCategories)}
          </div>
        ))}
      </List>
      <div className="mt-4 flex justify-center">
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
          color="primary"
          size="small"
        />
      </div>
    </div>
  );
};

export default Sidebar;

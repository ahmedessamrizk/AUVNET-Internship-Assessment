import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useChangeTitle from '../../hooks/useChangeTitle.jsx';
import { allRoles } from '../../Routes/ProtectedRoute.jsx';
import { AuthContext } from '../../context/AuthProvider.jsx';


const CPanelHome = () => {
  useChangeTitle('Control Panel')
  const { auth } = useContext(AuthContext);

  const location = useLocation();
  const data = [
    {
      name: 'Users Control',
      description: 'View, edit, and manage users in the system.',
      route: 'users',
      roles: [allRoles.SA, allRoles.A]
    },
    {
      name: 'Categories Control',
      description: 'Organize, add, and manage product categories.',
      route: 'categories',
      roles: [allRoles.SA, allRoles.A]
    },
    {
      name: 'Products Control',
      description: 'Manage products, add new items, and update stock.',
      route: 'products',
      roles: [allRoles.SA, allRoles.A, allRoles.U]
    },

  ]
  return <>
    <div className=" py-10">
      <div className="container mx-auto px-6">
        <div className="flex justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">CPanel Dashboard</h1>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {data.map((ele, idx) => {
            if (ele.roles.includes(auth.role)) {
              return <div key={idx} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">{ele.name}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{ele.description}</p>
                <Link to={`${location.pathname}/${ele.route}`}>
                  <button className="w-full bg-indigo-500 dark:bg-indigo-700 text-white py-2 rounded-lg hover:bg-indigo-600 dark:hover:bg-indigo-800">
                    Go to {ele.name}
                  </button>
                </Link>
              </div>
            }
          }
          )}

        </div>
      </div>
    </div>
  </>

};

export default CPanelHome;

import React, {  } from 'react';
import Sidebar from './Sidebar';
import Products from './Products';
import useChangeTitle from '../../hooks/useChangeTitle.jsx';


const HomePage = () => {
  useChangeTitle('Home Page')
  


  return (
    <div className="flex bg-gray-100  dark:bg-gray-900  p-6">
      <Sidebar />
      <div className="flex-1 ml-4">
        <Products />
      </div>
    </div>
  );
};

export default HomePage;

import React, { } from 'react';
import { FaSpinner } from 'react-icons/fa';

const LoadingScreen = ({ fullScreen = false }) => {

  return (
    <div className={fullScreen ? 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50' : ''}>
      <div className="flex flex-col items-center p-10">
        <FaSpinner className="animate-spin text-white text-4xl mb-4" />
        <p className="text-white text-lg">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;

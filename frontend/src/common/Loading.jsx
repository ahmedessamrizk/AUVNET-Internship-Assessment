import React, { useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { useLoading } from '../context/LoadingProvider.jsx';
import { useLocation } from 'react-router-dom';

const LoadingScreen = () => {
  // const { pathname } = useLocation();
  // const { isLoading, setIsLoading } = useLoading();
  // useEffect(() => {
  //   // Trigger loading screen on route change
  //   // setIsLoading(true);
  //   // setIsLoading(false);

  // }, [pathname, setIsLoading]);

  // if (!isLoading) return null;

  return (
    // <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center p-10">
        <FaSpinner className="animate-spin text-white text-4xl mb-4" />
        <p className="text-white text-lg">Loading...</p>
      </div>
    // </div>
  );
};

export default LoadingScreen;

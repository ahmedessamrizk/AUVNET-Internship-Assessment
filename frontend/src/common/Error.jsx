import React, { useState } from 'react';
import { FiRefreshCcw } from 'react-icons/fi'; // Import the reload icon

const ErrorText = ({ text = 'Something went wrong...', handleRefresh = null }) => {

  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    await handleRefresh();
    setLoading(false)
  }

  return <>
    {/* <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"> */}
    <div className="flex flex-col items-center p-10">
      <p className="text-white text-lg">{text}</p>
      {!handleRefresh ? '' :
        loading ?
          <button
            onClick={handleClick}
            disabled={true}
            className="mt-4 px-4 py-2 bg-gray-500 cursor-not-allowed text-white rounded hover:bg-gray-600 flex"
          >
            <span>Try Again </span>
            <FiRefreshCcw className="w-6 h-6 ms-2 animate-spin" />

          </button>
          :
          <button
            onClick={handleClick}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex"
          >
            <span>Try Again </span>
            <FiRefreshCcw className="w-6 h-6 ms-2" />

          </button>
      }

    </div>
    {/* </div> */}
  </>
};

export default ErrorText;

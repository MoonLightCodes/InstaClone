import React from 'react';
import { FaNetworkWired } from 'react-icons/fa6';
import { usePostContext } from '../context/AllPostsContext';

const NetworkError = ({ children }) => {
  const {setrefetch} = usePostContext()
  return (
    <div className="flex flex-col m-5 items-center justify-center gap-4 p-6 bg-purple-700 text-white border border-purple-900 rounded-lg shadow-xl animate-pulse">
      <FaNetworkWired size={48} className="text-purple-300" />
      <h1 className="text-2xl font-bold">Network Error</h1>
      <p className="text-center text-purple-200">
        Oops! It seems like you're having connectivity issues. Please check your internet connection and try again.
      </p>
      <button
        onClick={() => setrefetch(p=>!p)}
        className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-md transition duration-300"
      >
        Retry
      </button>
    </div>
  );
};

export default NetworkError;
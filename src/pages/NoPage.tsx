import React from 'react';
import { useNavigate } from 'react-router-dom';

const NoPage: React.FC = () => {
  const navigate = useNavigate(); // Hook để điều hướng

  return (
    <div className="flex flex-col items-center justify-center h-screen  text-white">
      <h1 className="text-6xl font-bold mb-4 text-center">404 - Not Found</h1>
      <p className="text-lg mb-6">URL này đang trong quá trình Update thêm...</p>
      <button
        onClick={() => navigate('/')}
        className="bg-red-700 text-purple-100 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-purple-900 transition duration-300"
      >
        Trở về trang chính
      </button>
    </div>
  );
};

export default NoPage;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();

  const handleWeatherListNavigation = () => {
    navigate('/weather');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 w-[390px] h-[55px] bg-gradient-to-r from-purple-400 to-purple-600 p-4 flex justify-between items-center rounded-t-2xl">
      {/* Left Button */}
      <button
       className="bg-white p-2 rounded-full shadow-lg"
       onClick={() => navigate("/*")}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-purple-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.75v14.5m7.75-7.25H4.25" />
        </svg>
      </button>

      {/* Center Button */}
      <button className="bg-white p-3 rounded-full shadow-xl transform -translate-y-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-8 h-8 text-purple-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.75v14.5m7.75-7.25H4.25" />
        </svg>
      </button>

     {/* Right Button */}
      <button
        className="bg-purple-200 p-2 rounded-full shadow-lg text-purple-500 hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-105"
        onClick={handleWeatherListNavigation}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
    </div>
  );
};

export default BottomNavigation;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWeatherStore } from "../stores/useWeatherStore"; 

const WeatherPage: React.FC = () => {
  const [city, setCity] = useState("Da Nang");
  const { weather, searchHistory, isLoading, fetchWeather } = useWeatherStore();
  const navigate = useNavigate();

  // Xử lý việc gửi form và lấy dữ liệu thời tiết
  const onHandleSubmitCity = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetchWeather(city);
  };

  return (
    <div className="flex flex-col items-center w-full h-[844px] p-[3px] rounded-2xl shadow-lg bg-gradient-to-b text-white">

      {/* Nút Home sử dụng GooGle để kiếm mẫu đẹp <3 */}
      <div className="self-start mb-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-4 py-2 text-white bg-gradient-to-r from-purple-400 to-blue-500 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105 hover:shadow-2xl hover:from-purple-600 hover:to-blue-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h-4"
            />
          </svg>
          <span className="font-semibold">Home</span>
        </button>
      </div>

      {/* Form nhập tên thành phố: Vì dùng trên máy tính nên có Button tìm kiếm để click vào */}
      <div className="w-full">
        <form onSubmit={onHandleSubmitCity} className="mb-4">
          <input
            type="text"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            placeholder="Search for a city or airport"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-400 to-blue-500 hover:from-purple-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-2xl"
          >
            Search
          </button>
        </form>
      </div>

      {/* Hiển thị thông tin thời tiết */}
      {isLoading && <p>Loading...</p>}
      {weather && (
        <div className="flex justify-between items-center w-full bg-gradient-to-b from-purple-500 to-blue-600 rounded-lg p-4 m-2">
          <div className="flex flex-col justify-center items-start">
            <div className="text-5xl font-bold">{weather.current.temp_c}°</div>
            <div className="text-lg font-semibold mt-2">
              {weather.location.name}, {weather.location.country}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={weather.current.condition.icon}
              alt="Weather Icon"
              className="h-20 w-20"
            />
            <p className="mt-2 text-sm">{weather.current.condition.text}</p>
          </div>
        </div>
      )}

      {/* Hiển thị lịch sử tìm kiếm & nếu trùng với vị trí đang tìm kiếm thì không hiển thị (searchHistory) */}
      <div className="w-full flex flex-col items-center">
        {searchHistory
          .filter(
            (item) =>
              !(weather && item.location.name === weather.location.name && item.location.country === weather.location.country)
          )
          .map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center w-full bg-gradient-to-b from-purple-500 to-blue-600 rounded-lg p-4 m-2"
            >
              <div className="flex flex-col justify-center items-start">
                <div className="text-5xl font-bold">{item.current.temp_c}°</div>
                <div className="text-lg font-semibold mt-2">
                  {item.location.name}, {item.location.country}
                </div>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src={item.current.condition.icon}
                  alt="Weather Icon"
                  className="h-20 w-20"
                />
                <p className="mt-2 text-sm">{item.current.condition.text}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default WeatherPage;
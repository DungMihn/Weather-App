import React, { useState, useEffect } from "react";
import axios from "axios";
import BottomNavigation from "../components/BottomNavigation";
import Forecast from "../components/Forecast";

type TWeather = {
  location: {
    name: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
  };
};

const HomePage: React.FC = () => {
  const [weather, setWeather] = useState<TWeather | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=c9a0ca46550648b29ce125849232709&q=Da+nang&days=1&aqi=no&alerts=no`
        );
        setWeather(response.data);
      } catch (error) {
        console.error("Lỗi lấy weather data", error);
      }
    };

    fetchWeatherData();
  }, []);

  // Hàm để định dạng localtime thành giờ và phút
  const formatLocalTime = (localtime: string): string => {
    const date = new Date(localtime);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <div className="w-[390px] h-[844px] flex flex-col rounded-2xl shadow-lg relative">

      {/* Hiển thị thông tin thời tiết */}
      <div className="flex flex-col items-center justify-center pt-[80px] text-white">
        {weather && (
          <>
            <p className="text-xl">
              {weather.location.name}, {weather.location.country}
            </p>
            <p className="text-6xl font-bold">{weather.current.temp_c}°C</p>
            <p className="text-sm">({weather.current.temp_f}°F)</p>
            <p className="text-sm">{formatLocalTime(weather.location.localtime)}</p>
          </>
        )}
      </div>

      {/* Thêm ảnh ở giữa background */}
      <img
        src="https://cdn4.iconfinder.com/data/icons/wonderful-christmas-3d-1/512/1._House_1024.png"
        alt="Center Image"
        className="absolute z-10 object-cover"
        style={{ top: "45%", left: "50%", transform: "translate(-50%, -50%)" }}
      />

      <Forecast />

      <BottomNavigation />
    </div>
  );
};

export default HomePage;
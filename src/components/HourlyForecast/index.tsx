import React, { useState, useEffect } from "react";
import axios from "axios";

// Định nghĩa kiểu cho dữ liệu thời tiết
type THour = {
  time: string; // thời gian
  temp_c: number; // nhiệt độ
  condition: {
    icon: string; // biểu tượng thời tiết
  };
};

const HourlyForecast: React.FC = () => {
  const [forecast, setForecast] = useState<THour[]>([]);

  useEffect(() => {
    const fetchHourlyForecast = async () => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=c9a0ca46550648b29ce125849232709&q=Da+nang&days=1&aqi=no&alerts=no&lang=vi`
        );

        // Lấy giờ hiện tại và phút hiện tại
        const now = new Date();
        let currentHour = now.getHours();
        const currentMinutes = now.getMinutes();

        // Làm tròn giờ dựa trên phút hiện tại
        if (currentMinutes >= 30) {
          currentHour += 1; // Nếu phút >= 30, làm tròn lên
        }

        // Lấy dữ liệu dự báo thời tiết cho giờ hiện tại và 4 giờ tiếp theo
        const hourlyData = response.data.forecast.forecastday[0].hour;

        // Cập nhật dữ liệu nhiệt độ cho "Now" và 4 giờ tiếp theo
        const updatedForecast = [
          {
            time: "Now", // Giờ hiện tại sau khi làm tròn
            temp_c: hourlyData[currentHour].temp_c, // Nhiệt độ của giờ làm tròn
            condition: {
              icon: hourlyData[currentHour].condition.icon,
            },
          },
          ...hourlyData.slice(currentHour + 1, currentHour + 5), // Lấy 4 giờ tiếp theo
        ];

        setForecast(updatedForecast);
      } catch (error) {
        console.error("Lỗi fetching hourly forecast data", error);
      }
    };

    fetchHourlyForecast();
  }, []);

  // Hàm để định dạng giờ và phút
  const formatLocalTime = (time: string): string => {
    const date = new Date(time);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <div className="flex justify-around">
      {forecast.map((hour, index) => {
        const isNow = hour.time === "Now"; // Kiểm tra xem có phải thời gian hiện tại không

        return (
          <div
            key={index}
            className={`flex flex-col items-center border border-gray-500 ${
              isNow ? "bg-purple-600" : "bg-gradient-to-b from-purple-500 to-blue-600"
            } rounded-full w-20 h-45 pt-6 pb-6 mr-1.5 ml-1.5 text-white`}
          >
            {/* Hiển thị "Now" cho giờ hiện tại, các giờ khác định dạng bằng formatLocalTime */}
            <p>{isNow ? "Now" : formatLocalTime(hour.time)}</p>
            <img src={hour.condition.icon} alt="Weather icon" className="w-8 h-8 m-2" />
            <p>{hour.temp_c}°C</p>
          </div>
        );
      })}
    </div>
  );
};

export default HourlyForecast;

import React, { useState, useEffect } from "react";
import axios from "axios";

type TDay = {
  date: string; 
  day: {
    avgtemp_c: number;
    condition: {
      icon: string; 
    };
  };
};

const WeeklyForecast: React.FC = () => {
  const [forecast, setForecast] = useState<TDay[]>([]);

  useEffect(() => {
    const fetchWeeklyForecast = async () => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=c9a0ca46550648b29ce125849232709&q=Da+nang&days=5&aqi=no&alerts=no&lang=vi`
        );

        // Lấy dữ liệu dự báo thời tiết hàng ngày
        const dailyData = response.data.forecast.forecastday;

        // Cập nhật dữ liệu cho 5 ngày tiếp theo
        setForecast(dailyData);
      } catch (error) {
        console.error("Error fetching weekly forecast data", error);
      }
    };

    fetchWeeklyForecast();
  }, []);

  // Hàm chuyển đổi ngày trong tuần từ số sang viết tắt
  const getDayOfWeek = (date: string): string => {
    const dayNames = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];
    const dayIndex = new Date(date).getDay(); // Lấy số ngày trong tuần (0 - 6)
    return dayNames[dayIndex];
  };

  return (
    <div className="flex justify-around">
      {forecast.map((day, index) => {
        const isToday = new Date(day.date).toDateString() === new Date().toDateString(); // Kiểm tra nếu là ngày hiện tại
        return (
          <div
            key={index}
            className={`flex flex-col items-center border border-gray-500 ${
              isToday ? "bg-purple-600" : "bg-gradient-to-b from-purple-500 to-blue-600"
            } rounded-full w-20 h-45 pt-6 pb-6 mr-1.5 ml-1.5 text-white`}
          >
            {/* Hiển thị ngày với viết tắt MON, TUE, ... */}
            <p className="text-lg">{isToday ? "Now" : getDayOfWeek(day.date)}</p>
            <img src={day.day.condition.icon} alt="Weather icon" className="w-8 h-8 m-2" />
            <p>{day.day.avgtemp_c}°C</p>
          </div>
        );
      })}
    </div>
  );
};

export default WeeklyForecast;
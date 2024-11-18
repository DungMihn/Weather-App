import React, { useState } from "react";
import HourlyForecast from "../HourlyForecast";
import WeeklyForecast from "../WeeklyForecast";

const Forecast: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string>("Hourly");

  return (
    <div className="mt-auto w-full" style={{ height: '290px', overflow: 'hidden' }}>
      <div className="flex justify-evenly p-4 rounded-t-2xl">
        <button
          onClick={() => setActiveComponent("Hourly")}
          className={`w-1/2 text-center text-white font-bold p-2 border-b-4 ${
            activeComponent === "Hourly" ? "border-purple-500" : "border-gray-500"
          }`}
        >
          Hourly Forecast
        </button>
        <button
          onClick={() => setActiveComponent("Weekly")}
          className={`w-1/2 text-center text-white font-bold p-2 border-b-4 ${
            activeComponent === "Weekly" ? "border-purple-500" : "border-gray-500"
          }`}
        >
          Weekly Forecast
        </button>
      </div>

      <div className=" ">
        {activeComponent === "Hourly" && <HourlyForecast />} 
        {activeComponent === "Weekly" && <WeeklyForecast />}
      </div>
    </div>
  );
};

export default Forecast;

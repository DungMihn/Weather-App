import axios from "axios";
import { create } from "zustand";

type TWeather = {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    condition: {
      icon: string;
      text: string;
    };
  };
};

type WeatherStore = {
  weather: TWeather | null;
  searchHistory: TWeather[]; // Lịch sử tìm kiếm
  isLoading: boolean; // Trạng thái tải
  fetchWeather: (city: string) => Promise<void>; // Hàm lấy thời tiết
};

// Tạo store với Zustand
export const useWeatherStore = create<WeatherStore>((set) => ({
  weather: null, 
  searchHistory: [], 
  isLoading: false, // Khởi tạo trạng thái tải là false
  fetchWeather: async (city: string) => {
    // Hàm để lấy thông tin thời tiết
    if (!city.trim()) {
      console.error("City không hợp lệ");
      set({ isLoading: false });
      return;
    }

    set({ isLoading: true }); // Bắt đầu trạng thái tải
    console.log(`Fetching weather for city: ${city}`);
    
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=c9a0ca46550648b29ce125849232709&q=${city}&aqi=no&lang=vi`
      );

      // Kiểm tra xem vị trí đã tồn tại trong lịch sử chưa
      set((state) => {
        const isInHistory = state.searchHistory.some(
          (item) =>
            item.location.name === response.data.location.name &&
            item.location.country === response.data.location.country
        );

        // Thêm kết quả thời tiết vào lịch sử tìm kiếm nếu chưa tồn tại
        return {
          weather: response.data,
          searchHistory: isInHistory ? state.searchHistory : [...state.searchHistory, response.data],
          isLoading: false,
        };
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Lỗi từ API:", error.response?.data || error.message);
      } else {
        console.error("Lỗi không xác định:", error);
      }
      set({ isLoading: false }); // Đặt trạng thái tải lại là false khi có lỗi
    }
  },
}));

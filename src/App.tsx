import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NoPage from './pages/NoPage';
import Layout from './pages/Layout';
import WeatherPage from './pages/WeatherPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} /> {/* Trang chủ */}
          <Route path="weather" element={<WeatherPage />} /> {/* Trang thời tiết */}
          <Route path="*" element={<NoPage />} /> {/* Xử lý lỗi 404 */}
        </Route>
      </Routes>
    </Router>
  );
}
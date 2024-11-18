// components/Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="relative w-[390px] h-[844px] rounded-2xl shadow-lg justify-center items-center min-h-screen bg-[url('../public/images/images.png')] bg-cover">
      <Outlet />
    </div>
  );
};

export default Layout;

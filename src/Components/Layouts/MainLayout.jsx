import React, { useState } from 'react';
import Sidebar from '../NavSide/Sidebar';
import Navbar from '../NavSide/Navbar';
import { useAPP } from '../../contexts/Appcontext';

const MainLayout = ({ children }) => {
  // Lift toggle state into the layout.
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const { theme } = useAPP();
  const dark = theme === "dark" ? "main-dark" : "";

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Right Side: Navbar at the top; page content below */}
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className={`flex-1 p-6 bg-gray-100 overflow-auto transition-colors duration-300 ${dark}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

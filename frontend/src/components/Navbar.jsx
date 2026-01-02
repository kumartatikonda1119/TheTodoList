import React from "react";
import { IoLogOut } from "react-icons/io5";
import { GiBat, GiBatMask } from "react-icons/gi";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from "../context/ThemeContext";

function Navbar({ username, onLogout }) {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className="bg-gradient-to-r from-gray-700 to-gray-800 dark:from-gray-800 dark:to-gray-900 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <GiBatMask className="text-2xl sm:text-3xl lg:text-4xl" />
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold">
              BatTask
            </h1>
          </div>

          {/* User Info, Theme Toggle and Logout */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            <div className="hidden md:block text-sm sm:text-base">
              <span className="text-gray-300 dark:text-gray-300">Welcome,</span>
              <span className="ml-2 font-semibold">{username || "User"}</span>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 rounded-lg bg-gray-600 dark:bg-gray-700 hover:bg-gray-500 dark:hover:bg-gray-600 transition duration-300"
              title={
                isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
              }
            >
              {isDarkMode ? (
                <MdLightMode className="text-xl sm:text-2xl" />
              ) : (
                <MdDarkMode className="text-xl sm:text-2xl" />
              )}
            </button>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="flex items-center space-x-1 sm:space-x-2 bg-red-500 hover:bg-red-600 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg transition duration-300 font-semibold text-sm sm:text-base"
            >
              <IoLogOut className="text-base sm:text-lg" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

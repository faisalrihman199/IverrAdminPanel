import React, { useEffect, useState } from "react";
import { useAPP } from "../../contexts/Appcontext";
import { FaCog, FaUser, FaUserCircle } from "react-icons/fa";
import { IoLogOutSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { TiWeatherSunny } from "react-icons/ti";
import { FiMinimize2 } from "react-icons/fi";

const Navbar = ({ toggleSidebar }) => {
    const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
    const { theme, setTheme } = useAPP();
    const isDarkMode = theme === 'dark';
    const handleDarkMode = () => {
        localStorage.setItem('themeColor', isDarkMode ? 'light' : 'dark');
        setTheme(isDarkMode ? 'light' : 'dark');
    };
    const [isFullScreen,setIsFulLScreen]=useState(false);

    const handleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFulLScreen(true);
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
            setIsFulLScreen(false);
        }
    };

    // Show/hide profile dropdown based on mouse events on the container
    const handleProfileMouseEnter = () => {
        setProfileDropdownVisible(true);
    };
    const handleProfileMouseLeave = () => {
        setProfileDropdownVisible(false);
    };

    // Define conditional classes for dark mode
    const darkBgClass = isDarkMode ? "dark-bg" : "bg-white";
    const darkTextClass = isDarkMode ? "text-white" : "text-gray-800";
    const darkIconStroke = isDarkMode ? "#fff" : "#2b2b2b";

    // Profile menu colors for dark/light modes
    const profileMenuBg = isDarkMode ? "main-dark" : "bg-white";
    const profileMenuText = isDarkMode ? "text-white" : "text-gray-700";
    const profileMenuHover = isDarkMode ? "hover:bg-gray-700 hover:rounded-md mx-2" : "hover:bg-gray-100 hover:rounded-md mx-2";
    const modeIcon = isDarkMode ? <TiWeatherSunny size={22} /> : <svg
        style={{
            verticalAlign: "middle",
            width: "22px",
            stroke: darkIconStroke,
        }}
        width="24"
        height="24"
        fill="currentColor"
        className={darkTextClass}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M12.133 3C12.136 3 12.14 3 12.143 3C12.462 3 12.6 3.39301 12.36 3.60001C10.679 5.04701 9.75503 7.32199 10.226 9.77399C10.749 12.495 12.988 14.566 15.773 14.938C17.532 15.173 19.161 14.728 20.456 13.839C20.719 13.658 21.068 13.897 20.989 14.203C19.885 18.519 15.626 21.595 10.767 20.902C6.73101 20.326 3.54402 17.087 3.06602 13.095C2.81602 11.013 3.289 9.05101 4.27 7.42001C5.86 4.77401 8.78601 3 12.133 3Z" />
    </svg>;
    // For dark mode, add an inset white shadow on the left border.
    const headerBoxShadow = isDarkMode
        ? "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06), inset 1px 0 1px rgba(255,255,255,0.05)"
        : "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)";

    return (
        <header
            className={`flex items-center justify-between ${darkBgClass} ${darkTextClass} p-6 px-8 md:py-8 shadow transition-colors duration-300`}
            style={{ boxShadow: headerBoxShadow }}
        >
            {/* Left Section */}
            <div className="flex items-center space-x-4">
                {/* Toggle Sidebar Icon */}
                <button
                    className="focus:outline-none sm:hidden transition-colors duration-300"
                    aria-label="Toggle Sidebar"
                    onClick={toggleSidebar}
                >
                    <svg
                        width="24"
                        height="24"
                        fill="currentColor"
                        className={darkTextClass}
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3 7C3 4.79086 4.79086 3 7 3C9.20914 3 11 4.79086 11 7C11 9.20914 9.20914 11 7 11C4.79086 11 3 9.20914 3 7ZM7 5C5.89543 5 5 5.89543 5 7C5 8.10457 5.89543 9 7 9C8.10457 9 9 8.10457 9 7C9 5.89543 8.10457 5 7 5Z"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M17 3C14.7909 3 13 4.79086 13 7C13 9.20914 14.7909 11 17 11C19.2091 11 21 9.20914 21 7C21 4.79086 19.2091 3 17 3ZM15 7C15 5.89543 15.8954 5 17 5C18.1046 5 19 5.89543 19 7C19 8.10457 18.1046 9 17 9C15.8954 9 15 8.10457 15 7Z"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M17 13C14.7909 13 13 14.7909 13 17C13 19.2091 14.7909 21 17 21C19.2091 21 21 19.2091 21 17C21 14.7909 19.2091 13 17 13ZM15 17C15 15.8954 15.8954 15 17 15C18.1046 15 19 15.8954 19 17C19 18.1046 18.1046 19 17 19C15.8954 19 15 18.1046 15 17Z"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7 13C4.79086 13 3 14.7909 3 17C3 19.2091 4.79086 21 7 21C9.20914 21 11 19.2091 11 17C11 14.7909 9.20914 13 7 13ZM5 17C5 15.8954 5.89543 15 7 15C8.10457 15 9 15.8954 9 17C9 18.10457 8.10457 19 7 19C5.89543 19 5 18.1046 5 17Z"
                        />
                    </svg>
                </button>
                {/* Logo placeholder */}
            </div>

            {/* Middle Section (optional) */}
            <div className="hidden md:flex items-center space-x-4">
                {/* Add your nav links here */}
            </div>

            {/* Right Section */}
            <div className="flex items-center pr-5">
                {/* Dark Mode Toggle */}
                <button
                    className="focus:outline-none sm:mr-6 transition-colors duration-300 md:w-[210px] mr-5"
                    aria-label="Toggle Dark Mode"
                    onClick={handleDarkMode}
                >
                    {modeIcon}
                </button>

                {/* Fullscreen Toggle */}
                <button
                    className="focus:outline-none mr-4 transition-colors duration-300"
                    aria-label="Toggle Fullscreen"
                    onClick={handleFullscreen}
                >
                    {
                        isFullScreen?
                        <FiMinimize2 size={24} style={{
                            verticalAlign: "middle",
                            width: "22px",
                            stroke: darkIconStroke,
                        }} />
                        :
                        <svg
                            style={{
                                verticalAlign: "middle",
                                width: "22px",
                                stroke: darkIconStroke,
                            }}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M22 3V9C22 9.552 21.553 10 21 10C20.447 10 20 9.552 20 9V5.41406L14.707 10.707C14.512 10.902 14.256 11 14 11C13.744 11 13.488 10.902 13.293 10.707C12.902 10.316 12.902 9.68397 13.293 9.29297L18.5859 4H15C14.447 4 14 3.552 14 3C14 2.448 14.447 2 15 2H21C21.13 2 21.2601 2.0269 21.3821 2.0769C21.6271 2.1779 21.8221 2.37292 21.9231 2.61792C21.9741 2.73992 22 2.87 22 3Z"
                                fill={darkIconStroke}
                            />
                            <path
                                d="M9.29297 13.293L4 18.5859V15C4 14.448 3.553 14 3 14C2.447 14 2 14.448 2 15V21C2 21.13 2.0269 21.2601 2.0769 21.3821C2.1779 21.6271 2.37292 21.8211 2.61792 21.9231C2.73992 21.9741 2.87 22 3 22H9C9.553 22 10 21.552 10 21C10 20.448 9.553 20 9 20H5.41406L10.707 14.707C11.098 14.316 11.098 13.684 10.707 13.293C10.316 12.902 9.68397 12.902 9.29297 13.293Z"
                                fill={darkIconStroke}
                            />
                        </svg>
                    }
                </button>

                {/* Profile Dropdown Container */}
                <div
                    className="relative inline-block"
                    onMouseEnter={handleProfileMouseEnter}
                    onMouseLeave={handleProfileMouseLeave}
                >
                    <button className="focus:outline-none" aria-label="Profile Menu">
                        <svg
                            width="24"
                            height="24"
                            fill="currentColor"
                            className={darkTextClass}
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM12.0081 7C13.6651 7 15.0081 8.343 15.0081 10C15.0081 11.657 13.6651 13 12.0081 13C10.3511 13 9.00806 11.657 9.00806 10C9.00806 8.343 10.3511 7 12.0081 7ZM12 20.5C9.79 20.5 7.77001 19.65 6.26001 18.26C6.70001 16.88 7.84004 15.5699 10.29 15.5699H13.71C16.15 15.5699 17.29 16.89 17.74 18.26C16.23 19.65 14.21 20.5 12 20.5Z" />
                        </svg>
                    </button>
                    <ul
                        className={`absolute right-0 top-full rounded-lg w-48 ${profileMenuBg} ${profileMenuText} rounded shadow-lg py-2 transition-all duration-300 ${profileDropdownVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-2 pointer-events-none"
                            }`}
                    >
                        <li className={`flex items-center px-4 ${profileMenuHover} cursor-pointer`}>
                            <FaUserCircle className="" />
                            <Link to="#account" className={`block px-3 py-2 `}>
                                Account
                            </Link>
                        </li>

                        <hr className="mx-3 my-2" />
                        <li className={`flex items-center px-4 ${profileMenuHover} cursor-pointer`}>
                            <FaCog className="" />
                            <Link to="#setting" className={`block px-3 py-2 `}>
                                Setting
                            </Link>
                        </li>
                        <hr className="mx-3 my-2" />
                        <li className={`flex items-center px-4 ${profileMenuHover} cursor-pointer`}>
                            <IoLogOutSharp className="" />
                            <Link to="#logout" className={`block px-3 py-2 `}>
                                Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Navbar;

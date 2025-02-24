import React, { useState, useEffect } from "react";
import { useAPP } from "../../contexts/Appcontext";

const StatCard = ({ title, count, icon: Icon }) => {
    const { theme } = useAPP();
   


    const dark = theme === "dark";
    const bgColor = dark ? "dark-bg" : "bg-white";
    const textColor = dark ? "text-white" : "text-gray-800";
    // Label color: white in dark mode; custom blue in light mode.
    const labelColor = dark ? "#ffffff" : "#7B2BFF";

    return (
        <div
            className={`${bgColor} transition-colors duration-300 p-6 sm:p-8 rounded-2xl shadow-sm flex items-center justify-between`}
        >
            {/* Left side: Title + Count */}
            <div>
                {/* Label with bullet */}
                <span
                    className="inline-flex items-center pl-3 pr-1 py-1 rounded-lg mb-2 transition-colors duration-300"
                    style={{
                        fontSize: "12px",
                        backgroundColor: "rgba(92, 97, 242, 0.1)",
                        color: labelColor,
                    }}
                >
                    {title}
                    <span className="ml-1">•</span>
                </span>

                {/* Numeric count */}
                <div className={`text-2xl font-bold ${textColor} transition-colors duration-300`}>
                    {count}
                </div>
            </div>

            {/* Right side: Icon */}
            <div>
                {typeof Icon === "string" ? (
                    <img src={Icon} alt={title} className="w-16 h-16" />
                ) : (
                    // If Icon is a React component, render it with the transition classes.
                    Icon && <Icon className="w-16 h-16 transition-colors duration-300" />
                )}
            </div>
        </div>
    );
};

export default StatCard;

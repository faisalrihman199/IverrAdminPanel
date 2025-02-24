import React, { useState } from "react";
import StatCard from "./StatCard";

// Example icons from react-icons
import { FaImage, FaCity, FaShieldAlt, FaCreditCard } from "react-icons/fa";
import Banner from "../../assets/Icons/Dashboard/banner.svg"
import City from "../../assets/Icons/Dashboard/city.svg"
import FAQ from "../../assets/Icons/Dashboard/faq.svg"
import Payment from "../../assets/Icons/Dashboard/payment.svg"
import Users from "../../assets/Icons/Dashboard/user.svg"
import Car from "../../assets/Icons/Dashboard/car.svg"
import Gallery from "../../assets/Icons/Dashboard/Gallery.svg";
import Facility from "../../assets/Icons/Dashboard/facility.svg";
import { useAPP } from "../../contexts/Appcontext";

const StatsSection = () => {
  // Example data array
  const stats = [
    { title: "Banner", count: 3, icon: Banner },
    { title: "City", count: 15, icon: City },
    { title: "FAQ", count: 10, icon: FAQ },
    { title: "Payment Gateway", count: 13, icon: Payment },
    { title: "Users", count: 19, icon:Users  },
    { title: "Cars", count: 31, icon:Car  },
    { title: "Gallery", count: 12, icon:Gallery  },
    { title: "Facilities", count: 21, icon:Facility  },
    
  ];
  const { theme } = useAPP();
    const dark = theme === "dark";
  return (
    <section className="">
      <h1 className={`font-semibold mb-4 ${dark?'text-white':'color-2b'}`} style={{fontSize:'24px'}}>Report Data</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map(({ title, count, icon }, idx) => (
          <StatCard
            key={idx}
            title={title}
            count={count}
            icon={icon}
          />
        ))}
      </div>
    </section>
  );
};

export default StatsSection;

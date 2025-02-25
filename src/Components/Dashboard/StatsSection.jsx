import React, { useEffect, useState } from "react";
import StatCard from "./StatCard";
import Banner from "../../assets/Icons/Dashboard/banner.svg";
import City from "../../assets/Icons/Dashboard/city.svg";
import FAQ from "../../assets/Icons/Dashboard/faq.svg";
import Users from "../../assets/Icons/Dashboard/user.svg";
import Gallery from "../../assets/Icons/Dashboard/Gallery.svg";
import Facility from "../../assets/Icons/Dashboard/facility.svg";
import { useAPP } from "../../contexts/Appcontext";
import DotLoader from "../Loaders/DotLoader";
import Payment from "../../assets/Icons/Dashboard/payment.svg"

const StatsSection = () => {
  const { theme, dashboardData } = useAPP();
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardData()
      .then((res) => {
        setDashboardStats(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error retrieving dashboard data: ", err);
        setLoading(false);
      });
  }, [dashboardData]);

  const dark = theme === "dark";

  if (loading) {
    return <DotLoader />;
  }

  // Create stats array using the fetched data; default to 0 if any key is missing
  const stats = [
    { title: "Banner", count: dashboardStats?.banners || 0, icon: Banner },
    { title: "City", count: dashboardStats?.cities || 0, icon: City },
    { title: "FAQ", count: dashboardStats?.FAQs || 0, icon: FAQ },
    { title: "Payment Gateway", count: 0, icon: Payment },
    { title: "Users", count: dashboardStats?.users || 0, icon: Users },
    { title: "Gallery", count: dashboardStats?.galleries || 0, icon: Gallery },
    { title: "Facilities", count: dashboardStats?.facilities || 0, icon: Facility },

  ];

  return (
    <section>
      <h1
        className={`font-semibold mb-4 ${dark ? "text-white" : "color-2b"}`}
        style={{ fontSize: "24px" }}
      >
        Report Data
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map(({ title, count, icon }, idx) => (
          <StatCard key={idx} title={title} count={count} icon={icon} />
        ))}
      </div>
    </section>
  );
};

export default StatsSection;

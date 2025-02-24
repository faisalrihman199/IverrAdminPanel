import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiChevronRight, FiChevronDown } from 'react-icons/fi';
import Logo from "../../assets/images/website/icon.png";
import Toggle from '../../assets/Icons/Navside/Toggle';
import { BsFillGridFill } from 'react-icons/bs';
import Gallery from '../../assets/Icons/Navside/Banner';
import Banner from '../../assets/Icons/Navside/Banner';
import City from '../../assets/Icons/Navside/City';
import CarType from '../../assets/Icons/Navside/CarType';
import CarBrand from '../../assets/Icons/Navside/CarBrand';
import Car from '../../assets/Icons/Navside/Car';
import Faq from '../../assets/Icons/Navside/Faq';
import Facility from '../../assets/Icons/Navside/Facility';
import Payment from '../../assets/Icons/Navside/Payment';
import UserList from '../../assets/Icons/Navside/UserList';
import Coupen from '../../assets/Icons/Navside/Coupen';
import Booking from '../../assets/Icons/Navside/Booking';

export default function Sidebar({ isSidebarOpen, toggleSidebar }) {
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSubmenuClick = (label) => {
    setOpenSubmenu((prev) => (prev === label ? null : label));
  };

  const isItemActive = (item) => {
    const currentPath = location.pathname.toLowerCase();
    const itemPath = item.link?.toLowerCase() || item.label.toLowerCase();

    if (item.label === 'Dashboard') {
      return currentPath === '/' || currentPath.includes('dashboard');
    }

    if (item.subItems) {
      return item.subItems.some((sub) => currentPath === sub.link.toLowerCase());
    }

    return currentPath.includes(itemPath);
  };

  const menuItems = [
    {
      label: 'Dashboard',
      icon: <BsFillGridFill size={20} />,
      link: '/',
    },
    {
      label: 'Banner',
      icon: <Banner />,
      link: '/banners',
      subItems: [
        { label: 'Add Banner', link: '/banners/add' },
        { label: 'List Banners', link: '/banners/list' },
      ],
    },
    {
      label: 'City',
      icon: <City />,
      link: '/cities',
      subItems: [
        { label: 'Add City', link: '/cities/add' },
        { label: 'List Cities', link: '/cities/list' },
      ],
    },
    {
      label: 'Car Type',
      icon: <CarType />,
      link: '/car-types',
      subItems: [
        { label: 'Add Car Type', link: '/car-types/add' },
        { label: 'List Car Types', link: '/car-types/list' },
      ],
    },
    {
      label: 'Car Brand',
      icon: <CarBrand />,
      link: '/car-brands',
      subItems: [
        { label: 'Add Car Brand', link: '/car-brands/add' },
        { label: 'List Car Brands', link: '/car-brands/list' },
      ],
    },
    {
      label: 'Car',
      icon: <Car />,
      link: '/cars',
      subItems: [
        { label: 'Add Car', link: '/cars/add' },
        { label: 'List Cars', link: '/cars/list' },
      ],
    },
    {
      label: 'Gallery',
      icon: <Gallery />,
      link: '/galleries',
      subItems: [
        { label: 'Add Gallery', link: '/galleries/add' },
        { label: 'List Galleries', link: '/galleries/list' },
      ],
    },
    {
      label: 'FAQ',
      icon: <Faq />,
      link: '/faqs',
      subItems: [
        { label: 'Add FAQ', link: '/faqs/add' },
        { label: 'List FAQs', link: '/faqs/list' },
      ],
    },
    {
      label: 'Facility',
      icon: <Facility />,
      link: '/facilities',
      subItems: [
        { label: 'Add Facility', link: '/facilities/add' },
        { label: 'List Facilities', link: '/facilities/list' },
      ],
    },
    {
      label: 'Payment List',
      icon: <Payment />,
      link: '/payments',
      
    },
    {
      label: 'Payout List',
      icon: <Payment />,
      link: '/payouts',
      
    },
    {
      label: 'Coupon',
      icon: <Coupen />,
      link: '/coupons',
      subItems: [
        { label: 'Add Coupon', link: '/coupons/add' },
        { label: 'List Coupons', link: '/coupons/list' },
      ],
    },
    {
      label: 'Booking',
      icon: <Booking />,
      link: '/bookings',
      subItems: [
        { label: 'Pending Booking', link: '/bookings/pending' },
        { label: 'Cancelled Booking', link: 'bookings/cancelled' },
        { label: 'Pick Up Booking', link: 'bookings/pickup' },
        { label: 'Drop Car Booking', link: 'bookings/drop' },
        { label: 'Completed Booking', link: 'bookings/completed' },
      ],
    },
    {
      label: 'User List',
      icon: <UserList />,
      link: '/users',
    },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar Container */}
      <div
        className={`
          group fixed sm:relative top-0 left-0 h-screen bg-[#171829] text-white 
          transform transition-all duration-300 
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0
          ${isCollapsed ? 'sm:w-20 hover:sm:w-72' : 'sm:w-72'}
        `}
        style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '14px' }}
      >
        {/* Sidebar Header */}
        <div className="sticky top-0 z-10 bg-[#171829] pb-2">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center">
              <img
                src={Logo}
                height={60}
                width={60}
                alt="Logo"
                className="rounded-full"
              />
            </div>
            <div
              className={`
                rounded-lg w-10 h-10 flex items-center justify-center text-sm cursor-pointer 
                ${isCollapsed ? 'sm:hidden sm:group-hover:flex' : ''}
              `}
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              onClick={() => {
                setIsCollapsed(!isCollapsed);
                toggleSidebar();
              }}
            >
              <Toggle />
            </div>
          </div>
          <hr
            className={`
              border-t border-[#2B2B2B] transition-all 
              ${isCollapsed ? 'mt-[0.83rem]' : 'mt-[0.1rem]'} 
              group-hover:mt-[0.1rem]
            `}
          />
        </div>

        {/* Sidebar Navigation */}
        <nav
          className="px-2 py-3 overflow-y-auto"
          style={{
            height: 'calc(100vh - 116px)',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          <ul className="space-y-1 pb-4">
            {menuItems.map((item) => {
              const hasSubItems = !!item.subItems?.length;
              // Instead of just using openSubmenu, we also check if any sub item is active.
              const shouldBeOpen =
                openSubmenu === item.label ||
                (item.subItems &&
                  item.subItems.some(
                    (sub) =>
                      location.pathname.toLowerCase() === sub.link.toLowerCase()
                  ));
              const isActive = isItemActive(item);

              return (
                <li key={item.label}>
                  {hasSubItems ? (
                    <>
                      <button
                        onClick={() => handleSubmenuClick(item.label)}
                        className="group flex items-center w-full px-5 py-0 rounded-lg transition-colors"
                      >
                        <span
                          className={`w-10 h-10 mr-3 flex items-center justify-center ${
                            isActive ? 'rounded-lg px-2' : ''
                          }`}
                          style={
                            isActive
                              ? {
                                  backgroundColor: '#7B2BFF',
                                  boxShadow:
                                    '1.5px 0.33px 16px 0px rgba(92, 97, 242, 0.6)',
                                }
                              : {}
                          }
                        >
                          {item.icon}
                        </span>
                        <span
                          className={`flex-1 pl-2 text-left hover:text-[#7B2BFF] ${
                            isCollapsed ? 'sm:hidden sm:group-hover:inline' : ''
                          }`}
                          style={{ fontSize: 'medium' }}
                        >
                          {item.label}
                        </span>
                        {!isCollapsed &&
                          (shouldBeOpen ? (
                            <FiChevronDown size={24} />
                          ) : (
                            <FiChevronRight size={24} />
                          ))}
                        {isCollapsed && (
                          <span className="sm:hidden sm:group-hover:inline">
                            {shouldBeOpen ? (
                              <FiChevronDown size={24} />
                            ) : (
                              <FiChevronRight size={24} />
                            )}
                          </span>
                        )}
                      </button>
                      <ul
                        className={`mt-1 space-y-1 overflow-hidden transition-all duration-300 ${
                          shouldBeOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        {item.subItems.map((sub) => {
                          const isSubActive = location.pathname.toLowerCase() === sub.link.toLowerCase();
                          return (
                            <li key={sub.label}>
                              <Link
                                to={sub.link}
                                className={`
                                  group block px-8 py-0 rounded transition-colors 
                                  ${isCollapsed ? 'sm:hidden sm:group-hover:block' : ''}
                                  ${isSubActive ? 'text-[#7B2BFF]' : ''}
                                `}
                                style={{ fontSize: 'medium' }}
                              >
                                <span className="mx-2 mr-9 hover:text-[#7B2BFF]">-</span>
                                <span className="hover:text-[#7B2BFF]">{sub.label}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </>
                  ) : (
                    <Link
                      to={item.link}
                      className="group flex items-center px-5 py-2 rounded-lg transition-colors"
                    >
                      <span
                        className={`w-10 h-10 mr-3 flex items-center justify-center ${
                          isActive ? 'rounded-lg px-2' : ''
                        }`}
                        style={
                          isActive
                            ? {
                                backgroundColor: '#7B2BFF',
                                boxShadow:
                                  '1.5px 0.33px 16px 0px rgba(92, 97, 242, 0.6)',
                              }
                            : {}
                        }
                      >
                        {item.icon}
                      </span>
                      <span
                        className={`flex-1 pl-2 hover:text-[#7B2BFF] ${
                          isCollapsed ? 'sm:hidden sm:group-hover:inline' : ''
                        }`}
                        style={{ fontSize: 'medium' }}
                      >
                        {item.label}
                      </span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}

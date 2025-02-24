import React from 'react';
import MainLayout from '../../Components/Layouts/MainLayout';
import { FaCreditCard } from 'react-icons/fa';
import { RiBankLine } from 'react-icons/ri';

const Payout = () => {
  return (
    <MainLayout>
      {/* Define the glow animation keyframes */}
      <style>{`
        @keyframes glow {
          0%, 100% {
            transform: scale(1);
            filter: brightness(1);
          }
          50% {
            transform: scale(1.05);
            filter: brightness(1.5);
          }
        }
      `}</style>
      <div className="flex flex-col items-center justify-center h-full">
        <RiBankLine 
          className="text-purple-600 w-32 h-32" 
          style={{ animation: "glow 2s ease-in-out infinite" }}
        />
        <p className="mt-4 text-2xl font-semibold text-gray-700">
          Payout Page Coming Soon
        </p>
      </div>
    </MainLayout>
  );
};

export default Payout;

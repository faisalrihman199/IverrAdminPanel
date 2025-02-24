import React from 'react';

const DotLoader = () => {
  return (
    <>
      {/* Define the keyframes inline */}
      <style>{`
        @keyframes wave {
          50%, 75% {
            transform: scale(2.5);
          }
          80%, 100% {
            opacity: 0;
          }
        }
      `}</style>
      {/* Loader container centers its children */}
      <div className="flex justify-center items-center w-full h-full">
        <div 
          className="w-6 h-6 m-2 rounded-full bg-indigo-200" 
          style={{ animation: "wave 2s ease infinite", animationDelay: "0.2s" }}
        ></div>
        <div 
          className="w-6 h-6 m-2 rounded-full bg-yellow-300" 
          style={{ animation: "wave 2s ease infinite", animationDelay: "0.4s" }}
        ></div>
        <div 
          className="w-6 h-6 m-2 rounded-full bg-indigo-500" 
          style={{ animation: "wave 2s ease infinite", animationDelay: "0.6s" }}
        ></div>
        <div 
          className="w-6 h-6 m-2 rounded-full bg-yellow-500" 
          style={{ animation: "wave 2s ease infinite", animationDelay: "0.8s" }}
        ></div>
        <div 
          className="w-6 h-6 m-2 rounded-full bg-purple-500" 
          style={{ animation: "wave 2s ease infinite", animationDelay: "1s" }}
        ></div>
      </div>
    </>
  );
};

export default DotLoader;

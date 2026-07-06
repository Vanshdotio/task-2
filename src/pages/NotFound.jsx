import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto text-center py-20 px-6 space-y-8 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="relative w-48 h-48 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-blue-50/50 animate-pulse-slow"></div>
        <div className="absolute w-36 h-36 rounded-full bg-blue-100/50 animate-ping-slow"></div>
        
        <span className="text-8xl font-black text-blue-600/90 tracking-tighter relative select-none z-10">
          404
        </span>
      </div>

      <div className="space-y-3">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
          Oops! The page you are looking for does not exist or has been moved to another URL.
        </p>
      </div>

      <button
        onClick={() => navigate('/')}
        className="px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 rounded-xl cursor-pointer"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound;

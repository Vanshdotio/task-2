import React from 'react';

const Loader = ({ fullPage = false }) => {
  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-blue-600 animate-spin"></div>
      </div>
      <p className="text-sm font-medium text-slate-500 animate-pulse">Finding your perfect stay...</p>
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }

  return <div className="py-12 flex justify-center items-center">{spinner}</div>;
};

export default Loader;
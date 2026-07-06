import React from 'react';
import { HiStar } from 'react-icons/hi2';

const Rating = ({ value, showText = true, count }) => {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center text-amber-400">
        {[...Array(5)].map((_, i) => {
          const starValue = i + 1;
          const isFilled = starValue <= Math.round(value);
          return (
            <HiStar
              key={i}
              className={`w-4 h-4 ${isFilled ? 'text-amber-400' : 'text-slate-200'}`}
            />
          );
        })}
      </div>
      {showText && (
        <span className="text-sm font-semibold text-slate-700 ml-1">
          {value.toFixed(1)}
          {count !== undefined && (
            <span className="text-slate-400 font-normal"> ({count})</span>
          )}
        </span>
      )}
    </div>
  );
};

export default Rating;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiHeart, HiOutlineHeart, HiStar } from 'react-icons/hi2';
import { useFavorites } from '../context/FavoriteContext';

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorited = isFavorite(hotel.id);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleCardClick = () => {
    navigate(`/hotel/${hotel.id}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(hotel);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full transform hover:-translate-y-1"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
        <img 
          src={hotel.thumbnail} 
          alt={hotel.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {hotel.tag && (
          <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-bold text-white bg-blue-600/90 backdrop-blur-sm rounded-lg shadow-sm">
            {hotel.tag}
          </span>
        )}

        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm hover:bg-white text-slate-600 dark:text-slate-300 hover:text-red-500 flex items-center justify-center shadow-md transform active:scale-90 hover:scale-105 transition-all duration-300"
          aria-label="Add to favorites"
        >
          {favorited ? (
            <HiHeart className="w-5 h-5 text-red-500 fill-current" />
          ) : (
            <HiOutlineHeart className="w-5 h-5" />
          )}
        </button>
      </div>

      <div className="p-5 flex flex-col flex-grow justify-between gap-4">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base leading-snug line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {hotel.name}
            </h3>
            <div className="flex items-center gap-1 shrink-0 bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-lg text-xs font-bold">
              <HiStar className="w-3.5 h-3.5 fill-current" />
              <span>{hotel.rating.toFixed(1)}</span>
            </div>
          </div>
          
          <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 text-slate-400 dark:text-slate-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            <span>{hotel.location}, India</span>
          </p>
        </div>

        <div className="flex items-baseline justify-between pt-3 border-t border-slate-50 dark:border-slate-800/60 mt-auto">
          <div>
            <span className="text-lg font-extrabold text-blue-600 dark:text-blue-400">
              {formatPrice(hotel.price)}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-medium"> / night</span>
          </div>
          <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold group-hover:underline flex items-center gap-0.5">
            Book Stay
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-2.5 h-2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
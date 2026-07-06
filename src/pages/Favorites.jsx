import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiHeart } from 'react-icons/hi2';
import { useFavorites } from '../context/FavoriteContext';
import HotelCard from '../components/HotelCard';

const Favorites = () => {
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">My Favorites</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {favorites.length === 1 
            ? 'You have 1 saved hotel' 
            : `You have ${favorites.length} saved hotels`}
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="max-w-md mx-auto text-center py-16 px-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm space-y-6">
          <div className="w-16 h-16 bg-red-50 dark:bg-red-950/30 text-red-500 rounded-full flex items-center justify-center mx-auto text-2xl font-black shadow-md shadow-red-500/10">
            ♥
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-black text-slate-800 dark:text-slate-100">No favorites saved yet</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
              Don't see your favorite hotel? Explore more hotels and save them to your list.
            </p>
          </div>

          <button
            onClick={() => navigate('/hotels')}
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 active:bg-blue-800 shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer"
          >
            Explore Hotels
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favorites.map((hotel) => (
            <div key={hotel.id}>
              <HotelCard hotel={hotel} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
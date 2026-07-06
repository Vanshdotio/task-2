import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('stayhub_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse favorites from localStorage', e);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('stayhub_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (hotel) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === hotel.id);
      if (exists) {
        return prev.filter((item) => item.id !== hotel.id);
      } else {
        return [...prev, hotel];
      }
    });
  };

  const isFavorite = (id) => {
    return favorites.some((item) => item.id === id);
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoriteProvider');
  }
  return context;
};

export default FavoriteContext;
import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { HiHeart, HiOutlineHeart, HiSun, HiMoon, HiBars3, HiXMark } from 'react-icons/hi2';
import { useFavorites } from '../context/FavoriteContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { favorites } = useFavorites();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHome = location.pathname === '/';

  const linkClass = ({ isActive }) =>
    `relative py-2 text-sm font-semibold transition-all duration-300 ${
      isActive 
        ? 'text-blue-600 dark:text-blue-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600 dark:after:bg-blue-500 after:rounded-full' 
        : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-500'
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `block px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
      isActive 
        ? 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400' 
        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'
    }`;

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100/80 dark:border-slate-900/80 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <HiXMark className="w-6 h-6" />
              ) : (
                <HiBars3 className="w-6 h-6" />
              )}
            </button>

            <div 
              onClick={() => {
                navigate('/');
                setMobileMenuOpen(false);
              }} 
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="w-5 h-5"
                >
                  <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-2xl font-black tracking-tight text-slate-800 dark:text-slate-100">
                Stay<span className="text-blue-600">Hub</span>
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={linkClass}>Home</NavLink>
            <NavLink to="/hotels" className={linkClass}>Hotels</NavLink>
            <NavLink to="/about" className={linkClass}>About Us</NavLink>
            <NavLink to="/contact" className={linkClass}>Contact</NavLink>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? (
                <HiSun className="w-5 h-5 text-amber-400" />
              ) : (
                <HiMoon className="w-5 h-5" />
              )}
            </button>

            <NavLink 
              to="/fav" 
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => 
                `flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-300 ${
                  isActive 
                    ? 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400' 
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 dark:hover:bg-slate-900'
                }`
              }
            >
              {favorites.length > 0 ? (
                <HiHeart className="w-5 h-5 text-red-500 fill-current " />
              ) : (
                <HiOutlineHeart className="w-5 h-5" />
              )}
              <span className="text-sm font-semibold hidden sm:inline">Favorites</span>
              {favorites.length > 0 && (
                <span className="flex items-center justify-center min-w-5 h-5 px-1.5 text-xs font-black text-white bg-red-500 rounded-full shadow-sm shadow-red-500/20">
                  {favorites.length}
                </span>
              )}
            </NavLink>

            {isHome && (
              <button 
                onClick={() => navigate('/hotels')}
                className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 active:bg-blue-800 shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
              >
                Explore Hotels
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-4 space-y-2 shadow-inner transition-all duration-300">
          <NavLink to="/" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass}>Home</NavLink>
          <NavLink to="/hotels" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass}>Hotels</NavLink>
          <NavLink to="/about" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass}>About Us</NavLink>
          <NavLink to="/contact" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass}>Contact</NavLink>
        </div>
      )}
    </header>
  );
};

export default Navbar;
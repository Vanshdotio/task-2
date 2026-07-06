import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HiFunnel, HiChevronLeft, HiChevronRight, HiMagnifyingGlass, HiStar } from 'react-icons/hi2';
import useHotels from '../hooks/useHotels';
import HotelCard from '../components/HotelCard';
import Loader from '../components/Loader';

const Hotels = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { hotels, loading, error, fetchHotels } = useHotels();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [priceRange, setPriceRange] = useState(10000);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedCities, setSelectedCities] = useState(() => {
    const loc = searchParams.get('location');
    return loc ? [loc] : [];
  });
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [sortBy, setSortBy] = useState('recommended');
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const cities = ['Goa', 'Manali', 'Udaipur', 'Mumbai', 'Delhi', 'Jaipur'];
  const amenitiesList = ['Free Wi-Fi', 'Swimming Pool', 'Free Breakfast', 'Parking', 'Air Conditioning', 'Restaurant', 'Spa', 'Gym'];

  useEffect(() => {
    const loc = searchParams.get('location');
    if (loc) {
      setSelectedCities([loc]);
    } else {
      setSelectedCities([]);
    }
    const q = searchParams.get('search');
    if (q) setSearchQuery(q);
  }, [searchParams]);

  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);

  const handleCityToggle = (city) => {
    setSelectedCities(prev => {
      const updated = prev.includes(city)
        ? prev.filter(c => c !== city)
        : [...prev, city];
      
      const newParams = new URLSearchParams(searchParams);
      if (updated.length === 1) {
        newParams.set('location', updated[0]);
      } else {
        newParams.delete('location');
      }
      setSearchParams(newParams);
      return updated;
    });
    setCurrentPage(1);
  };

  const handleAmenityToggle = (amenity) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
    setCurrentPage(1);
  };

  const handleClearAll = () => {
    setSearchQuery('');
    setPriceRange(10000);
    setSelectedRating(null);
    setSelectedCities([]);
    setSelectedAmenities([]);
    setSortBy('recommended');
    setCurrentPage(1);
    setSearchParams(new URLSearchParams());
  };

  const filteredAndSortedHotels = useMemo(() => {
    let result = [...hotels];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(h => 
        h.name.toLowerCase().includes(q) || 
        h.location.toLowerCase().includes(q) ||
        (h.description && h.description.toLowerCase().includes(q))
      );
    }

    result = result.filter(h => h.price <= priceRange);

    if (selectedRating) {
      result = result.filter(h => h.rating >= selectedRating);
    }

    if (selectedCities.length > 0) {
      result = result.filter(h => 
        selectedCities.some(city => h.location.toLowerCase() === city.toLowerCase())
      );
    }

    if (selectedAmenities.length > 0) {
      result = result.filter(h => {
        const hotelAmenities = h.amenities || [];
        return selectedAmenities.every(a => 
          hotelAmenities.some(ha => ha.toLowerCase() === a.toLowerCase())
        );
      });
    }

    if (sortBy === 'price-low-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high-low') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [hotels, searchQuery, priceRange, selectedRating, selectedCities, selectedAmenities, sortBy]);

  const paginatedHotels = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedHotels.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedHotels, currentPage]);

  const totalPages = Math.max(1, Math.ceil(filteredAndSortedHotels.length / itemsPerPage));

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getPageNumbers = () => {
    const delta = 1;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l > 2) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-10">
        <aside className="w-full lg:w-72 shrink-0 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm h-fit space-y-8 lg:sticky lg:top-24">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-lg font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <HiFunnel className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Filters
            </h2>
            <button 
              onClick={handleClearAll}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors"
            >
              Clear All
            </button>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Price Range</h3>
            <div className="space-y-2">
              <input 
                type="range" 
                min="500" 
                max="10000" 
                step="500"
                value={priceRange}
                onChange={(e) => {
                  setPriceRange(parseInt(e.target.value, 10));
                  setCurrentPage(1);
                }}
                className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                <span>₹500</span>
                <span className="text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-950/30 px-2 py-0.5 rounded-md">
                  Up to ₹{priceRange.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Star Rating</h3>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => {
                    setSelectedRating(selectedRating === star ? null : star);
                    setCurrentPage(1);
                  }}
                  className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all duration-300 flex flex-col items-center justify-center gap-1 ${
                    selectedRating === star 
                      ? 'border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-500/10' 
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/20'
                  }`}
                >
                  <HiStar className={`w-3.5 h-3.5 ${selectedRating === star ? 'text-amber-300' : 'text-slate-450'}`} />
                  <span>{star}★</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">City</h3>
            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-2 scrollbar-thin">
              {cities.map((city) => (
                <label key={city} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox"
                    checked={selectedCities.includes(city)}
                    onChange={() => handleCityToggle(city)}
                    className="w-4.5 h-4.5 border-2 border-slate-300 dark:border-slate-700 rounded text-blue-600 focus:ring-blue-500/30 cursor-pointer accent-blue-600"
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors font-medium">
                    {city}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Amenities</h3>
            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-2 scrollbar-thin">
              {amenitiesList.map((amenity) => (
                <label key={amenity} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox"
                    checked={selectedAmenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                    className="w-4.5 h-4.5 border-2 border-slate-300 dark:border-slate-700 rounded text-blue-600 focus:ring-blue-500/30 cursor-pointer accent-blue-600"
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors font-medium">
                    {amenity}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        <div className="flex-grow min-w-0 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="relative w-full sm:w-80">
              <HiMagnifyingGlass className="absolute left-3 top-3 text-slate-400 w-5 h-5 pointer-events-none" />
              <input 
                type="text"
                placeholder="Search by hotel name or city..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-2xl pl-10 pr-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto shrink-0">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-505 uppercase tracking-wider">
                {filteredAndSortedHotels.length} Stays Found
              </span>
              
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-2xl px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="recommended">Sort by: Recommended</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating">Rating: High to Low</option>
              </select>
            </div>
          </div>

          {loading ? (
            <Loader />
          ) : error ? (
            <div className="bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 p-6 rounded-3xl border border-red-100 dark:border-red-900/50 text-center font-medium">
              Failed to load hotels: {error}. Please try again later.
            </div>
          ) : filteredAndSortedHotels.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm text-center space-y-4">
              <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-full flex items-center justify-center mx-auto text-2xl font-black">
                ?
              </div>
              <h3 className="text-lg font-black text-slate-800 dark:text-slate-100">No hotels found matching your filters</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Try adjusting your search criteria, raising your budget, or lowering your star rating requirements.
              </p>
              <button 
                onClick={handleClearAll}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl text-sm transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {paginatedHotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
              </div>
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2.5 pt-8">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="w-10 h-10 rounded-full shrink-0 border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 flex items-center justify-center text-slate-650 dark:text-slate-400 hover:border-blue-500 dark:hover:border-blue-500/50 hover:bg-blue-50 dark:hover:bg-slate-900 disabled:opacity-30 disabled:pointer-events-none transition-all duration-300 cursor-pointer"
                    aria-label="Previous Page"
                  >
                    <HiChevronLeft className="w-5 h-5" />
                  </button>

                  {getPageNumbers().map((pageNum, i) => {
                    if (pageNum === '...') {
                      return (
                        <span 
                          key={`ellipsis-${i}`} 
                          className="w-10 h-10 shrink-0 flex items-center justify-center text-slate-400 dark:text-slate-500 font-bold select-none"
                        >
                          ...
                        </span>
                      );
                    }
                    const isActive = currentPage === pageNum;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-10 h-10 rounded-full shrink-0 text-sm font-bold flex items-center justify-center transition-all duration-300 cursor-pointer ${
                          isActive
                            ? 'bg-blue-600 dark:bg-blue-500 text-white border border-transparent shadow-lg shadow-blue-500/20'
                            : 'border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 text-slate-655 dark:text-slate-400 hover:border-blue-500 dark:hover:border-blue-500/50 hover:bg-blue-50 dark:hover:bg-slate-900'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 rounded-full shrink-0 border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 flex items-center justify-center text-slate-655 dark:text-slate-400 hover:border-blue-500 dark:hover:border-blue-500/50 hover:bg-blue-50 dark:hover:bg-slate-900 disabled:opacity-30 disabled:pointer-events-none transition-all duration-300 cursor-pointer"
                    aria-label="Next Page"
                  >
                    <HiChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hotels;

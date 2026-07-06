import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { HiMapPin, HiCalendar, HiUsers, HiStar } from 'react-icons/hi2';
import HotelCard from '../components/HotelCard';
import { mockTestimonials, mockHotels } from '../api/mockData';

const Home = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2 Guests');

  const popularDestinations = [
    {
      name: 'Goa',
      count: '120+ Hotels',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Manali',
      count: '80+ Hotels',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Udaipur',
      count: '60+ Hotels',
      image: 'https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Kerala',
      count: '90+ Hotels',
      image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const featuredHotels = mockHotels.slice(0, 4);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.append('location', destination);
    if (checkIn) params.append('checkIn', checkIn);
    if (checkOut) params.append('checkOut', checkOut);
    if (guests) params.append('guests', guests);
    navigate(`/hotels?${params.toString()}`);
  };

  const handleDestinationClick = (name) => {
    navigate(`/hotels?location=${name}`);
  };

  return (
    <div className="space-y-20 pb-20">
      <section className="relative w-full min-h-[620px] md:h-[580px] py-20 md:py-0 flex items-center justify-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80" 
            alt="Hero background"
            className="w-full h-full object-cover opacity-50 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
              Find Your <span className="text-blue-500">Perfect Stay</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-200 max-w-2xl mx-auto font-medium">
              Discover and book amazing hotels at the best guaranteed prices.
            </p>
          </div>

          <form 
            onSubmit={handleSearch}
            className="w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 sm:p-6 rounded-3xl shadow-2xl border border-white/20 dark:border-slate-800/50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end text-left transform translate-y-4"
          >
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Where are you going?</label>
              <div className="relative">
                <HiMapPin className="absolute left-3 top-3.5 text-slate-400 w-5 h-5 pointer-events-none" />
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-2xl pl-10 pr-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
                >
                  <option value="">Destination</option>
                  <option value="Goa">Goa</option>
                  <option value="Manali">Manali</option>
                  <option value="Udaipur">Udaipur</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Jaipur">Jaipur</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Check-in</label>
              <div className="relative">
                <HiCalendar className="absolute left-3 top-3.5 text-slate-400 w-5 h-5 pointer-events-none" />
                <input 
                  type="date" 
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-2xl pl-10 pr-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Check-out</label>
              <div className="relative">
                <HiCalendar className="absolute left-3 top-3.5 text-slate-400 w-5 h-5 pointer-events-none" />
                <input 
                  type="date" 
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-2xl pl-10 pr-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Guests</label>
              <div className="relative">
                <HiUsers className="absolute left-3 top-3.5 text-slate-400 w-5 h-5 pointer-events-none" />
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-2xl pl-10 pr-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
                >
                  <option value="1 Guest">1 Guest</option>
                  <option value="2 Guests">2 Guests</option>
                  <option value="3 Guests">3 Guests</option>
                  <option value="4+ Guests">4+ Guests</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-3.5 px-6 rounded-2xl transition-all duration-300 shadow-lg shadow-blue-500/20 transform hover:-translate-y-0.5 active:translate-y-0 text-sm cursor-pointer"
            >
              Search Hotels
            </button>
          </form>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-450 flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-100 text-base mb-1">Best Price Guarantee</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Get the best prices on stays, or we\'ll match it and give you more.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-450 flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.172-.375.694-.375.866 0l2.091 4.386 4.67 1.01c.414.09.58.601.28.898l-3.328 3.24.89 4.757c.079.418-.363.74-.726.527l-4.22-2.288-4.22 2.288c-.362.213-.805-.109-.726-.527l.89-4.757-3.328-3.24c-.3-.297-.134-.807.28-.898l4.67-1.01 2.091-4.386Z" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-100 text-base mb-1">Handpicked Hotels</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Curated top-quality boutique hotels and luxury resorts for you.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-450 flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-100 text-base mb-1">24/7 Customer Support</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Our support team is here to assist you and guide you at any time.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Popular Destinations</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Explore our most popular travel spots</p>
          </div>
          <Link to="/hotels" className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 hover:underline transition-colors">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {popularDestinations.map((dest) => (
            <div 
              key={dest.name}
              onClick={() => handleDestinationClick(dest.name)}
              className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 bg-slate-900"
            >
              <img 
                src={dest.image} 
                alt={dest.name}
                loading="lazy"
                className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/10 to-transparent"></div>
              <div className="absolute bottom-5 left-5 text-white">
                <h3 className="text-lg font-extrabold tracking-tight">{dest.name}</h3>
                <p className="text-xs text-slate-200 mt-0.5">{dest.count}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Featured Hotels</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Our best recommendations for your premium comfort</p>
          </div>
          <Link to="/hotels" className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 hover:underline transition-colors">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredHotels.map((hotel) => (
            <div key={hotel.id} className="h-full">
              <HotelCard hotel={hotel} />
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 min-h-[220px] py-6 sm:py-0 flex items-center shadow-lg">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80" 
              alt="Promo offer banner"
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-slate-900/90 to-transparent"></div>
          </div>

          <div className="relative z-10 p-8 sm:p-12 max-w-lg space-y-4">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-bold uppercase tracking-wider rounded-full">
              Limited Time Offer
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              Get up to 30% OFF on your first booking
            </h3>
            <button 
              onClick={() => navigate('/hotels')}
              className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-2.5 px-6 rounded-xl text-sm transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 shadow-md shadow-blue-500/20 cursor-pointer"
            >
              Grab Offer
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">What Our Guests Say</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Read reviews from our global travelers who stayed with us</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockTestimonials.map((review) => (
            <div 
              key={review.id}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300 text-slate-600 dark:text-slate-350"
            >
              <div className="space-y-4">
                <div className="flex text-amber-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <HiStar key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-50 dark:border-slate-800/80">
                <img 
                  src={review.avatar} 
                  alt={review.name} 
                  className="w-10 h-10 rounded-full object-cover border border-slate-100 dark:border-slate-800"
                />
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">{review.name}</h4>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Traveler, {review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
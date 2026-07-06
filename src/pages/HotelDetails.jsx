import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { HiArrowLeft, HiStar, HiMapPin, HiCheck, HiXMark } from 'react-icons/hi2';
import { FaWifi, FaSwimmingPool, FaUtensils, FaSpa, FaDumbbell, FaParking, FaSnowflake } from 'react-icons/fa';
import { useHotels } from '../hooks/useHotels';
import { useFavorites } from '../context/FavoriteContext';
import Loader from '../components/Loader';

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getHotelById } = useHotels();
  const { toggleFavorite, isFavorite } = useFavorites();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [readMore, setReadMore] = useState(false);

  const [checkIn, setCheckIn] = useState('2025-05-20');
  const [checkOut, setCheckOut] = useState('2025-05-22');
  const [guests, setGuests] = useState('2 Guests');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const data = await getHotelById(id);
        setHotel(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch hotel details');
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id, getHotelById]);

  const isFav = hotel ? isFavorite(hotel.id) : false;

  const baseRate = hotel ? hotel.price : 0;
  const getNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = end - start;
    if (diffTime <= 0) return 0;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  const nights = getNights();
  const basePrice = baseRate * nights;
  const taxesAndFees = Math.round(basePrice * 0.12);
  const totalPrice = basePrice + taxesAndFees;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const getCancellationDate = () => {
    if (!checkIn) return 'before check-in';
    const date = new Date(checkIn);
    if (isNaN(date.getTime())) return 'before check-in';
    date.setDate(date.getDate() - 2);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    return `before ${day} ${month}`;
  };

  const getAmenityIcon = (name) => {
    const n = name.toLowerCase();
    if (n.includes('wi-fi') || n.includes('wifi') || n.includes('internet')) return <FaWifi className="w-5 h-5" />;
    if (n.includes('pool') || n.includes('swim')) return <FaSwimmingPool className="w-5 h-5" />;
    if (n.includes('breakfast') || n.includes('dining') || n.includes('restaurant') || n.includes('food')) return <FaUtensils className="w-5 h-5" />;
    if (n.includes('parking')) return <FaParking className="w-5 h-5" />;
    if (n.includes('ac') || n.includes('air conditioning')) return <FaSnowflake className="w-5 h-5" />;
    if (n.includes('spa') || n.includes('massage')) return <FaSpa className="w-5 h-5" />;
    if (n.includes('gym') || n.includes('fitness') || n.includes('workout')) return <FaDumbbell className="w-5 h-5" />;
    return <HiCheck className="w-5 h-5" />;
  };

  const handleBookNow = (e) => {
    e.preventDefault();
    if (nights <= 0) {
      alert('Please select valid check-in and check-out dates.');
      return;
    }
    setBookingSuccess(true);
  };

  if (loading) return <Loader fullPage />;
  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 p-6 rounded-3xl border border-red-100 dark:border-red-900/50 font-medium">
          {error}
        </div>
        <Link to="/hotels" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-450 font-bold hover:underline">
          <HiArrowLeft className="w-5 h-5" />
          Back to Hotels
        </Link>
      </div>
    );
  }

  if (!hotel) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate('/hotels')}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
        >
          <HiArrowLeft className="w-4 h-4" />
          Back to Hotels
        </button>
        <button
          onClick={() => toggleFavorite(hotel)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all duration-300 ${
            isFav 
              ? 'border-red-100 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 shadow-sm' 
              : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-900'
          }`}
        >
          <HiStar className={`w-4 h-4 ${isFav ? 'text-red-500 fill-current' : 'text-slate-450'}`} />
          {isFav ? 'Favorited' : 'Save to Favorites'}
        </button>
      </div>

      <section className="grid grid-cols-3 gap-2 sm:gap-4 rounded-3xl overflow-hidden shadow-md h-48 sm:h-72 md:h-[400px] lg:h-[450px]">
        <div className="col-span-2 h-full bg-slate-100 overflow-hidden relative group">
          <img 
            src={hotel.photos[0] || hotel.thumbnail} 
            alt={hotel.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
          />
        </div>
        <div className="flex flex-col gap-2 sm:gap-4 h-full">
          {[1, 2, 3].map((idx) => {
            const imgUrl = hotel.photos[idx] || hotel.thumbnail;
            const isLast = idx === 3;
            return (
              <div 
                key={idx} 
                className="flex-1 min-h-0 bg-slate-100 overflow-hidden relative group cursor-pointer"
              >
                <img 
                  src={imgUrl} 
                  alt={`${hotel.name} gallery ${idx}`} 
                  className={`absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${isLast ? 'blur-[3px]' : ''}`}
                />
                {isLast && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white font-bold text-lg sm:text-xl md:text-2xl">
                    +12
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2.5 items-center">
              <span className="px-3.5 py-1 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 rounded-lg uppercase tracking-wider">
                {hotel.tag || 'Luxury'}
              </span>
              <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-300">
                <HiStar className="w-5 h-5 text-amber-400 fill-current" />
                <span>{hotel.rating.toFixed(1)}</span>
                <span className="text-slate-400 dark:text-slate-500 font-normal">({hotel.reviewsCount || 120} Reviews)</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
              {hotel.name}
            </h1>

            <p className="text-sm font-semibold text-slate-500 dark:text-slate-455 flex items-center gap-1.5">
              <HiMapPin className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
              <span>{hotel.location}, Rajasthan, India</span>
            </p>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800 pt-8 space-y-3">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">About This Hotel</h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              {readMore 
                ? hotel.description 
                : `${hotel.description.slice(0, 180)}...`}
              {hotel.description.length > 180 && (
                <button
                  onClick={() => setReadMore(!readMore)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-bold ml-1.5 focus:outline-none hover:underline inline-block text-xs"
                >
                  {readMore ? 'Read Less' : 'Read More'}
                </button>
              )}
            </p>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800 pt-8 space-y-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Amenities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {(hotel.amenities || ["Free Wi-Fi", "Swimming Pool", "Restaurant", "Spa", "Gym", "Air Conditioning"]).map((amenity) => (
                <div 
                  key={amenity}
                  className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100/50 dark:border-slate-800 shadow-sm hover:bg-slate-100/30 dark:hover:bg-slate-900/60 transition-colors"
                >
                  <div className="text-blue-600 dark:text-blue-400 shrink-0">
                    {getAmenityIcon(amenity)}
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-300 font-semibold">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800 pt-8 space-y-6">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Guest Reviews</h2>
            
            <div className="flex flex-col sm:flex-row gap-8 items-center bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100/50 dark:border-slate-800">
              <div className="text-center sm:border-r sm:border-slate-200/80 dark:sm:border-slate-800 sm:pr-8 shrink-0">
                <span className="text-5xl font-black text-slate-800 dark:text-slate-100 leading-none">
                  {hotel.rating.toFixed(1)}
                </span>
                <div className="flex text-amber-400 justify-center my-1.5">
                  <HiStar className="w-5 h-5 fill-current" />
                  <HiStar className="w-5 h-5 fill-current" />
                  <HiStar className="w-5 h-5 fill-current" />
                  <HiStar className="w-5 h-5 fill-current" />
                  <HiStar className="w-5 h-5 fill-current" />
                </div>
                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Overall Rating</p>
              </div>

              <div className="flex-grow space-y-2.5 w-full">
                <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400">
                  <span>Location</span>
                  <div className="flex items-center gap-4 flex-grow max-w-xs ml-4">
                    <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full flex-grow overflow-hidden">
                      <div className="h-full bg-blue-600 dark:bg-blue-500 rounded-full" style={{ width: '96%' }}></div>
                    </div>
                    <span className="w-6 text-right text-slate-700 dark:text-slate-300">4.9</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400">
                  <span>Cleanliness</span>
                  <div className="flex items-center gap-4 flex-grow max-w-xs ml-4">
                    <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full flex-grow overflow-hidden">
                      <div className="h-full bg-blue-600 dark:bg-blue-500 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                    <span className="w-6 text-right text-slate-700 dark:text-slate-300">4.8</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400">
                  <span>Service</span>
                  <div className="flex items-center gap-4 flex-grow max-w-xs ml-4">
                    <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full flex-grow overflow-hidden">
                      <div className="h-full bg-blue-600 dark:bg-blue-500 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                    <span className="w-6 text-right text-slate-700 dark:text-slate-300">4.7</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-3 text-slate-600 dark:text-slate-350">
                <div className="flex items-center gap-3">
                  <img 
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80" 
                    alt="Aman" 
                    className="w-10 h-10 rounded-full object-cover border dark:border-slate-800"
                  />
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Aman Verma</h4>
                    <p className="text-slate-400 dark:text-slate-500 text-xs">2 days ago</p>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500 ml-auto text-xs font-bold">
                    <HiStar className="w-4 h-4 fill-current" />
                    <span>5.0</span>
                  </div>
                </div>
                <p className="text-sm leading-relaxed">
                  Amazing property! The staff was very cooperative and the food was excellent. Will definitely visit again.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl lg:sticky lg:top-24 overflow-hidden">
            <div className="bg-blue-600 dark:bg-blue-700 px-6 py-5 text-white">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black">{formatPrice(baseRate)}</span>
                <span className="text-sm font-medium opacity-90">/ night</span>
              </div>
            </div>

            <form onSubmit={handleBookNow} className="p-6 space-y-5 text-left">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Check-in</label>
                <input 
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Check-out</label>
                <input 
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Guests</label>
                <div className="relative">
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
                  >
                    <option value="1 Guest">1 Guest</option>
                    <option value="2 Guests">2 Guests</option>
                    <option value="3 Guests">3 Guests</option>
                    <option value="4+ Guests">4+ Guests</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-505 dark:text-slate-400">
                    <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={nights <= 0}
                  className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-slate-200 disabled:dark:bg-slate-800 disabled:text-slate-400 disabled:dark:text-slate-600 text-white font-bold py-3.5 px-6 rounded-2xl transition-all duration-300 shadow-lg shadow-blue-500/20 transform hover:-translate-y-0.5 active:translate-y-0 text-sm cursor-pointer text-center"
                >
                  Book Now
                </button>
                <p className="text-[11px] font-semibold text-slate-405 dark:text-slate-500 text-center mt-2.5">
                  You won't be charged yet
                </p>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-5 space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-500 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">Free Cancellation</h4>
                    <p className="text-xs text-slate-450 dark:text-slate-500 mt-0.5">{getCancellationDate()}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-500 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H12m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5H3a.75.75 0 0 1-.75-.75V15" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">No Booking Fees</h4>
                    <p className="text-xs text-slate-450 dark:text-slate-500 mt-0.5">pay at the property</p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {bookingSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-8 text-center shadow-2xl relative border border-slate-100 dark:border-slate-800 transform scale-100 transition-all duration-300">
            <button 
              onClick={() => setBookingSuccess(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 p-1.5 rounded-full transition-colors"
            >
              <HiXMark className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 dark:text-emerald-450 border border-emerald-100 dark:border-emerald-900/50 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-black shadow-md shadow-emerald-500/10">
              ✓
            </div>

            <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight mb-2">
              Booking Successful!
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-405 leading-relaxed mb-6">
              Thank you for booking with StayHub. Your reservation details have been sent to your email.
            </p>

            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 text-left text-xs font-bold text-slate-600 dark:text-slate-350 space-y-2 mb-6">
              <div className="flex justify-between">
                <span>Hotel:</span>
                <span className="text-slate-800 dark:text-slate-200">{hotel.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Location:</span>
                <span className="text-slate-800 dark:text-slate-200">{hotel.location}</span>
              </div>
              <div className="flex justify-between">
                <span>Check-in:</span>
                <span className="text-slate-800 dark:text-slate-200">{checkIn}</span>
              </div>
              <div className="flex justify-between">
                <span>Check-out:</span>
                <span className="text-slate-800 dark:text-slate-200">{checkOut}</span>
              </div>
              <div className="flex justify-between">
                <span>Guests:</span>
                <span className="text-slate-800 dark:text-slate-200">{guests}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200/60 dark:border-slate-800 pt-2 text-sm font-black text-slate-800 dark:text-slate-100">
                <span>Paid Total:</span>
                <span className="text-blue-600 dark:text-blue-450">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <button 
              onClick={() => {
                setBookingSuccess(false);
                navigate('/hotels');
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl text-sm transition-colors cursor-pointer"
            >
              Continue Exploring
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelDetails;
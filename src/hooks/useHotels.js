import { useState, useCallback } from 'react';
import axios from '../api/hotelApi';
import { mockHotels } from '../api/mockData';

export const useHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHotels = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const { location, search } = filters;
      let apiParams = {};

      const apiCities = ['Mumbai', 'Delhi', 'Ahmedabad', 'Jaipur', 'Hyderabad', 'Pune', 'Noida', 'Bengaluru', 'Gurgaon', 'Kolkata', 'Chennai', 'Goa'];
      
      let matchedApi = true;
      if (location) {
        if (apiCities.some(city => city.toLowerCase() === location.toLowerCase())) {
          apiParams.location = location;
        } else {
          matchedApi = false;
        }
      }

      if (search) {
        apiParams.search = search;
      }

      let apiHotels = [];
      if (matchedApi) {
        try {
          const response = await axios.get('/hotels', { params: apiParams });
          if (response.data && response.data.status === 200) {
            apiHotels = response.data.data.map(h => ({
              ...h,
              price: parseFloat(h.price),
              reviewsCount: Math.floor(Math.random() * 80) + 20,
              tag: h.rating >= 4.7 ? 'Luxury' : h.rating >= 4.5 ? 'Recommended' : 'Standard',
              photos: h.photos && h.photos.length > 0 ? h.photos : [h.thumbnail]
            }));
          }
        } catch (e) {
          console.warn(e);
        }
      }

      let filteredMocks = [...mockHotels];
      if (location) {
        filteredMocks = filteredMocks.filter(h => h.location.toLowerCase() === location.toLowerCase());
      }
      if (search) {
        const query = search.toLowerCase();
        filteredMocks = filteredMocks.filter(h => 
          h.name.toLowerCase().includes(query) || 
          h.location.toLowerCase().includes(query) ||
          (h.description && h.description.toLowerCase().includes(query))
        );
      }

      const combined = [...filteredMocks, ...apiHotels];
      
      const seen = new Set();
      const unique = combined.filter(h => {
        const key = `${h.name.toLowerCase()}_${h.location.toLowerCase()}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      setHotels(unique);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, []);

  const getHotelById = useCallback(async (id) => {
    const numId = parseInt(id, 10);
    if (numId >= 1000) {
      const mock = mockHotels.find(h => h.id === numId);
      if (mock) return mock;
      throw new Error('Hotel not found');
    }

    try {
      const response = await axios.get(`/hotels/${numId}`);
      if (response.data && response.data.status === 200) {
        const h = response.data.data;
        return {
          ...h,
          price: parseFloat(h.price),
          reviewsCount: Math.floor(Math.random() * 80) + 20,
          tag: h.rating >= 4.7 ? 'Luxury' : h.rating >= 4.5 ? 'Recommended' : 'Standard',
          photos: h.photos && h.photos.length > 0 ? h.photos : [h.thumbnail]
        };
      }
      throw new Error('Hotel not found');
    } catch (err) {
      const mock = mockHotels.find(h => h.id === numId);
      if (mock) return mock;
      throw new Error(err.response?.data?.message || err.message || 'Failed to fetch hotel details');
    }
  }, []);

  return {
    hotels,
    loading,
    error,
    fetchHotels,
    getHotelById
  };
};

export default useHotels;

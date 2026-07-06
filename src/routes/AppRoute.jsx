import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Hotels from '../pages/Hotels'
import HotelDetails from '../pages/HotelDetails'
import Favorites from '../pages/Favorites'
import AboutUs from '../pages/AboutUs'
import Contact from '../pages/Contact'
import NotFound from '../pages/NotFound'

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hotels" element={<Hotels />} />
      <Route path="/hotel/:id" element={<HotelDetails />} />
      <Route path="/fav" element={<Favorites />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoute
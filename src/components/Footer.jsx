import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa6';
import { HiMapPin, HiPhone, HiEnvelope } from 'react-icons/hi2';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="w-4 h-4"
                >
                  <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">StayHub</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Your journey to the perfect stay begins here. Discover and book amazing hotels at the best guaranteed prices.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-blue-500 hover:underline transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/hotels" className="hover:text-blue-500 hover:underline transition-colors">Hotels</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-500 hover:underline transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-500 hover:underline transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Support</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#help" className="hover:text-blue-500 hover:underline transition-colors">Help Center</a>
              </li>
              <li>
                <a href="#terms" className="hover:text-blue-500 hover:underline transition-colors">Terms & Conditions</a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-blue-500 hover:underline transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#cancel" className="hover:text-blue-500 hover:underline transition-colors">Cancellation</a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <HiPhone className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span>12345677890</span>
              </li>
              <li className="flex items-start gap-2.5">
                <HiEnvelope className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span className="break-all">support@stayhub.com</span>
              </li>
              <li className="flex items-start gap-2.5">
                <HiMapPin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span>123, MG Road, New Delhi, India</span>
              </li>
            </ul>
            <div className="flex gap-4 pt-2">
              <a href="#fb" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all duration-300">
                <FaFacebook className="w-4.5 h-4.5" />
              </a>
              <a href="#tw" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-400 hover:text-white flex items-center justify-center transition-all duration-300">
                <FaTwitter className="w-4.5 h-4.5" />
              </a>
              <a href="#ig" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-pink-600 hover:text-white flex items-center justify-center transition-all duration-300">
                <FaInstagram className="w-4.5 h-4.5" />
              </a>
              <a href="#li" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-700 hover:text-white flex items-center justify-center transition-all duration-300">
                <FaLinkedin className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/80 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} StayHub. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
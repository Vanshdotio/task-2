import React, { useState } from 'react';
import { HiPhone, HiEnvelope, HiMapPin, HiClock, HiCheck } from 'react-icons/hi2';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('Please fill out all required fields.');
      return;
    }
    setSubmitted(true);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Contact Us</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Get in touch with us for booking support, queries, or assistance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Get in Touch</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Have questions? We're here to help.</p>
          </div>

          {submitted && (
            <div className="bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-400 p-4 rounded-2xl border border-emerald-100/50 dark:border-emerald-900/50 flex items-start gap-3 text-sm font-semibold animate-fade-in">
              <HiCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Message sent successfully!</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-500 font-medium mt-0.5">We will respond to your query within 24 business hours.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Your Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 dark:text-slate-505 uppercase tracking-wider block">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-505 uppercase tracking-wider block">Subject</label>
              <input 
                type="text" 
                placeholder="Enter subject of query"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-505 uppercase tracking-wider block">Your Message</label>
              <textarea 
                rows="5"
                required
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-blue-500 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all duration-300 shadow-md shadow-blue-500/20 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-5">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg">Contact Information</h3>
            
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-450 flex items-center justify-center shrink-0">
                  <HiPhone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Phone Number</span>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">12345677890</span>
                </div>
              </li>

              <li className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-450 flex items-center justify-center shrink-0">
                  <HiEnvelope className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Email Address</span>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200 break-all">support@stayhub.com</span>
                </div>
              </li>

              <li className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-450 flex items-center justify-center shrink-0">
                  <HiMapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Office Location</span>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">123, MG Road, New Delhi, India</span>
                </div>
              </li>

              <li className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-450 flex items-center justify-center shrink-0">
                  <HiClock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Working Hours</span>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Mon - Sun : 9:00 AM - 9:00 PM</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="relative rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-sm h-64">
            <iframe 
              title="office-map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d154445.83060285918!2d77.12345!3d28.56789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347ec62f%3A0x500df74b88f346!2sDelhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              className="w-full h-full border-none grayscale contrast-125 opacity-80 dark:invert dark:opacity-75"
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="absolute inset-0 pointer-events-none border-2 border-blue-600/10 dark:border-blue-500/10 rounded-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

import React from 'react';
import { HiShieldCheck } from 'react-icons/hi2';

const AboutUs = () => {
  const stats = [
    { value: '1200+', label: 'Hotels Worldwide' },
    { value: '200+', label: 'Top Destinations' },
    { value: '50K+', label: 'Happy Customers' },
    { value: '4.8', label: 'Average Rating' }
  ];

  const features = [
    {
      title: 'Best Price Guarantee',
      desc: 'We assure you get the best prices. If you find a cheaper rate elsewhere, we\'ll match it.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-1.958-.559-1.171-.88-1.171-2.303 0-3.182 1.172-.879 3.07-.879 4.242 0L15 9M4.125 12h15.75" />
        </svg>
      )
    },
    {
      title: 'Handpicked Hotels',
      desc: 'Our curated select hotels are verified for cleanliness, safety, comfort, and premium standards.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.172-.375.694-.375.866 0l2.091 4.386 4.67 1.01c.414.09.58.601.28.898l-3.328 3.24.89 4.757c.079.418-.363.74-.726.527l-4.22-2.288-4.22 2.288c-.362.213-.805-.109-.726-.527l.89-4.757-3.328-3.24c-.3-.297-.134-.807.28-.898l4.67-1.01 2.091-4.386Z" />
        </svg>
      )
    },
    {
      title: '24/7 Customer Support',
      desc: 'Our support team works around the clock to help resolve booking issues or answer questions.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
        </svg>
      )
    },
    {
      title: 'Secure Booking',
      desc: 'Your payment details are protected by industry-standard encryption protocols.',
      icon: <HiShieldCheck className="w-6 h-6" />
    }
  ];

  return (
    <div className="space-y-16 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <section className="relative rounded-3xl overflow-hidden bg-slate-900 h-[280px] flex items-center shadow-lg">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80" 
            alt="About us banner"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/60 to-transparent"></div>
        </div>

        <div className="relative z-10 p-8 sm:p-12 max-w-2xl space-y-4">
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">About StayHub</h1>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-medium">
            StayHub is your trusted travel companion, helping you discover and book the perfect stays around the world at the best prices.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div 
            key={idx}
            className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm text-center space-y-1 hover:shadow-md transition-shadow duration-300"
          >
            <span className="text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-450 block">{stat.value}</span>
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">{stat.label}</span>
          </div>
        ))}
      </section>

      <section className="space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Why Choose Us</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">We make booking hotels seamless, budget-friendly, and secure</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => (
            <div 
              key={idx}
              className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-450 flex items-center justify-center">
                  {feat.icon}
                </div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base">{feat.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;

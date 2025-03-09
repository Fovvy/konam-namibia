'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const heroBackgrounds = [
  {
    image: '/images/hero/IMG-20250217-WA0045.jpg',
    title: 'Namibian Adventures',
    subtitle: '나미비아의 경이로움을 발견하세요',
    description: 'Explore the vast Namib Desert and experience unforgettable moments with our tailored Korean tour packages.',
  },
  {
    image: '/images/hero/IMG-20250217-WA0041.jpg',
    title: 'Coastal Beauty',
    subtitle: '해안의 아름다움',
    description: 'Witness breathtaking sunsets where the Namib Desert meets the Atlantic Ocean along Namibia\'s spectacular coastline.',
  },
  {
    image: '/images/hero/WhatsApp Image 2025-02-17 at 13.48.46_668fafba.jpg',
    title: 'Safari Adventures',
    subtitle: '사파리 모험',
    description: 'Get up close with the amazing wildlife of Namibia at Etosha National Park and other wilderness areas.',
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [arrivalDate, setArrivalDate] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const router = useRouter();

  // References to date inputs with proper typing
  const arrivalInputRef = useRef<HTMLInputElement>(null);
  const departureInputRef = useRef<HTMLInputElement>(null);

  // Auto-rotate slides
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    const intervalId = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroBackgrounds.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleBookNow = (e: React.FormEvent) => {
    e.preventDefault();
    if (arrivalDate && departureDate) {
      router.push(`/bookings?startDate=${arrivalDate}&endDate=${departureDate}`);
    }
  };

  // Text animation variants
  const textVariants = {
    hidden: { 
      opacity: 0,
      x: -50,
      clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" 
    },
    visible: { 
      opacity: 1,
      x: 0,
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      x: 50,
      clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
      transition: {
        duration: 0.7,
        ease: "easeIn"
      }
    }
  };

  return (
    <div className="relative h-screen overflow-hidden bg-navy-900">
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        >
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${heroBackgrounds[currentSlide].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Hero Content - Safari Style Text */}
      <div className="absolute inset-0 flex items-center justify-start">
        <div className="text-white z-10 pl-8 md:pl-16 lg:pl-24 max-w-3xl ml-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mb-12"
            >
              <motion.h2 
                className="text-4xl md:text-5xl font-bold mb-3 font-serif"
                variants={textVariants}
                style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }}
              >
                <span className="text-orange-500">
                  {heroBackgrounds[currentSlide].title.split(' ')[0]}
                </span>{' '}
                <span className="text-white">
                  {heroBackgrounds[currentSlide].title.split(' ').slice(1).join(' ')}
                </span>
              </motion.h2>
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-4 text-white font-serif tracking-wide"
                variants={textVariants}
                transition={{ delay: 0.1 }}
                style={{
                  WebkitTextStroke: '1.5px white',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                }}
              >
                {heroBackgrounds[currentSlide].subtitle}
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl mb-8 font-light leading-relaxed"
                variants={textVariants}
                transition={{ delay: 0.2 }}
                style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' }}
              >
                {heroBackgrounds[currentSlide].description}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* Mini Date Submission Form */}
          <form 
            onSubmit={handleBookNow}
            className="flex flex-col md:flex-row gap-5 mb-6 bg-white/15 p-6 rounded-lg backdrop-blur-sm w-full md:w-auto"
          >
            <div className="flex flex-col w-full md:w-auto">
              <label htmlFor="arrivalDate" className="flex items-center gap-2 text-base mb-2 text-white font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="white">
                  <path d="M2.5 19h19v2h-19v-2zm7.18-5.73l4.35 1.16 5.31 1.42c.8.21 1.62-.26 1.84-1.06.21-.8-.26-1.62-1.06-1.84l-5.31-1.42-2.76-9.02L10.12 2v8.28L5.15 8.95l-.93-2.32-1.45-.39v5.17l1.6.43 5.31 1.43z" />
                </svg>
                Arrival Date
              </label>
              <div className="relative">
                <input
                  id="arrivalDate"
                  ref={arrivalInputRef}
                  type="date"
                  value={arrivalDate}
                  onChange={(e) => setArrivalDate(e.target.value)}
                  className="p-3 rounded-md bg-navy-900/50 text-white w-full md:w-52 border border-white/30 placeholder-white"
                  placeholder="mm/dd/yyyy"
                  required
                  style={{
                    colorScheme: 'dark',
                    color: 'white'
                  }}
                />
              </div>
            </div>
            
            <div className="flex flex-col w-full md:w-auto">
              <label htmlFor="departureDate" className="flex items-center gap-2 text-base mb-2 text-white font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="white">
                  <path d="M2.5 19h19v2h-19v-2zm19.57-9.36c-.21-.8-1.04-1.28-1.84-1.06L14.92 10l-6.9-6.43-1.93.51 4.14 7.17-4.97 1.33-1.97-1.54-1.45.39 2.59 4.49s7.12-1.9 16.57-4.43c.81-.23 1.28-1.05 1.07-1.85z" />
                </svg>
                Departure Date
              </label>
              <div className="relative">
                <input
                  id="departureDate"
                  ref={departureInputRef}
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="p-3 rounded-md bg-navy-900/50 text-white w-full md:w-52 border border-white/30 placeholder-white" 
                  placeholder="mm/dd/yyyy"
                  required
                  style={{
                    colorScheme: 'dark',
                    color: 'white'
                  }}
                />
              </div>
            </div>
            
            <div className="flex items-end">
              <button 
                type="submit" 
                className="bg-orange-500 hover:bg-orange-600 w-full md:w-auto transition-colors text-white font-bold py-3 px-10 rounded-md text-lg"
              >
                Book Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const heroBackgrounds = [
  {
    image: '/images/namibia-desert.jpg',
    title: 'Experience Namibia',
    subtitle: '나미비아의 경이로움을 발견하세요',
    description: 'Explore the vast deserts, wildlife, and culture of Namibia with our tailored Korean tour packages.',
  },
  {
    image: '/images/etosha-wildlife.jpg',
    title: 'Safari Adventures',
    subtitle: '사파리 모험',
    description: 'Get up close with the amazing wildlife of Namibia at Etosha National Park.',
  },
  {
    image: '/images/sossusvlei.jpg',
    title: 'Desert Wonders',
    subtitle: '사막의 놀라움',
    description: 'Experience the breathtaking beauty of Sossusvlei and the famous red dunes.',
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [arrivalDate, setArrivalDate] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const router = useRouter();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % heroBackgrounds.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleBookNow = (e: React.FormEvent) => {
    e.preventDefault();
    if (arrivalDate && departureDate) {
      router.push(`/bookings?startDate=${arrivalDate}&endDate=${departureDate}`);
    }
  };

  return (
    <div className="relative h-[85vh] overflow-hidden">
      {/* Background Images */}
      {heroBackgrounds.map((bg, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* This is a placeholder - in a real app, you would have your actual images */}
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${bg.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>
      ))}

      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container-custom text-center text-white z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-2">
              {heroBackgrounds[currentSlide].title}
            </h1>
            <h2 className="text-2xl md:text-3xl mb-4 korean-text">
              {heroBackgrounds[currentSlide].subtitle}
            </h2>
            <p className="text-xl md:text-2xl mb-6 max-w-2xl mx-auto">
              {heroBackgrounds[currentSlide].description}
            </p>

            {/* Mini Date Submission Form */}
            <form 
              onSubmit={handleBookNow}
              className="flex flex-col md:flex-row gap-4 justify-center items-center mb-6 max-w-xl mx-auto bg-black/30 p-4 rounded-lg"
            >
              <div className="flex flex-col w-full md:w-auto">
                <label htmlFor="arrivalDate" className="flex items-center gap-2 text-sm mb-1 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Arrival Date
                </label>
                <input
                  id="arrivalDate"
                  type="date"
                  value={arrivalDate}
                  onChange={(e) => setArrivalDate(e.target.value)}
                  className="p-2 rounded-md text-gray-900 w-full md:w-40"
                  required
                />
              </div>
              
              <div className="flex flex-col w-full md:w-auto">
                <label htmlFor="departureDate" className="flex items-center gap-2 text-sm mb-1 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-4 4L5 7" />
                  </svg>
                  Departure Date
                </label>
                <input
                  id="departureDate"
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="p-2 rounded-md text-gray-900 w-full md:w-40"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md transition-colors mt-4 md:mt-6 w-full md:w-auto"
              >
                Book Now
              </button>
            </form>

            <div className="flex gap-4 justify-center">
              <Link href="/tours" className="btn-primary">
                Explore Tours
              </Link>
              <Link href="/enquiry" className="btn-secondary">
                Make an Enquiry
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hero Navigation Dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
        {heroBackgrounds.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;

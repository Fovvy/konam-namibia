'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % heroBackgrounds.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

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
            <h2 className="text-2xl md:text-3xl mb-6 korean-text">
              {heroBackgrounds[currentSlide].subtitle}
            </h2>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              {heroBackgrounds[currentSlide].description}
            </p>
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

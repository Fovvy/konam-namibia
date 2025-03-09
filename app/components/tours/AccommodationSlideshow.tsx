'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Mock accommodation images - in a real app these would come from your API/database
const mockAccommodationImages = {
  "tour-namibia-highlights": [
    "/tour images/WhatsApp Image 2025-02-17 at 13.24.50_b8771e48.jpg",
    "/tour images/WhatsApp Image 2025-02-17 at 13.25.19_1aefbd71.jpg"
  ],
  "tour-wildlife-safari": [
    "/tour images/WhatsApp Image 2025-02-17 at 17.34.27_1e98e53f.jpg",
    "/tour images/WhatsApp Image 2025-02-17 at 17.37.26_07563719.jpg"
  ],
  "tour-desert-explorer": [
    "/tour images/WhatsApp Image 2025-02-17 at 17.37.27_39187e59.jpg",
    "/tour images/WhatsApp Image 2025-02-17 at 17.43.09_29dda68e.jpg"
  ],
  "tour-cultural-experience": [
    "/tour images/WhatsApp Image 2025-02-17 at 17.34.28_10873bed.jpg",
    "/tour images/WhatsApp Image 2025-02-17 at 17.34.28_53d154e4.jpg"
  ],
  "tour-photography": [
    "/tour images/WhatsApp Image 2025-02-17 at 17.37.27_c4c007d8.jpg",
    "/tour images/WhatsApp Image 2025-02-17 at 17.37.29_c59ad7d6.jpg"
  ],
  // Default images if no specific ones are found for a tour
  "default": [
    "/tour images/WhatsApp Image 2025-02-17 at 13.24.55_edb8941d.jpg",
    "/tour images/WhatsApp Image 2025-02-17 at 13.25.20_989d0ddd.jpg"
  ]
};

interface AccommodationSlideshowProps {
  tourId: string;
  accommodationName: string;
}

const AccommodationSlideshow: React.FC<AccommodationSlideshowProps> = ({ 
  tourId,
  accommodationName
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Get images for this tour, or use default if none exist
  const images = mockAccommodationImages[tourId] || mockAccommodationImages.default;
  
  // Auto-rotate slides
  useEffect(() => {
    if (images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <div className="relative h-60 w-full overflow-hidden rounded-lg shadow-md">
      {/* Caption showing the accommodation name */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/70 to-transparent z-10 px-4 py-2">
        <h4 className="text-white font-medium text-sm">{accommodationName}</h4>
      </div>
      
      {/* Indicators */}
      <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-1">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white scale-110'
                : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={images[currentSlide]}
            alt={`${accommodationName} - image ${currentSlide + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AccommodationSlideshow;

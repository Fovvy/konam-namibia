'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface AutoCarouselProps {
  logos: { src: string; alt: string; url: string }[];
  speed?: number;
  title?: string;
}

const AutoCarousel: React.FC<AutoCarouselProps> = ({ 
  logos, 
  speed = 20, 
  title = "Our Partners"
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const scrollWidth = containerRef.current?.scrollWidth || 0;
    const clientWidth = containerRef.current?.clientWidth || 0;
    
    // Only apply animation if content is wider than container
    if (scrollWidth > clientWidth) {
      const duration = scrollWidth / speed;
      
      const styleSheet = document.createElement('style');
      styleSheet.innerHTML = `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(${-scrollWidth / 2}px); }
        }
      `;
      document.head.appendChild(styleSheet);
      
      return () => {
        document.head.removeChild(styleSheet);
      };
    }
  }, [speed]);

  return (
    <div className="py-12 bg-gray-50">
      <div className="container-custom mb-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-8 text-[var(--text-primary)]"
        >
          {title}
        </motion.h2>
      </div>
      
      <div className="overflow-hidden relative">
        <div
          ref={containerRef}
          className="flex items-center space-x-12 py-4 animate-[scroll_20s_linear_infinite]"
          style={{
            width: 'fit-content',
          }}
        >
          {logos.concat(logos).map((logo, index) => (
            <a
              key={index}
              href={logo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 transition-transform hover:scale-110 grayscale hover:grayscale-0"
            >
              <div className="h-16 w-32 relative">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  style={{objectFit: 'contain'}}
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AutoCarousel;

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../../styles/flags.css';

// Flag animation component with welcome message
const KoreaNamibiaConnection: React.FC = () => {
  const [ref] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
      {/* Floating sparkles and dots */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-blue-300 opacity-70"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 z-10 relative">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Welcome to KoNam Tours
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Where Korean and Namibian cultures unite to create unforgettable travel experiences
          </p>
        </motion.div>

        <div className="flags-container">
          {/* Fixed Korean Flag */}
          <div className="flag-wrapper">
            <div className="flag korea-flag"></div>
          </div>

          {/* Fixed Namibian Flag */}
          <div className="flag-wrapper">
            <div className="flag namibia-flag"></div>
          </div>
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-center mt-12 welcome-description"
        >
          <p className="text-gray-700 text-lg mx-auto max-w-4xl">
            Experience the magic of two nations in one journey - providing you with an authentic and enriching travel
            experience that you&apos;ll cherish forever!
          </p>
        </motion.p>
      </div>
    </section>
  );
};

export default KoreaNamibiaConnection;

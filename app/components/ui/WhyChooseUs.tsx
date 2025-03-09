import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../../styles/flags.css';

// Flag animation component with welcome message
const KoreaNamibiaConnection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section className="bg-gray-50 py-20 px-4 overflow-hidden">
      <div className="container mx-auto max-w-7xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 mb-4">
            Welcome to KoNam Tours
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
            Bringing the beauty of Korea and Namibia together for an unforgettable experience
          </p>
        </motion.div>

        <div className="flag-container">
          {/* Korean Flag */}
          <div className="flag-wrapper korea">
            <div className="flag-inner">
              <div className="circle"></div>
              <div className="trigram trigram__1">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
              </div>
              <div className="trigram trigram__2">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
              </div>
              <div className="trigram trigram__3">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
              </div>
              <div className="trigram trigram__4">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
              </div>
            </div>
          </div>

          {/* Namibian Flag */}
          <div className="flag-wrapper namibia">
            <div className="flag-inner">
              <div className="top-triangle"></div>
              <div className="bottom-triangle"></div>
              <div className="diagonal-stripe"></div>
              <div className="white-stripes">
                <div className="stripe"></div>
                <div className="stripe"></div>
              </div>
              <div className="sun">
                <div className="ray"></div>
                <div className="ray"></div>
                <div className="ray"></div>
                <div className="ray"></div>
                <div className="ray"></div>
                <div className="ray"></div>
                <div className="ray"></div>
                <div className="ray"></div>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16 welcome-description"
        >
          <p className="text-gray-700 text-lg mx-auto max-w-4xl">
            Experience the best of both worlds with our exclusive travel packages tailored 
            for adventurers seeking unique cultural experiences. Our team of experts will guide
            you through unforgettable journeys in Korea and Namibia.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="text-3xl text-orange-500 mb-4">🌟</div>
              <h3 className="text-xl font-semibold mb-2">Expert Local Guides</h3>
              <p className="text-gray-600">Discover hidden gems with our experienced local guides who speak your language</p>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="text-3xl text-orange-500 mb-4">🏨</div>
              <h3 className="text-xl font-semibold mb-2">Premium Accommodations</h3>
              <p className="text-gray-600">Stay in carefully selected hotels and lodges that offer comfort and authentic experiences</p>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="text-3xl text-orange-500 mb-4">⭐</div>
              <h3 className="text-xl font-semibold mb-2">Customized Experiences</h3>
              <p className="text-gray-600">Tailor your journey to match your interests, whether it's culture, wildlife, or adventure</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default KoreaNamibiaConnection;

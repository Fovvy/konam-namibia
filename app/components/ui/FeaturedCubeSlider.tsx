'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCube, Autoplay } from 'swiper/modules';
import { TourPackage } from '../../lib/types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cube';

interface FeaturedCubeSliderProps {
  tours: TourPackage[];
}

const FeaturedCubeSlider: React.FC<FeaturedCubeSliderProps> = ({ tours }) => {
  return (
    <section className="featured-cube-slider relative py-16 lg:py-24 overflow-hidden bg-navy-900">
      {/* African-themed pattern background */}
      <div className="absolute inset-0 bg-[#0A1128] overflow-hidden">
        {/* African pattern overlay */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `url('/images/patterns/african-pattern.png')`,
            backgroundSize: '300px',
            backgroundRepeat: 'repeat',
            opacity: 0.15
          }}
        ></div>
        
        {/* African symbolic elements instead of circles */}
        <div className="absolute w-full h-full">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i}
              className="absolute"
              style={{
                width: `${Math.random() * 50 + 30}px`,
                height: `${Math.random() * 50 + 30}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundImage: `url('/images/patterns/african-symbol-${(i % 5) + 1}.svg')`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                animation: `float ${Math.random() * 15 + 20}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: 0.2,
                zIndex: 1
              }}
            />
          ))}
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(30px, -50px) rotate(120deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(240deg);
          }
          100% {
            transform: translate(0, 0) rotate(360deg);
          }
        }
      `}</style>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 lg:gap-20">
          {/* Content Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="content text-white order-2 md:order-1 text-center md:text-left"
          >
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold mb-4 text-white">Let&#39;s Travel the World Together</h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Experience Namibia&#39;s wonders through our carefully crafted tour packages
              </p>
            </div>
            <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl mb-4 md:mb-6">Let&#39;s Travel The World Together!</h1>
            <p className="text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto md:mx-0">
              Our tours are designed to transport you to the heart of Namibia&#39;s
              most captivating destinations, creating memories that will last a
              lifetime. You can uncover the hidden gems, iconic landmarks, and
              unique cultural treasures that make each destination special.
            </p>
            <Link href="/tours" className="inline-block bg-white text-[var(--korean-blue)] px-6 md:px-8 py-2 md:py-3 rounded-md font-bold hover:bg-[var(--accent)] hover:scale-95 transition-all duration-300">
              Explore Tours
            </Link>
          </motion.div>

          {/* Slider Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="order-1 md:order-2"
          >
            <Swiper
              effect={'cube'}
              grabCursor={true}
              loop={true}
              speed={1000}
              cubeEffect={{
                shadow: false,
                slideShadows: true,
                shadowOffset: 10,
                shadowScale: 0.94,
              }}
              autoplay={{
                delay: 2600,
                pauseOnMouseEnter: true,
              }}
              modules={[EffectCube, Autoplay]}
              className="mx-auto"
            >
              {tours.slice(0, 4).map((tour) => (
                <SwiperSlide key={tour.id} className="rounded-xl overflow-hidden border border-white/30">
                  <div className="relative w-full" style={{ aspectRatio: '1 / 1.2' }}>
                    <Image
                      src={tour.image}
                      alt={tour.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 470px) 350px, (max-width: 1050px) 400px, 500px"
                    />
                    <div className="cost absolute top-3 right-3 bg-black/50 backdrop-blur-md rounded-full px-4 py-2 text-white font-medium text-sm md:text-base">
                      from ${tour.price} per adult
                    </div>
                    <div className="overlay absolute bottom-0 left-0 w-full h-[150px] md:h-[180px] bg-black/70 backdrop-blur-md border-t border-white/30 p-4 md:p-6 rounded-b-xl flex flex-col justify-center">
                      <h1 className="text-xl md:text-2xl font-semibold text-white mb-2">{tour.title}</h1>
                      <p className="text-sm md:text-base text-white mb-3 line-clamp-2">{tour.description}</p>
                      <div className="ratings flex items-center gap-2 md:gap-3">
                        <div className="stars flex">
                          {[...Array(5)].map((_, i) => (
                            <svg 
                              key={i} 
                              xmlns="http://www.w3.org/2000/svg" 
                              className={`h-4 w-4 md:h-5 md:w-5 ${i < 4 ? 'text-[#ffe234]' : 'text-gray-400'}`}
                              fill="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm md:text-base text-white/90">{Math.floor(Math.random() * 500) + 100} reviews</span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCubeSlider; 
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
      {/* Simple navy background */}
      <div className="absolute inset-0 bg-[#0A1128] overflow-hidden">
        {/* Bouncing balls effect */}
        <div className="absolute w-full h-full">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${Math.random() * 40 + 20}px`,
                height: `${Math.random() * 40 + 20}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: `rgba(255, 255, 255, ${Math.random() * 0.2 + 0.1})`,
                animation: `bounce ${Math.random() * 10 + 15}s ease-in-out infinite alternate`,
                animationDelay: `${Math.random() * 5}s`,
                zIndex: 1
              }}
            />
          ))}
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes bounce {
          0% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-30px) translateX(20px);
          }
          50% {
            transform: translateY(20px) translateX(-20px);
          }
          75% {
            transform: translateY(-10px) translateX(10px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }
      `}</style>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 lg:gap-20">
          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="order-2 md:order-1"
          >
            <motion.div className="content text-white">
              <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl mb-4 md:mb-6">Let&#39;s Travel The World Together</h1>
              <p className="text-xl text-white/80 max-w-3xl mb-6">
                Experience Namibia&#39;s wonders through our carefully crafted tour packages
              </p>
              <p className="text-base md:text-lg mb-6 md:mb-8 max-w-2xl">
                Our tours are designed to transport you to the heart of Namibia&#39;s
                most captivating destinations, creating memories that will last a
                lifetime. You can uncover the hidden gems, iconic landmarks, and
                unique cultural treasures that make each destination special.
              </p>
              <Link href="/tours" className="inline-block bg-white text-[var(--korean-blue)] px-6 md:px-8 py-2 md:py-3 rounded-md font-bold hover:bg-[var(--accent)] hover:scale-95 transition-all duration-300">
                Explore Tours
              </Link>
            </motion.div>
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
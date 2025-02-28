'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TourPackage } from '../../lib/types';

interface FeaturedToursProps {
  tours: TourPackage[];
}

const FeaturedTours: React.FC<FeaturedToursProps> = ({ tours }) => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center text-[var(--text-primary)]">
            Popular Experiences
          </h2>
          <p className="text-xl mb-12 text-center text-[var(--text-secondary)] max-w-2xl mx-auto">
            Discover our most popular experiences designed specifically for Korean travelers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card group"
            >
              <div className="relative h-60 w-full overflow-hidden">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  style={{objectFit: 'cover'}}
                  className="transition-transform duration-500 group-hover:scale-110"
                />
                {tour.featured && (
                  <div className="absolute top-4 right-4 bg-[var(--primary)] text-white py-1 px-3 rounded-full text-sm font-medium">
                    Featured
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-[var(--text-primary)]">
                  {tour.title}
                </h3>
                
                <p className="text-[var(--text-secondary)] mb-4 line-clamp-2">
                  {tour.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[var(--secondary)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="ml-1 text-[var(--text-secondary)]">
                      {tour.duration} days
                    </span>
                  </div>
                  <div className="text-xl font-bold text-[var(--primary)]">
                    ${tour.price}
                  </div>
                </div>

                <Link
                  href={`/tours/${tour.id}`}
                  className="block w-full text-center py-2 bg-[var(--desert)] text-[var(--text-primary)] rounded-lg font-medium hover:bg-[var(--accent)] hover:text-white transition-colors"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/tours"
            className="btn-primary inline-flex items-center"
          >
            View All Tours
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTours;

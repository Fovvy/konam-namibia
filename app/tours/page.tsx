'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { mockTours } from '../lib/mockData';
import { TourPackage } from '../lib/types';

const ToursPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [durationFilter, setDurationFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  
  // Filter tours based on search term and duration
  const filteredTours = mockTours.filter(tour => {
    const matchesSearch = tour.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        tour.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        tour.attractions.some(attr => attr.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (durationFilter === 'all') return matchesSearch;
    if (durationFilter === 'short' && tour.duration <= 5) return matchesSearch;
    if (durationFilter === 'medium' && tour.duration > 5 && tour.duration <= 8) return matchesSearch;
    if (durationFilter === 'long' && tour.duration > 8) return matchesSearch;
    
    return false;
  });
  
  // Sort tours
  const sortedTours = [...filteredTours].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'duration-low') return a.duration - b.duration;
    if (sortBy === 'duration-high') return b.duration - a.duration;
    return 0; // default: no sorting
  });

  return (
    <div className="pt-8 pb-16 bg-safari"
      style={{
        backgroundImage: 'url(/images/namibia-desert.jpg)',
      }}
    >
      <div className="container-custom">
        {/* Hero Banner */}
        <div className="relative h-80 rounded-3xl overflow-hidden mb-12">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(/images/namibia-desert.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Explore Our Tour Packages
              </h1>
              <p className="text-xl text-white max-w-2xl mx-auto korean-text">
                나미비아의 아름다움을 발견하는 여행
              </p>
            </motion.div>
          </div>
        </div>
        
        {/* Filters and Search */}
        <div className="glass-card p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-white mb-1">
                Search
              </label>
              <input
                id="search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tours, destinations..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              />
            </div>
            
            {/* Duration Filter */}
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-white mb-1">
                Duration
              </label>
              <select
                id="duration"
                value={durationFilter}
                onChange={(e) => setDurationFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              >
                <option value="all">All Durations</option>
                <option value="short">Short (1-5 days)</option>
                <option value="medium">Medium (6-8 days)</option>
                <option value="long">Long (9+ days)</option>
              </select>
            </div>
            
            {/* Sort By */}
            <div>
              <label htmlFor="sort" className="block text-sm font-medium text-white mb-1">
                Sort By
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="duration-low">Duration: Short to Long</option>
                <option value="duration-high">Duration: Long to Short</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Results Count */}
        <div className="mb-6">
          <p className="text-[var(--text-secondary)]">
            Showing {sortedTours.length} tour {sortedTours.length === 1 ? 'package' : 'packages'}
          </p>
        </div>
        
        {/* Tour Packages Grid */}
        {sortedTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedTours.map((tour, index) => (
              <TourCard key={tour.id} tour={tour} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
              No Tours Found
            </h3>
            <p className="text-[var(--text-secondary)] mb-8">
              Try adjusting your search criteria or explore our other offerings.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setDurationFilter('all');
                setSortBy('default');
              }}
              className="btn-primary"
            >
              Reset Filters
            </button>
          </div>
        )}
        
        {/* Call to Action */}
        <div className="mt-16 bg-[var(--secondary)] bg-opacity-10 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
            Can't find what you're looking for?
          </h2>
          <p className="text-[var(--text-secondary)] mb-6 max-w-2xl mx-auto">
            We specialize in creating personalized tour packages tailored to your preferences.
            Tell us what you're interested in, and we'll design the perfect itinerary for you.
          </p>
          <Link href="/enquiry" className="btn-primary inline-block">
            Request Custom Tour
          </Link>
        </div>
      </div>
    </div>
  );
};

interface TourCardProps {
  tour: TourPackage;
  index: number;
}

const TourCard: React.FC<TourCardProps> = ({ tour, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
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

        <div className="flex flex-wrap gap-2 mb-4">
          {tour.attractions.slice(0, 3).map((attraction, idx) => (
            <span
              key={idx}
              className="bg-[var(--desert)] bg-opacity-50 text-[var(--text-primary)] text-xs px-2 py-1 rounded-full"
            >
              {attraction}
            </span>
          ))}
          {tour.attractions.length > 3 && (
            <span className="bg-gray-100 text-[var(--text-secondary)] text-xs px-2 py-1 rounded-full">
              +{tour.attractions.length - 3} more
            </span>
          )}
        </div>

        <div className="flex justify-between items-center">
          <Link
            href={`/tours/${tour.id}`}
            className="block w-full text-center py-2 bg-[var(--desert)] text-[var(--text-primary)] rounded-lg font-medium hover:bg-[var(--accent)] hover:text-white transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ToursPage;

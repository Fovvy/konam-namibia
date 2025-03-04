'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { mockVehicles } from '../lib/mockData';
import { Vehicle } from '../lib/types';

const VehiclesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  
  // Filter vehicles based on search term and type
  const filteredVehicles = mockVehicles.filter(vehicle => {
    const matchesSearch = vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        vehicle.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        vehicle.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (typeFilter === 'all') return matchesSearch;
    if (typeFilter === vehicle.type.toLowerCase()) return matchesSearch;
    
    return false;
  });
  
  // Sort vehicles
  const sortedVehicles = [...filteredVehicles].sort((a, b) => {
    if (sortBy === 'price-low') return a.price_per_day - b.price_per_day;
    if (sortBy === 'price-high') return b.price_per_day - a.price_per_day;
    if (sortBy === 'capacity-low') return a.capacity - b.capacity;
    if (sortBy === 'capacity-high') return b.capacity - a.capacity;
    return 0; // default: no sorting
  });

  // Get unique vehicle types for filter
  const vehicleTypes = Array.from(new Set(mockVehicles.map(vehicle => vehicle.type.toLowerCase())));

  return (
    <div 
      className="pt-8 pb-16 min-h-screen relative"
    >
      {/* Background image with blur */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/tour%20images/namibia-desert-road.jpg)',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(2px)',
        }}
      />
      
      {/* Semi-transparent overlay */}
      <div 
        className="absolute inset-0 z-0" 
        style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          position: 'fixed',
        }}
      />
      
      {/* Content container - not blurred */}
      <div 
        className="container-custom relative z-10"
      >
        {/* Hero Banner */}
        <div className="relative h-80 rounded-3xl overflow-hidden mb-12">
          <div 
            className="absolute inset-0"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(5px)',
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Vehicle Rentals
              </h1>
              <p className="text-xl text-white max-w-2xl mx-auto korean-text">
                나미비아를 자유롭게 탐험하세요
              </p>
            </motion.div>
          </div>
        </div>
        
        {/* Filters and Search */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.65)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '0.5rem',
          padding: '1.5rem'
        }} className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                id="search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search vehicles, features..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              />
            </div>
            
            {/* Type Filter */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                Vehicle Type
              </label>
              <select
                id="type"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              >
                <option value="all">All Types</option>
                {vehicleTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            {/* Sort By */}
            <div>
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
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
                <option value="capacity-low">Capacity: Low to High</option>
                <option value="capacity-high">Capacity: High to Low</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Results Count */}
        <div className="mb-6">
          <p style={{
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '0.5rem',
            padding: '0.5rem 1rem',
            color: 'white',
            fontWeight: '500',
            fontSize: '1.125rem',
            display: 'inline-block'
          }}>
            Showing {sortedVehicles.length} {sortedVehicles.length === 1 ? 'vehicle' : 'vehicles'}
          </p>
        </div>
        
        {/* Vehicles Grid */}
        {sortedVehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedVehicles.map((vehicle, index) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
              No Vehicles Found
            </h3>
            <p className="text-[var(--text-secondary)] mb-8">
              Try adjusting your search criteria or check back later for new additions to our fleet.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setTypeFilter('all');
                setSortBy('default');
              }}
              className="btn-primary"
            >
              Reset Filters
            </button>
          </div>
        )}
        
        {/* Rental Information */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-2xl p-8" style={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Rental Information
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-[var(--secondary)] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>All vehicles come with comprehensive insurance coverage.</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-[var(--secondary)] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>24/7 roadside assistance throughout Namibia.</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-[var(--secondary)] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>GPS and detailed Namibian road maps provided.</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-[var(--secondary)] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Unlimited mileage with all rentals.</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-[var(--secondary)] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Korean-speaking support available.</span>
              </li>
            </ul>
          </div>
          
          <div className="rounded-2xl p-8" style={{
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h2 className="text-2xl font-bold text-white mb-4">
              Need Assistance?
            </h2>
            <p className="text-gray-200 mb-6">
              Our team is here to help you choose the right vehicle for your Namibian adventure. 
              Whether you need recommendations on which 4x4 is best for your safari plans or 
              have questions about driving in Namibia, we&apos;re just a call or message away.
            </p>
            <Link href="/enquiry" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg inline-block transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

interface VehicleCardProps {
  vehicle: Vehicle;
  index: number;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        background: 'rgba(255, 255, 255, 0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), 0 0 15px rgba(255, 255, 255, 0.5)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '0.5rem',
        overflow: 'hidden',
        transition: 'all 0.3s ease'
      }}
      className="hover:shadow-xl hover:translate-y-[-5px]"
    >
      <div className="relative h-60 w-full overflow-hidden">
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          fill
          style={{objectFit: 'cover'}}
          className="transition-transform duration-500 group-hover:scale-110"
        />
        {!vehicle.available && (
          <div className="absolute top-4 right-4 bg-red-500 text-white py-1 px-3 rounded-full text-sm font-medium">
            Not Available
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-[var(--text-primary)]">
          {vehicle.name}
        </h3>
        
        <div className="flex items-center mb-4">
          <span className="bg-[var(--light)] text-[var(--text-secondary)] text-sm px-3 py-1 rounded-full">
            {vehicle.type}
          </span>
          <span className="ml-2 text-[var(--text-secondary)] flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-[var(--secondary)] mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {vehicle.capacity} Passengers
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {vehicle.features.slice(0, 3).map((feature, idx) => (
            <span
              key={idx}
              className="bg-[var(--desert)] bg-opacity-50 text-[var(--text-primary)] text-xs px-2 py-1 rounded-full"
            >
              {feature}
            </span>
          ))}
          {vehicle.features.length > 3 && (
            <span className="bg-gray-100 text-[var(--text-secondary)] text-xs px-2 py-1 rounded-full">
              +{vehicle.features.length - 3} more
            </span>
          )}
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="text-xl font-bold text-[var(--primary)]">
            ${vehicle.price_per_day}
            <span className="text-sm font-normal text-[var(--text-secondary)]">/day</span>
          </div>
          <Link
            href={`/vehicles/${vehicle.id}`}
            className="block px-4 py-2 bg-[var(--desert)] text-black font-semibold rounded-lg hover:bg-[var(--accent)] hover:text-white transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default VehiclesPage;

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { mockVehicles } from '../../lib/mockData';
import { Vehicle } from '../../lib/types';
import '../../styles/selectableCards.css';

const VehiclesListPage = () => {
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
      {/* Safari-themed background image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/tour%20images/savanna-sunset.jpg)',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(0.7)',
        }}
      />
      
      {/* Semi-transparent overlay */}
      <div 
        className="absolute inset-0 z-0" 
        style={{ 
          backgroundColor: 'rgba(10, 17, 40, 0.7)', // Navy blue overlay
          position: 'fixed',
        }}
      />
      
      {/* Content container - not blurred */}
      <div className="container-custom relative z-10">
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
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(255, 215, 0, 0.3)', // Gold border
          borderRadius: '0.5rem',
          padding: '1.5rem'
        }} className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-yellow-400 mb-1">
                Search
              </label>
              <input
                id="search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search vehicles, features..."
                className="w-full px-4 py-2 bg-navy-900 border border-yellow-500/30 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
            
            {/* Type Filter */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-yellow-400 mb-1">
                Vehicle Type
              </label>
              <select
                id="type"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-4 py-2 bg-navy-900 border border-yellow-500/30 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                {vehicleTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            {/* Sort By */}
            <div>
              <label htmlFor="sort" className="block text-sm font-medium text-yellow-400 mb-1">
                Sort By
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 bg-navy-900 border border-yellow-500/30 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
            background: 'rgba(10, 17, 40, 0.8)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(255, 215, 0, 0.2)',
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
        
        {/* Vehicles List */}
        {sortedVehicles.length > 0 ? (
          <div className="listing-grid">
            {sortedVehicles.map((vehicle, index) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
              No Vehicles Found
            </h3>
            <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
              Whether you&apos;re exploring the scenic deserts of Namibia or navigating through remote landscapes, our well-maintained fleet has something for every adventure.
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
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Booking Information
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-[var(--secondary)] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>A valid driver's license is required for all rentals.</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-[var(--secondary)] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Minimum rental period is 24 hours.</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-[var(--secondary)] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Weekly rentals receive a 15% discount.</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-[var(--secondary)] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>A refundable security deposit is required.</span>
              </li>
            </ul>
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

const VehicleCard = ({ vehicle, index }: VehicleCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-white rounded-xl overflow-hidden shadow-lg"
    >
      <Link href={`/vehicles/${vehicle.id}`}>
        <div className="relative h-48 bg-gray-100">
          <Image
            src={vehicle.image}
            alt={vehicle.name}
            fill
            className="object-cover"
          />
          <div className="absolute top-0 right-0 bg-yellow-500 text-navy-900 px-3 py-1 m-2 rounded-full text-sm font-bold">
            ${vehicle.price_per_day}/day
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-navy-800 text-lg mb-1">{vehicle.name}</h3>
          <div className="flex items-center text-gray-600 text-sm mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
            </svg>
            {vehicle.capacity} passengers
          </div>
          <div className="flex items-center text-gray-600 text-sm mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
            </svg>
            {vehicle.type}
          </div>
          <div className="flex justify-between items-center pt-1">
            <p className="text-sm text-gray-500">{vehicle.features[0]}</p>
            <button className="text-sm px-3 py-1 bg-navy-700 text-white rounded-full">Details</button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default VehiclesListPage;
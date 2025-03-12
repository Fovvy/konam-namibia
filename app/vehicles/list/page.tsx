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
          <div className="space-y-6">
            {sortedVehicles.map((vehicle, index) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-3xl font-bold mb-4 text-gray-800">
              Our Vehicle Fleet
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
                <span>A valid driver&apos;s license is required for all rentals.</span>
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
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
    >
      <Link href={`/vehicles/${vehicle.id}`} className="flex flex-col md:flex-row">
        <div className="relative h-56 md:h-auto md:w-1/3 bg-gray-100">
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
        <div className="p-5 md:w-2/3 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-navy-800 text-xl">{vehicle.name}</h3>
              <span className="bg-navy-100 text-navy-700 px-3 py-1 rounded-full text-sm font-semibold">{vehicle.type}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-navy-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                </svg>
                <span>{vehicle.capacity} passengers</span>
              </div>
              <div className="flex items-center text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-navy-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 0115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
                </svg>
                <span>A/C</span>
              </div>
              <div className="flex items-center text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-navy-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <span>Bluetooth</span>
              </div>
              <div className="flex items-center text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-navy-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Auto</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {vehicle.features.slice(0, 3).map((feature, i) => (
                <span key={i} className="bg-gray-100 text-gray-700 px-2 py-1 text-xs rounded">
                  {feature}
                </span>
              ))}
              {vehicle.features.length > 3 && (
                <span className="bg-gray-100 text-gray-700 px-2 py-1 text-xs rounded">
                  +{vehicle.features.length - 3} more
                </span>
              )}
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-2">
            <div>
              <span className="block text-lg font-bold text-navy-800">${vehicle.price_per_day}</span>
              <span className="text-sm text-gray-500">per day</span>
            </div>
            <button className="px-5 py-2 bg-navy-700 hover:bg-navy-800 text-white rounded-lg transition-colors">
              Book Now
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default VehiclesListPage;
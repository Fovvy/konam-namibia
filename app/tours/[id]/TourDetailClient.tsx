'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { TourPackage, Vehicle } from '@/app/lib/types';
import ItinerarySection from '@/app/components/tours/ItinerarySection';
import { mockVehicles } from '@/app/lib/mockData';

interface TourDetailClientProps {
  tour: TourPackage;
}

export default function TourDetailClient({ tour }: TourDetailClientProps) {
  const router = useRouter();
  const [numPeople, setNumPeople] = useState<number | ''>('');
  const [showPrice, setShowPrice] = useState(false);
  const [suggestedVehicle, setSuggestedVehicle] = useState<Vehicle | null>(null);

  const handlePeopleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === '' ? '' : Number(e.target.value);
    setNumPeople(value);
    setShowPrice(value !== '');
    
    // Suggest appropriate vehicle based on number of people
    if (value !== '') {
      const people = Number(value);
      // Find the smallest vehicle that can accommodate all people
      const suitableVehicle = mockVehicles
        .filter(v => v.available && v.capacity >= people)
        .sort((a, b) => a.capacity - b.capacity)[0] || null;
      
      setSuggestedVehicle(suitableVehicle);
    } else {
      setSuggestedVehicle(null);
    }
  };

  return (
    <main className="pt-32 pb-16">
      {/* Hero Section */}
      <div className="relative h-96 w-full">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">{tour.title}</h1>
            <p className="text-xl mb-6">{tour.duration} Days of Adventure</p>
          </div>
        </div>
      </div>

      {/* Tour Overview */}
      <section className="py-12">
        <div className="container-custom mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Tour Overview</h2>
              <p className="text-gray-600 mb-6">{tour.description}</p>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Key Attractions</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {tour.attractions.map((attraction, index) => (
                  <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
                    {attraction}
                  </span>
                ))}
              </div>
              
              <ItinerarySection tourId={tour.id} />
            </div>
            
            {/* Booking Sidebar */}
            <div>
              <div className="bg-gray-50 p-6 rounded-lg sticky top-32">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Book This Tour</h3>
                
                <div className="mb-4">
                  <p className="text-gray-500 mb-1">Duration</p>
                  <p className="text-lg">{tour.duration} days</p>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="numPeople" className="block text-gray-700 mb-1">Number of People</label>
                  <select 
                    id="numPeople" 
                    value={numPeople} 
                    onChange={handlePeopleChange}
                    className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800 bg-white"
                  >
                    <option value="">Select number of people</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                    ))}
                  </select>
                </div>
                
                {/* Suggested Vehicle Section */}
                {suggestedVehicle && (
                  <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Recommended Vehicle</h4>
                    <div className="flex items-center">
                      <div className="relative w-20 h-20 rounded-md overflow-hidden mr-3">
                        <Image 
                          src={suggestedVehicle.image} 
                          alt={suggestedVehicle.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{suggestedVehicle.name}</p>
                        <p className="text-sm text-gray-600">Capacity: {suggestedVehicle.capacity} people</p>
                        <p className="text-sm text-gray-600">${suggestedVehicle.price_per_day}/day</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <button 
                        onClick={() => router.push(`/vehicles/${suggestedVehicle.id}`)}
                        className="text-sm text-orange-500 hover:text-orange-600 font-medium"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                )}
                
                {showPrice && (
                  <div className="mb-6">
                    <p className="text-gray-500 mb-1">Price</p>
                    <p className="text-3xl font-bold text-orange-500">
                      ${tour.price * Number(numPeople)} <span className="text-gray-500 text-base font-normal">total</span>
                    </p>
                    <p className="text-sm text-gray-500">(${tour.price} per person)</p>
                  </div>
                )}
                
                <button 
                  onClick={() => router.push(`/bookings?tour=${tour.id}&people=${numPeople}${suggestedVehicle ? `&vehicle=${suggestedVehicle.id}` : ''}`)}
                  disabled={!showPrice}
                  className={`block text-center ${showPrice ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-gray-300 text-gray-700'} font-bold py-3 px-4 rounded-md transition-colors w-full`}
                >
                  Book This Tour
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">What Our Customers Say</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((review) => (
              <div key={review} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic mb-4">&ldquo;This tour exceeded all our expectations. The guides were knowledgeable and the scenery was breathtaking!&rdquo;</p>
                <div className="font-medium">
                  <p className="text-gray-800">Adventure Seeker</p>
                  <p className="text-gray-500 text-sm">Seoul, South Korea</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

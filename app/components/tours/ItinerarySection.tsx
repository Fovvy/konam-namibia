'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity } from '@/app/lib/types';
import { mockTours } from '@/app/lib/mockData';
import AccommodationSlideshow from './AccommodationSlideshow';

interface ItinerarySectionProps {
  tourId: string;
}

const ItinerarySection: React.FC<ItinerarySectionProps> = ({ tourId }) => {
  // Find the tour and get its itinerary
  const tour = mockTours.find(t => t.id === tourId);
  const itinerary = tour?.itinerary || [];

  const scrollToDay = (day: number) => {
    const element = document.getElementById(`day-${day}`);
    if (element) {
      // Offset for fixed header
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const [showAccommodation, setShowAccommodation] = useState<number | null>(null);

  if (itinerary.length === 0) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container-custom mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Detailed Itinerary</h2>
          <p className="text-gray-600">Itinerary information not available for this tour.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container-custom mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Detailed Itinerary</h2>
          <p className="text-gray-600">
            Explore your day-by-day journey through Namibia. Click on a day to jump to that section.
          </p>
        </div>

        {/* Day Tabs for Quick Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 sticky top-20 bg-white bg-opacity-90 backdrop-blur-sm py-3 px-4 rounded-md shadow-sm z-10">
          {itinerary.map((day) => (
            <button
              key={day.day}
              onClick={() => scrollToDay(day.day)}
              className="px-4 py-2 rounded-md transition-colors bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Day {day.day}
              {day.date && <span className="ml-1 text-sm">({day.date})</span>}
            </button>
          ))}
        </div>

        {/* Display all days vertically */}
        <div className="space-y-6">
          {itinerary.map((day) => (
            <motion.div
              id={`day-${day.day}`}
              key={day.day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: day.day * 0.1 }}
              className="bg-white rounded-lg p-6 shadow-sm"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Day {day.day}: {day.location}
              </h3>
              {day.date && <p className="text-gray-500 mt-1 mb-4">Date: {day.date}</p>}
              
              {/* Details */}
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold mb-4 text-gray-800">Overview</h4>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <span className="inline-block bg-orange-100 text-orange-800 rounded-full p-2 mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                          </svg>
                        </span>
                        <div>
                          <p className="font-medium text-gray-700">Transportation</p>
                          <p className="text-gray-600">{day.transportation || 'Not specified'}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <span className="inline-block bg-blue-100 text-blue-800 rounded-full p-2 mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                          </svg>
                        </span>
                        <div>
                          <p className="font-medium text-gray-700">Accommodation</p>
                          <p className="text-gray-600">{day.accommodation || 'Not included'}</p>
                          {day.accommodation && (
                            <div>
                              <button 
                                onClick={() => setShowAccommodation(day.day)} 
                                className="mt-2 text-sm text-blue-600 hover:text-blue-800 underline"
                              >
                                View Images
                              </button>
                              {showAccommodation === day.day && (
                                <div className="mt-3">
                                  <AccommodationSlideshow 
                                    tourId={tourId} 
                                    accommodationName={day.accommodation} 
                                  />
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-start">
                        <span className="inline-block bg-green-100 text-green-800 rounded-full p-2 mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.38a48.474 48.474 0 0 0-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1-.53 0L12 2.845l.265.265Zm-3 0a.375.375 0 1 1-.53 0L9 2.845l.265.265Zm6 0a.375.375 0 1 1-.53 0L15 2.845l.265.265Z" />
                          </svg>
                        </span>
                        <div>
                          <p className="font-medium text-gray-700">Meals</p>
                          <div className="text-gray-600">
                            {day.meals.breakfast && <p>Breakfast: {day.meals.breakfast}</p>}
                            {day.meals.lunch && <p>Lunch: {day.meals.lunch}</p>}
                            {day.meals.dinner && <p>Dinner: {day.meals.dinner}</p>}
                            {!day.meals.breakfast && !day.meals.lunch && !day.meals.dinner && <p>Meals not included</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold mb-4 text-gray-800">Activities</h4>
                    <div className="space-y-3">
                      {day.activities.map((activity, index) => (
                        <ActivityItem key={index} activity={activity} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ActivityItem: React.FC<{ activity: Activity }> = ({ activity }) => {
  return (
    <div className="flex items-start p-3 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors">
      {activity.time && (
        <div className="min-w-16 text-center mr-4">
          <span className="inline-block bg-white border border-gray-200 text-gray-700 px-2 py-1 rounded-md font-mono text-sm">
            {activity.time}
          </span>
        </div>
      )}
      <div className="flex-1">
        <p className="text-gray-800">
          {activity.description}
          {activity.isOptional && (
            <span className="ml-2 text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
              Optional
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default ItinerarySection;

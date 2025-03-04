'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { mockTours } from '../lib/mockData';
import { TourPackage } from '../lib/types';

interface Activity {
  description: string;
}

interface ItineraryDay {
  day: number;
  location: string;
  transportation?: string;
  accommodation?: string;
  activities: Activity[];
}

const EnquiryPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    numPeople: 1,
    startDate: '',
    endDate: '',
    tourPackageId: '',
    attractions: [] as string[],
    message: '',
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [showItinerary, setShowItinerary] = useState(false);
  const [selectedTour, setSelectedTour] = useState<TourPackage | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'tourPackageId' && value) {
      const tour = mockTours.find(t => t.id === value);
      setSelectedTour(tour || null);
      setShowItinerary(!!(tour?.itinerary));
    } else if (name === 'tourPackageId' && !value) {
      setSelectedTour(null);
      setShowItinerary(false);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleAttractionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    
    if (checked) {
      setFormData(prev => ({
        ...prev,
        attractions: [...prev.attractions, value]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        attractions: prev.attractions.filter(attr => attr !== value)
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormError('Please fill in all required fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError('Please enter a valid email address');
      return;
    }
    
    // Clear any previous errors
    setFormError('');
    
    // In a real application, you would send this data to your backend
    console.log('Form submitted:', formData);
    
    // Show success message
    setFormSubmitted(true);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      numPeople: 1,
      startDate: '',
      endDate: '',
      tourPackageId: '',
      attractions: [],
      message: '',
    });
  };
  
  // Get all unique attractions from tour packages
  const allAttractions = Array.from(
    new Set(mockTours.flatMap(tour => tour.attractions))
  ).sort();

  return (
    <div className="pt-8 pb-16 bg-safari"
      style={{
        backgroundImage: 'url(/images/namibia-culture.jpg)',
      }}
    >
      <div className="container-custom">
        {/* Hero Banner */}
        <div className="relative h-80 rounded-3xl overflow-hidden mb-12">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/images/namibia-culture.jpg)',
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
                Custom Itinerary
              </h1>
              <p className="text-xl text-white max-w-2xl mx-auto korean-text">
                당신의 나미비아 여행을 계획해 드립니다
              </p>
            </motion.div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="glass-card p-8">
              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
                    Thank You for Your Enquiry!
                  </h2>
                  <p className="text-[var(--text-secondary)] mb-8">
                    We&apos;ve received your enquiry and will get back to you within 24 hours. 
                    Check your email for a confirmation of your enquiry details.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="btn-primary"
                  >
                    Make Another Enquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                    Tell Us About Your Travel Plans
                  </h2>
                  
                  {formError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                      {formError}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                      />
                    </div>
                    
                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                      />
                    </div>
                    
                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-white mb-1">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                      />
                    </div>
                    
                    {/* Number of People */}
                    <div>
                      <label htmlFor="numPeople" className="block text-sm font-medium text-white mb-1">
                        Number of People
                      </label>
                      <input
                        id="numPeople"
                        name="numPeople"
                        type="number"
                        min="1"
                        value={formData.numPeople}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                      />
                    </div>
                    
                    {/* Start Date */}
                    <div>
                      <label htmlFor="startDate" className="block text-sm font-medium text-white mb-1">
                        Preferred Start Date
                      </label>
                      <input
                        id="startDate"
                        name="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                      />
                    </div>
                    
                    {/* End Date */}
                    <div>
                      <label htmlFor="endDate" className="block text-sm font-medium text-white mb-1">
                        Preferred End Date
                      </label>
                      <input
                        id="endDate"
                        name="endDate"
                        type="date"
                        value={formData.endDate}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                      />
                    </div>
                    
                    {/* Tour Package */}
                    <div className="md:col-span-2">
                      <label htmlFor="tourPackageId" className="block text-sm font-medium text-white mb-1">
                        Interested in a Specific Tour Package?
                      </label>
                      <select
                        id="tourPackageId"
                        name="tourPackageId"
                        value={formData.tourPackageId}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="">Select a tour (optional)</option>
                        {mockTours.map(tour => (
                          <option key={tour.id} value={tour.id}>
                            {tour.title} - ${tour.price} ({tour.duration} days)
                          </option>
                        ))}
                      </select>
                      {selectedTour?.itinerary && (
                        <div className="mt-2">
                          <button
                            type="button"
                            onClick={() => setShowItinerary(!showItinerary)}
                            className="text-orange-500 hover:text-orange-600 flex items-center text-sm font-medium"
                          >
                            {showItinerary ? 'Hide Itinerary' : 'View Itinerary'}
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className={`h-4 w-4 ml-1 transition-transform ${showItinerary ? 'rotate-180' : ''}`} 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Attractions */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-white mb-2">
                      Attractions You&apos;d Like to Visit
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {allAttractions.map(attraction => (
                        <div key={attraction} className="flex items-center">
                          <input
                            id={`attraction-${attraction}`}
                            name="attractions"
                            type="checkbox"
                            value={attraction}
                            checked={formData.attractions.includes(attraction)}
                            onChange={handleAttractionChange}
                            className="h-4 w-4 text-[var(--primary)] focus:ring-[var(--primary)]"
                          />
                          <label htmlFor={`attraction-${attraction}`} className="ml-2 text-sm text-white">
                            {attraction}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Message */}
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-white mb-1">
                      Additional Information <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us about your travel preferences, special requirements, or any questions you have."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                    ></textarea>
                  </div>
                  
                  <div className="text-right">
                    <button type="submit" className="btn-primary">
                      Submit Enquiry
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
          
          {/* Contact Information */}
          <div>
            <div className="glass-card p-8 mb-8">
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">
                Contact Information
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-[var(--primary)] mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="text-[var(--text-secondary)]">Phone</p>
                    <p className="font-medium text-[var(--text-primary)]">+264 61 123 4567</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-[var(--primary)] mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-[var(--text-secondary)]">Email</p>
                    <p className="font-medium text-[var(--text-primary)]">info@konam-tours.com</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-[var(--primary)] mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="text-[var(--text-secondary)]">Office</p>
                    <p className="font-medium text-[var(--text-primary)]">123 Independence Avenue, Windhoek, Namibia</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="glass-card p-8">
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">
                Office Hours
              </h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-[var(--text-secondary)]">Monday - Friday</span>
                  <span className="font-medium text-[var(--text-primary)]">8:00 AM - 5:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-[var(--text-secondary)]">Saturday</span>
                  <span className="font-medium text-[var(--text-primary)]">9:00 AM - 2:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-[var(--text-secondary)]">Sunday</span>
                  <span className="font-medium text-[var(--text-primary)]">Closed</span>
                </li>
              </ul>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-bold text-[var(--text-primary)] mb-2">
                  Emergency Contact
                </h4>
                <p className="text-[var(--text-secondary)] mb-2">
                  For urgent matters outside of office hours:
                </p>
                <p className="font-medium text-[var(--text-primary)]">
                  +264 81 987 6543
                </p>
              </div>
            </div>
          </div>
          
          {/* Itinerary Preview Section */}
          {showItinerary && selectedTour?.itinerary && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 rounded-2xl shadow-md mt-8"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Tour Itinerary Overview</h3>
              <p className="text-gray-600 mb-6">
                Here&apos;s a preview of what you can expect on this tour. For more details, please book the tour or contact us.
              </p>
              
              <div className="space-y-4">
                {selectedTour.itinerary.map((day: ItineraryDay) => (
                  <div key={day.day} className="border-l-4 border-orange-500 pl-4">
                    <h4 className="text-lg font-bold text-gray-800">
                      Day {day.day}: {day.location}
                    </h4>
                    <p className="text-gray-600 mb-2">
                      {day.transportation && (
                        <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full mr-2">
                          Transport: {day.transportation}
                        </span>
                      )}
                      {day.accommodation && (
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          Stay: {day.accommodation}
                        </span>
                      )}
                    </p>
                    <div className="mt-2">
                      <p className="text-gray-700 font-medium">Highlights:</p>
                      <ul className="list-disc list-inside text-gray-600 text-sm">
                        {day.activities.slice(0, 2).map((activity: Activity, index: number) => (
                          <li key={index}>{activity.description}</li>
                        ))}
                        {day.activities.length > 2 && (
                          <li className="text-orange-500">And more...</li>
                        )}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-gray-600 text-sm">
                  This is a simplified overview. The full itinerary includes detailed activity times, 
                  meal information, and more. Itineraries are subject to change based on weather conditions
                  and local circumstances.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnquiryPage;

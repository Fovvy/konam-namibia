'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { mockTours, mockVehicles } from '../lib/mockData';
import { TourPackage, Vehicle } from '../lib/types';

const BookingsPage = () => {
  const searchParams = useSearchParams();
  const tourId = searchParams.get('tour');
  const vehicleId = searchParams.get('vehicle');

  const [selectedTour, setSelectedTour] = useState<TourPackage | null>(
    tourId ? mockTours.find(tour => tour.id === tourId) || null : null
  );
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(
    vehicleId ? mockVehicles.find(vehicle => vehicle.id === vehicleId) || null : null
  );

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    numPeople: 1,
    startDate: '',
    endDate: '',
    additionalRequests: '',
    agreeTerms: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    if (id === '') {
      setSelectedTour(null);
    } else {
      const tour = mockTours.find(t => t.id === id) || null;
      setSelectedTour(tour);
    }
  };

  const handleVehicleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    if (id === '') {
      setSelectedVehicle(null);
    } else {
      const vehicle = mockVehicles.find(v => v.id === id) || null;
      setSelectedVehicle(vehicle);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Booking submitted! We will contact you shortly to confirm your reservation.');
    // In a real application, we would submit the form data to a backend API
  };

  return (
    <main className="pt-32 pb-16">
      <div className="container-custom mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-2 text-gray-800">Book Your Namibian Adventure</h1>
          <p className="text-xl text-gray-600 mb-8">
            Fill out the form below to book your tour or vehicle rental.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Booking Form */}
          <motion.div 
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Booking Details</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="tourPackage" className="block text-gray-700 font-medium mb-2">Tour Package</label>
                <select
                  id="tourPackage"
                  name="tourPackage"
                  value={selectedTour?.id || ''}
                  onChange={handleTourChange}
                  className="w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">-- Select a Tour Package --</option>
                  {mockTours.map(tour => (
                    <option key={tour.id} value={tour.id}>
                      {tour.title} - ${tour.price} ({tour.duration} days)
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="vehicle" className="block text-gray-700 font-medium mb-2">Vehicle Rental (Optional)</label>
                <select
                  id="vehicle"
                  name="vehicle"
                  value={selectedVehicle?.id || ''}
                  onChange={handleVehicleChange}
                  className="w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">-- Select a Vehicle (Optional) --</option>
                  {mockVehicles.filter(v => v.available).map(vehicle => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.name} - ${vehicle.price_per_day}/day (Seats {vehicle.capacity})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label htmlFor="numPeople" className="block text-gray-700 font-medium mb-2">Number of People</label>
                  <input
                    type="number"
                    id="numPeople"
                    name="numPeople"
                    min="1"
                    value={formData.numPeople}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label htmlFor="startDate" className="block text-gray-700 font-medium mb-2">Start Date</label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label htmlFor="endDate" className="block text-gray-700 font-medium mb-2">End Date</label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="additionalRequests" className="block text-gray-700 font-medium mb-2">Additional Requests</label>
                <textarea
                  id="additionalRequests"
                  name="additionalRequests"
                  rows={4}
                  value={formData.additionalRequests}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Any special requirements, dietary restrictions, or other requests..."
                ></textarea>
              </div>

              <div className="mb-8">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    required
                    className="rounded border-gray-300 text-orange-500 focus:ring-orange-500 mr-3"
                  />
                  <span className="text-gray-700">
                    I agree to the <Link href="/terms" className="text-orange-500 hover:underline">Terms and Conditions</Link>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-md transition-colors"
              >
                Book Now
              </button>
            </form>
          </motion.div>

          {/* Booking Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-gray-50 rounded-lg shadow-lg p-6 sticky top-32">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Booking Summary</h2>
              
              {selectedTour && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-700">Selected Tour</h3>
                  <div className="bg-white rounded-md p-4 shadow-sm">
                    <div className="relative h-40 w-full mb-4 overflow-hidden rounded-md">
                      <Image
                        src={selectedTour.image}
                        alt={selectedTour.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h4 className="font-bold text-lg mb-1">{selectedTour.title}</h4>
                    <p className="text-gray-600 mb-2">{selectedTour.duration} Days</p>
                    <p className="text-orange-500 font-bold">${selectedTour.price} per person</p>
                  </div>
                </div>
              )}

              {selectedVehicle && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-700">Selected Vehicle</h3>
                  <div className="bg-white rounded-md p-4 shadow-sm">
                    <div className="relative h-32 w-full mb-4 overflow-hidden rounded-md">
                      <Image
                        src={selectedVehicle.image}
                        alt={selectedVehicle.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h4 className="font-bold text-lg mb-1">{selectedVehicle.name}</h4>
                    <p className="text-gray-600 mb-2">Capacity: {selectedVehicle.capacity} people</p>
                    <p className="text-orange-500 font-bold">${selectedVehicle.price_per_day} per day</p>
                  </div>
                </div>
              )}

              {!selectedTour && !selectedVehicle ? (
                <div className="text-center p-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-gray-500">
                    Select a tour or vehicle to see your booking summary
                  </p>
                </div>
              ) : (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex justify-between text-lg mb-2">
                    <span className="font-medium">Subtotal:</span>
                    <span>
                      ${(selectedTour ? selectedTour.price * formData.numPeople : 0) +
                        (selectedVehicle && formData.startDate && formData.endDate 
                          ? selectedVehicle.price_per_day * Math.max(1, Math.floor((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / (1000 * 60 * 60 * 24)))
                          : 0
                        )
                      }
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mb-6">Final price will be confirmed upon booking.</p>
                  <Link
                    href="/enquiry"
                    className="block text-center text-orange-500 hover:text-orange-600 font-medium"
                  >
                    Need a custom itinerary? Make an enquiry →
                  </Link>
                </div>
              )}
              
              <div className="mt-8">
                <h3 className="font-semibold mb-2">Need Help?</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Our team is available to assist you with your booking. Contact us:
                </p>
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-700">+264 61 123 4567</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-700">info@konamtours.com</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default BookingsPage;

'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { mockTours, mockVehicles, mockBookings } from '../lib/mockData';
import '../styles/selectableCards.css';
import SelectableCard from '../components/ui/SelectableCard';

const BookingsPage = () => {
  const searchParams = useSearchParams();
  const tourId = searchParams?.get('tour') || null;
  const vehicleId = searchParams?.get('vehicle') || null;
  const startDateParam = searchParams?.get('startDate') || null;
  const endDateParam = searchParams?.get('endDate') || null;

  const [selectedTourId, setSelectedTourId] = useState<string | null>(tourId);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(vehicleId);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    numAdults: searchParams?.get('people') ? parseInt(searchParams?.get('people') || '1') : 1,
    numChildren: 0,
    startDate: startDateParam || '',
    endDate: endDateParam || '',
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

  const handleTourSelect = (tourId: string) => {
    setSelectedTourId((prev: string | null) => (prev === tourId ? null : tourId));
  };

  const handleVehicleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    if (id === '') {
      setSelectedVehicleId(null);
    } else {
      setSelectedVehicleId(id);
    }
  };

  const handleAdultChange = (increment: boolean) => {
    setFormData(prev => ({
      ...prev,
      numAdults: increment 
        ? Math.min(prev.numAdults + 1, 10) 
        : Math.max(prev.numAdults - 1, 1)
    }));
  };

  const handleChildChange = (increment: boolean) => {
    setFormData(prev => ({
      ...prev,
      numChildren: increment 
        ? Math.min(prev.numChildren + 1, 10) 
        : Math.max(prev.numChildren - 1, 0)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate total price
    let totalPrice = 0;
    
    const selectedTour = mockTours.find(tour => tour.id === selectedTourId) || null;
    if (selectedTour) {
      totalPrice += selectedTour.price * (formData.numAdults + formData.numChildren * 0.7);
    }
    
    const selectedVehicle = mockVehicles.find(vehicle => vehicle.id === selectedVehicleId) || null;
    if (selectedVehicle) {
      // Assuming the rental is for the duration of the tour
      const tourDuration = selectedTour?.duration || 1;
      totalPrice += selectedVehicle.price_per_day * tourDuration;
    }
    
    // Create a new booking
    const newBooking = {
      id: (mockBookings.length + 1).toString(),
      user_id: 'guest', // In a real app, this would be a logged-in user's ID
      tour_package_id: selectedTourId || null,
      vehicle_id: selectedVehicleId || null,
      start_date: formData.startDate,
      end_date: formData.endDate,
      num_people: formData.numAdults + formData.numChildren,
      total_price: totalPrice,
      status: 'pending' as const,
      created_at: new Date().toISOString(),
      customer_name: `${formData.firstName} ${formData.lastName}`,
      customer_email: formData.email,
      customer_phone: formData.phone,
      adults: formData.numAdults,
      children: formData.numChildren,
      notes: formData.additionalRequests
    };
    
    // In a real app, this would be saved to a database
    // For now, we're just pushing to the mock array
    mockBookings.push(newBooking);
    
    // Alert success
    alert(`Booking confirmed! Total price: $${totalPrice.toFixed(2)}`);
  };

  const getNumberOfPeople = () => {
    return formData.numAdults + formData.numChildren;
  };

  const selectedTourDetails = mockTours.find(tour => tour.id === selectedTourId);
  const selectedVehicleDetails = mockVehicles.find(vehicle => vehicle.id === selectedVehicleId);

  const tourImage = selectedTourDetails && selectedTourDetails.image ? selectedTourDetails.image : '/images/default-tour.jpg';
  const tourTitle = selectedTourDetails?.title || 'Select a Tour';

  const vehicleImage = selectedVehicleDetails && selectedVehicleDetails.image ? selectedVehicleDetails.image : '/images/default-vehicle.jpg';
  const vehicleName = selectedVehicleDetails?.name || 'Select a Vehicle';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const numberOfDays = selectedTourDetails?.duration || 1;
  const totalPrice = 
    ((selectedTourDetails?.price || 0) * (formData.numAdults + formData.numChildren * 0.7)) + 
    ((selectedVehicleDetails?.price_per_day || 0) * (selectedTourDetails?.duration || 1));
  const bookingTotal = `$${Math.round(totalPrice).toLocaleString()}`;

  const selectedStartDate = new Date(formData.startDate);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const details = `${selectedTourDetails?.duration || 'N/A'} Days | ${selectedVehicleDetails?.name || 'No Vehicle'} | ${selectedStartDate ? selectedStartDate.toLocaleDateString() : 'No Date'}`;

  return (
    <main className="pt-32 pb-16">
      <div className="container-custom mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-12 text-center">Book Your Namibian Adventure</h1>
        
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Details</h2>
              
              <form onSubmit={handleSubmit}>
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

                {/* People Count with Icons */}
              <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">Number of Travelers</label>
                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center bg-gray-50 p-4 rounded-lg">
                      <div className="text-orange-500 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                      </div>
                      <div className="font-medium">Adults</div>
                      <div className="flex items-center ml-auto">
                        <button 
                          type="button" 
                          onClick={() => handleAdultChange(false)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full focus:outline-none"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                          </svg>
                        </button>
                        <span className="w-10 text-center font-medium">{formData.numAdults}</span>
                        <button 
                          type="button" 
                          onClick={() => handleAdultChange(true)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full focus:outline-none"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center bg-gray-50 p-4 rounded-lg">
                      <div className="text-orange-500 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M12 19.5v-15" />
                        </svg>
                      </div>
                      <div className="font-medium">Children</div>
                      <div className="flex items-center ml-auto">
                        <button 
                          type="button" 
                          onClick={() => handleChildChange(false)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full focus:outline-none"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                          </svg>
                        </button>
                        <span className="w-10 text-center font-medium">{formData.numChildren}</span>
                        <button 
                          type="button" 
                          onClick={() => handleChildChange(true)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full focus:outline-none"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tours as clickable images with new card design */}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">Select Your Tour Package</h2>
                  <p className="text-gray-500 mb-4">Choose the perfect adventure for your Namibian journey</p>
                  
                  <div className="selectable-card-container">
                    {mockTours.map(tour => (
                      <SelectableCard
                        key={tour.id}
                        id={tour.id}
                        image={tour.image}
                        title={tour.title}
                        subtitle={`${tour.duration} days - $${tour.price}/person`}
                        isSelected={selectedTourId === tour.id}
                        onClick={() => handleTourSelect(tour.id)}
                      />
                    ))}
                  </div>
                </div>

              <div className="mb-6">
                <label htmlFor="vehicle" className="block text-gray-700 font-medium mb-2">Vehicle Rental (Optional)</label>
                <select
                  id="vehicle"
                  name="vehicle"
                  value={selectedVehicleId || ''}
                  onChange={handleVehicleChange}
                  className="w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">-- Select a Vehicle (Optional) --</option>
                    {mockVehicles
                      .filter(vehicle => vehicle.available && vehicle.capacity >= getNumberOfPeople())
                      .map(vehicle => (
                    <option key={vehicle.id} value={vehicle.id}>
                          {vehicle.name} - ${vehicle.price_per_day}/day (Capacity: {vehicle.capacity})
                    </option>
                  ))}
                </select>
              </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
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
                  value={formData.additionalRequests}
                  onChange={handleInputChange}
                    rows={4}
                  className="w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                ></textarea>
              </div>

                <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    required
                      className="mr-2 h-5 w-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  />
                    <span className="text-gray-700">I agree to the terms and conditions</span>
                </label>
              </div>

              <button
                type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-md transition-colors w-full"
              >
                  Complete Booking
              </button>
            </form>
            </div>
          </div>

          {/* Booking Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-8 sticky top-32">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Booking Summary</h2>
              
              {(selectedTourId || selectedVehicleId) ? (
                <>
              {selectedTourId && (
                    <div className="mb-6 pb-6 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-800 mb-2">Tour Package</h3>
                      <div className="flex items-start">
                        <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                          <Image src={tourImage} alt={tourTitle} fill className="object-cover" />
                        </div>
                        <div className="ml-3">
                          <p className="font-medium text-gray-800">{tourTitle}</p>
                          <p className="text-sm text-gray-600">{selectedTourDetails?.duration} days</p>
                          <p className="text-orange-500 font-medium mt-1">
                            ${((selectedTourDetails?.price || 0) * (formData.numAdults + formData.numChildren * 0.7)).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {selectedVehicleId && (
                    <div className="mb-6 pb-6 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-800 mb-2">Vehicle Rental</h3>
                      <div className="flex items-start">
                        <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                          <Image src={vehicleImage} alt={vehicleName} fill className="object-cover" />
                        </div>
                        <div className="ml-3">
                          <p className="font-medium text-gray-800">{vehicleName}</p>
                          <p className="text-sm text-gray-600">Capacity: {selectedVehicleDetails?.capacity} people</p>
                          <p className="text-orange-500 font-medium mt-1">
                            ${((selectedVehicleDetails?.price_per_day || 0) * (selectedTourDetails?.duration || 1)).toFixed(2)}
                          </p>
                        </div>
                  </div>
                </div>
              )}

                <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Adults</span>
                      <span className="font-medium">{formData.numAdults}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Children</span>
                      <span className="font-medium">{formData.numChildren}</span>
                    </div>
                    {selectedTourId && (
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Tour Subtotal</span>
                        <span className="font-medium">
                          ${((selectedTourDetails?.price || 0) * (formData.numAdults + formData.numChildren * 0.7)).toFixed(2)}
                        </span>
                      </div>
                    )}
                    {selectedVehicleId && selectedTourId && (
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Vehicle Rental</span>
                        <span className="font-medium">
                          ${((selectedVehicleDetails?.price_per_day || 0) * (selectedTourDetails?.duration || 1)).toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-800">Total</span>
                      <span className="text-2xl font-bold text-orange-500">
                        {bookingTotal}
                      </span>
                </div>
                  </div>
                </>
              ) : (
                <p className="text-gray-500">Please select a tour package or vehicle to see your booking summary.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="hidden">{details}</div>
    </main>
  );
};

export default BookingsPage;

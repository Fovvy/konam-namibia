'use client';

import React, { useState } from 'react';
import { mockBookings, mockTours, mockVehicles } from '@/app/lib/mockData';
import { Booking } from '@/app/lib/types';

const BookingsPage = () => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Filter bookings based on status and search term
  const filteredBookings = mockBookings.filter((booking) => {
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearch = 
      booking.customer_name.toLowerCase().includes(searchTermLower) ||
      booking.customer_email.toLowerCase().includes(searchTermLower) ||
      booking.id.includes(searchTermLower);
    
    return matchesStatus && matchesSearch;
  });

  // Get tour or vehicle name based on IDs
  const getBookingItemName = (booking: Booking) => {
    if (booking.tour_package_id) {
      const tour = mockTours.find(tour => tour.id === booking.tour_package_id);
      return tour ? tour.title : 'Unknown Tour';
    } else if (booking.vehicle_id) {
      const vehicle = mockVehicles.find(vehicle => vehicle.id === booking.vehicle_id);
      return vehicle ? vehicle.name : 'Unknown Vehicle';
    }
    return 'No items booked';
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Handle confirm booking
  const handleConfirmBooking = (bookingId: string) => {
    const bookingIndex = mockBookings.findIndex(booking => booking.id === bookingId);
    if (bookingIndex !== -1) {
      mockBookings[bookingIndex].status = 'confirmed';
      // Force a re-render by spreading the array into a new array
      // In a real app, this would be a database update
      setStatusFilter(statusFilter);
    }
  };

  // View booking details
  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Booking Management</h1>
      
      {/* Filters and Search */}
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <label htmlFor="status-filter" className="text-sm font-medium text-gray-700">
            Status Filter:
          </label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="form-select rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
          >
            <option value="all">All Bookings</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        
        <div className="w-full md:w-64">
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
          />
        </div>
      </div>
      
      {/* Bookings Table */}
      <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <table className="min-w-full table-fixed divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="w-12 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">ID</th>
              <th scope="col" className="w-48 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Customer</th>
              <th scope="col" className="w-60 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Item Booked</th>
              <th scope="col" className="w-48 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Dates</th>
              <th scope="col" className="w-40 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">People</th>
              <th scope="col" className="w-32 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Total</th>
              <th scope="col" className="w-32 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
              <th scope="col" className="w-48 relative py-3.5 pl-3 pr-4">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="py-4 pl-4 pr-3 text-sm text-gray-900 truncate">#{booking.id}</td>
                  <td className="px-3 py-4 text-sm">
                    <div className="font-medium text-gray-900 truncate">{booking.customer_name}</div>
                    <div className="text-gray-500 truncate">{booking.customer_email}</div>
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500 truncate">
                    {getBookingItemName(booking)}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500 truncate">
                    {formatDate(booking.start_date)} to {formatDate(booking.end_date)}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500 truncate">
                    {booking.adults} adults, {booking.children} children
                  </td>
                  <td className="px-3 py-4 text-sm font-medium text-gray-900 truncate">
                    ${booking.total_price.toFixed(2)}
                  </td>
                  <td className="px-3 py-4 text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : ''}
                      ${booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${booking.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}`}
                    >
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 pl-3 pr-4 text-right text-sm font-medium">
                    <button 
                      onClick={() => handleViewDetails(booking)}
                      className="text-orange-600 hover:text-orange-900 mr-3"
                    >
                      View Details
                    </button>
                    {booking.status === 'pending' && (
                      <button 
                        onClick={() => handleConfirmBooking(booking.id)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Confirm
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-3 py-8 text-center text-sm text-gray-500">
                  No bookings found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Booking Details Modal */}
      {showDetailsModal && selectedBooking && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
          <div className="relative mx-auto p-8 w-full max-w-4xl bg-white rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Booking Details</h2>
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Booking Information */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-700 border-b pb-2">Booking Information</h3>
                <dl className="grid grid-cols-1 gap-2">
                  <div className="flex py-2">
                    <dt className="w-1/3 font-medium text-gray-500">Booking ID:</dt>
                    <dd className="w-2/3 text-gray-900">#{selectedBooking.id}</dd>
                  </div>
                  <div className="flex py-2">
                    <dt className="w-1/3 font-medium text-gray-500">Booking Date:</dt>
                    <dd className="w-2/3 text-gray-900">{formatDate(selectedBooking.created_at)}</dd>
                  </div>
                  <div className="flex py-2">
                    <dt className="w-1/3 font-medium text-gray-500">Status:</dt>
                    <dd className="w-2/3">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${selectedBooking.status === 'confirmed' ? 'bg-green-100 text-green-800' : ''}
                        ${selectedBooking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${selectedBooking.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}`}
                      >
                        {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                      </span>
                    </dd>
                  </div>
                  <div className="flex py-2">
                    <dt className="w-1/3 font-medium text-gray-500">Total Price:</dt>
                    <dd className="w-2/3 text-gray-900 font-semibold">${selectedBooking.total_price.toFixed(2)}</dd>
                  </div>
                </dl>
              </div>

              {/* Customer Information */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-700 border-b pb-2">Customer Information</h3>
                <dl className="grid grid-cols-1 gap-2">
                  <div className="flex py-2">
                    <dt className="w-1/3 font-medium text-gray-500">Name:</dt>
                    <dd className="w-2/3 text-gray-900">{selectedBooking.customer_name}</dd>
                  </div>
                  <div className="flex py-2">
                    <dt className="w-1/3 font-medium text-gray-500">Email:</dt>
                    <dd className="w-2/3 text-gray-900">{selectedBooking.customer_email}</dd>
                  </div>
                  <div className="flex py-2">
                    <dt className="w-1/3 font-medium text-gray-500">Phone:</dt>
                    <dd className="w-2/3 text-gray-900">{selectedBooking.customer_phone}</dd>
                  </div>
                  <div className="flex py-2">
                    <dt className="w-1/3 font-medium text-gray-500">People:</dt>
                    <dd className="w-2/3 text-gray-900">{selectedBooking.adults} adults, {selectedBooking.children} children</dd>
                  </div>
                </dl>
              </div>

              {/* Travel Details */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-700 border-b pb-2">Travel Details</h3>
                <dl className="grid grid-cols-1 gap-2">
                  <div className="flex py-2">
                    <dt className="w-1/3 font-medium text-gray-500">Travel Dates:</dt>
                    <dd className="w-2/3 text-gray-900">{formatDate(selectedBooking.start_date)} to {formatDate(selectedBooking.end_date)}</dd>
                  </div>
                  {selectedBooking.tour_package_id && (
                    <div className="flex py-2">
                      <dt className="w-1/3 font-medium text-gray-500">Tour Package:</dt>
                      <dd className="w-2/3 text-gray-900">
                        {getBookingItemName(selectedBooking)}
                      </dd>
                    </div>
                  )}
                  {selectedBooking.vehicle_id && (
                    <div className="flex py-2">
                      <dt className="w-1/3 font-medium text-gray-500">Vehicle:</dt>
                      <dd className="w-2/3 text-gray-900">
                        {getBookingItemName(selectedBooking)}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Additional Information */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-700 border-b pb-2">Additional Information</h3>
                <dl className="grid grid-cols-1 gap-2">
                  <div className="flex py-2">
                    <dt className="w-1/3 font-medium text-gray-500">Special Requests:</dt>
                    <dd className="w-2/3 text-gray-900">{selectedBooking.notes || 'None'}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              {selectedBooking.status === 'pending' && (
                <button 
                  onClick={() => {
                    handleConfirmBooking(selectedBooking.id);
                    setShowDetailsModal(false);
                  }}
                  className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mr-3"
                >
                  Confirm Booking
                </button>
              )}
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsPage; 
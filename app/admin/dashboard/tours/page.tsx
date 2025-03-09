'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { mockTours } from '@/app/lib/mockData';
import { TourPackage } from '@/app/lib/types';

const TourManagementPage = () => {
  const [tours, setTours] = useState<TourPackage[]>(mockTours);
  const [editingTourId, setEditingTourId] = useState<string | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleEditPrice = (id: string) => {
    setEditingTourId(id);
  };

  const handlePriceChange = (id: string, newPrice: number) => {
    // Update the tour price in the mock data array
    const updatedTours = tours.map(tour => {
      if (tour.id === id) {
        return { ...tour, price: newPrice };
      }
      return tour;
    });

    // Update the state and the mockTours array (which is used elsewhere in the app)
    setTours(updatedTours);
    
    // Update the global mockTours array so changes reflect everywhere
    const tourIndex = mockTours.findIndex(tour => tour.id === id);
    if (tourIndex !== -1) {
      mockTours[tourIndex].price = newPrice;
    }
    
    // Show success message
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
    
    // Exit edit mode
    setEditingTourId(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Tour Package Management</h1>
        <Link 
          href="/admin/dashboard" 
          className="text-orange-500 hover:text-orange-600 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Back to Dashboard
        </Link>
      </div>
      
      {showSuccessMessage && (
        <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">
                Tour price updated successfully. This change will be reflected throughout the site.
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tour</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (USD)</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tours.map((tour) => (
              <tr key={tour.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12 relative overflow-hidden rounded-md">
                      <Image 
                        src={tour.image} 
                        alt={tour.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{tour.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{tour.description.substring(0, 60)}...</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{tour.duration} days</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingTourId === tour.id ? (
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        const form = e.target as HTMLFormElement;
                        const priceInput = form.elements.namedItem('price') as HTMLInputElement;
                        const newPrice = parseFloat(priceInput.value);
                        if (!isNaN(newPrice) && newPrice > 0) {
                          handlePriceChange(tour.id, newPrice);
                        }
                      }}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="number"
                        name="price"
                        min="0"
                        step="0.01"
                        defaultValue={tour.price}
                        className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-24 sm:text-sm border-gray-300 rounded-md"
                      />
                      <button
                        type="submit"
                        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingTourId(null)}
                        className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                      >
                        Cancel
                      </button>
                    </form>
                  ) : (
                    <div className="text-sm font-medium text-gray-900">${tour.price.toFixed(2)}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    tour.featured ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {tour.featured ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {editingTourId !== tour.id && (
                    <button
                      onClick={() => handleEditPrice(tour.id)}
                      className="text-orange-600 hover:text-orange-900"
                    >
                      Edit Price
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 text-sm text-gray-500">
        <p>
          Note: Price changes will be reflected immediately across the website. Make sure to double-check before saving.
        </p>
      </div>
    </div>
  );
};

export default TourManagementPage; 
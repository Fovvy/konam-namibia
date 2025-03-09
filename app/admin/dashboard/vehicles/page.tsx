'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { mockVehicles } from '@/app/lib/mockData';
import { Vehicle } from '@/app/lib/types';

const VehicleManagementPage = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [editingVehicleId, setEditingVehicleId] = useState<string | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleEditPrice = (id: string) => {
    setEditingVehicleId(id);
  };

  const handlePriceChange = (id: string, newPrice: number) => {
    // Update the vehicle price in the mock data array
    const updatedVehicles = vehicles.map(vehicle => {
      if (vehicle.id === id) {
        return { ...vehicle, price_per_day: newPrice };
      }
      return vehicle;
    });

    // Update the state and the mockVehicles array (which is used elsewhere in the app)
    setVehicles(updatedVehicles);
    
    // Update the global mockVehicles array so changes reflect everywhere
    const vehicleIndex = mockVehicles.findIndex(vehicle => vehicle.id === id);
    if (vehicleIndex !== -1) {
      mockVehicles[vehicleIndex].price_per_day = newPrice;
    }
    
    // Show success message
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
    
    // Exit edit mode
    setEditingVehicleId(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Vehicle Rental Management</h1>
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
                Vehicle price updated successfully. This change will be reflected throughout the site.
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price Per Day (USD)</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12 relative overflow-hidden rounded-md">
                      <Image 
                        src={vehicle.image} 
                        alt={vehicle.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{vehicle.name}</div>
                      {vehicle.description && (
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {vehicle.description.substring(0, 60)}...
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{vehicle.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{vehicle.capacity} persons</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingVehicleId === vehicle.id ? (
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        const form = e.target as HTMLFormElement;
                        const priceInput = form.elements.namedItem('price') as HTMLInputElement;
                        const newPrice = parseFloat(priceInput.value);
                        if (!isNaN(newPrice) && newPrice > 0) {
                          handlePriceChange(vehicle.id, newPrice);
                        }
                      }}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="number"
                        name="price"
                        min="0"
                        step="0.01"
                        defaultValue={vehicle.price_per_day}
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
                        onClick={() => setEditingVehicleId(null)}
                        className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                      >
                        Cancel
                      </button>
                    </form>
                  ) : (
                    <div className="text-sm font-medium text-gray-900">${vehicle.price_per_day.toFixed(2)}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    vehicle.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {vehicle.available ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {editingVehicleId !== vehicle.id && (
                    <button
                      onClick={() => handleEditPrice(vehicle.id)}
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

export default VehicleManagementPage; 
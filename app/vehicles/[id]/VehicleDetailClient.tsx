'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Vehicle } from '@/app/lib/types';
import { mockVehicles } from '@/app/lib/mockData';

interface VehicleDetailClientProps {
  vehicle: Vehicle;
}

export default function VehicleDetailClient({ vehicle }: VehicleDetailClientProps) {
  const router = useRouter();

  return (
    <main className="pt-32 pb-16">
      {/* Hero Section */}
      <div className="relative h-96 w-full">
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">{vehicle.name}</h1>
            <p className="text-xl mb-6">{vehicle.category || vehicle.type}</p>
            <div className="inline-block bg-orange-500 text-white px-6 py-3 rounded-md font-bold text-lg">
              ${vehicle.pricePerDay || vehicle.price_per_day} per day
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Overview */}
      <section className="py-12">
        <div className="container-custom mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Vehicle Overview</h2>
              <p className="text-gray-600 mb-6">{vehicle.description || `${vehicle.name} is a ${vehicle.type} vehicle available for rent.`}</p>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Features</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {vehicle.features.map((feature, index) => (
                  <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
                    {feature}
                  </span>
                ))}
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-3">Specifications</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500 text-sm">Passengers</p>
                  <p className="text-gray-900 font-bold">{vehicle.passengers || vehicle.capacity}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500 text-sm">Transmission</p>
                  <p className="text-gray-900 font-bold">{vehicle.transmission || 'Automatic'}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500 text-sm">Fuel Type</p>
                  <p className="text-gray-900 font-bold">{vehicle.fuelType || 'Diesel'}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500 text-sm">Air Conditioning</p>
                  <p className="text-gray-900 font-bold">{(vehicle.airConditioning === undefined ? true : vehicle.airConditioning) ? 'Yes' : 'No'}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500 text-sm">Drive Type</p>
                  <p className="text-gray-900 font-bold">{vehicle.driveType || '4x4'}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500 text-sm">Luggage Space</p>
                  <p className="text-gray-900 font-bold">{vehicle.luggageSpace || 'Standard'}</p>
                </div>
              </div>
            </div>

            {/* Booking Sidebar */}
            <div>
              <div className="bg-gray-50 p-6 rounded-lg sticky top-32">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Rent This Vehicle</h3>
                <div className="mb-4">
                  <p className="text-gray-500 mb-1">Starting from</p>
                  <p className="text-3xl font-bold text-orange-500">${vehicle.pricePerDay || vehicle.price_per_day} <span className="text-gray-500 text-base font-normal">per day</span></p>
                </div>
                <div className="mb-6">
                  <p className="text-gray-500 mb-1">Minimum Rental</p>
                  <p className="text-lg">{vehicle.minRental || 1} days</p>
                </div>
                <button
                  onClick={() => router.push(`/bookings?vehicle=${vehicle.id}`)}
                  className="block text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-md transition-colors w-full"
                >
                  Book This Vehicle
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Vehicles */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Similar Vehicles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {mockVehicles
              .filter(v => v.id !== vehicle.id && v.type === vehicle.type)
              .slice(0, 3)
              .map(v => (
                <div key={v.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="relative h-48">
                    <Image src={v.image} alt={v.name} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-gray-800">{v.name}</h3>
                    <p className="text-gray-600 mb-2">{v.capacity} passengers</p>
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-bold text-orange-500">${v.price_per_day}/day</p>
                      <Link href={`/vehicles/${v.id}`} 
                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-3 rounded transition-colors">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}

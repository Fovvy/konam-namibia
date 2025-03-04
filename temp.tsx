// Server Component
import React from 'react';
import { mockTours } from '@/app/lib/mockData';
import TourDetailClient from './app/tours/[id]/TourDetailClient';

// This function is required for static exports
export async function generateStaticParams() {
  return mockTours.map((tour) => ({
    id: tour.id,
  }));
}

export default function TourDetails({ params }: { params: { id: string } }) {
  const tour = mockTours.find((t) => t.id === params.id);

  if (!tour) {
    return <div className="min-h-screen flex items-center justify-center">Tour not found</div>;
  }

  return <TourDetailClient tour={tour} />;
}

// Server Component for Vehicle Details
import React from 'react';
import { mockVehicles } from '@/app/lib/mockData';
import VehicleDetailClient from './app/vehicles/[id]/VehicleDetailClient';

// This function is required for static exports 
export async function generateStaticParams() {
  return mockVehicles.map((vehicle) => ({
    id: vehicle.id,
  }));
}

export default function VehicleDetails({ params }: { params: { id: string } }) {
  const vehicle = mockVehicles.find((v) => v.id === params.id);

  if (!vehicle) {
    return <div className="min-h-screen flex items-center justify-center">Vehicle not found</div>;
  }

  return <VehicleDetailClient vehicle={vehicle} />;
}

// Client Component
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Vehicle } from '@/app/lib/types';

interface VehicleDetailClientProps {
  vehicle: Vehicle;
}

export function VehicleDetailClient({ vehicle }: VehicleDetailClientProps) {
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
            <p className="text-xl mb-6">{vehicle.category}</p>
            <div className="inline-block bg-orange-500 text-white px-6 py-3 rounded-md font-bold text-lg">
              ${vehicle.pricePerDay} per day
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
              <p className="text-gray-600 mb-6">{vehicle.description}</p>
              
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
                  <p className="text-gray-900 font-bold">{vehicle.passengers}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500 text-sm">Transmission</p>
                  <p className="text-gray-900 font-bold">{vehicle.transmission}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500 text-sm">Fuel Type</p>
                  <p className="text-gray-900 font-bold">{vehicle.fuelType}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500 text-sm">Air Conditioning</p>
                  <p className="text-gray-900 font-bold">{vehicle.airConditioning ? 'Yes' : 'No'}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500 text-sm">Drive Type</p>
                  <p className="text-gray-900 font-bold">{vehicle.driveType}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500 text-sm">Luggage Space</p>
                  <p className="text-gray-900 font-bold">{vehicle.luggageSpace}</p>
                </div>
              </div>
            </div>

            {/* Booking Sidebar */}
            <div>
              <div className="bg-gray-50 p-6 rounded-lg sticky top-32">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Rent This Vehicle</h3>
                <div className="mb-4">
                  <p className="text-gray-500 mb-1">Starting from</p>
                  <p className="text-3xl font-bold text-orange-500">${vehicle.pricePerDay} <span className="text-gray-500 text-base font-normal">per day</span></p>
                </div>
                <div className="mb-6">
                  <p className="text-gray-500 mb-1">Minimum Rental</p>
                  <p className="text-lg">{vehicle.minRental} days</p>
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
    </main>
  );
}

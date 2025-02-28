'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { mockTours } from '@/app/lib/mockData';
import { TourPackage } from '@/app/lib/types';
import ItinerarySection from '@/app/components/tours/ItinerarySection';

export default function TourDetails({ params }: { params: { id: string } }) {
  const router = useRouter();
  const tour = mockTours.find((t) => t.id === params.id);

  if (!tour) {
    return <div className="min-h-screen flex items-center justify-center">Tour not found</div>;
  }

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
            <div className="inline-block bg-orange-500 text-white px-6 py-3 rounded-md font-bold text-lg">
              ${tour.price} per person
            </div>
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
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Tour Details</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span><strong>Duration:</strong> {tour.duration} days</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span><strong>Price:</strong> ${tour.price} per person</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <strong>Inclusions:</strong>
                    <ul className="list-disc ml-5 mt-1">
                      {tour.inclusions.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <strong>Exclusions:</strong>
                    <ul className="list-disc ml-5 mt-1">
                      {tour.exclusions.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>

              <button 
                onClick={() => router.push(`/bookings?tour=${tour.id}`)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-md mt-6 transition-colors"
              >
                Book This Tour
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Itinerary Section */}
      {tour.itinerary && <ItinerarySection itinerary={tour.itinerary} />}

      {/* CTA Section */}
      <section className="py-12 bg-gray-800 text-white">
        <div className="container-custom mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Namibia?</h2>
          <p className="text-gray-300 mb-8 max-w-3xl mx-auto">
            Book your tour today or contact us for customized options. We're ready to help you create memories that will last a lifetime.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => router.push(`/bookings?tour=${tour.id}`)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-md transition-colors"
            >
              Book Now
            </button>
            <button 
              onClick={() => router.push(`/enquiry?tour=${tour.id}`)}
              className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-800 text-white font-bold py-3 px-8 rounded-md transition-colors"
            >
              Make an Enquiry
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

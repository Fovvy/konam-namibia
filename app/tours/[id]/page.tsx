// Server Component
import React from 'react';
import { mockTours } from '@/app/lib/mockData';
import TourDetailClient from './TourDetailClient';

// This function is required for static exports
export async function generateStaticParams() {
  return mockTours.map((tour) => ({
    id: tour.id,
  }));
}

interface PageProps {
  params: {
    id: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function TourDetails({ params }: PageProps) {
  // Ensure params is fully resolved before accessing properties
  const id = params.id;
  const tour = mockTours.find((t) => t.id === id);

  if (!tour) {
    return <div className="min-h-screen flex items-center justify-center">Tour not found</div>;
  }

  return <TourDetailClient tour={tour} />;
}

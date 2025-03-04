// Server Component
import React from 'react';
import { mockTours } from '@/app/lib/mockData';
import TourDetailClient from './TourDetailClient';
import { Metadata } from 'next';

// This function is required for static exports
export async function generateStaticParams() {
  return mockTours.map((tour) => ({
    id: tour.id,
  }));
}

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function TourDetails({ params }: Props) {
  const tour = mockTours.find((t) => t.id === params.id);

  if (!tour) {
    return <div className="min-h-screen flex items-center justify-center">Tour not found</div>;
  }

  return <TourDetailClient tour={tour} />;
}

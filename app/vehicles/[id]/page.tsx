// Server Component for Vehicle Details
import React from 'react';
import { mockVehicles } from '@/app/lib/mockData';
import VehicleDetailClient from './VehicleDetailClient';
import { Metadata } from 'next';

// This function is required for static exports 
export async function generateStaticParams() {
  return mockVehicles.map((vehicle) => ({
    id: vehicle.id,
  }));
}

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function VehicleDetails({ params }: Props) {
  const vehicle = mockVehicles.find((v) => v.id === params.id);

  if (!vehicle) {
    return <div className="min-h-screen flex items-center justify-center">Vehicle not found</div>;
  }

  return <VehicleDetailClient vehicle={vehicle} />;
}

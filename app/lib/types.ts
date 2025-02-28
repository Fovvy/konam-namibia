export interface TourPackage {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: number; // in days
  image: string;
  featured: boolean;
  attractions: string[];
  inclusions: string[];
  exclusions: string[];
  created_at: string;
  itinerary?: ItineraryDay[]; // Optional detailed itinerary
}

export interface Vehicle {
  id: string;
  name: string;
  type: string;
  capacity: number;
  price_per_day: number;
  image: string;
  features: string[];
  available: boolean;
  created_at: string;
}

export interface Booking {
  id: string;
  user_id: string;
  tour_package_id: string | null;
  vehicle_id: string | null;
  start_date: string;
  end_date: string;
  num_people: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
}

export interface Review {
  id: string;
  user_id: string;
  tour_package_id: string | null;
  vehicle_id: string | null;
  rating: number;
  comment: string;
  user_name: string;
  created_at: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  num_people: number;
  start_date: string | null;
  end_date: string | null;
  tour_package_id: string | null;
  attractions: string[];
  message: string;
  status: 'new' | 'contacted' | 'converted' | 'closed';
  created_at: string;
}

export interface ItineraryDay {
  day: number;
  date?: string;
  location: string;
  transportation: string;
  accommodation: string;
  meals: {
    breakfast?: string;
    lunch?: string;
    dinner?: string;
  };
  activities: Activity[];
}

export interface Activity {
  time?: string;
  description: string;
  isOptional?: boolean;
}

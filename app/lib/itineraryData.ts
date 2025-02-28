import { ItineraryDay } from './types';

// 4 Day / 5 Night Namibia Itinerary
export const fourDayNamibiaItinerary: ItineraryDay[] = [
  {
    day: 1,
    location: 'Windhoek',
    transportation: 'Private Tour Vehicle',
    accommodation: 'Windhoek Hilton Hotel or equivalent',
    meals: {
      breakfast: '',
      lunch: 'In-flight meal',
      dinner: 'Hotel dinner'
    },
    activities: [
      { time: '19:50', description: 'Arrival in Windhoek' },
      { description: 'Hotel check-in' }
    ]
  },
  {
    day: 2,
    location: 'Windhoek → Sossusvlei',
    transportation: 'Private Tour Vehicle',
    accommodation: 'Dead Valley Lodge or equivalent',
    meals: {
      breakfast: 'Hotel breakfast',
      lunch: 'Solitaire (Korean lunch box)',
      dinner: 'Lodge dinner'
    },
    activities: [
      { time: '08:00', description: 'Departure to the desert' },
      { time: '12:00', description: 'Lunch at Solitaire' },
      { time: '14:30', description: 'Arrival at desert lodge' },
      { time: '17:30', description: 'Sundowner drive', isOptional: true },
      { time: '19:00', description: 'Dinner' }
    ]
  },
  {
    day: 3,
    location: 'Sesriem & Sossusvlei',
    transportation: 'Private Tour Vehicle',
    accommodation: 'Dead Valley Lodge or equivalent',
    meals: {
      breakfast: 'Packed breakfast',
      lunch: 'Lodge lunch',
      dinner: 'Lodge dinner'
    },
    activities: [
      { time: '05:30', description: 'Desert sunrise experience' },
      { time: '09:00', description: 'Visit to Sossusvlei and Deadvlei' },
      { time: '13:00', description: 'Lunch' },
      { time: '18:00', description: 'Sesriem Canyon sunset' },
      { time: '19:30', description: 'Dinner' }
    ]
  },
  {
    day: 4,
    location: 'Sossusvlei → Swakopmund & Walvis Bay',
    transportation: 'Private Tour Vehicle',
    accommodation: 'Strand Hotel Swakopmund or equivalent',
    meals: {
      breakfast: 'Hotel breakfast',
      lunch: 'Independent lunch',
      dinner: 'Local restaurant (Jetty 1905)'
    },
    activities: [
      { time: '07:00', description: 'Breakfast' },
      { time: '08:00', description: 'Departure to Swakopmund' },
      { time: '11:00', description: 'Visit Welwitschia plants' },
      { time: '11:30', description: 'Visit Moon landscape' },
      { time: '13:00', description: 'Lunch' },
      { time: '14:00', description: 'Hotel check-in' },
      { time: '14:00', description: 'Free time in Swakopmund' },
      { time: '18:00', description: 'Dinner at local restaurant' }
    ]
  },
  {
    day: 5,
    location: 'Swakopmund & Walvis Bay',
    transportation: 'Private Tour Vehicle',
    accommodation: '',
    meals: {
      breakfast: 'Hotel breakfast',
      lunch: 'Local lunch',
      dinner: 'Lodge dinner'
    },
    activities: [
      { time: '07:00', description: 'Breakfast' },
      { time: '08:30', description: 'Morning Sandwich Harbor tour (optional)' },
      { time: '12:30', description: 'Lunch' },
      { time: '14:00', description: 'Transfer to airport' }
    ]
  }
];

// 7 Day Namibia Itinerary
export const sevenDayNamibiaItinerary: ItineraryDay[] = [
  {
    day: 1,
    date: '1/15',
    location: 'Windhoek',
    transportation: 'Flight 4Z128',
    accommodation: 'Hilton Windhoek Hotel or equivalent',
    meals: {
      breakfast: '',
      lunch: '',
      dinner: ''
    },
    activities: [
      { time: '19:45', description: 'Arrival in Windhoek and meet with guide' },
      { description: 'Transfer to hotel and check-in' },
      { description: 'Rest at hotel' }
    ]
  },
  {
    day: 2,
    date: '1/16',
    location: 'Windhoek → Sossusvlei',
    transportation: 'Private Vehicle',
    accommodation: 'Desert Lodge',
    meals: {
      breakfast: 'Hotel breakfast',
      lunch: 'Lodge lunch',
      dinner: 'Lodge dinner'
    },
    activities: [
      { description: 'Departure from Windhoek to Sossusvlei, one of Namibia\'s top attractions' },
      { description: 'Enjoy the sunset over the red dunes of the Namib desert' },
      { description: 'Lodge dinner and rest' }
    ]
  },
  {
    day: 3,
    date: '1/17',
    location: 'Sossusvlei, Dune 45, Deadvlei, Sesriem Canyon',
    transportation: 'Private Vehicle',
    accommodation: 'Desert Lodge',
    meals: {
      breakfast: 'Lodge breakfast',
      lunch: 'Lodge lunch',
      dinner: 'Lodge dinner'
    },
    activities: [
      { description: 'Early morning departure from lodge to Sossusvlei' },
      { description: 'Process at the national park gate and tour the sand dunes of Sossusvlei' },
      { description: 'Climb Dune 45, located 45km from Sesriem (round trip takes about 1 hour)' },
      { description: 'Photograph the highlight of Sossusvlei, Deadvlei' },
      { description: 'Return to lodge for lunch and free time or optional activities' },
      { description: 'Visit Sesriem Canyon to admire the magnificent gorge' },
      { description: 'Return to lodge for dinner and overnight stay' }
    ]
  },
  {
    day: 4,
    date: '1/18',
    location: 'Sossusvlei → Swakopmund',
    transportation: 'Private Vehicle',
    accommodation: 'Swakopmund Hotel or equivalent',
    meals: {
      breakfast: 'Lodge breakfast',
      lunch: '',
      dinner: 'Hotel dinner'
    },
    activities: [
      { description: 'Breakfast at lodge then depart for Swakopmund' },
      { description: 'Arrive in Swakopmund' },
      { description: 'Check into hotel and rest' }
    ]
  },
  {
    day: 5,
    date: '1/19',
    location: 'Swakopmund',
    transportation: '',
    accommodation: 'Swakopmund Hotel or equivalent',
    meals: {
      breakfast: 'Hotel breakfast',
      lunch: 'Local lunch',
      dinner: 'Hotel dinner'
    },
    activities: [
      { description: 'Breakfast at hotel followed by city tour' },
      { description: '4x4 Sandwich Harbor tour and Moon landscape tour' }
    ]
  },
  {
    day: 6,
    date: '1/20',
    location: 'Swakopmund',
    transportation: '',
    accommodation: 'Swakopmund Hotel or equivalent',
    meals: {
      breakfast: 'Hotel breakfast',
      lunch: '',
      dinner: ''
    },
    activities: [
      { description: 'Breakfast at hotel' },
      { description: 'Free day - no guided services' }
    ]
  },
  {
    day: 7,
    date: '1/21',
    location: 'Swakopmund → Walvis Bay',
    transportation: '',
    accommodation: '',
    meals: {
      breakfast: 'Hotel breakfast',
      lunch: '',
      dinner: ''
    },
    activities: [
      { description: 'Breakfast at hotel' },
      { description: 'Individual transfer to airport' },
      { description: 'No guided services' }
    ]
  }
];

// 4 Day Southern Africa Tour (Namibia section)
export const southernAfricaTour: ItineraryDay[] = [
  {
    day: 1,
    date: '1/18',
    location: 'Cape Town → Walvis Bay → Swakopmund',
    transportation: 'Flight 4Z 348 / Airlink',
    accommodation: 'Swakopmund Entertainment Center (4-star)',
    meals: {
      breakfast: 'Hotel breakfast',
      lunch: 'Independent',
      dinner: 'Local dinner'
    },
    activities: [
      { time: '14:00', description: 'Depart Cape Town Airport' },
      { time: '16:15', description: 'Arrive at Walvis Bay Airport (visa on arrival)' },
      { time: '17:00', description: 'Visit Moon landscape' },
      { time: '18:00', description: 'Arrive at Swakopmund accommodation and check in' },
      { time: '18:30', description: 'Dinner' }
    ]
  },
  {
    day: 2,
    date: '1/19',
    location: 'Swakopmund → Namib Desert',
    transportation: 'Private Vehicle',
    accommodation: 'Deadvalley Lodge (4-star)',
    meals: {
      breakfast: 'Hotel breakfast',
      lunch: 'Independent',
      dinner: 'Local dinner'
    },
    activities: [
      { time: '07:45', description: 'Check out and start tour' },
      { time: '08:30', description: 'Sandwich Harbor tour (with oysters and snack platter)' },
      { time: '12:30', description: 'Depart for Namib Desert' },
      { time: '15:30', description: 'Stop at Solitaire rest area (possible independent lunch)' },
      { time: '16:30', description: 'Arrive at Namib Desert and lodge check-in' },
      { time: '17:30', description: 'Sesriem Canyon sunset' },
      { time: '19:30', description: 'Dinner' }
    ]
  },
  {
    day: 3,
    date: '1/20',
    location: 'Desert Tour → Windhoek',
    transportation: 'Private Vehicle',
    accommodation: 'Arebusch Lodge (3-star)',
    meals: {
      breakfast: 'Hotel breakfast',
      lunch: 'Packed lunch',
      dinner: 'Local dinner'
    },
    activities: [
      { time: '05:00', description: 'Early wake up for Dune 45 desert tour' },
      { time: '08:00', description: 'Visit Deadvlei' },
      { time: '10:00', description: 'Visit Sossusvlei' },
      { time: '11:00', description: 'Depart for Windhoek' },
      { time: '12:00', description: 'Lunch' },
      { time: '15:30', description: 'Visit Rehoboth rest area' },
      { time: '17:00', description: 'Arrive in Windhoek and hotel check-in' },
      { time: '18:30', description: 'Dinner' }
    ]
  },
  {
    day: 4,
    date: '1/21',
    location: 'Windhoek → Victoria Falls (Zimbabwe)',
    transportation: 'Flight LH 4304 / Lufthansa',
    accommodation: '',
    meals: {
      breakfast: 'Hotel breakfast',
      lunch: '',
      dinner: ''
    },
    activities: [
      { time: '09:00', description: 'Check out and city tour' },
      { time: '10:30', description: 'Depart from Windhoek Airport' },
      { time: '12:15', description: 'Arrive at Victoria Falls Airport (visa on arrival - Kaza Univisa)' },
      { time: '13:40', description: 'Hotel check-in and rest' },
      { time: '16:45', description: 'Zambezi River sunset cruise with dinner' }
    ]
  }
];

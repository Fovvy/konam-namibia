'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../styles/popularDestinations.css';

// Define the destination data
const destinations = [
  {
    id: 1,
    location: 'Namibia',
    name: 'Sossusvlei',
    popularPlaces: '5 Popular attractions',
    image: '/images/destinations/sossusvlei.jpg'
  },
  {
    id: 2,
    location: 'Namibia',
    name: 'Etosha National Park',
    popularPlaces: '10 Popular attractions',
    image: '/images/destinations/etosha.jpg'
  },
  {
    id: 3,
    location: 'Namibia',
    name: 'Swakopmund',
    popularPlaces: '8 Popular attractions',
    image: '/images/destinations/swakopmund.jpg'
  },
  {
    id: 4,
    location: 'Namibia',
    name: 'Fish River Canyon',
    popularPlaces: '4 Popular attractions',
    image: '/images/destinations/fish-river.jpg'
  },
  {
    id: 5,
    location: 'Namibia',
    name: 'Windhoek',
    popularPlaces: '12 Popular attractions',
    image: '/images/destinations/windhoek.jpg'
  },
  {
    id: 6,
    location: 'Namibia',
    name: 'Skeleton Coast',
    popularPlaces: '6 Popular attractions',
    image: '/images/destinations/skeleton-coast.jpg'
  },
  {
    id: 7,
    location: 'Namibia',
    name: 'Damaraland',
    popularPlaces: '7 Popular attractions',
    image: '/images/destinations/damaraland.jpg'
  },
  {
    id: 8,
    location: 'Namibia',
    name: 'Kolmanskop',
    popularPlaces: '3 Popular attractions',
    image: '/images/destinations/kolmanskop.jpg'
  }
];

const PopularDestinations = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="py-20" style={{
      background: `linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)),
                   url('/images/patterns/safari-pattern.png')`,
      backgroundSize: '200px',
      backgroundPosition: 'fixed',
    }}>
      <div className="container-custom mx-auto">
        <div className="header mb-14 relative">
          <span className="text-orange-500 uppercase tracking-wide font-bold text-sm">Top Destinations</span>
          <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mt-2 mb-4">Popular Destinations</h2>
          <p className="text-gray-600 max-w-2xl">
            Experience the beauty and diversity of Namibia with our carefully curated travel packages that showcase the country&apos;s most breathtaking destinations.
          </p>
          <p className="text-gray-300 text-md mb-4">
            From the surreal red dunes of Sossusvlei to the stark beauty of Skeleton Coast, Namibia&apos;s landscapes will leave you in awe.
          </p>
        </div>

        {isMounted && (
          <div className="carousel-container relative mt-10">
            <Slider {...settings} className="destination-carousel">
              {destinations.map((destination) => (
                <div key={destination.id} className="px-2">
                  <div className="item relative h-[400px] rounded-xl overflow-hidden">
                    <div className="absolute inset-0">
                      <Image 
                        src={destination.image} 
                        alt={destination.name} 
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="overlay absolute inset-0 flex flex-col justify-between p-7 bg-gradient-to-t from-navy-900 via-navy-900/60 to-transparent">
                      <span className="bg-white/25 backdrop-blur-sm px-4 py-2 rounded-full text-white inline-block self-start">
                        {destination.location}
                      </span>
                      <div>
                        <h3 className="text-white text-2xl font-bold mb-1">{destination.name}</h3>
                        <p className="text-white/90">{destination.popularPlaces}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularDestinations;

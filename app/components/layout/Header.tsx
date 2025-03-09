'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Tour Packages', href: '/tours' },
  { name: 'Vehicle Rentals', href: '/vehicles' },
  { name: 'Custom Itinerary', href: '/enquiry' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'py-1 shadow-md backdrop-blur-md'
          : 'py-7'
      }`}
      style={{
        background: scrolled 
          ? `linear-gradient(rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75)),
             url('/images/')`
          : 'transparent',
        backgroundSize: scrolled ? '200px' : 'auto',
        backgroundPosition: 'center',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(8px)' : 'none',
        boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none',
        border: scrolled ? '1px solid rgba(255, 255, 255, 0.3)' : 'none',
      }}
    >
      <div className="container-custom mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative h-14 w-36"
          >
            <Image 
              src={scrolled ? '/images/logo/logo-dark.png' : '/images/logo/logo-orange.png'} 
              alt="KoNam Tours Logo" 
              width={65}
              height={50}
              className="transition-all duration-300"
              priority
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`${scrolled ? 'text-navy-800' : 'text-white'} hover:text-orange-500 font-semibold transition-colors text-base ${!scrolled ? 'bg-black/30 px-3 py-1 rounded-md backdrop-blur-sm' : ''}`}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/bookings"
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md transition-colors text-base font-semibold"
          >
            Book Now
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden ${scrolled ? 'text-navy-800' : 'text-white drop-shadow-md'}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden backdrop-blur-md"
          style={{
            background: `linear-gradient(rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75)),
                         url('/images/hero/patternnnn2.png')`,
            backgroundSize: '200px',
            backgroundPosition: 'center',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid rgba(255, 255, 255, 0.3)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.3)'
          }}
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-navy-800 hover:text-orange-500 font-medium py-2 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/bookings"
                className="bg-orange-500 hover:bg-orange-600 text-white text-center py-3 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book Now
              </Link>
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;

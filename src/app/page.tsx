'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';

const CITIES = [
  { 
    name: 'Hyderabad', 
    image: '/cities/hyderabad.jpg',
    description: 'The City of Pearls',
    projects: '1200+ Projects',
    avgPrice: '₹1.2 Cr - ₹2.5 Cr',
    popularAreas: ['Banjara Hills', 'Gachibowli', 'HITEC City']
  },
  { 
    name: 'Mumbai', 
    image: '/cities/mumbai.jpg',
    description: 'The City of Dreams',
    projects: '2500+ Projects',
    avgPrice: '₹2.5 Cr - ₹5 Cr',
    popularAreas: ['Bandra', 'Juhu', 'Powai']
  },
  { 
    name: 'Delhi', 
    image: '/cities/delhi.jpg',
    description: 'The Capital City',
    projects: '1800+ Projects',
    avgPrice: '₹2 Cr - ₹4 Cr',
    popularAreas: ['Gurgaon', 'Noida', 'Dwarka']
  },
  { 
    name: 'Bangalore', 
    image: '/cities/bangalore.jpg',
    description: 'The Silicon Valley of India',
    projects: '2000+ Projects',
    avgPrice: '₹1.5 Cr - ₹3 Cr',
    popularAreas: ['Whitefield', 'Electronic City', 'Sarjapur']
  },
  { 
    name: 'Chennai', 
    image: '/cities/chennai.jpg',
    description: 'The Detroit of India',
    projects: '1500+ Projects',
    avgPrice: '₹1 Cr - ₹2.5 Cr',
    popularAreas: ['OMR', 'ECR', 'Anna Nagar']
  },
  { 
    name: 'Kolkata', 
    image: '/cities/kolkata.jpg',
    description: 'The City of Joy',
    projects: '1300+ Projects',
    avgPrice: '₹80 Lac - ₹2 Cr',
    popularAreas: ['Salt Lake', 'New Town', 'Rajarhat']
  },
  { 
    name: 'Pune', 
    image: '/cities/pune.jpg',
    description: 'The Oxford of the East',
    projects: '1600+ Projects',
    avgPrice: '₹90 Lac - ₹2 Cr',
    popularAreas: ['Hinjewadi', 'Kharadi', 'Wakad']
  },
  { 
    name: 'Ahmedabad', 
    image: '/cities/ahmedabad.jpg',
    description: 'The Manchester of India',
    projects: '1100+ Projects',
    avgPrice: '₹60 Lac - ₹1.5 Cr',
    popularAreas: ['SG Highway', 'Prahlad Nagar', 'Bopal']
  },
  { 
    name: 'Jaipur', 
    image: '/cities/jaipur.jpg',
    description: 'The Pink City',
    projects: '900+ Projects',
    avgPrice: '₹50 Lac - ₹1.2 Cr',
    popularAreas: ['Vaishali Nagar', 'Mansarovar', 'Sitapura']
  },
  { 
    name: 'Lucknow', 
    image: '/cities/lucknow.jpg',
    description: 'The City of Nawabs',
    projects: '800+ Projects',
    avgPrice: '₹40 Lac - ₹1 Cr',
    popularAreas: ['Gomti Nagar', 'Alambagh', 'Indira Nagar']
  }
];

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [priceFilter, setPriceFilter] = useState('');

  const filteredCities = CITIES.filter(city => {
    const matchesSearch = city.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    
    if (!priceFilter) return true;
    
    const [minPrice, maxPrice] = priceFilter.split('-').map(p => 
      parseFloat(p.replace(/[^0-9.]/g, ''))
    );
    
    const cityMinPrice = parseFloat(city.avgPrice.split('-')[0].replace(/[^0-9.]/g, ''));
    const cityMaxPrice = parseFloat(city.avgPrice.split('-')[1].replace(/[^0-9.]/g, ''));
    
    return cityMinPrice >= minPrice && cityMaxPrice <= maxPrice;
  });

  const handleCitySelect = (cityName: string) => {
    setSelectedCity(cityName);
    router.push(`/city/${cityName.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">MagicBricks</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600">
                Login
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                Register
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Find Your <span className="text-blue-600">Dream Home</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore thousands of real estate projects across India's most vibrant cities
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for a city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
              <div className="absolute right-4 top-4">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="px-6 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            >
              <option value="">All Price Ranges</option>
              <option value="0-50">Under ₹50 Lac</option>
              <option value="50-100">₹50 Lac - ₹1 Cr</option>
              <option value="100-200">₹1 Cr - ₹2 Cr</option>
              <option value="200-500">₹2 Cr - ₹5 Cr</option>
              <option value="500-1000">₹5 Cr+</option>
            </select>
          </div>
        </motion.div>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCities.map((city, index) => (
            <motion.div
              key={city.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative group cursor-pointer"
              onClick={() => handleCitySelect(city.name)}
            >
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-white">
                      {city.name}
                    </h3>
                    <p className="text-gray-200">
                      {city.description}
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-gray-300">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span>{city.projects}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-300">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{city.avgPrice}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {city.popularAreas.map((area, i) => (
                        <span key={i} className="px-2 py-1 text-xs bg-white/10 rounded-full text-white">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/20 transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCities.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="max-w-md mx-auto">
              <svg
                className="w-16 h-16 mx-auto text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 19.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No cities found
              </h3>
              <p className="text-gray-500">
                Try searching with a different term or browse our featured cities above
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About Us</h3>
              <p className="text-gray-600">
                India's leading real estate platform, helping you find your dream home.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Buy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Rent</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Projects</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Agents</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Help Center</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Contact Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500">
            <p>© 2024 MagicBricks. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

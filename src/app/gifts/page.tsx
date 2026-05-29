'use client';

import React, { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { getCities, slugify, productImages, defaultProductImage } from '@/lib/data';

const CATEGORIES = ['Art & Decor', 'Food & Drink', 'Fashion & Acc.', 'Experiences'];

const getCategory = (giftName: string): string => {
  const name = giftName.toLowerCase();
  if (name.includes('tea') || name.includes('chocolate') || name.includes('wine') || 
      name.includes('whiskey') || name.includes('bagels') || name.includes('beignets') || 
      name.includes('macaron') || name.includes('olive oil') || name.includes('spice') || 
      name.includes('pizza') || name.includes('nougat') || name.includes('peppercorn') || 
      name.includes('beer') || name.includes('burger')) {
    return 'Food & Drink';
  }
  if (name.includes('ticket') || name.includes('voucher') || name.includes('recording') || 
      name.includes('experience') || name.includes('cruise') || name.includes('show') || 
      name.includes('concert')) {
    return 'Experiences';
  }
  if (name.includes('scarf') || name.includes('belt') || name.includes('trench') || 
      name.includes('blanket') || name.includes('sash') || name.includes('plush')) {
    return 'Fashion & Acc.';
  }
  return 'Art & Decor';
};

export default function GiftsCatalogPage() {
  const cities = getCities();
  
  const allGifts = useMemo(() => {
    return cities.flatMap(city => 
      city.gifts.map(gift => ({
        ...gift,
        cityName: city.city,
        country: city.country,
        category: getCategory(gift.name),
        citySlug: slugify(city.city),
        productSlug: slugify(gift.name)
      }))
    );
  }, [cities]);

  const allCities = useMemo(() => Array.from(new Set(cities.map(c => c.city))), [cities]);
  const allRegions = ['The Americas', 'Europe', 'China'];

  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('Featured');

  const filteredGifts = useMemo(() => {
    return allGifts.filter(gift => {
      const regionMatch = selectedRegions.length === 0 || 
        (selectedRegions.includes('The Americas') && gift.country === 'USA') ||
        (selectedRegions.includes('Europe') && ['France', 'United Kingdom', 'Italy', 'Germany', 'Spain'].includes(gift.country)) ||
        (selectedRegions.includes('China') && gift.country === 'China');
      
      const cityMatch = selectedCities.length === 0 || selectedCities.includes(gift.cityName);
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(gift.category);
      
      return regionMatch && cityMatch && categoryMatch;
    }).sort((a, b) => {
      if (sortBy === 'Price: Low to High') {
        return parseInt(a.price_range_usd) - parseInt(b.price_range_usd);
      }
      if (sortBy === 'Price: High to Low') {
        return parseInt(b.price_range_usd) - parseInt(a.price_range_usd);
      }
      return 0;
    });
  }, [allGifts, selectedRegions, selectedCities, selectedCategories, sortBy]);

  const toggleFilter = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-soft-ivory">
      <Header />
      
      <main className="flex-grow py-12 px-[5%] max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-3 space-y-8">
            <div>
              <h2 className="font-heading text-2xl mb-6 border-b-2 border-champagne-gold pb-2 text-midnight-blue">Filters</h2>
              
              <div className="space-y-8">
                {/* Region Filter */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-warm-gray">Region</h3>
                  <div className="space-y-2">
                    {allRegions.map(region => (
                      <label key={region} className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={selectedRegions.includes(region)}
                          onChange={() => toggleFilter(selectedRegions, setSelectedRegions, region)}
                          className="w-4 h-4 accent-midnight-blue"
                        />
                        <span className="text-slate-700 group-hover:text-champagne-gold transition-colors">{region}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* City Filter */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-warm-gray">City</h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                    {allCities.sort().map(city => (
                      <label key={city} className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={selectedCities.includes(city)}
                          onChange={() => toggleFilter(selectedCities, setSelectedCities, city)}
                          className="w-4 h-4 accent-midnight-blue"
                        />
                        <span className="text-slate-700 group-hover:text-champagne-gold transition-colors">{city}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Category Filter */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-warm-gray">Category</h3>
                  <div className="space-y-2">
                    {CATEGORIES.map(category => (
                      <label key={category} className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={selectedCategories.includes(category)}
                          onChange={() => toggleFilter(selectedCategories, setSelectedCategories, category)}
                          className="w-4 h-4 accent-midnight-blue"
                        />
                        <span className="text-slate-700 group-hover:text-champagne-gold transition-colors">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {(selectedRegions.length > 0 || selectedCities.length > 0 || selectedCategories.length > 0) && (
              <button 
                onClick={() => {
                  setSelectedRegions([]);
                  setSelectedCities([]);
                  setSelectedCategories([]);
                }}
                className="text-xs font-bold uppercase tracking-widest text-champagne-gold hover:text-midnight-blue transition-colors underline"
              >
                Clear All Filters
              </button>
            )}
          </aside>

          {/* Product Grid Area */}
          <div className="lg:col-span-9">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
              <h1 className="font-heading text-4xl text-midnight-blue">All Treasures</h1>
              <div className="flex items-center gap-4">
                <span className="text-sm text-warm-gray font-body">Sort by:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-slate-200 p-2 font-body text-sm focus:outline-none focus:ring-1 focus:ring-champagne-gold"
                >
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredGifts.map((gift, idx) => (
                <Link 
                  key={`${gift.cityName}-${gift.name}-${idx}`}
                  href={`/cities/${gift.citySlug}/products/${gift.productSlug}`}
                  className="bg-white p-6 shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col"
                >
                  <div className="relative aspect-square mb-6 overflow-hidden bg-soft-ivory">
                    <Image 
                      src={productImages[gift.name] || defaultProductImage}
                      alt={gift.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-midnight-blue/80 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 backdrop-blur-sm">
                        {gift.cityName}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex-grow space-y-2">
                    <h3 className="font-heading text-lg text-midnight-blue line-clamp-1">{gift.name}</h3>
                    <p className="text-warm-gray text-xs uppercase tracking-widest font-bold">{gift.category}</p>
                    <p className="text-champagne-gold font-bold font-body">${gift.price_range_usd}</p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-slate-50 flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-midnight-blue opacity-0 group-hover:opacity-100 transition-opacity">
                      View Details
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-champagne-gold">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>

            {filteredGifts.length === 0 && (
              <div className="py-20 text-center space-y-4">
                <p className="text-xl text-slate-500 font-body">No treasures match your current filters.</p>
                <button 
                  onClick={() => {
                    setSelectedRegions([]);
                    setSelectedCities([]);
                    setSelectedCategories([]);
                  }}
                  className="bg-midnight-blue text-white py-3 px-8 font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
            
            <p className="mt-12 text-center text-sm text-warm-gray font-body italic">
              Showing {filteredGifts.length} of {allGifts.length} premium treasures.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

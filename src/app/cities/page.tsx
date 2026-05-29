import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getCitiesByRegion, slugify, cityImages } from '@/lib/data';

export default function CitiesPage() {
  const regions = getCitiesByRegion();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <div className="bg-midnight-blue text-white py-16 px-[5%] text-center">
          <h1 className="font-heading text-5xl mb-4">Global Curations</h1>
          <p className="text-xl opacity-80">Choose a city to explore its unique treasures.</p>
        </div>

        <div className="py-20 px-[5%] max-w-7xl mx-auto">
          {Object.entries(regions).map(([region, cities]) => (
            <div key={region} className="mb-20 last:mb-0">
              <h2 className="font-heading text-3xl mb-10 inline-block border-b-2 border-champagne-gold pb-2">
                {region}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cities.map((city) => (
                  <Link 
                    key={city.city} 
                    href={`/cities/${slugify(city.city)}`}
                    className="group relative h-[300px] overflow-hidden shadow-lg transition-all hover:shadow-2xl"
                  >
                    <Image 
                      src={cityImages[city.city] || 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=600'} 
                      alt={city.city} 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8 text-white">
                      <h3 className="font-heading text-2xl group-hover:text-champagne-gold transition-colors">{city.city}</h3>
                      <p className="text-champagne-gold uppercase text-sm tracking-widest font-bold mt-1">{city.country}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

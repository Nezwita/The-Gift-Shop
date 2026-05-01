import React from 'react';
import Link from 'next/link';

const cities = [
  {
    name: 'New York',
    country: 'USA',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=600',
    slug: 'new-york'
  },
  {
    name: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=600',
    slug: 'paris'
  },
  {
    name: 'Shanghai',
    country: 'China',
    image: 'https://images.unsplash.com/photo-1548919973-5cfe5d4fc494?auto=format&fit=crop&q=80&w=600',
    slug: 'shanghai'
  }
];

const CitySection = () => {
  return (
    <section id="cities" className="py-24 px-6 lg:px-12 bg-soft-ivory">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 font-heading">Explore by City</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {cities.map((city) => (
            <Link 
              key={city.name} 
              href={`/cities/${city.slug}`}
              className="group relative h-[450px] overflow-hidden block shadow-lg"
            >
              <img 
                src={city.image} 
                alt={city.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h3 className="text-3xl font-bold font-heading mb-1">{city.name}</h3>
                <p className="text-sm uppercase tracking-widest text-champagne-gold font-bold">{city.country}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CitySection;

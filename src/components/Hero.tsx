import React from 'react';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 hover:scale-110"
        style={{ 
          backgroundImage: "linear-gradient(rgba(16, 24, 32, 0.6), rgba(16, 24, 32, 0.6)), url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=1920')" 
        }}
      />
      
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight font-heading">
          The Soul of a City, Delivered.
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-10 font-body leading-relaxed max-w-2xl mx-auto">
          Discover hand-curated, iconic treasures from the world's most vibrant metropolises. From Parisian elegance to the energy of New York and the traditions of Beijing.
        </p>
        <Link 
          href="/cities" 
          className="inline-block bg-champagne-gold text-midnight-blue px-10 py-4 font-bold uppercase tracking-[0.2em] hover:bg-[#b0a04c] transition-all transform hover:-translate-y-1"
        >
          Explore the World
        </Link>
      </div>
    </section>
  );
};

export default Hero;

import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CitySection from '@/components/CitySection';
import FeaturedSection from '@/components/FeaturedSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <CitySection />
        
        {/* About / Mission Section */}
        <section id="story" className="py-24 px-6 lg:px-12 bg-midnight-blue text-white overflow-hidden relative">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 font-heading leading-tight">
              A Curation of Culture and <span className="text-champagne-gold">Craftsmanship</span>
            </h2>
            <p className="text-lg md:text-xl text-warm-gray leading-relaxed mb-12 font-body italic">
              "We believe that a gift is more than just an object; it's a bridge between cultures. Our team travels the globe to bring you items that embody the spirit of the world's most iconic cities."
            </p>
            <div className="w-24 h-1 bg-champagne-gold mx-auto" />
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-champagne-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-champagne-gold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </section>
        
        <FeaturedSection />
      </main>
      <Footer />
    </div>
  );
}

import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CitySection from '@/components/CitySection';
import FeaturedSection from '@/components/FeaturedSection';
import Footer from '@/components/Footer';
import WaitlistForm from '@/components/WaitlistForm';

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
            <p className="text-lg md:text-xl text-warm-gray leading-relaxed mb-12 font-body italic max-w-3xl mx-auto">
              "Every gift on CuratedCities has a journey. It starts in a workshop, a patisserie, or an atelier in one of the world's great cities. We choose each treasure not because it's popular — but because it's true."
            </p>
            <div className="w-24 h-1 bg-champagne-gold mx-auto" />
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-champagne-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-champagne-gold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </section>
        
        <FeaturedSection />

        {/* Global Waitlist / Newsletter Section */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl text-midnight-blue mb-4">Discover the World with Us</h2>
            <p className="text-warm-gray font-body max-w-2xl mx-auto text-lg">
              Join our inner circle for exclusive access to new city launches, artisan stories, and first-edition treasures.
            </p>
          </div>
          <WaitlistForm />
        </section>
      </main>
      <Footer />
    </div>
  );
}

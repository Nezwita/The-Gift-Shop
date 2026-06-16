import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Our Story - Authentic Luxury Gifts | CuratedCities",
  description: "Discover the vision behind CuratedCities. We bridge the gap between global metropolises and your doorstep, bringing you authentic luxury treasures that resonate with the spirit of NYC, Paris, and Tokyo.",
};

export default function OurStoryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-soft-ivory">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=1920" 
              alt="Luxury Backdrop" 
              className="w-full h-full object-cover brightness-[0.3]"
            />
          </div>
          <div className="relative z-10 px-[5%] max-w-4xl">
            <h1 className="font-heading text-5xl md:text-7xl text-white mb-6 animate-fade-in">The Journey of a Gift</h1>
            <p className="font-body text-xl md:text-2xl text-champagne-gold uppercase tracking-[0.3em] animate-slide-up">
              Every treasure has a story. This is ours.
            </p>
          </div>
        </section>

        {/* Lead-in Narrative: Journey of a Silk Scarf */}
        <section className="py-24 px-[10%] bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading text-4xl md:text-5xl text-midnight-blue mb-16 text-center italic">"From Lyon to Paris to You"</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-6">
                <span className="text-champagne-gold font-heading text-6xl opacity-50 block">01</span>
                <h3 className="font-heading text-2xl text-midnight-blue">The Mulberry Leaf</h3>
                <p className="text-slate-600 leading-relaxed font-body">
                  The story begins in Lyon — France's silk capital since the 16th century. Here, on the banks of the Saône, the last remaining silk weavers still operate their Jacquard looms, threading filaments from mulberry silkworms in the Ardèche region.
                </p>
              </div>
              <div className="space-y-6">
                <span className="text-champagne-gold font-heading text-6xl opacity-50 block">02</span>
                <h3 className="font-heading text-2xl text-midnight-blue">The Atelier</h3>
                <p className="text-slate-600 leading-relaxed font-body">
                  In a tiny atelier in the 7th arrondissement of Paris, an artist hand-paints motifs inspired by the city's heritage. The scarf is then screen-printed — one color at a time. A single piece can take up to 18 months from conception to completion.
                </p>
              </div>
              <div className="space-y-6">
                <span className="text-champagne-gold font-heading text-6xl opacity-50 block">03</span>
                <h3 className="font-heading text-2xl text-midnight-blue">The Final Touch</h3>
                <p className="text-slate-600 leading-relaxed font-body">
                  The edges are hand-rolled by a master artisan. The hem is invisible to the untrained eye, but to a Parisienne, it's the difference between a scarf and an heirloom. And then — it arrives at CuratedCities, ready for your hands.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Narrative Framework */}
        <section className="py-24 px-[10%] bg-soft-ivory">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
            <div className="flex-1 space-y-8 order-2 md:order-1">
              <h2 className="font-heading text-4xl md:text-5xl text-midnight-blue leading-tight">Chosen Because It's True</h2>
              <div className="space-y-6 text-lg text-slate-700 font-body leading-relaxed">
                <p>
                  Every gift on CuratedCities has a journey. It starts in a workshop, a patisserie, or an atelier in one of the world's great cities. We don't choose items because they are popular — we choose them because they are authentic.
                </p>
                <p>
                  Our mission is to bridge the gap between global metropolises and your doorstep, bringing you fragments of a place's identity that resonate with the spirit of the maker, the city, and the tradition.
                </p>
              </div>
            </div>
            <div className="flex-1 order-1 md:order-2">
              <div className="relative group">
                <div className="absolute -inset-4 border-2 border-champagne-gold/30 translate-x-4 translate-y-4 transition-transform group-hover:translate-x-6 group-hover:translate-y-6"></div>
                <img 
                  src="https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&q=80&w=800" 
                  alt="City Craft" 
                  className="relative z-10 w-full h-[500px] object-cover shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 bg-midnight-blue text-white text-center px-[5%]">
          <div className="max-w-4xl mx-auto space-y-10">
            <span className="text-champagne-gold text-6xl font-heading opacity-50 block leading-none">"</span>
            <blockquote className="font-heading text-3xl md:text-5xl leading-tight italic">
              Luxury is not about the price tag; it's about the story, the craftsmanship, and the connection to the world.
            </blockquote>
            <cite className="font-body text-xl text-champagne-gold not-italic font-bold tracking-widest uppercase">
              — The CuratedCities Collective
            </cite>
          </div>
        </section>

        {/* Global/Curious/Authoritative Pillars */}
        <section className="py-24 px-[5%] max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="text-center space-y-4 group">
              <div className="text-champagne-gold text-5xl mb-6 flex justify-center transform transition-transform group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
              </div>
              <h3 className="font-heading text-2xl text-midnight-blue">A Global Lens</h3>
              <p className="text-slate-600 font-body leading-relaxed">
                From the silk markets of Shanghai to the leather ateliers of Greenwich Village, we bring the world's finest gifts to your doorstep.
              </p>
            </div>
            
            <div className="text-center space-y-4 group">
              <div className="text-champagne-gold text-5xl mb-6 flex justify-center transform transition-transform group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
              </div>
              <h3 className="font-heading text-2xl text-midnight-blue">Verified Authority</h3>
              <p className="text-slate-600 font-body leading-relaxed">
                We work directly with master artisans who have been honing their skills for decades. Each item is a testament to quality and heritage.
              </p>
            </div>

            <div className="text-center space-y-4 group">
              <div className="text-champagne-gold text-5xl mb-6 flex justify-center transform transition-transform group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h3 className="font-heading text-2xl text-midnight-blue">Ever Curious</h3>
              <p className="text-slate-600 font-body leading-relaxed">
                Did you know each macaron at Ladurée takes 48 hours to make? We share the details that most people miss, making each gift unmistakable.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

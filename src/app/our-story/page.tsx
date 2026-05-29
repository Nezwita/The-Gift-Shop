import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function OurStoryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-soft-ivory">
      <Header />
      
      <main className="flex-grow">
        <section className="relative h-[50vh] flex items-center justify-center text-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=1920" 
              alt="Luxury Backdrop" 
              className="w-full h-full object-cover brightness-[0.3]"
            />
          </div>
          <div className="relative z-10 px-[5%]">
            <h1 className="font-heading text-5xl md:text-7xl text-white mb-6 animate-fade-in">Our Story</h1>
            <p className="font-body text-xl text-champagne-gold uppercase tracking-[0.3em] animate-slide-up">
              Connecting the world through the art of curated gifting.
            </p>
          </div>
        </section>

        <section className="py-24 px-[10%] bg-soft-ivory">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
            <div className="flex-1 space-y-8 order-2 md:order-1">
              <h2 className="font-heading text-4xl md:text-5xl text-midnight-blue leading-tight">The Soul of a City</h2>
              <div className="space-y-6 text-lg text-slate-700 font-body leading-relaxed">
                <p>
                  Every city has a unique heartbeat, a distinct flavor, and a story told through its craftsmanship. At CuratedCities, we believe that the best gifts are more than just objects—they are fragments of a place's identity.
                </p>
                <p>
                  Our mission is to bridge the gap between global metropolises and your doorstep, bringing you authentic treasures that resonate with the spirit of New York, the elegance of Paris, and the traditions of Beijing.
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
                <div className="absolute top-0 right-0 w-32 h-32 bg-midnight-blue -translate-y-8 translate-x-8 -z-10"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-[10%] bg-white">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
            <div className="flex-1">
              <div className="relative group">
                <div className="absolute -inset-4 border-2 border-midnight-blue/10 -translate-x-4 translate-y-4 transition-transform group-hover:-translate-x-6 group-hover:translate-y-6"></div>
                <img 
                  src="https://images.unsplash.com/photo-1576016773322-80c2793d515d?auto=format&fit=crop&q=80&w=800" 
                  alt="Luxury Item" 
                  className="relative z-10 w-full h-[500px] object-cover shadow-2xl"
                />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-champagne-gold translate-y-8 -translate-x-8 -z-10"></div>
              </div>
            </div>
            <div className="flex-1 space-y-8">
              <h2 className="font-heading text-4xl md:text-5xl text-midnight-blue leading-tight">Authentic Luxury</h2>
              <div className="space-y-6 text-lg text-slate-700 font-body leading-relaxed">
                <p>
                  We don't do mass-produced souvenirs. Our curators spend months on the ground in each city, working directly with local artisans, historic bakeries, and renowned designers.
                </p>
                <p>
                  From the precise pattern of a Murano glass centerpiece to the delicate layers of a Ladurée macaron, every item in our collection is a testament to quality and heritage.
                </p>
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

        <section className="py-24 px-[5%] max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="text-center space-y-4 group">
              <div className="text-champagne-gold text-5xl mb-6 flex justify-center transform transition-transform group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
              </div>
              <h3 className="font-heading text-2xl text-midnight-blue">Global Selection</h3>
              <p className="text-slate-600 font-body leading-relaxed">
                75 iconic items from 15 of the world's most vibrant cities across 3 continents.
              </p>
            </div>
            
            <div className="text-center space-y-4 group">
              <div className="text-champagne-gold text-5xl mb-6 flex justify-center transform transition-transform group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
              </div>
              <h3 className="font-heading text-2xl text-midnight-blue">Verified Origin</h3>
              <p className="text-slate-600 font-body leading-relaxed">
                We guarantee the authenticity of every item, sourced directly from its city of origin.
              </p>
            </div>

            <div className="text-center space-y-4 group">
              <div className="text-champagne-gold text-5xl mb-6 flex justify-center transform transition-transform group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </div>
              <h3 className="font-heading text-2xl text-midnight-blue">Premium Experience</h3>
              <p className="text-slate-600 font-body leading-relaxed">
                From curated packaging to global express shipping, every detail is handled with care.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

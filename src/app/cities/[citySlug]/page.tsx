import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import WaitlistForm from '@/components/WaitlistForm';
import { getCityBySlug, slugify, cityImages, productImages, defaultProductImage } from '@/lib/data';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ citySlug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { citySlug } = await params;
  const city = getCityBySlug(citySlug);

  if (!city) {
    return {
      title: 'City Not Found',
    };
  }

  return {
    title: `${city.city} Luxury Gifts - ${city.tagline || 'Iconic Local Treasures'} | CuratedCities`,
    description: city.origin_story 
      ? `${city.origin_story.substring(0, 160)}...` 
      : `Discover the ultimate collection of luxury gifts from ${city.city}, ${city.country}. Handpicked premium local treasures representing the heritage and finest craftsmanship of ${city.city}.`,
    openGraph: {
      title: `${city.city} Luxury Gifts - CuratedCities`,
      description: `Explore the finest luxury gifts and curated treasures from ${city.city}. Iconic items delivered globally.`,
      images: [cityImages[city.city] || 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=1920'],
    },
  };
}

export default async function CityPage({ params }: Props) {
  const { citySlug } = await params;
  const city = getCityBySlug(citySlug);

  if (!city) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <div className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
          <Image 
            src={cityImages[city.city] || 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=1920'} 
            alt={city.city}
            fill
            className="object-cover brightness-50"
          />
          <div className="relative z-10 text-center text-white px-4 max-w-4xl">
            <h1 className="font-heading text-5xl md:text-7xl mb-4">{city.city}</h1>
            {city.tagline && (
              <p className="text-xl md:text-2xl font-body text-champagne-gold italic mb-6">
                "{city.tagline}"
              </p>
            )}
            <p className="text-lg uppercase tracking-widest text-white/80 font-bold">{city.country}</p>
          </div>
        </div>

        <div className="py-20 px-[5%] max-w-7xl mx-auto">
          {city.origin_story && (
            <div className="mb-20 text-center max-w-3xl mx-auto">
              <h2 className="font-heading text-3xl mb-6 text-midnight-blue">The Soul of {city.city}</h2>
              <p className="text-lg leading-relaxed text-slate-700 font-body">
                {city.origin_story}
              </p>
            </div>
          )}

          {!city.active ? (
            <div className="bg-soft-ivory py-16 px-8 border border-slate-100 text-center">
              <h2 className="font-heading text-4xl mb-6 text-midnight-blue">Coming Soon</h2>
              <p className="text-warm-gray font-body max-w-2xl mx-auto text-lg mb-12">
                We are currently hand-selecting the finest treasures from {city.city} and verifying our artisan partners. Join the waitlist to be notified the moment these icons become available.
              </p>
              <WaitlistForm city={city.city} />
            </div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-slate-200 pb-8">
                <div>
                  <h2 className="font-heading text-4xl mb-2">Local Treasures</h2>
                  <p className="text-warm-gray">Handpicked iconic gifts from {city.city}.</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <Link href="/cities" className="text-sm font-bold uppercase tracking-widest text-midnight-blue hover:text-champagne-gold transition-colors">
                    &larr; Back to all cities
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {city.gifts.map((gift) => (
                  <Link key={gift.name} href={`/cities/${citySlug}/products/${slugify(gift.name)}`}>
                    <ProductCard 
                      name={gift.name}
                      city={city.city}
                      country={city.country}
                      priceRange={gift.price_range_usd}
                      image={productImages[gift.name] || defaultProductImage}
                    />
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

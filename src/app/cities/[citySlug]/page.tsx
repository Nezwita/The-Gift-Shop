import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getCityBySlug, slugify, cityImages, productImages, defaultProductImage } from '@/lib/data';

interface Props {
  params: Promise<{ citySlug: string }>;
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
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="font-heading text-5xl md:text-7xl mb-2">{city.city}</h1>
            <p className="text-xl uppercase tracking-widest text-champagne-gold font-bold">{city.country}</p>
          </div>
        </div>

        <div className="py-20 px-[5%] max-w-7xl mx-auto">
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
        </div>
      </main>

      <Footer />
    </div>
  );
}

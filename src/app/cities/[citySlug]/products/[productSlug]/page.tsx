import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getCityBySlug, getProductBySlug, productImages, defaultProductImage } from '@/lib/data';
import { Metadata } from 'next';

import AddToCartButton from '@/components/AddToCartButton';
import WaitlistForm from '@/components/WaitlistForm';

interface Props {
  params: Promise<{ citySlug: string; productSlug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { citySlug, productSlug } = await params;
  const product = getProductBySlug(citySlug, productSlug);
  const city = getCityBySlug(citySlug);

  if (!product || !city) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} - Luxury ${city.city} Gift | CuratedCities`,
    description: product.story 
      ? `${product.story.headline} ${product.story.origin.substring(0, 100)}...`
      : product.description || `Experience true luxury with the authentic ${product.name} from ${city.city}. A handpicked premium gift representing local heritage and superior quality.`,
    openGraph: {
      title: `${product.name} - Premium ${city.city} Luxury Gifts | CuratedCities`,
      description: product.description,
      images: [productImages[product.name] || defaultProductImage],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { citySlug, productSlug } = await params;
  const city = getCityBySlug(citySlug);
  const product = getProductBySlug(citySlug, productSlug);

  if (!city || !product) {
    notFound();
  }

  const imageUrl = productImages[product.name] || defaultProductImage;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <div className="py-8 px-[5%] max-w-7xl mx-auto">
          <nav className="text-sm mb-12 text-warm-gray">
            <Link href="/" className="hover:text-midnight-blue transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/cities" className="hover:text-midnight-blue transition-colors">Cities</Link>
            <span className="mx-2">/</span>
            <Link href={`/cities/${citySlug}`} className="hover:text-midnight-blue transition-colors">{city.city}</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-black">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
            <div className="bg-white p-12 shadow-sm border border-slate-100 flex items-center justify-center">
              <div className="relative w-full aspect-square">
                <Image 
                  src={imageUrl} 
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-champagne-gold font-bold uppercase tracking-widest text-sm mb-4">
                {city.city}, {city.country}
              </span>
              <h1 className="font-heading text-5xl mb-6 text-midnight-blue leading-tight">{product.name}</h1>
              <div className="text-3xl text-midnight-blue mb-10 font-body">
                ${product.price_range_usd}
              </div>
              
              <div className="prose prose-slate max-w-none mb-12">
                <p className="text-lg leading-relaxed text-slate-700">
                  {product.description}
                </p>
              </div>

              {city.active ? (
                <AddToCartButton 
                  product={{ ...product, image: imageUrl }} 
                  city={{ city: city.city, slug: citySlug }} 
                />
              ) : (
                <div className="bg-soft-ivory p-8 border border-slate-100">
                  <p className="text-midnight-blue font-bold uppercase tracking-widest text-xs mb-4">Coming Soon</p>
                  <p className="text-slate-600 mb-6 font-body">This item is currently being sourced. Join the waitlist for {city.city} to be notified when it's available.</p>
                  <WaitlistForm city={city.city} />
                </div>
              )}

              <div className="mt-16 pt-10 border-t border-slate-100">
                <h2 className="font-heading text-2xl mb-6">The Story</h2>
                {product.story ? (
                  <div className="space-y-8">
                    <p className="text-xl font-body text-midnight-blue italic border-l-4 border-champagne-gold pl-6 py-2">
                      {product.story.headline}
                    </p>
                    <div className="space-y-6 text-slate-600 leading-relaxed font-body">
                      <p><span className="font-bold text-midnight-blue uppercase text-xs tracking-widest block mb-2">The Origin</span> {product.story.origin}</p>
                      <p><span className="font-bold text-midnight-blue uppercase text-xs tracking-widest block mb-2">The Detail</span> {product.story.detail}</p>
                      <p><span className="font-bold text-midnight-blue uppercase text-xs tracking-widest block mb-2">The Gift</span> {product.story.gift}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-600 leading-relaxed italic">
                    {product.description}
                  </p>
                )}
                
                <h2 className="font-heading text-2xl mt-10 mb-6">Shipping Info</h2>
                <p className="text-slate-600 leading-relaxed">
                  To ensure the highest quality, this item is shipped in specialty packaging directly from our partners in {city.city}. Expected delivery: 3-5 business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

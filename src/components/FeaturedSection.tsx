import React from 'react';
import Link from 'next/link';
import ProductCard from './ProductCard';
import { slugify } from '@/lib/data';

const featuredProducts = [
  {
    name: "Ladurée Macaron Collection",
    city: "Paris",
    citySlug: "paris",
    country: "France",
    priceRange: "60 - 95",
    image: "https://images.unsplash.com/photo-1590005354167-6da97870c919?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Napa Valley Wine Gift Set",
    city: "San Francisco",
    citySlug: "san-francisco",
    country: "USA",
    priceRange: "120 - 300",
    image: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Ming Dynasty Style Tea Set",
    city: "Beijing",
    citySlug: "beijing",
    country: "China",
    priceRange: "150 - 350",
    image: "https://images.unsplash.com/photo-1567113379515-6e85ee7c36bf?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Fortnum & Mason Tea Selection",
    city: "London",
    citySlug: "london",
    country: "UK",
    priceRange: "55 - 95",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400"
  }
];

const FeaturedSection = () => {
  return (
    <section className="py-24 px-6 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 font-heading text-midnight-blue">Featured Treasures</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <Link key={product.name} href={`/cities/${product.citySlug}/products/${slugify(product.name)}`}>
              <ProductCard {...product} />
            </Link>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link href="/cities" className="inline-block border-b-2 border-champagne-gold pb-1 font-bold uppercase tracking-widest text-midnight-blue hover:text-champagne-gold transition-colors">
            View All Cities
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;

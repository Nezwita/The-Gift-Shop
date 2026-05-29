import React from 'react';

interface ProductCardProps {
  name: string;
  city: string;
  country: string;
  priceRange: string;
  image: string;
  citySlug?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, city, country, priceRange, image }) => {
  return (
    <div className="bg-white group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100 p-4">
      <div className="aspect-square overflow-hidden mb-6 bg-soft-ivory">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="text-center">
        <h3 className="font-heading text-xl font-bold text-midnight-blue mb-2 line-clamp-1">{name}</h3>
        <p className="text-sm text-warm-gray mb-3 font-medium uppercase tracking-wide">{city}, {country}</p>
        <p className="text-lg font-bold text-champagne-gold font-body">${priceRange}</p>
      </div>
      <button className="w-full mt-6 py-3 border border-midnight-blue text-midnight-blue uppercase tracking-widest text-xs font-bold hover:bg-midnight-blue hover:text-white transition-colors duration-300">
        View Details
      </button>
    </div>
  );
};

export default ProductCard;

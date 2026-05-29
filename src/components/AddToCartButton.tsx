'use client';

import React, { useState } from 'react';
import { useCart, CartItem } from '@/lib/cart';

interface AddToCartButtonProps {
  product: {
    name: string;
    price_range_usd: string;
    image?: string;
  };
  city: {
    city: string;
    slug: string;
  };
}

const AddToCartButton = ({ product, city }: AddToCartButtonProps) => {
  const { addToCart } = useCart();
  const prices = product.price_range_usd.split('-').map(p => parseFloat(p.trim()));
  const [selectedVariant, setSelectedVariant] = useState(0); // 0 for standard, 1 for premium if exists

  const handleAddToCart = () => {
    const price = prices[selectedVariant] || prices[0];
    const variantName = selectedVariant === 1 && prices.length > 1 ? 'Premium Gift Pack' : 'Standard Selection';
    
    const item: CartItem = {
      id: `${city.slug}-${product.name}-${selectedVariant}`,
      name: product.name,
      city: city.city,
      price: price,
      quantity: 1,
      image: product.image || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800',
      variant: variantName
    };
    
    addToCart(item);
    alert(`${product.name} (${variantName}) added to cart!`);
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <label htmlFor="variant" className="block text-sm font-bold uppercase tracking-widest mb-4 text-midnight-blue">
          Select Option
        </label>
        <select 
          id="variant" 
          value={selectedVariant}
          onChange={(e) => setSelectedVariant(parseInt(e.target.value))}
          className="w-full p-4 border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-champagne-gold font-body"
        >
          <option value={0}>Standard Selection - ${prices[0]}</option>
          {prices.length > 1 && (
            <option value={1}>Premium Gift Pack - ${prices[1]}</option>
          )}
        </select>
      </div>

      <button 
        onClick={handleAddToCart}
        className="bg-midnight-blue text-white py-6 px-12 font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors shadow-lg"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default AddToCartButton;

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
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [isBuyingNow, setIsBuyingNow] = useState(false);

  const getVariantName = (index: number) => {
    return index === 1 && prices.length > 1 ? 'Premium Gift Pack' : 'Standard Selection';
  };

  const getCurrentPrice = () => prices[selectedVariant] || prices[0];

  const handleAddToCart = () => {
    const price = getCurrentPrice();
    const variantName = getVariantName(selectedVariant);
    
    const item: CartItem = {
      id: `${city.slug}-${product.name}-${selectedVariant}`,
      name: product.name,
      city: city.city,
      price: price,
      quantity: 1,
      image: product.image || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800',
      variant: variantName,
    };
    
    addToCart(item);
  };

  const handleBuyNow = async () => {
    setIsBuyingNow(true);
    try {
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{
            name: product.name,
            city: city.city,
            price: getCurrentPrice(),
            quantity: 1,
            image: product.image || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800',
            variant: getVariantName(selectedVariant),
          }],
          successUrl: `${window.location.origin}/checkout/success`,
          cancelUrl: window.location.href,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Checkout failed');
      
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error: any) {
      console.error('Buy now error:', error);
      alert('Failed to initiate checkout. Please try again.');
    } finally {
      setIsBuyingNow(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
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

      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          onClick={handleAddToCart}
          className="flex-1 bg-white text-midnight-blue border-2 border-midnight-blue py-5 px-8 font-bold uppercase tracking-widest hover:bg-soft-ivory transition-colors"
        >
          Add to Cart
        </button>

        <button 
          onClick={handleBuyNow}
          disabled={isBuyingNow}
          className="flex-1 bg-midnight-blue text-white py-5 px-8 font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          {isBuyingNow ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Processing...
            </span>
          ) : (
            'Buy Now'
          )}
        </button>
      </div>
    </div>
  );
};

export default AddToCartButton;

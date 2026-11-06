'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/lib/cart';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe client-side
const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    setIsCheckingOut(true);
    setCheckoutError(null);

    try {
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map(item => ({
            name: item.name,
            city: item.city,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            variant: item.variant,
          })),
          successUrl: `${window.location.origin}/checkout/success`,
          cancelUrl: `${window.location.origin}/cart`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout');
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else if (stripePromise && data.sessionId) {
        const stripeInstance = await stripePromise;
        if (stripeInstance) {
          const { error } = await stripeInstance.redirectToCheckout({ sessionId: data.sessionId });
          if (error) throw new Error(error.message);
        }
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      setCheckoutError(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-16 px-[5%] max-w-6xl mx-auto w-full">
        <h1 className="font-heading text-4xl md:text-5xl text-midnight-blue mb-4">Your Cart</h1>
        <p className="text-warm-gray mb-12 font-body uppercase tracking-widest text-sm">
          {cartCount === 0 ? 'Your cart is empty' : `${cartCount} item${cartCount !== 1 ? 's' : ''} in your cart`}
        </p>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-white shadow-sm border border-slate-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 text-slate-300 mx-auto mb-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <h2 className="font-heading text-2xl text-midnight-blue mb-4">Your cart is empty</h2>
            <p className="text-slate-600 mb-8 font-body">Discover treasures from cities around the world.</p>
            <Link 
              href="/gifts"
              className="inline-block bg-midnight-blue text-white py-4 px-10 font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors"
            >
              Explore Gifts
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="bg-white p-6 shadow-sm border border-slate-100 flex gap-6">
                  <div className="w-24 h-24 bg-soft-ivory flex-shrink-0 overflow-hidden">
                    <Image 
                      src={item.image} 
                      alt={item.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="font-heading text-lg text-midnight-blue mb-1">{item.name}</h3>
                    <p className="text-xs text-warm-gray uppercase tracking-widest mb-2">{item.city}</p>
                    {item.variant && (
                      <p className="text-sm text-slate-500 mb-3">{item.variant}</p>
                    )}
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-slate-200">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 text-slate-600 hover:bg-slate-50 transition-colors"
                        >
                          −
                        </button>
                        <span className="px-4 py-1 text-sm font-medium border-x border-slate-200">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 text-slate-600 hover:bg-slate-50 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm text-red-400 hover:text-red-600 transition-colors uppercase tracking-widest"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-right flex-shrink-0">
                    <p className="font-heading text-xl text-midnight-blue">${(item.price * item.quantity).toFixed(2)}</p>
                    {item.quantity > 1 && (
                      <p className="text-xs text-slate-400 mt-1">${item.price.toFixed(2)} each</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 shadow-sm border border-slate-100 sticky top-28">
                <h2 className="font-heading text-xl text-midnight-blue mb-6 pb-4 border-b border-slate-100">
                  Order Summary
                </h2>
                
                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal ({cartCount} items)</span>
                    <span className="text-midnight-blue font-medium">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Shipping</span>
                    <span className="text-slate-400">Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Tax</span>
                    <span className="text-slate-400">Calculated at checkout</span>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 mb-8">
                  <div className="flex justify-between text-lg font-heading text-midnight-blue">
                    <span>Estimated Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                {checkoutError && (
                  <div className="bg-red-50 text-red-600 p-4 text-sm mb-4 border border-red-100">
                    {checkoutError}
                  </div>
                )}

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut || cart.length === 0}
                  className="w-full bg-midnight-blue text-white py-5 font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {isCheckingOut ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    'Checkout with Stripe'
                  )}
                </button>

                <div className="mt-6 space-y-3">
                  <p className="text-xs text-slate-400 text-center">
                    Secure checkout powered by Stripe. Your payment information is encrypted.
                  </p>
                  <Link 
                    href="/gifts"
                    className="block text-center text-sm text-champagne-gold hover:text-midnight-blue transition-colors uppercase tracking-widest"
                  >
                    Continue Shopping
                  </Link>
                  <button
                    onClick={clearCart}
                    className="block w-full text-center text-xs text-slate-400 hover:text-red-400 transition-colors uppercase tracking-widest mt-4"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

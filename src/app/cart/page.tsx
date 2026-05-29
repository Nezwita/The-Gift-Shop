'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/lib/cart';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <div className="flex flex-col min-h-screen bg-soft-ivory">
      <Header />
      
      <main className="flex-grow py-20 px-[5%] max-w-5xl mx-auto w-full">
        <h1 className="font-heading text-5xl mb-12 text-center border-b-2 border-champagne-gold inline-table mx-auto pb-4 px-8">
          Your Curations
        </h1>
        
        {cart.length === 0 ? (
          <div className="bg-white p-16 text-center shadow-sm border border-slate-100 mt-12">
            <p className="text-xl text-slate-500 mb-8 font-body">Your collection is currently empty.</p>
            <Link href="/cities" className="inline-block bg-midnight-blue text-white py-4 px-12 font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors">
              Explore Cities
            </Link>
          </div>
        ) : (
          <div className="mt-8">
            <div className="bg-white shadow-lg overflow-hidden border border-slate-100">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-midnight-blue text-white">
                    <th className="px-8 py-6 font-medium uppercase tracking-widest text-sm">Product</th>
                    <th className="px-8 py-6 font-medium uppercase tracking-widest text-sm text-center">Price</th>
                    <th className="px-8 py-6 font-medium uppercase tracking-widest text-sm text-center">Quantity</th>
                    <th className="px-8 py-6 font-medium uppercase tracking-widest text-sm text-right">Subtotal</th>
                    <th className="px-8 py-6"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-body">
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td className="px-8 py-8">
                        <div className="flex items-center gap-6">
                          <div className="relative w-24 h-24 bg-soft-ivory flex-shrink-0">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          </div>
                          <div>
                            <h3 className="font-heading text-xl text-midnight-blue mb-1">{item.name}</h3>
                            <p className="text-sm text-warm-gray uppercase tracking-tight">{item.city}</p>
                            {item.variant && (
                              <p className="text-xs text-champagne-gold font-bold mt-2 uppercase tracking-widest">{item.variant}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-8 text-center font-bold">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="px-8 py-8">
                        <div className="flex items-center justify-center gap-4">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center border border-slate-200 hover:bg-slate-50 transition-colors"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-bold">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center border border-slate-200 hover:bg-slate-50 transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-8 py-8 text-right font-bold text-midnight-blue">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="px-8 py-8 text-right">
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-800 transition-colors uppercase text-xs font-bold tracking-widest"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-12 flex justify-end">
              <div className="w-full max-w-sm bg-white p-10 shadow-lg border border-slate-100">
                <div className="space-y-4 mb-8 font-body">
                  <div className="flex justify-between">
                    <span className="text-warm-gray uppercase tracking-widest text-sm">Subtotal</span>
                    <span className="font-bold">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-4">
                    <span className="text-warm-gray uppercase tracking-widest text-sm">Shipping</span>
                    <span className="text-champagne-gold font-bold text-xs uppercase tracking-widest">Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between text-2xl font-bold text-midnight-blue pt-4">
                    <span className="font-heading">Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
                
                <Link 
                  href="/checkout" 
                  className="block w-full bg-midnight-blue text-white py-5 px-8 text-center font-bold uppercase tracking-[0.2em] hover:bg-slate-800 transition-colors"
                >
                  Proceed to Checkout
                </Link>
                <Link href="/cities" className="block text-center mt-6 text-sm text-warm-gray hover:text-midnight-blue transition-colors uppercase tracking-widest">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}

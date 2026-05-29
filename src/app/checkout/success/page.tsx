'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/lib/cart';

export default function SuccessPage() {
  const { orderInfo } = useCart();

  // If no order info is found, we might want to redirect or show a generic message
  // but for this task we'll just use dummy data if it's null to ensure the UI is visible.
  const displayOrder = orderInfo || {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    address: '123 Luxury Lane',
    city: 'New York',
    country: 'United States',
    orderNumber: 'CC-98234-2023',
    total: 340.00,
    shippingMethod: 'Express Courier',
    estimatedDelivery: '3-5'
  };

  return (
    <div className="flex flex-col min-h-screen bg-soft-ivory">
      <header className="bg-white py-6 px-[5%] flex justify-center items-center shadow-sm">
        <Link href="/" className="flex items-center gap-2 group">
          <Image src="/logo.svg" alt="CuratedCities Logo" width={40} height={40} />
          <span className="font-heading text-2xl font-bold text-midnight-blue tracking-tight">CuratedCities</span>
        </Link>
      </header>
      
      <main className="flex-grow py-20 px-[5%] max-w-4xl mx-auto w-full">
        <div className="bg-white p-16 shadow-2xl border border-slate-100 text-center">
          <div className="text-6xl text-champagne-gold mb-8 flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h1 className="font-heading text-5xl mb-4 text-midnight-blue">Thank You for Your Order</h1>
          <p className="text-warm-gray text-lg mb-10 uppercase tracking-widest font-bold font-body">Order #{displayOrder.orderNumber}</p>
          
          <p className="text-xl text-slate-700 mb-12 font-body max-w-2xl mx-auto leading-relaxed">
            We've received your order and are currently preparing your global treasures. 
            A confirmation email has been sent to <span className="font-bold text-midnight-blue">{displayOrder.email}</span>.
          </p>

          <Link 
            href="/cities" 
            className="inline-block bg-midnight-blue text-white py-5 px-12 font-bold uppercase tracking-[0.2em] hover:bg-slate-800 transition-colors shadow-lg"
          >
            Explore More Cities
          </Link>

          <div className="mt-20 pt-12 border-t border-slate-100 text-left font-body">
            <h2 className="font-heading text-2xl mb-8 text-midnight-blue">Order Details</h2>
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between border-b border-slate-50 pb-4">
                <span className="text-warm-gray uppercase tracking-widest text-xs font-bold">Shipping To</span>
                <span className="text-slate-800 font-medium">
                  {displayOrder.firstName} {displayOrder.lastName}, {displayOrder.address}, {displayOrder.city}, {displayOrder.country}
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:justify-between border-b border-slate-50 pb-4">
                <span className="text-warm-gray uppercase tracking-widest text-xs font-bold">Shipping Method</span>
                <span className="text-slate-800 font-medium">{displayOrder.shippingMethod}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <span className="text-warm-gray uppercase tracking-widest text-xs font-bold">Estimated Delivery</span>
                <span className="text-slate-800 font-medium">{displayOrder.estimatedDelivery} Business Days</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-midnight-blue text-white py-8 text-center mt-12">
        <div className="text-xs text-warm-gray uppercase tracking-widest font-body">
          &copy; 2023 CuratedCities. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

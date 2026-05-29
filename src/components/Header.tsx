'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/cart';

const Header = () => {
  const { cartCount } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm px-6 lg:px-12 py-4 flex justify-between items-center">
      <Link href="/" className="flex items-center gap-2 group">
        <Image src="/logo.svg" alt="CuratedCities Logo" width={40} height={40} className="transition-transform group-hover:scale-110" />
        <span className="font-heading text-2xl font-bold text-midnight-blue tracking-tight">CuratedCities</span>
      </Link>
      
      <nav className="hidden md:flex gap-8 items-center">
        <Link 
          href="/cities"
          className="text-sm font-medium uppercase tracking-widest text-slate-black hover:text-champagne-gold transition-colors"
        >
          Cities
        </Link>
        <Link 
          href="/gifts"
          className="text-sm font-medium uppercase tracking-widest text-slate-black hover:text-champagne-gold transition-colors"
        >
          Gifts
        </Link>
        <Link 
          href="/our-story"
          className="text-sm font-medium uppercase tracking-widest text-slate-black hover:text-champagne-gold transition-colors"
        >
          Our Story
        </Link>
        <Link href="/cart" className="relative text-sm font-medium uppercase tracking-widest text-slate-black hover:text-champagne-gold transition-colors flex items-center gap-2">
          <span>Cart</span>
          {cartCount > 0 && (
            <span className="bg-champagne-gold text-midnight-blue text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </Link>
      </nav>
      
      <button className="md:hidden text-midnight-blue">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>
    </header>
  );
};

export default Header;

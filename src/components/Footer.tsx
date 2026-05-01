import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-midnight-blue text-white pt-20 pb-10 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.svg" alt="CuratedCities Logo" width={32} height={32} className="brightness-0 invert" />
              <span className="font-heading text-xl font-bold tracking-tight">CuratedCities</span>
            </Link>
            <p className="text-warm-gray leading-relaxed font-body">
              Bringing the world's finest gifts to your doorstep. Each item is a storyteller, representing the unique culture and heritage of its origin city.
            </p>
          </div>
          
          <div>
            <h4 className="font-heading text-lg font-bold mb-6 text-champagne-gold">Shop</h4>
            <ul className="space-y-4 text-warm-gray font-body">
              <li><Link href="/cities/usa" className="hover:text-white transition-colors">USA Collection</Link></li>
              <li><Link href="/cities/europe" className="hover:text-white transition-colors">Europe Collection</Link></li>
              <li><Link href="/cities/china" className="hover:text-white transition-colors">China Collection</Link></li>
              <li><Link href="/new-arrivals" className="hover:text-white transition-colors">New Arrivals</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading text-lg font-bold mb-6 text-champagne-gold">Support</h4>
            <ul className="space-y-4 text-warm-gray font-body">
              <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading text-lg font-bold mb-6 text-champagne-gold">Join our Newsletter</h4>
            <p className="text-warm-gray mb-6 font-body">Get travel inspiration and curated gift ideas delivered to your inbox.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-white/10 border-none px-4 py-3 w-full focus:ring-1 focus:ring-champagne-gold outline-none text-white font-body"
              />
              <button className="bg-champagne-gold text-midnight-blue px-6 py-3 font-bold uppercase tracking-widest text-xs hover:bg-[#b0a04c] transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 text-center text-warm-gray text-xs font-body tracking-widest uppercase">
          &copy; {new Date().getFullYear()} CuratedCities. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

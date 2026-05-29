'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/lib/cart';
import { calculateShipping, ShippingMethod } from '@/lib/shipping';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart, setOrderInfo } = useCart();
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    country: 'United States',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const [selectedMethodIndex, setSelectedMethodIndex] = useState(0);

  const shippingOptions = useMemo(() => {
    if (cart.length === 0) return [];
    return calculateShipping(cart[0].city, formData.country);
  }, [cart, formData.country]);

  const selectedShipping = shippingOptions[selectedMethodIndex] || { cost: 0, name: 'Standard Shipping' };
  const shippingCost = selectedShipping.cost;
  const total = cartTotal + shippingCost;

  // Reset shipping selection when country changes
  useEffect(() => {
    setSelectedMethodIndex(0);
  }, [formData.country]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.email || !formData.address) {
      alert('Please fill in all required fields.');
      return;
    }

    const orderNumber = `CC-${Math.floor(10000 + Math.random() * 90000)}-2023`;
    
    setOrderInfo({
      ...formData,
      orderNumber,
      total,
      shippingCost,
      shippingMethod: selectedShipping.name,
      estimatedDelivery: selectedShipping.days,
      items: [...cart]
    });

    // Clear cart after order is placed
    clearCart();
    
    router.push('/checkout/success');
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-soft-ivory">
        <Header />
        <main className="flex-grow flex items-center justify-center py-20 px-[5%]">
          <div className="bg-white p-16 text-center shadow-lg border border-slate-100 max-w-lg w-full">
            <h1 className="font-heading text-4xl mb-6 text-midnight-blue">Checkout</h1>
            <p className="text-xl text-slate-500 mb-8 font-body">Your cart is empty.</p>
            <Link href="/cities" className="inline-block bg-midnight-blue text-white py-4 px-12 font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors">
              Explore Cities
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-soft-ivory">
      <header className="bg-white py-6 px-[5%] flex justify-center items-center shadow-sm sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2 group">
          <Image src="/logo.svg" alt="CuratedCities Logo" width={40} height={40} />
          <span className="font-heading text-2xl font-bold text-midnight-blue tracking-tight">CuratedCities</span>
        </Link>
      </header>
      
      <main className="flex-grow py-12 px-[5%] max-w-7xl mx-auto w-full">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7 space-y-8">
            <section className="bg-white p-10 shadow-lg border border-slate-100">
              <h2 className="font-heading text-2xl mb-8 border-b border-champagne-gold pb-4 text-midnight-blue">Shipping Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 font-body">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-midnight-blue">First Name</label>
                  <input 
                    type="text" 
                    name="firstName" 
                    value={formData.firstName} 
                    onChange={handleChange} 
                    placeholder="John" 
                    required 
                    className="w-full p-3 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-champagne-gold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-midnight-blue">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName" 
                    value={formData.lastName} 
                    onChange={handleChange} 
                    placeholder="Doe" 
                    required 
                    className="w-full p-3 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-champagne-gold"
                  />
                </div>
              </div>

              <div className="space-y-2 mb-6 font-body">
                <label className="text-sm font-bold uppercase tracking-widest text-midnight-blue">Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="john@example.com" 
                  required 
                  className="w-full p-3 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-champagne-gold"
                />
              </div>

              <div className="space-y-2 mb-6 font-body">
                <label className="text-sm font-bold uppercase tracking-widest text-midnight-blue">Street Address</label>
                <input 
                  type="text" 
                  name="address" 
                  value={formData.address} 
                  onChange={handleChange} 
                  placeholder="123 Luxury Lane" 
                  required 
                  className="w-full p-3 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-champagne-gold"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-body">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-midnight-blue">City</label>
                  <input 
                    type="text" 
                    name="city" 
                    value={formData.city} 
                    onChange={handleChange} 
                    placeholder="New York" 
                    required 
                    className="w-full p-3 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-champagne-gold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-midnight-blue">Country</label>
                  <select 
                    name="country" 
                    value={formData.country} 
                    onChange={handleChange}
                    className="w-full p-3 border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-champagne-gold"
                  >
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>France</option>
                    <option>Italy</option>
                    <option>China</option>
                  </select>
                </div>
              </div>
            </section>

            <section className="bg-white p-10 shadow-lg border border-slate-100 font-body">
              <h2 className="font-heading text-2xl mb-8 border-b border-champagne-gold pb-4 text-midnight-blue">Shipping Method</h2>
              
              <div className="space-y-4">
                {shippingOptions.map((method, index) => (
                  <label key={method.id} className={`flex items-center justify-between p-4 border ${selectedMethodIndex === index ? 'border-champagne-gold bg-soft-ivory/30' : 'border-slate-100'} cursor-pointer hover:bg-slate-50 transition-colors`}>
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        name="shippingMethod" 
                        checked={selectedMethodIndex === index} 
                        onChange={() => setSelectedMethodIndex(index)}
                        className="mr-4 accent-midnight-blue" 
                      />
                      <div>
                        <span className="font-bold text-midnight-blue block">{method.name}</span>
                        <span className="text-xs text-warm-gray uppercase tracking-widest">{method.days} delivery</span>
                      </div>
                    </div>
                    <span className="font-bold text-midnight-blue">${method.cost.toFixed(2)}</span>
                  </label>
                ))}
              </div>
            </section>

            <section className="bg-white p-10 shadow-lg border border-slate-100 font-body">
              <h2 className="font-heading text-2xl mb-8 border-b border-champagne-gold pb-4 text-midnight-blue">Payment Method</h2>
              
              <div className="space-y-4 mb-10">
                {['Credit Card', 'PayPal', 'Apple Pay'].map((method, index) => (
                  <label key={method} className="flex items-center p-4 border border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors">
                    <input type="radio" name="payment" defaultChecked={index === 0} className="mr-4 accent-midnight-blue" />
                    <span className="font-medium text-slate-700">{method}</span>
                  </label>
                ))}
              </div>

              <div className="space-y-2 mb-6 font-body">
                <label className="text-sm font-bold uppercase tracking-widest text-midnight-blue">Card Number</label>
                <input 
                  type="text" 
                  name="cardNumber" 
                  value={formData.cardNumber} 
                  onChange={handleChange} 
                  placeholder="0000 0000 0000 0000" 
                  className="w-full p-3 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-champagne-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-midnight-blue">Expiry Date</label>
                  <input 
                    type="text" 
                    name="expiry" 
                    value={formData.expiry} 
                    onChange={handleChange} 
                    placeholder="MM/YY" 
                    className="w-full p-3 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-champagne-gold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-midnight-blue">CVV</label>
                  <input 
                    type="text" 
                    name="cvv" 
                    value={formData.cvv} 
                    onChange={handleChange} 
                    placeholder="123" 
                    className="w-full p-3 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-champagne-gold"
                  />
                </div>
              </div>
            </section>
          </div>

          <aside className="lg:col-span-5">
            <div className="bg-white p-10 shadow-lg border border-slate-100 sticky top-32">
              <h2 className="font-heading text-2xl mb-8 text-midnight-blue">Order Summary</h2>
              
              <div className="space-y-6 mb-8 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-start gap-4">
                    <div className="flex gap-4">
                      <div className="relative w-16 h-16 bg-soft-ivory flex-shrink-0 border border-slate-100">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-midnight-blue line-clamp-1">{item.name}</h4>
                        <p className="text-xs text-warm-gray uppercase tracking-widest mt-1">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold text-sm text-midnight-blue">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-slate-100 font-body">
                <div className="flex justify-between text-sm">
                  <span className="text-warm-gray uppercase tracking-widest">Subtotal</span>
                  <span className="font-bold text-midnight-blue">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-warm-gray uppercase tracking-widest">Shipping ({selectedShipping.name})</span>
                  <span className="font-bold text-midnight-blue">${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-midnight-blue pt-4 border-t border-slate-100">
                  <span className="font-heading">Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-midnight-blue text-white py-5 px-8 font-bold uppercase tracking-[0.2em] mt-10 hover:bg-slate-800 transition-colors shadow-xl"
              >
                Complete Purchase
              </button>
              
              <Link href="/cart" className="block text-center mt-6 text-sm text-warm-gray hover:text-midnight-blue transition-colors uppercase tracking-widest font-bold">
                Return to Cart
              </Link>
            </div>
          </aside>
        </form>
      </main>
      
      <footer className="bg-midnight-blue text-white py-8 text-center mt-12">
        <div className="text-xs text-warm-gray uppercase tracking-widest">
          &copy; 2023 CuratedCities. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

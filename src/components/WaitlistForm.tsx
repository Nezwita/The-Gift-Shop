'use client';

import React, { useState } from 'react';

interface WaitlistFormProps {
  city?: string;
  variant?: 'compact' | 'full';
}

const WaitlistForm: React.FC<WaitlistFormProps> = ({ city, variant = 'full' }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('submitting');
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, city }),
      });

      if (response.ok) {
        setStatus('success');
        setMessage(city 
          ? `You've been added to the ${city} waitlist!` 
          : "Thank you for joining our newsletter!");
        setEmail('');
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      setStatus('error');
      setMessage("Something went wrong. Please try again later.");
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-champagne-gold/10 p-6 rounded-sm border border-champagne-gold/20 text-center animate-fade-in">
        <p className="text-midnight-blue font-bold">{message}</p>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSubmit} className="flex">
        <input 
          type="email" 
          placeholder="Your email" 
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white/10 border-none px-4 py-3 w-full focus:ring-1 focus:ring-champagne-gold outline-none text-white font-body"
        />
        <button 
          type="submit"
          disabled={status === 'submitting'}
          className="bg-champagne-gold text-midnight-blue px-6 py-3 font-bold uppercase tracking-widest text-xs hover:bg-[#b0a04c] transition-colors disabled:opacity-50"
        >
          {status === 'submitting' ? '...' : 'Join'}
        </button>
      </form>
    );
  }

  return (
    <div className="bg-white p-8 md:p-10 shadow-xl border border-slate-100 max-w-xl mx-auto">
      <h3 className="font-heading text-2xl mb-4 text-midnight-blue">
        {city ? `Join the ${city} Waitlist` : 'Stay Informed'}
      </h3>
      <p className="text-slate-600 mb-8 font-body">
        {city 
          ? `We're currently finalizing our artisan partnerships in ${city}. Join the waitlist to be the first to know when these treasures become available.`
          : 'Get travel inspiration and curated gift ideas from the world\'s most vibrant cities delivered to your inbox.'}
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Email Address</label>
          <input 
            id="email"
            type="email" 
            placeholder="curator@example.com" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-slate-200 px-4 py-4 focus:border-champagne-gold outline-none transition-colors font-body"
          />
        </div>
        <button 
          type="submit"
          disabled={status === 'submitting'}
          className="w-full bg-midnight-blue text-white py-4 font-bold uppercase tracking-[0.2em] hover:bg-slate-800 transition-all disabled:opacity-50"
        >
          {status === 'submitting' ? 'Joining...' : city ? `Join ${city} Waitlist` : 'Subscribe'}
        </button>
        {status === 'error' && <p className="text-red-500 text-sm mt-2">{message}</p>}
      </form>
      
      <p className="text-[10px] text-slate-400 mt-6 text-center uppercase tracking-widest">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
};

export default WaitlistForm;

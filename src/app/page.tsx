import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">The Gift Shop</h1>
        <p className="text-xl text-gray-600">Discover iconic gifts from the world's greatest cities.</p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-2xl font-semibold mb-2">USA</h2>
          <p className="text-gray-600">New York, San Francisco, New Orleans</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-2xl font-semibold mb-2">Europe</h2>
          <p className="text-gray-600">Paris, London, Rome</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-2xl font-semibold mb-2">China</h2>
          <p className="text-gray-600">Beijing, Shanghai, Hong Kong</p>
        </div>
      </main>

      <footer className="mt-16 text-gray-500">
        &copy; {new Date().getFullYear()} The Gift Shop. All rights reserved.
      </footer>
    </div>
  );
}

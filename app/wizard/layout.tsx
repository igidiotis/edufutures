'use client';

import React from 'react';
import Link from 'next/link';

export default function WizardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-xl font-bold text-blue-600">
              Story Research App
            </Link>
            <Link 
              href="/"
              className="px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100"
            >
              Home
            </Link>
          </div>
        </div>
      </header>
      
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
      
      <footer className="bg-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} Story Research App. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
} 
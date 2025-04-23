'use client';

import React from 'react';

export default function ResearchApp() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-center items-center">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              EduFutures Research
            </span>
          </div>
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Future of Digital Education
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Welcome to EduFutures Research. We are building a platform to explore speculative scenarios about the future of digital education.
          </p>
          <div className="mt-8 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors">
            Coming Soon
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-center items-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} EduFutures Research Project
          </div>
        </div>
      </footer>
    </div>
  );
} 
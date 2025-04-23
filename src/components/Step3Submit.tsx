'use client';

import React from 'react';
import { useResearchStore } from '../store/researchStore';

export default function Step3Submit() {
  const { setCurrentStep, story } = useResearchStore();
  
  // Handle going back to step 2
  const handleBack = () => {
    setCurrentStep(2);
  };
  
  return (
    <div>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Submit Your Research</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          This step will be implemented later. Here's a preview of your story:
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Speculative Scenario</h2>
        <div className="bg-gray-50 p-6 rounded-lg whitespace-pre-wrap">
          {story}
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <button
          onClick={handleBack}
          className="py-2 px-6 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
        >
          Back to Writing
        </button>
        
        <div className="text-gray-600 italic">
          Form submission will be implemented in the future.
        </div>
      </div>
    </div>
  );
} 
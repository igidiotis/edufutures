'use client';

import React from 'react';
import { researchData } from '../data/researchData';
import SelectionCard from './SelectionCard';
import { useResearchStore } from '../store/researchStore';

export default function Step1Selection() {
  const { selectedElements, setCurrentStep } = useResearchStore();
  
  // Check if all categories have a selection
  const allSelected = 
    selectedElements.arc !== null && 
    selectedElements.object !== null && 
    selectedElements.terrain !== null && 
    selectedElements.mood !== null;
    
  // Handle continue button click
  const handleContinue = () => {
    if (allSelected) {
      setCurrentStep(2);
    }
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Future of Digital Education</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Select one element from each category to create your speculative scenario.
          Use the shuffle button to explore more options.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {researchData.map((category) => (
          <SelectionCard key={category.id} category={category} />
        ))}
      </div>
      
      <div className="text-center">
        <button
          onClick={handleContinue}
          disabled={!allSelected}
          className={`
            py-3 px-8 rounded-lg text-lg font-medium transition-all duration-300
            ${allSelected 
              ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
          `}
        >
          {allSelected ? 'Continue to Write Your Story' : 'Select One Element from Each Category'}
        </button>
      </div>
    </div>
  );
} 
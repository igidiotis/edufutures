'use client';

import React, { useState } from 'react';
import { CategoryData, ElementType } from '../types/research';
import { useResearchStore } from '../store/researchStore';

interface SelectionCardProps {
  category: CategoryData;
}

export default function SelectionCard({ category }: SelectionCardProps) {
  const { selectedElements, selectElement } = useResearchStore();
  const [displayedElements, setDisplayedElements] = useState<ElementType[]>(() => {
    // Initially show the first 3 elements
    return category.elements.slice(0, 3);
  });

  // Function to shuffle and get 3 random elements
  const shuffleElements = () => {
    const shuffled = [...category.elements]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    setDisplayedElements(shuffled);
  };

  // Check if an element is selected
  const isSelected = (element: ElementType) => {
    return selectedElements[category.id as keyof typeof selectedElements]?.id === element.id;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">{category.title}</h3>
        <p className="text-gray-600 mb-4">{category.description}</p>
        
        <div className="space-y-3">
          {displayedElements.map((element) => (
            <button
              key={element.id}
              onClick={() => selectElement(category.id, element)}
              className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                isSelected(element)
                  ? 'bg-blue-100 border-2 border-blue-500 text-blue-800'
                  : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
              }`}
            >
              <div className="font-medium">{element.title}</div>
              <div className="text-sm text-gray-600">{element.description}</div>
            </button>
          ))}
        </div>
        
        <button
          onClick={shuffleElements}
          className="mt-4 w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 transition-colors duration-200 flex items-center justify-center space-x-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Shuffle Options</span>
        </button>
      </div>
    </div>
  );
} 
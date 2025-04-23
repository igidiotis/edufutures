'use client';

import { useState } from 'react';
import { StoryElement } from '../contexts/StoryContext';

type StoryElementCardProps = {
  element: StoryElement;
  isSelected: boolean;
  onSelect: (element: StoryElement) => void;
};

export default function StoryElementCard({ element, isSelected, onSelect }: StoryElementCardProps) {
  // Get a background color based on the element's category
  const getBgColor = (category: string) => {
    switch(category) {
      case 'arc': return 'bg-blue-100';
      case 'object': return 'bg-green-100'; 
      case 'terrain': return 'bg-amber-100';
      case 'mood': return 'bg-purple-100';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div 
      className={`
        cursor-pointer border rounded-lg p-4 transition-all duration-200 relative
        ${isSelected 
          ? 'border-blue-500 bg-blue-50 shadow-md transform scale-105' 
          : 'border-gray-200 hover:border-blue-300 hover:shadow'
        }
      `}
      onClick={() => onSelect(element)}
    >
      <div className={`w-full h-40 mb-3 overflow-hidden rounded-md flex items-center justify-center ${getBgColor(element.category)}`}>
        <span className="text-lg font-medium text-gray-700">{element.title}</span>
      </div>
      <h3 className="text-lg font-medium text-center">{element.title}</h3>
      
      {isSelected && (
        <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </div>
  );
} 
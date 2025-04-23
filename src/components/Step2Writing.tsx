'use client';

import React from 'react';
import { useResearchStore } from '../store/researchStore';
import { ElementType } from '../types/research';

export default function Step2Writing() {
  const { 
    selectedElements, 
    story, 
    setStory, 
    setCurrentStep, 
    generateStoryStarter 
  } = useResearchStore();
  
  // Handle going back to step 1
  const handleBack = () => {
    setCurrentStep(1);
  };
  
  // Handle the AI generation button click
  const handleGenerateStory = () => {
    generateStoryStarter();
  };
  
  // Display a selected element card
  const SelectedElementCard = ({ title, element }: { title: string; element: ElementType | null }) => {
    if (!element) return null;
    
    const getGradientClass = (title: string) => {
      switch (title) {
        case 'Arc':
          return 'from-purple-50 to-indigo-50';
        case 'Object':
          return 'from-blue-50 to-cyan-50';
        case 'Terrain':
          return 'from-emerald-50 to-teal-50';
        case 'Mood':
          return 'from-amber-50 to-orange-50';
        default:
          return 'from-gray-50 to-gray-100';
      }
    };
    
    return (
      <div className={`bg-gradient-to-r ${getGradientClass(title)} p-4 rounded-lg shadow-sm min-h-[120px]`}>
        <div className="font-semibold text-gray-700">{title}</div>
        <div className="text-lg font-medium text-blue-700">{element.title}</div>
        <div className="text-sm text-gray-600">{element.description}</div>
      </div>
    );
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Write Your Speculative Scenario</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Based on your selected elements, write a short story about the future of digital education.
        </p>
      </div>
      
      {/* Selected Elements Grid at the top */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <SelectedElementCard title="Arc" element={selectedElements.arc} />
        <SelectedElementCard title="Object" element={selectedElements.object} />
        <SelectedElementCard title="Terrain" element={selectedElements.terrain} />
        <SelectedElementCard title="Mood" element={selectedElements.mood} />
      </div>
      
      {/* Generate Story Button */}
      <div className="mb-8 text-center">
        <button
          onClick={handleGenerateStory}
          className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
          Generate Story Starter with AI
        </button>
      </div>
      
      {/* Story Text Area */}
      <div className="mb-8">
        <label htmlFor="story" className="block text-xl font-semibold text-gray-800 mb-4">
          Your Story
        </label>
        <textarea
          id="story"
          value={story}
          onChange={(e) => setStory(e.target.value)}
          className="w-full h-96 p-4 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          placeholder="Start writing your story here..."
        />
      </div>
      
      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={handleBack}
          className="py-2 px-6 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
        >
          Back to Selection
        </button>
        
        <button
          onClick={() => setCurrentStep(3)}
          disabled={!story.trim()}
          className={`
            py-3 px-8 rounded-lg text-lg font-medium transition-all duration-300
            ${story.trim() 
              ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
          `}
        >
          Continue to Submit
        </button>
      </div>
    </div>
  );
} 
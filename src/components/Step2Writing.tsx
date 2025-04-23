'use client';

import React, { useState } from 'react';
import { useResearchStore } from '../store/researchStore';
import { ElementType } from '../types/research';

export default function Step2Writing() {
  const { 
    selectedElements, 
    story, 
    setStory, 
    setCurrentStep, 
    generateStoryStarter,
    isGenerating 
  } = useResearchStore();
  
  const [showTips, setShowTips] = useState(false);
  
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
          disabled={isGenerating}
          className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Story...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Generate Story Starter with AI
            </>
          )}
        </button>
      </div>
      
      {/* Story Text Area */}
      <div className="mb-4">
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

      {/* Writing Tips Section */}
      <div className="mb-8">
        <button
          onClick={() => setShowTips(!showTips)}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transform transition-transform duration-200 ${showTips ? 'rotate-180' : ''}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          <span className="font-medium">Story Writing Tips</span>
        </button>
        
        <div
          className={`mt-2 overflow-hidden transition-all duration-300 ease-in-out ${
            showTips ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Story Writing Tips</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <span><strong>Set the Scene:</strong> Begin by describing how this future looks and feels. What's different from today? What's familiar?</span>
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <span><strong>Focus on the Object:</strong> Explain how people interact with the mentioned object. What problems does it solve? What new challenges might it create?</span>
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <span><strong>Consider the Context:</strong> Think about how the TERRAIN affects the story. How does the specified context influence people's behaviors and interactions?</span>
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <span><strong>Capture the Mood:</strong> Reflect the emotional atmosphere in your writing. How do people feel about living in this future?</span>
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <span><strong>Include Characters:</strong> Consider introducing a character experiencing this future. What's their perspective on these changes?</span>
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <span><strong>Educational Impact:</strong> Think about how learning and teaching have evolved. What new possibilities or challenges exist?</span>
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <span><strong>Show, Don't Tell:</strong> Instead of just stating facts, create vivid descriptions and specific examples of how this future works.</span>
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <span><strong>Consider Consequences:</strong> What are the broader implications of this future for society, culture, and human relationships?</span>
              </li>
            </ul>
          </div>
        </div>
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
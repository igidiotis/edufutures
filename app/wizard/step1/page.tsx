'use client';

import React from 'react';
import Link from 'next/link';
import StepIndicator from '../../components/StepIndicator';
import StoryElementCard from '../../components/StoryElementCard';
import { storyElements } from '../../data/storyElements';
import { useStory } from '../../contexts/StoryContext';

export default function StepOne() {
  const { selectedElements, selectElement, areAllElementsSelected } = useStory();
  
  // Group elements by category
  const arcElements = storyElements.filter(el => el.category === 'arc');
  const objectElements = storyElements.filter(el => el.category === 'object');
  const terrainElements = storyElements.filter(el => el.category === 'terrain');
  const moodElements = storyElements.filter(el => el.category === 'mood');

  // Check which elements are selected
  const isSelected = (elementId: string) => {
    return Object.values(selectedElements).some(item => item?.id === elementId);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Select Story Elements</h1>
      <p className="text-center text-gray-600 mb-8">
        Choose one element from each category to build your story foundation.
      </p>
      
      <StepIndicator currentStep={1} canAdvance={areAllElementsSelected()} />

      {/* Arc Elements */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Story Arc</h2>
        <p className="text-gray-600 mb-6">Choose the main theme for your story.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {arcElements.map(element => (
            <StoryElementCard
              key={element.id}
              element={element}
              isSelected={isSelected(element.id)}
              onSelect={selectElement}
            />
          ))}
        </div>
      </section>

      {/* Object Elements */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Key Object</h2>
        <p className="text-gray-600 mb-6">Select an important object for your story.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {objectElements.map(element => (
            <StoryElementCard
              key={element.id}
              element={element}
              isSelected={isSelected(element.id)}
              onSelect={selectElement}
            />
          ))}
        </div>
      </section>

      {/* Terrain Elements */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Setting</h2>
        <p className="text-gray-600 mb-6">Choose where your story takes place.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {terrainElements.map(element => (
            <StoryElementCard
              key={element.id}
              element={element}
              isSelected={isSelected(element.id)}
              onSelect={selectElement}
            />
          ))}
        </div>
      </section>

      {/* Mood Elements */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Mood</h2>
        <p className="text-gray-600 mb-6">Select the emotional tone of your story.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {moodElements.map(element => (
            <StoryElementCard
              key={element.id}
              element={element}
              isSelected={isSelected(element.id)}
              onSelect={selectElement}
            />
          ))}
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-end mt-8 mb-4">
        <Link
          href="/wizard/step2"
          className={`
            px-6 py-3 rounded-lg text-white font-medium transition-colors
            ${areAllElementsSelected() 
              ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
              : 'bg-gray-300 cursor-not-allowed'
            }
          `}
          onClick={(e) => !areAllElementsSelected() && e.preventDefault()}
        >
          Continue to Story Generation
        </Link>
      </div>
    </div>
  );
} 
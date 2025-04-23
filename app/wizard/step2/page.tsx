'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import StepIndicator from '../../components/StepIndicator';
import { useStory } from '../../contexts/StoryContext';

export default function StepTwo() {
  const router = useRouter();
  const { selectedElements, generatedStory, setGeneratedStory, areAllElementsSelected } = useStory();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect to step 1 if elements are not selected
  React.useEffect(() => {
    if (!areAllElementsSelected()) {
      router.push('/wizard/step1');
    }
  }, [areAllElementsSelected, router]);

  const generateStory = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ elements: selectedElements }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate story');
      }

      const data = await response.json();
      setGeneratedStory(data.story);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
      console.error('Error generating story:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Display selected elements
  const renderSelectedElements = () => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {Object.entries(selectedElements).map(([category, element]) => (
          element && (
            <div key={category} className="bg-white rounded-lg shadow p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1 capitalize">{category}</h3>
              <p className="font-medium">{element.title}</p>
            </div>
          )
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Generate Your Story</h1>
      <p className="text-center text-gray-600 mb-8">
        Based on your selected elements, we'll create a story beginning for you to continue.
      </p>
      
      <StepIndicator currentStep={2} canAdvance={!!generatedStory} />
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Selected Elements</h2>
        {renderSelectedElements()}
        
        <div className="mb-6">
          <button
            onClick={generateStory}
            disabled={isLoading}
            className={`w-full py-3 rounded-lg text-white font-medium transition-colors ${
              isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? 'Generating...' : generatedStory ? 'Regenerate Story' : 'Generate Story'}
          </button>
          {error && (
            <p className="mt-2 text-red-500 text-sm">{error}</p>
          )}
        </div>
        
        {generatedStory && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">Your Story Beginning</h2>
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <p className="whitespace-pre-wrap">{generatedStory}</p>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              In the next step, you'll be able to continue the story in your own words.
            </p>
          </div>
        )}
      </div>
      
      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Link 
          href="/wizard/step1"
          className="px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Back
        </Link>
        <Link
          href="/wizard/step3"
          className={`
            px-6 py-3 rounded-lg text-white font-medium transition-colors
            ${generatedStory 
              ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
              : 'bg-gray-300 cursor-not-allowed'
            }
          `}
          onClick={(e) => !generatedStory && e.preventDefault()}
        >
          Continue to Story Editor
        </Link>
      </div>
    </div>
  );
} 
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import StepIndicator from '../../components/StepIndicator';
import { useStory } from '../../contexts/StoryContext';

export default function StepThree() {
  const router = useRouter();
  const { generatedStory, userStory, setUserStory } = useStory();
  const [wordCount, setWordCount] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const minWordCount = 80;

  // If no story has been generated, redirect to step 2
  useEffect(() => {
    if (!generatedStory) {
      router.push('/wizard/step2');
    }
  }, [generatedStory, router]);

  // Initialize user story with generated story if empty
  useEffect(() => {
    if (generatedStory && !userStory) {
      setUserStory(generatedStory);
    }
  }, [generatedStory, userStory, setUserStory]);

  // Calculate word count when userStory changes
  useEffect(() => {
    if (userStory) {
      const words = userStory.trim().split(/\s+/);
      setWordCount(words.length);
    } else {
      setWordCount(0);
    }
  }, [userStory]);

  // Auto-save functionality
  useEffect(() => {
    const autoSave = async () => {
      if (userStory && userStory !== generatedStory) {
        setIsSaving(true);
        // Simulating a save operation with a timeout
        await new Promise(resolve => setTimeout(resolve, 500));
        setLastSaved(new Date());
        setIsSaving(false);
      }
    };

    const saveTimeout = setTimeout(autoSave, 2000);
    return () => clearTimeout(saveTimeout);
  }, [userStory, generatedStory]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserStory(e.target.value);
  };

  const isReadyToContinue = wordCount >= minWordCount;
  
  const wordCountClassName = 
    wordCount < minWordCount 
      ? 'text-red-500' 
      : wordCount >= minWordCount && wordCount < minWordCount + 20 
        ? 'text-yellow-500' 
        : 'text-green-500';

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Continue Your Story</h1>
      <p className="text-center text-gray-600 mb-8">
        The story has begun - now it's your turn to continue it in your own words.
      </p>
      
      <StepIndicator currentStep={3} canAdvance={isReadyToContinue} />
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Story Editor</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">
              {isSaving ? (
                'Saving...'
              ) : lastSaved ? (
                `Last saved: ${lastSaved.toLocaleTimeString()}`
              ) : (
                'Start typing to save'
              )}
            </span>
            <span className={`text-sm font-medium ${wordCountClassName}`}>
              {wordCount} / {minWordCount} words
            </span>
          </div>
        </div>
        
        <div className="mb-4">
          <textarea
            className="w-full h-96 p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={userStory}
            onChange={handleTextChange}
            placeholder="Continue the story here..."
          />
        </div>
        
        <div className="text-sm text-gray-600">
          <p>Write at least {minWordCount} words to continue to the next step.</p>
          <p className="mt-2">
            Consider how the story might develop based on the elements you selected. What challenges might the character face? How will the story arc unfold?
          </p>
        </div>
      </div>
      
      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Link 
          href="/wizard/step2"
          className="px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Back
        </Link>
        <Link
          href="/wizard/step4"
          className={`
            px-6 py-3 rounded-lg text-white font-medium transition-colors
            ${isReadyToContinue 
              ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
              : 'bg-gray-300 cursor-not-allowed'
            }
          `}
          onClick={(e) => !isReadyToContinue && e.preventDefault()}
        >
          Continue to Submit
        </Link>
      </div>
    </div>
  );
} 
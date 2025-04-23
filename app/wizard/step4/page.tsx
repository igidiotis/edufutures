'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import StepIndicator from '../../components/StepIndicator';
import { useStory } from '../../contexts/StoryContext';

export default function StepFour() {
  const router = useRouter();
  const { 
    selectedElements, 
    generatedStory, 
    userStory, 
    participantInfo,
    setParticipantInfo,
    resetContext
  } = useStory();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState<string | null>(null);

  // If no user story, redirect to step 3
  useEffect(() => {
    if (!userStory) {
      router.push('/wizard/step3');
    }
  }, [userStory, router]);

  // Form validation
  const isFormValid = () => {
    return (
      participantInfo.name.trim() !== '' &&
      participantInfo.email.trim() !== '' &&
      participantInfo.age.trim() !== '' &&
      participantInfo.consent
    );
  };

  // Handle form field changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setParticipantInfo({
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      setError('Please fill out all required fields and provide consent.');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedElements,
          generatedStory,
          userStory,
          participantInfo
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit story');
      }
      
      const data = await response.json();
      setSubmissionId(data.submissionId);
      setIsSubmitted(true);
      
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
      console.error('Error submitting story:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle starting a new story
  const handleStartNew = () => {
    resetContext();
    router.push('/');
  };

  // Render the review section
  const renderReview = () => {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Review Your Story</h2>
        
        <div className="mb-6">
          <h3 className="font-medium text-gray-700 mb-2">Selected Elements:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {Object.entries(selectedElements).map(([category, element]) => (
              element && (
                <div key={category} className="bg-gray-50 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-gray-500 mb-1 capitalize">{category}</h4>
                  <p className="font-medium">{element.title}</p>
                </div>
              )
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="font-medium text-gray-700 mb-2">Your Story:</h3>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-2">
            <p className="whitespace-pre-wrap">{userStory}</p>
          </div>
          <p className="text-sm text-gray-500">
            {userStory.trim().split(/\s+/).length} words
          </p>
        </div>
      </div>
    );
  };

  // Render the submission form
  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Participant Information</h2>
        
        <div className="space-y-4 mb-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={participantInfo.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={participantInfo.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
              Age <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="age"
              name="age"
              value={participantInfo.age}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                id="consent"
                name="consent"
                checked={participantInfo.consent}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="consent" className="font-medium text-gray-700">
                I consent to the storage and use of my story for research purposes <span className="text-red-500">*</span>
              </label>
              <p className="text-gray-500">
                Your story will be used anonymously for research on creative writing and AI collaboration.
              </p>
            </div>
          </div>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md border border-red-200">
            {error}
          </div>
        )}
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`
              px-6 py-3 rounded-lg text-white font-medium transition-colors
              ${isSubmitting 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
              }
            `}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Your Story'}
          </button>
        </div>
      </form>
    );
  };

  // Render the success message
  const renderSuccess = () => {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
        <p className="text-gray-600 mb-6">
          Your story has been successfully submitted. We appreciate your participation in this research project.
        </p>
        
        {submissionId && (
          <p className="text-sm text-gray-500 mb-6">
            Submission ID: {submissionId}
          </p>
        )}
        
        <button
          onClick={handleStartNew}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create Another Story
        </button>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Submit Your Story</h1>
      <p className="text-center text-gray-600 mb-8">
        Review your story and provide your information to complete the submission.
      </p>
      
      <StepIndicator currentStep={4} />
      
      {!isSubmitted ? (
        <>
          {renderReview()}
          {renderForm()}
          
          {/* Navigation */}
          <div className="flex justify-start mt-8">
            <Link 
              href="/wizard/step3"
              className="px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Back
            </Link>
          </div>
        </>
      ) : (
        renderSuccess()
      )}
    </div>
  );
} 
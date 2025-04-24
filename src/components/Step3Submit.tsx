'use client';

import React from 'react';
import { useResearchStore } from '../store/researchStore';

export default function Step3Submit() {
  const { 
    setCurrentStep, 
    story, 
    formData, 
    updateFormField, 
    submitForm, 
    isSubmitting, 
    formState 
  } = useResearchStore();
  
  // Handle going back to step 2
  const handleBack = () => {
    setCurrentStep(2);
  };
  
  // Handle form field change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateFormField(name as keyof typeof formData, value);
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitForm();
  };
  
  // Start over with a new scenario after successful submission
  const handleStartOver = () => {
    setCurrentStep(1);
  };
  
  // Show success message after successful submission
  if (formState?.success) {
    return (
      <div className="text-center py-12">
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 max-w-2xl mx-auto">
          <svg 
            className="w-16 h-16 text-green-500 mx-auto mb-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Thank You!</h2>
          <p className="text-xl text-gray-600 mb-6">
            Your submission has been received successfully.
            {formData.email && ' We\'ve sent a confirmation email to your inbox.'}
          </p>
          <p className="text-lg text-gray-600 mb-8">
            We appreciate your contribution to the Imagining Education Futures project.
          </p>
          <button
            onClick={handleStartOver}
            className="py-3 px-8 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Start a New Scenario
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Share Your Story</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Please share your reflections on the educational scenario you've created.
        </p>
      </div>
      
      {/* Story Preview */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Speculative Scenario</h2>
        <div className="bg-gray-50 p-6 rounded-lg whitespace-pre-wrap">
          {story}
        </div>
      </div>
      
      {/* Submission Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* About You Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold border-l-4 border-amber-500 pl-3 mb-4">About You</h2>
          <p className="text-gray-600 mb-6">
            This information helps us understand the diverse perspectives in our research.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label htmlFor="occupation" className="block text-gray-700 font-medium mb-2">
                Occupation <span className="text-red-500">*</span>
              </label>
              <input
                id="occupation"
                name="occupation"
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="e.g., Teacher, Student, Researcher"
                value={formData.occupation}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="subjectField" className="block text-gray-700 font-medium mb-2">
                Subject Field <span className="text-red-500">*</span>
              </label>
              <input
                id="subjectField"
                name="subjectField"
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="e.g., Education, Computer Science, Arts"
                value={formData.subjectField}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="country" className="block text-gray-700 font-medium mb-2">
                Country <span className="text-red-500">*</span>
              </label>
              <input
                id="country"
                name="country"
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="e.g., Sweden, United States, Brazil"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email Address (Optional)
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
              />
              <p className="text-xs text-gray-500 mt-1">
                Provide your email to receive a copy of your story and further information about this research.
              </p>
            </div>
          </div>
        </div>
        
        {/* Your Reflections Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold border-l-4 border-amber-500 pl-3 mb-4">Your Reflections</h2>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="scenarioCreationExperience" className="block text-gray-700 font-medium mb-2">
                Scenario Creation Experience <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-600 mb-2">
                If you had to describe the impact this scenario had on you, what would you highlight as most significant
                about the experience?
              </p>
              <textarea
                id="scenarioCreationExperience"
                name="scenarioCreationExperience"
                className="w-full p-3 border border-gray-300 rounded-lg min-h-[100px]"
                placeholder="Share your thoughts..."
                value={formData.scenarioCreationExperience}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="educationalInsights" className="block text-gray-700 font-medium mb-2">
                Educational Insights <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-600 mb-2">
                What tensions or challenges emerged in your story between technology and human elements of education?
              </p>
              <textarea
                id="educationalInsights"
                name="educationalInsights"
                className="w-full p-3 border border-gray-300 rounded-lg min-h-[100px]"
                placeholder="Share your thoughts..."
                value={formData.educationalInsights}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="comparativeAnalysis" className="block text-gray-700 font-medium mb-2">
                Comparative Analysis <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-600 mb-2">
                How did your scenario align with or differ from your current expectations of educational evolution in
                the near or long-term future?
              </p>
              <textarea
                id="comparativeAnalysis"
                name="comparativeAnalysis"
                className="w-full p-3 border border-gray-300 rounded-lg min-h-[100px]"
                placeholder="Share your thoughts..."
                value={formData.comparativeAnalysis}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="metaReflective" className="block text-gray-700 font-medium mb-2">
                Meta-Reflective <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-600 mb-2">
                What stakeholders (teachers, students, administrators, policy-makers) would benefit most from the
                scenario you created? Who might be disadvantaged?
              </p>
              <textarea
                id="metaReflective"
                name="metaReflective"
                className="w-full p-3 border border-gray-300 rounded-lg min-h-[100px]"
                placeholder="Share your thoughts..."
                value={formData.metaReflective}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="challengeRating" className="block text-gray-700 font-medium mb-2">
                Challenge Rating <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-600 mb-2">
                To what extent does this scenario address current educational challenges?
              </p>
              <div className="space-y-2">
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                    <div key={value} className="text-center text-xs font-medium">
                      {value}
                    </div>
                  ))}
                </div>
                <input
                  type="range"
                  id="challengeRating"
                  name="challengeRating"
                  min="1"
                  max="7"
                  step="1"
                  value={formData.challengeRating}
                  onChange={handleChange}
                  className="w-full"
                />
                <div className="grid grid-cols-7 gap-1 mt-1 text-xs text-gray-600">
                  <div className="text-center">Does not address any</div>
                  <div className="text-center col-start-3 col-span-3">Moderately addresses</div>
                  <div className="text-center col-start-7">Potential to inspire</div>
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="researchImprovement" className="block text-gray-700 font-medium mb-2">
                For Research Improvement <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-600 mb-2">
                What perspectives or voices might be missing from the scenario you created?
              </p>
              <textarea
                id="researchImprovement"
                name="researchImprovement"
                className="w-full p-3 border border-gray-300 rounded-lg min-h-[100px]"
                placeholder="Share your thoughts..."
                value={formData.researchImprovement}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="additionalComments" className="block text-gray-700 font-medium mb-2">
                Any additional comments or suggestions about this research tool?
              </label>
              <textarea
                id="additionalComments"
                name="additionalComments"
                className="w-full p-3 border border-gray-300 rounded-lg min-h-[100px]"
                placeholder="Optional feedback..."
                value={formData.additionalComments}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        
        {/* Form Status Alert */}
        {formState && !formState.success && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start">
            <svg 
              className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-red-700">{formState.message}</span>
          </div>
        )}
        
        {/* Form Buttons */}
        <div className="flex justify-between items-center mt-8">
          <button
            type="button"
            onClick={handleBack}
            className="py-3 px-6 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-300"
          >
            Back to Writing
          </button>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="py-3 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors duration-300 flex items-center"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              'Submit Your Reflections'
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 
'use client';

import React, { useEffect } from 'react';
import { useResearchStore } from '../store/researchStore';
import ProgressSteps from './ProgressSteps';
import Step1Selection from './Step1Selection';
import Step2Writing from './Step2Writing';
import Step3Submit from './Step3Submit';
import ConsentModal from './ConsentModal';
import { useRouter } from 'next/navigation';

export default function ResearchApp() {
  const { currentStep, hasConsent, setHasConsent } = useResearchStore();
  const router = useRouter();
  
  // Show the modal if there's no consent
  const showConsentModal = !hasConsent;
  
  const handleAcceptConsent = () => {
    setHasConsent(true);
  };
  
  const handleDeclineConsent = () => {
    // Redirect to another page or show a message that they can't use the app
    // For now, we'll just redirect to an external site
    window.location.href = 'https://kth.se';
  };
  
  // Render the appropriate step component based on the current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Selection />;
      case 2:
        return <Step2Writing />;
      case 3:
        return <Step3Submit />;
      default:
        return <Step1Selection />;
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-center items-center">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              EduFutures Research
            </span>
          </div>
        </div>
      </header>
      
      <ConsentModal 
        isOpen={showConsentModal}
        onAccept={handleAcceptConsent}
        onDecline={handleDeclineConsent}
      />
      
      <ProgressSteps />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {renderStep()}
      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-center items-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} EduFutures Research Project
          </div>
        </div>
      </footer>
    </div>
  );
} 
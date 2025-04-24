'use client';

import React from 'react';
import { useResearchStore } from '../store/researchStore';

export default function ProgressSteps() {
  const { currentStep } = useResearchStore();
  
  const steps = [
    { id: 1, name: 'Selection', description: 'Choose elements' },
    { id: 2, name: 'Writing', description: 'Create your story' },
    { id: 3, name: 'Submit', description: 'Share your story' },
  ];
  
  return (
    <nav aria-label="Progress" className="py-6 border-b border-gray-200 mb-6">
      <ol className="max-w-4xl mx-auto flex items-center">
        {steps.map((step, stepIdx) => (
          <li key={step.id} className={`relative ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''} ${stepIdx !== 0 ? 'pl-8 sm:pl-20' : ''} flex-1`}>
            {stepIdx !== steps.length - 1 && (
              <div className="absolute top-4 left-4 -ml-px mt-0.5 w-full h-0.5 bg-gray-200">
                <div 
                  className="h-0.5 bg-blue-600 transition-all duration-500 ease-in-out" 
                  style={{ width: currentStep > step.id ? '100%' : '0%' }}
                />
              </div>
            )}
            
            <div className="group relative flex items-center">
              <span className="flex items-center" aria-hidden="true">
                <span
                  className={`
                    flex h-8 w-8 items-center justify-center rounded-full 
                    ${currentStep === step.id 
                      ? 'bg-blue-600 text-white' 
                      : currentStep > step.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }
                  `}
                >
                  {currentStep > step.id ? (
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    step.id
                  )}
                </span>
              </span>
              <span className="ml-3 text-sm font-medium text-gray-900">
                {step.name}
                <span className="block text-xs text-gray-500">{step.description}</span>
              </span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
} 
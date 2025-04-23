'use client';

import React from 'react';
import Link from 'next/link';

type Step = {
  number: number;
  title: string;
  path: string;
};

const steps: Step[] = [
  { number: 1, title: 'Select Elements', path: '/wizard/step1' },
  { number: 2, title: 'Generate Story', path: '/wizard/step2' },
  { number: 3, title: 'Continue Story', path: '/wizard/step3' },
  { number: 4, title: 'Submit', path: '/wizard/step4' },
];

type StepIndicatorProps = {
  currentStep: number;
  canAdvance?: boolean;
};

export default function StepIndicator({ currentStep, canAdvance = true }: StepIndicatorProps) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step) => {
          const isActive = step.number === currentStep;
          const isCompleted = step.number < currentStep;
          const isDisabled = step.number > currentStep && !canAdvance;
          
          return (
            <div key={step.number} className="flex flex-col items-center">
              <div className="relative flex items-center justify-center">
                {step.number > 1 && (
                  <div 
                    className={`absolute right-full w-full h-1 -translate-y-1/2 ${
                      isCompleted || isActive ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  />
                )}
                <div 
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    isActive 
                      ? 'bg-blue-500 text-white' 
                      : isCompleted 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {isCompleted ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <span>{step.number}</span>
                  )}
                </div>
                {step.number < steps.length && (
                  <div 
                    className={`absolute left-full w-full h-1 -translate-y-1/2 ${
                      isCompleted ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
              <div className="mt-2 text-sm font-medium">
                {isDisabled ? (
                  <span className="text-gray-400">{step.title}</span>
                ) : (
                  <Link href={step.path} className={isActive ? 'text-blue-600' : 'text-gray-600'}>
                    {step.title}
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 
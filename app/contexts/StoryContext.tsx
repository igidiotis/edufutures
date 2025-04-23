'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define types for our story elements
export type StoryElement = {
  id: string;
  title: string;
  image: string;
  category: 'arc' | 'object' | 'terrain' | 'mood';
};

// Define the context state type
type StoryContextType = {
  selectedElements: {
    arc?: StoryElement;
    object?: StoryElement;
    terrain?: StoryElement;
    mood?: StoryElement;
  };
  generatedStory: string;
  userStory: string;
  participantInfo: {
    name: string;
    email: string;
    age: string;
    consent: boolean;
  };
  // Functions for updating state
  selectElement: (element: StoryElement) => void;
  setGeneratedStory: (story: string) => void;
  setUserStory: (story: string) => void;
  setParticipantInfo: (info: Partial<StoryContextType['participantInfo']>) => void;
  resetContext: () => void;
  // Check if all elements are selected
  areAllElementsSelected: () => boolean;
};

// Create context with default values
const StoryContext = createContext<StoryContextType | undefined>(undefined);

// Provider component
export function StoryProvider({ children }: { children: ReactNode }) {
  const [selectedElements, setSelectedElements] = useState<StoryContextType['selectedElements']>({});
  const [generatedStory, setGeneratedStory] = useState('');
  const [userStory, setUserStory] = useState('');
  const [participantInfo, setParticipantInfo] = useState({
    name: '',
    email: '',
    age: '',
    consent: false,
  });

  // Function to select an element
  const selectElement = (element: StoryElement) => {
    setSelectedElements(prev => ({
      ...prev,
      [element.category]: element
    }));
  };

  // Function to update participant info
  const updateParticipantInfo = (info: Partial<StoryContextType['participantInfo']>) => {
    setParticipantInfo(prev => ({ ...prev, ...info }));
  };

  // Function to reset the context
  const resetContext = () => {
    setSelectedElements({});
    setGeneratedStory('');
    setUserStory('');
    setParticipantInfo({
      name: '',
      email: '',
      age: '',
      consent: false,
    });
  };

  // Check if all elements are selected
  const areAllElementsSelected = () => {
    return Boolean(
      selectedElements.arc && 
      selectedElements.object && 
      selectedElements.terrain && 
      selectedElements.mood
    );
  };

  return (
    <StoryContext.Provider
      value={{
        selectedElements,
        generatedStory,
        userStory,
        participantInfo,
        selectElement,
        setGeneratedStory,
        setUserStory,
        setParticipantInfo: updateParticipantInfo,
        resetContext,
        areAllElementsSelected,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
}

// Custom hook to use the story context
export function useStory() {
  const context = useContext(StoryContext);
  if (context === undefined) {
    throw new Error('useStory must be used within a StoryProvider');
  }
  return context;
} 
import { create } from 'zustand';
import { ElementType } from '../types/research';

interface ResearchState {
  // Selected elements for each category
  selectedElements: {
    arc: ElementType | null;
    object: ElementType | null;
    terrain: ElementType | null;
    mood: ElementType | null;
  };
  // Current step in the research process
  currentStep: number;
  // User's story
  story: string;
  // AI-generated story starter
  aiStoryStarter: string;
  // Loading state for story generation
  isGenerating: boolean;
  
  // Actions
  selectElement: (category: string, element: ElementType) => void;
  setCurrentStep: (step: number) => void;
  setStory: (story: string) => void;
  setAiStoryStarter: (starter: string) => void;
  generateStoryStarter: () => Promise<void>;
  resetSelections: () => void;
}

export const useResearchStore = create<ResearchState>((set, get) => ({
  selectedElements: {
    arc: null,
    object: null,
    terrain: null,
    mood: null,
  },
  currentStep: 1,
  story: '',
  aiStoryStarter: '',
  isGenerating: false,
  
  selectElement: (category, element) => set((state) => ({
    selectedElements: {
      ...state.selectedElements,
      [category]: element
    }
  })),
  
  setCurrentStep: (step) => set({ currentStep: step }),
  
  setStory: (story) => set({ story }),
  
  setAiStoryStarter: (starter) => set({ 
    aiStoryStarter: starter,
    story: starter // Also set the main story to include the starter
  }),
  
  generateStoryStarter: async () => {
    const { selectedElements } = get();
    
    set({ isGenerating: true });
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          arc: selectedElements.arc,
          object: selectedElements.object,
          terrain: selectedElements.terrain,
          mood: selectedElements.mood,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate story');
      }

      const data = await response.json();
      set({ 
        aiStoryStarter: data.text,
        story: data.text, // Set the story text to the generated opener
        isGenerating: false
      });
    } catch (error) {
      console.error('Error generating story:', error);
      set({ isGenerating: false });
      // You might want to add error handling here
    }
  },
  
  resetSelections: () => set({
    selectedElements: {
      arc: null,
      object: null,
      terrain: null,
      mood: null,
    },
    story: '',
    aiStoryStarter: '',
    currentStep: 1,
    isGenerating: false
  })
})); 
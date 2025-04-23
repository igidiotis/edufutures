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
  
  // Actions
  selectElement: (category: string, element: ElementType) => void;
  setCurrentStep: (step: number) => void;
  setStory: (story: string) => void;
  setAiStoryStarter: (starter: string) => void;
  generateStoryStarter: () => void;
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
  
  generateStoryStarter: () => {
    const { selectedElements } = get();
    
    // For now, create a simple story starter based on the selected elements
    // This will be replaced with an actual AI API call later
    if (selectedElements.arc && selectedElements.object && selectedElements.terrain && selectedElements.mood) {
      const arcTitle = selectedElements.arc.title;
      const objectTitle = selectedElements.object.title;
      const terrainTitle = selectedElements.terrain.title;
      const moodTitle = selectedElements.mood.title;
      
      const starter = `In a ${arcTitle} future of education, the ${objectTitle} has become essential within the ${terrainTitle}. As you engage with this emerging reality, you feel a sense of ${moodTitle}...`;
      
      set({ 
        aiStoryStarter: starter,
        story: starter
      });
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
    currentStep: 1
  })
})); 
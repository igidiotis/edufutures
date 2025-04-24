import { create } from 'zustand';
import { ElementType } from '../types/research';

interface FormData {
  // Demographics
  occupation: string;
  subjectField: string;
  country: string;
  email: string;
  
  // Reflections
  scenarioCreationExperience: string;
  educationalInsights: string;
  comparativeAnalysis: string;
  metaReflective: string;
  challengeRating: string;
  researchImprovement: string;
  additionalComments: string;
}

interface FormState {
  success: boolean;
  message: string;
}

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
  // Error message
  error: string | null;
  
  // Form data
  formData: FormData;
  isSubmitting: boolean;
  formState: FormState | null;
  
  // Actions
  selectElement: (category: string, element: ElementType) => void;
  setCurrentStep: (step: number) => void;
  setStory: (story: string) => void;
  setAiStoryStarter: (starter: string) => void;
  generateStoryStarter: () => Promise<void>;
  resetSelections: () => void;
  clearError: () => void;
  
  // Form actions
  updateFormField: (field: keyof FormData, value: string) => void;
  submitForm: () => Promise<void>;
  resetForm: () => void;
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
  error: null,
  
  // Initialize form data
  formData: {
    occupation: '',
    subjectField: '',
    country: '',
    email: '',
    scenarioCreationExperience: '',
    educationalInsights: '',
    comparativeAnalysis: '',
    metaReflective: '',
    challengeRating: '4',
    researchImprovement: '',
    additionalComments: ''
  },
  isSubmitting: false,
  formState: null,
  
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
  
  clearError: () => set({ error: null }),
  
  generateStoryStarter: async () => {
    const { selectedElements } = get();
    
    set({ isGenerating: true, error: null });
    
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

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate story');
      }

      set({ 
        aiStoryStarter: data.text,
        story: data.text,
        isGenerating: false
      });
    } catch (error) {
      console.error('Error generating story:', error);
      set({ 
        isGenerating: false,
        error: error instanceof Error ? error.message : 'Failed to generate story'
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
    currentStep: 1,
    isGenerating: false,
    error: null,
    // Also reset form data and form state when starting over
    formData: {
      occupation: '',
      subjectField: '',
      country: '',
      email: '',
      scenarioCreationExperience: '',
      educationalInsights: '',
      comparativeAnalysis: '',
      metaReflective: '',
      challengeRating: '4',
      researchImprovement: '',
      additionalComments: ''
    },
    isSubmitting: false,
    formState: null
  }),
  
  // Form actions
  updateFormField: (field, value) => set((state) => ({
    formData: {
      ...state.formData,
      [field]: value
    }
  })),
  
  submitForm: async () => {
    const { formData, story } = get();
    
    set({ isSubmitting: true, formState: null });
    
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          story,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      set({ 
        isSubmitting: false, 
        formState: { 
          success: true, 
          message: 'Your submission has been received. Thank you for participating!' 
        } 
      });
      
    } catch (error) {
      console.error('Error submitting form:', error);
      set({ 
        isSubmitting: false, 
        formState: { 
          success: false, 
          message: error instanceof Error ? error.message : 'Failed to submit form'
        } 
      });
    }
  },
  
  resetForm: () => set({
    formData: {
      occupation: '',
      subjectField: '',
      country: '',
      email: '',
      scenarioCreationExperience: '',
      educationalInsights: '',
      comparativeAnalysis: '',
      metaReflective: '',
      challengeRating: '4',
      researchImprovement: '',
      additionalComments: ''
    },
    isSubmitting: false,
    formState: null
  })
})); 
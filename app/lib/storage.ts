import { StoryElement } from '../contexts/StoryContext';

// Define interface for submission data
export interface StorySubmission {
  id: string;
  storyElements: {
    arc?: StoryElement;
    object?: StoryElement;
    terrain?: StoryElement;
    mood?: StoryElement;
  };
  generatedStory: string;
  userStory: string;
  participant: {
    name: string;
    email: string;
    age: string;
    consent: boolean;
  };
  submittedAt: string;
}

// For this example, we're using localStorage
// In a production app, this would connect to a database or Vercel KV

// Helper to check if localStorage is available
const isLocalStorageAvailable = () => {
  try {
    const testKey = '__test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

// Save submission to storage
export const saveSubmission = async (data: Omit<StorySubmission, 'id' | 'submittedAt'>): Promise<StorySubmission> => {
  // Generate a unique ID and timestamp
  const id = `submission_${Date.now()}`;
  const submittedAt = new Date().toISOString();
  
  const submission: StorySubmission = {
    ...data,
    id,
    submittedAt
  };
  
  if (isLocalStorageAvailable()) {
    // Get existing submissions
    const existingData = localStorage.getItem('storySubmissions');
    const submissions: StorySubmission[] = existingData ? JSON.parse(existingData) : [];
    
    // Add new submission
    submissions.push(submission);
    
    // Save back to localStorage
    localStorage.setItem('storySubmissions', JSON.stringify(submissions));
  } else {
    // If localStorage isn't available (e.g., SSR or incognito mode)
    console.log('LocalStorage not available, submission would be saved to database:', submission);
  }
  
  return submission;
};

// Get all submissions (for admin purposes)
export const getSubmissions = async (): Promise<StorySubmission[]> => {
  if (isLocalStorageAvailable()) {
    const data = localStorage.getItem('storySubmissions');
    return data ? JSON.parse(data) : [];
  }
  return [];
}; 
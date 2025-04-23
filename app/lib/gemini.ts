import { GoogleGenerativeAI } from '@google/generative-ai';
import { StoryElement } from '../contexts/StoryContext';

// Helper function to get Gemini API key
const getApiKey = () => {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Missing Gemini API key');
  }
  return apiKey;
};

export const generateStoryBeginning = async (elements: {
  arc?: StoryElement;
  object?: StoryElement;
  terrain?: StoryElement;
  mood?: StoryElement;
}): Promise<string> => {
  try {
    const apiKey = getApiKey();
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Extract the titles for the prompt
    const arcTitle = elements.arc?.title || '';
    const objectTitle = elements.object?.title || '';
    const terrainTitle = elements.terrain?.title || '';
    const moodTitle = elements.mood?.title || '';

    // Create prompt
    const prompt = `
      Create the beginning of a short story (150-200 words) with the following elements:
      - Story Arc: ${arcTitle}
      - Key Object: ${objectTitle}
      - Setting: ${terrainTitle}
      - Mood: ${moodTitle}
      
      Write an engaging opening that introduces the setting and main character(s), 
      incorporates the key object in a meaningful way, and establishes the mood.
      The story should feel like it's just beginning, with potential for the reader to continue it.
      End at a point that creates curiosity and provides direction for continuation.
    `;

    // Generate content
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error('Error generating story:', error);
    return 'We encountered an error generating your story. Please try again.';
  }
}; 
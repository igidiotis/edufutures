import { GoogleGenerativeAI } from '@google/generative-ai';
import { StoryElement } from '../contexts/StoryContext';

// Helper function to get Gemini API key
const getApiKey = () => {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('Missing Gemini API key - using placeholder response');
    return null;
  }
  return apiKey;
};

// Placeholder response when no API key is available
const getPlaceholderStory = (elements: {
  arc?: StoryElement;
  object?: StoryElement;
  terrain?: StoryElement;
  mood?: StoryElement;
}): string => {
  const arc = elements.arc?.title || 'Journey';
  const object = elements.object?.title || 'Map';
  const terrain = elements.terrain?.title || 'Forest';
  const mood = elements.mood?.title || 'Mysterious';
  
  return `The ${mood.toLowerCase()} atmosphere surrounded me as I ventured into the dense ${terrain.toLowerCase()}. 
  This ${arc.toLowerCase()} had begun unexpectedly when I discovered the ancient ${object.toLowerCase()} hidden in my grandfather's attic.
  As I continued deeper into the unknown territory, the ${object.toLowerCase()} seemed to glow faintly, responding to something ahead.
  What secrets would I uncover? The path forward was uncertain, but I knew this was just the beginning of something extraordinary...`;
};

export const generateStoryBeginning = async (elements: {
  arc?: StoryElement;
  object?: StoryElement;
  terrain?: StoryElement;
  mood?: StoryElement;
}): Promise<string> => {
  try {
    const apiKey = getApiKey();
    
    // If no API key is available, return a placeholder story
    if (!apiKey) {
      return getPlaceholderStory(elements);
    }
    
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
    return getPlaceholderStory(elements);
  }
}; 
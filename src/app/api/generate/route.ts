import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Log the start of the request
    console.log('Starting story generation...');

    const { arc, object, terrain, mood } = await request.json();
    
    // Validate input
    if (!arc || !object || !terrain || !mood) {
      console.error('Missing required elements:', { arc, object, terrain, mood });
      return NextResponse.json(
        { error: 'Missing required elements' },
        { status: 400 }
      );
    }

    // Log the API key presence (not the key itself)
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY is not set in environment variables');
      return NextResponse.json(
        { error: 'API key configuration error' },
        { status: 500 }
      );
    }

    // Initialize Gemini API
    console.log('Initializing Gemini API...');
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `Write a 2-3 sentence story opener for a speculative fiction story about the future of education. The story should incorporate these elements:
- Future trajectory: ${arc.title} - ${arc.description}
- Key artifact: ${object.title} - ${object.description}
- Environment: ${terrain.title} - ${terrain.description}
- Emotional context: ${mood.title} - ${mood.description}

Keep the opener concise but evocative, focusing on setting the scene and tone for the story. Do not resolve the story, just set up an intriguing beginning.`;

    console.log('Sending prompt to Gemini...');
    const result = await model.generateContent(prompt);
    console.log('Received response from Gemini');
    const response = await result.response;
    const text = response.text();

    console.log('Successfully generated story');
    return NextResponse.json({ text });
  } catch (error) {
    // Log the full error details
    console.error('Error in story generation:', {
      error: error instanceof Error ? {
        message: error.message,
        stack: error.stack,
        name: error.name
      } : error
    });
    
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate story' },
      { status: 500 }
    );
  }
} 
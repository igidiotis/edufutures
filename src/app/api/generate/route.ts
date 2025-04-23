import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { arc, object, terrain, mood } = await request.json();

    // Initialize Gemini API
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Write a 2-3 sentence story opener for a speculative fiction story about the future of education. The story should incorporate these elements:
- Future trajectory: ${arc.title} - ${arc.description}
- Key artifact: ${object.title} - ${object.description}
- Environment: ${terrain.title} - ${terrain.description}
- Emotional context: ${mood.title} - ${mood.description}

Keep the opener concise but evocative, focusing on setting the scene and tone for the story. Do not resolve the story, just set up an intriguing beginning.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error('Error generating story:', error);
    return NextResponse.json(
      { error: 'Failed to generate story' },
      { status: 500 }
    );
  }
} 
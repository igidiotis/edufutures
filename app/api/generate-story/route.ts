import { NextRequest, NextResponse } from 'next/server';
import { generateStoryBeginning } from '../../lib/gemini';
import { StoryElement } from '../../contexts/StoryContext';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { elements } = body;

    if (!elements || !elements.arc || !elements.object || !elements.terrain || !elements.mood) {
      return NextResponse.json(
        { error: 'Missing required story elements' },
        { status: 400 }
      );
    }

    const story = await generateStoryBeginning(elements);

    return NextResponse.json({ story }, { status: 200 });
  } catch (error: any) {
    console.error('Error in generate story API:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate story' },
      { status: 500 }
    );
  }
} 
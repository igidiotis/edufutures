import { NextRequest, NextResponse } from 'next/server';
import { saveSubmission } from '../../lib/storage';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { selectedElements, generatedStory, userStory, participantInfo } = body;

    // Validate required fields
    if (!userStory || !generatedStory || !participantInfo) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate participant info
    if (!participantInfo.name || !participantInfo.email || !participantInfo.consent) {
      return NextResponse.json(
        { error: 'Missing required participant information' },
        { status: 400 }
      );
    }

    // Validate word count (minimum 80 words)
    const wordCount = userStory.trim().split(/\s+/).length;
    if (wordCount < 80) {
      return NextResponse.json(
        { error: 'Story must be at least 80 words long' },
        { status: 400 }
      );
    }

    // Save submission
    const submission = await saveSubmission({
      storyElements: selectedElements,
      generatedStory,
      userStory,
      participant: participantInfo
    });

    return NextResponse.json({ 
      success: true, 
      submissionId: submission.id 
    }, { status: 200 });
    
  } catch (error: any) {
    console.error('Error in submit API:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to submit story' },
      { status: 500 }
    );
  }
} 
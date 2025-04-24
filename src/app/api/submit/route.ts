import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabaseAdmin } from '@/utils/supabaseAdmin';

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

interface ResponseData {
  success: boolean;
  emailSent?: boolean;
  messageId?: string;
  emailError?: string;
  submissionId?: string;
}

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { 
      // Demographics
      occupation,
      subjectField,
      country,
      email,
      
      // Reflections
      scenarioCreationExperience,
      educationalInsights,
      comparativeAnalysis,
      metaReflective,
      challengeRating,
      researchImprovement,
      additionalComments,
      
      // Story
      story
    } = await request.json();
    
    // Validate required fields
    if (!occupation || !subjectField || !country || !story || 
        !scenarioCreationExperience || !educationalInsights || 
        !comparativeAnalysis || !metaReflective || 
        !challengeRating || !researchImprovement) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let responseData: ResponseData = { success: true };
    
    // Store submission in Supabase using admin client
    try {
      console.log('Storing submission in Supabase...');
      const { data, error } = await supabaseAdmin
        .from('submissions')
        .insert({
          occupation,
          subject_field: subjectField,
          country,
          email: email || null, // Handle empty email
          story,
          scenario_creation_experience: scenarioCreationExperience,
          educational_insights: educationalInsights,
          comparative_analysis: comparativeAnalysis,
          meta_reflective: metaReflective,
          challenge_rating: parseInt(challengeRating),
          research_improvement: researchImprovement,
          additional_comments: additionalComments || null
        })
        .select('id')
        .single();
      
      if (error) {
        console.error('Error storing submission in Supabase:', error);
        throw new Error(`Failed to store submission: ${error.message}`);
      }
      
      console.log('Submission stored successfully with ID:', data.id);
      responseData.submissionId = data.id;
      
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: dbError instanceof Error ? dbError.message : 'Failed to store submission' },
        { status: 500 }
      );
    }
    
    // Send email if email is provided
    if (email) {
      try {
        console.log('Attempting to send email to:', email);
        console.log('Using Resend API key (first 4 chars):', process.env.RESEND_API_KEY?.substring(0, 4));
        
        // Email HTML content
        const emailHtml = `
          <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333; background-color: #f8f9fa; border-radius: 10px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #3b82f6; margin-bottom: 10px; font-size: 28px;">Thank you for sharing your story!</h1>
              <div style="width: 80px; height: 4px; background: linear-gradient(90deg, #3b82f6, #8b5cf6); margin: 0 auto 20px;"></div>
              <p style="margin-bottom: 15px; line-height: 1.6; font-size: 17px;">
                Dear ${occupation} from ${country},
              </p>
              <p style="margin-bottom: 25px; line-height: 1.6; font-size: 16px;">
                We greatly appreciate your thoughtful contribution to the EduFutures Research project. 
                Your insights will help shape our understanding of future educational landscapes and inform innovative approaches to learning and futures thinking.
              </p>
            </div>

            <div style="background-color: #ffffff; padding: 25px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); margin: 25px 0;">
              <h2 style="color: #4B5563; font-size: 22px; margin-bottom: 15px; border-left: 4px solid #3b82f6; padding-left: 10px;">Your Speculative Scenario</h2>
              <div style="line-height: 1.6; white-space: pre-wrap; background-color: #f9fafb; padding: 15px; border-radius: 6px; font-style: italic;">${story.replace(/\n/g, '<br>')}</div>
            </div>
            
            <div style="background-color: #ffffff; padding: 25px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); margin: 25px 0;">
              <h2 style="color: #4B5563; font-size: 22px; margin-bottom: 15px; border-left: 4px solid #3b82f6; padding-left: 10px;">What Happens Next?</h2>
              <p style="color: #4B5563; margin-bottom: 15px; line-height: 1.6;">
                Your contribution will be analyzed alongside other submissions to identify patterns, 
                innovative approaches, and emerging themes in educational futures. This research will help us:
              </p>
              <ul style="color: #4B5563; margin-bottom: 20px; line-height: 1.6; padding-left: 20px;">
                <li style="margin-bottom: 8px;">Develop frameworks for understanding possible educational futures</li>
                <li style="margin-bottom: 8px;">Identify key tensions and opportunities in educational technology</li>
                <li style="margin-bottom: 8px;">Create resources to help educators prepare for upcoming challenges</li>
                <li style="margin-bottom: 8px;">Inform policy discussions around the future of learning</li>
              </ul>
              <p style="color: #4B5563; line-height: 1.6;">
                We may reach out for additional insights or to invite you to participate in follow-up
                studies if you've expressed interest in further participation.
              </p>
            </div>
            
            <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;" />
            
            <div style="text-align: center;">
              <p style="color: #6B7280; font-size: 15px; margin-bottom: 10px; line-height: 1.5;">
                Thank you again for participating in our research project. Your contribution is invaluable!
              </p>
              <p style="color: #6B7280; font-size: 15px; line-height: 1.5;">
                If you have any questions, please don't hesitate to contact me at <a href="mailto:gidiotis@kth.se" style="color: #3b82f6; text-decoration: none;">gidiotis@kth.se</a>
              </p>
              <p style="color: #6B7280; font-size: 15px; margin-top: 15px; line-height: 1.5;">
                - EduFutures Research project
              </p>
            </div>
          </div>
        `;
        
        // Using Resend as per their documentation
        const result = await resend.emails.send({
          from: 'EduFutures Research <onboarding@resend.dev>', // Use Resend's default domain initially
          to: [email],
          subject: 'Thank you for sharing you future scenario!',
          html: emailHtml,
        });
        
        console.log('Resend API response:', result);
        
        if (result.error) {
          console.error('Error from Resend API:', result.error);
          responseData = { 
            ...responseData, 
            emailSent: false, 
            emailError: result.error.message 
          };
        } else {
          console.log('Email sent successfully with ID:', result.data?.id);
          responseData = { 
            ...responseData, 
            emailSent: true, 
            messageId: result.data?.id 
          };
        }
      } catch (emailError) {
        console.error('Exception during email sending:', emailError);
        responseData = { 
          ...responseData, 
          emailSent: false, 
          emailError: emailError instanceof Error ? emailError.message : 'Unknown error sending email'
        };
      }
    }

    return NextResponse.json(responseData);
    
  } catch (error) {
    console.error('Error processing submission:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process submission' },
      { status: 500 }
    );
  }
} 
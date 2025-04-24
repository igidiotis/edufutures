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
        console.log('Sending confirmation email to:', email);
        const { data, error } = await resend.emails.send({
          from: 'EduFutures Research <gidiotis@kth.se>', 
          to: [email],
          bcc: process.env.ADMIN_EMAIL || '', // Optional: Set this in .env
          subject: 'Thank you for your EduFutures submission',
          html: `
            <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
              <h1 style="color: #4B5563; margin-bottom: 20px; font-size: 24px;">Thank You for Your Submission!</h1>
              <p style="margin-bottom: 15px; line-height: 1.5;">We appreciate your contribution to the EduFutures Research project.</p>
              
              <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 25px 0;">
                <h2 style="color: #4B5563; font-size: 18px; margin-bottom: 15px;">Your Speculative Scenario</h2>
                <div style="line-height: 1.6; white-space: pre-wrap;">${story.replace(/\n/g, '<br>')}</div>
              </div>
              
              <h2 style="color: #4B5563; font-size: 18px; margin: 20px 0 15px;">Your Reflections</h2>
              
              <div style="margin-bottom: 25px;">
                <h3 style="color: #4B5563; font-size: 16px; margin-bottom: 5px;">Scenario Creation Experience</h3>
                <p style="color: #6B7280; margin-bottom: 10px; line-height: 1.5;">${scenarioCreationExperience}</p>
              </div>
              
              <div style="margin-bottom: 25px;">
                <h3 style="color: #4B5563; font-size: 16px; margin-bottom: 5px;">Educational Insights</h3>
                <p style="color: #6B7280; margin-bottom: 10px; line-height: 1.5;">${educationalInsights}</p>
              </div>
              
              <div style="margin-bottom: 25px;">
                <h3 style="color: #4B5563; font-size: 16px; margin-bottom: 5px;">Comparative Analysis</h3>
                <p style="color: #6B7280; margin-bottom: 10px; line-height: 1.5;">${comparativeAnalysis}</p>
              </div>
              
              <div style="margin-bottom: 25px;">
                <h3 style="color: #4B5563; font-size: 16px; margin-bottom: 5px;">Meta-Reflective</h3>
                <p style="color: #6B7280; margin-bottom: 10px; line-height: 1.5;">${metaReflective}</p>
              </div>
              
              <div style="margin-bottom: 25px;">
                <h3 style="color: #4B5563; font-size: 16px; margin-bottom: 5px;">Challenge Rating</h3>
                <p style="color: #6B7280; margin-bottom: 10px; line-height: 1.5;">${challengeRating}/7</p>
              </div>
              
              <div style="margin-bottom: 25px;">
                <h3 style="color: #4B5563; font-size: 16px; margin-bottom: 5px;">Research Improvement</h3>
                <p style="color: #6B7280; margin-bottom: 10px; line-height: 1.5;">${researchImprovement}</p>
              </div>
              
              ${additionalComments ? `
              <div style="margin-bottom: 25px;">
                <h3 style="color: #4B5563; font-size: 16px; margin-bottom: 5px;">Additional Comments</h3>
                <p style="color: #6B7280; margin-bottom: 10px; line-height: 1.5;">${additionalComments}</p>
              </div>
              ` : ''}
              
              <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;" />
              
              <p style="color: #6B7280; font-size: 14px;">Thank you again for participating in our research project. If you have any questions, please don't hesitate to contact us.</p>
              <p style="color: #6B7280; font-size: 14px;">- The EduFutures Research Team</p>
            </div>
          `,
        });

        if (error) {
          console.error('Error sending email:', error);
          // We still consider the submission successful even if email fails
          responseData = { 
            ...responseData, 
            emailSent: false, 
            emailError: error.message 
          };
        } else {
          console.log('Email sent successfully with ID:', data?.id);
          responseData = { 
            ...responseData, 
            emailSent: true, 
            messageId: data?.id 
          };
        }
      } catch (emailError) {
        console.error('Email error:', emailError);
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
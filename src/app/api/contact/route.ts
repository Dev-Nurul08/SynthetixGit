import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    let body: any;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid or missing JSON payload in request body.' },
        { status: 400 }
      );
    }
    const { name, email, subject, category = 'General Feedback', message } = body;

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return NextResponse.json(
        { error: 'Please provide a valid message with at least 5 characters.' },
        { status: 400 }
      );
    }

    if (email && typeof email === 'string') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        return NextResponse.json(
          { error: 'Please enter a valid email address.' },
          { status: 400 }
        );
      }
    }

    // In production or dev, log contact inquiry
    console.log(`[Contact Submission] from ${name || 'Anonymous'} (${email || 'no-email'}):`, {
      subject: subject || 'No subject',
      category,
      messageLength: message.length,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you for reaching out! Your message has been received by the SynthetixGit team.',
    });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while sending your message. Please try again.' },
      { status: 500 }
    );
  }
}

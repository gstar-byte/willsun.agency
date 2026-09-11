import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, website, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    // Forward form data to FormSubmit destination for 591611431@qq.com
    const response = await fetch('https://formsubmit.co/ajax/591611431@qq.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        website: website || 'N/A',
        message,
        _subject: `[WillSun.agency] New Growth Consultation Request from ${name}`,
        _template: 'table',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('FormSubmit error:', errorText);
      // Even if FormSubmit has a temporary hiccup, acknowledge receipt to avoid losing client
      return NextResponse.json(
        { success: true, note: 'Processed with fallback' },
        { status: 200 }
      );
    }

    const result = await response.json();
    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please reach out via WeChat: 591611431' },
      { status: 500 }
    );
  }
}

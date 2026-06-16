import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Mock database for waitlist signups
// In a real app, this would be an external DB or ESP (like Mailchimp/Klaviyo)
const WAITLIST_FILE = path.join(process.cwd(), 'waitlist_submissions.json');

export async function POST(request: Request) {
  try {
    const { email, city } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Read existing submissions
    let submissions = [];
    if (fs.existsSync(WAITLIST_FILE)) {
      const data = fs.readFileSync(WAITLIST_FILE, 'utf8');
      submissions = JSON.parse(data);
    }

    // Add new submission
    const newSubmission = {
      email,
      city: city || 'newsletter',
      timestamp: new Date().toISOString(),
    };

    submissions.push(newSubmission);

    // Save back to file
    fs.writeFileSync(WAITLIST_FILE, JSON.stringify(submissions, null, 2));

    console.log(`New waitlist/newsletter signup: ${email} for ${city || 'general'}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Waitlist submission error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

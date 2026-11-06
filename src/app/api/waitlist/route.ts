import { NextResponse } from 'next/server';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { email, city } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    const cityName = city || 'newsletter';
    const timestamp = new Date().toISOString();

    // Try storing in Turso via team-db CLI
    let storedInDb = false;
    try {
      const key = `waitlist:${Date.now()}`;
      const value = JSON.stringify({ email, city: cityName, timestamp });
      execSync(
        `team-db "INSERT OR REPLACE INTO config (key, value) VALUES ('${key.replace(/'/g, "''")}', '${value.replace(/'/g, "''")}')"`,
        { timeout: 10000, stdio: 'pipe' }
      );
      storedInDb = true;
    } catch (dbError) {
      console.log('team-db insert unavailable, using file fallback');
    }

    // Always also write to file as fallback
    const WAITLIST_FILE = path.join(process.cwd(), 'waitlist_submissions.json');
    let submissions = [];
    if (fs.existsSync(WAITLIST_FILE)) {
      const data = fs.readFileSync(WAITLIST_FILE, 'utf8');
      submissions = JSON.parse(data);
    }

    submissions.push({ email, city: cityName, timestamp });
    fs.writeFileSync(WAITLIST_FILE, JSON.stringify(submissions, null, 2));

    console.log(`New waitlist/newsletter signup: ${email} for ${cityName} (DB: ${storedInDb ? 'yes' : 'file fallback'})`);

    return NextResponse.json({ success: true, message: 'You\'re on the list!' });
  } catch (error) {
    console.error('Waitlist submission error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

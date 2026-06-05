import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, cohort } = body;

    if (!name || !email || !cohort) {
      return NextResponse.json({ error: 'Missing required fields: name, email, cohort' }, { status: 400 });
    }
    if (name.length > 200 || email.length > 200 || cohort.length > 200) {
      return NextResponse.json({ error: 'Fields too long' }, { status: 400 });
    }

    const configPath = join(homedir(), '.config', 'configstore', 'firebase-tools.json');
    const config = JSON.parse(readFileSync(configPath, 'utf-8'));
    const token = config.tokens.access_token;

    const dbId = process.env.NEXT_PUBLIC_FIRESTORE_DATABASE_ID || '(default)';
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const encodedDbId = encodeURIComponent(dbId);
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/${encodedDbId}/documents/waitlist`;

    const doc = {
      fields: {
        name: { stringValue: name.trim() },
        email: { stringValue: email.trim() },
        cohort: { stringValue: cohort },
        timestamp: { stringValue: new Date().toLocaleString('en-IN') },
      },
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(doc),
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: err }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json({ success: true, id: data.name?.split('/').pop() || '' });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown error' }, { status: 500 });
  }
}

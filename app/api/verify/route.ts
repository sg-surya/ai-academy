import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

export async function GET(req: NextRequest) {
  const certId = req.nextUrl.searchParams.get('id');
  if (!certId) {
    return NextResponse.json({ error: 'Missing certificate ID' }, { status: 400 });
  }

  try {
    const dbId = process.env.NEXT_PUBLIC_FIRESTORE_DATABASE_ID || '(default)';
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    
    const encodedDbId = encodeURIComponent(dbId);
    const encodedCertId = encodeURIComponent(certId);
    
    let url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/${encodedDbId}/documents/certificates/${encodedCertId}`;
    if (apiKey) {
      url += `?key=${encodeURIComponent(apiKey)}`;
    }

    let token: string | null = null;
    try {
      const configPath = join(homedir(), '.config', 'configstore', 'firebase-tools.json');
      const config = JSON.parse(readFileSync(configPath, 'utf-8'));
      token = config.tokens?.access_token || null;
    } catch (e) {
      // Ignore config store errors, fall back to public/API key access
    }

    const headers: HeadersInit = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(url, { headers });

    if (!res.ok) {
      if (res.status === 404) {
        return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
      }
      const err = await res.text();
      return NextResponse.json({ error: err }, { status: res.status });
    }

    const data = await res.json();
    const fields = data.fields || {};
    const cert = {
      id: certId,
      name: fields.name?.stringValue || '',
      workshop: fields.workshop?.stringValue || '',
      date: fields.date?.stringValue || '',
      issuer: fields.issuer?.stringValue || '',
      status: fields.status?.stringValue || '',
    };

    return NextResponse.json(cert);
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown error' }, { status: 500 });
  }
}

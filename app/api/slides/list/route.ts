import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const manifestPath = path.join(process.cwd(), 'ppt', 'manifest.json');
    const data = await fs.readFile(manifestPath, 'utf-8');
    const manifest = JSON.parse(data);
    const slidesets = Object.values(manifest).sort((a: any, b: any) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    return NextResponse.json({ slidesets });
  } catch {
    return NextResponse.json({ slidesets: [] });
  }
}

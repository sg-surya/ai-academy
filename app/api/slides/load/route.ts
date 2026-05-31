import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();
    if (!name) {
      return NextResponse.json({ error: 'Missing name' }, { status: 400 });
    }

    const baseDir = path.join(process.cwd(), 'ppt', name);
    const files: Record<string, string> = {};

    async function readDir(dir: string) {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      for (const entry of entries) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          await readDir(full);
        } else {
          const rel = path.relative(baseDir, full).replace(/\\/g, '/');
          files[rel] = await fs.readFile(full, 'utf-8');
        }
      }
    }

    await readDir(baseDir);
    return NextResponse.json({ files });
  } catch {
    return NextResponse.json({ error: 'Slideset not found' }, { status: 404 });
  }
}

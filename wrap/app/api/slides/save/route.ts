import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const { name, files: fileMap } = await req.json();

    if (!name || !fileMap) {
      return NextResponse.json({ error: 'Missing name or files' }, { status: 400 });
    }

    const baseDir = path.join(process.cwd(), 'ppt', name);

    for (const [filePath, content] of Object.entries(fileMap)) {
      const fullPath = path.join(baseDir, filePath);
      await fs.mkdir(path.dirname(fullPath), { recursive: true });
      await fs.writeFile(fullPath, content as string, 'utf-8');
    }

    const manifestPath = path.join(process.cwd(), 'ppt', 'manifest.json');
    let manifest: Record<string, { name: string; timestamp: string; fileCount: number }> = {};
    try {
      manifest = JSON.parse(await fs.readFile(manifestPath, 'utf-8'));
    } catch { /* first time */ }

    manifest[name] = {
      name,
      timestamp: new Date().toISOString(),
      fileCount: Object.keys(fileMap).length,
    };

    await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

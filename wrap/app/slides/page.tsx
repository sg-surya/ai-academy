'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft, Upload, ChevronLeft, ChevronRight, Pen, Eraser, RotateCcw,
  Clock, Play, Pause, Square, Maximize, Minimize, Trash2, FolderOpen,
  AlertCircle, Check, FileText, Timer, TimerOff, GripHorizontal, X
} from 'lucide-react';

interface Point { x: number; y: number }
interface Stroke {
  id: string;
  points: Point[];
  color: string;
  size: number;
  isEraser: boolean;
}

const PRESET_COLORS = [
  '#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899',
  '#000000', '#ffffff',
];

const BRUSH_SIZES = [
  { label: 'S', value: 3 },
  { label: 'M', value: 6 },
  { label: 'L', value: 12 },
];

function formatTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function strokeId() { return 's-' + Math.random().toString(36).slice(2, 8); }

let strokeCounter = 0;

export default function SlidesPage() {
  const [files, setFiles] = useState<Map<string, string>>(new Map());
  const [slidePaths, setSlidePaths] = useState<string[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const [penMode, setPenMode] = useState(false);
  const [penColor, setPenColor] = useState('#ef4444');
  const [penSize, setPenSize] = useState(6);
  const [eraserMode, setEraserMode] = useState(false);
  const [drawings, setDrawings] = useState<Map<string, Stroke[]>>(new Map());
  const [isDrawing, setIsDrawing] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentStrokeRef = useRef<Stroke | null>(null);
  const drawingsRef = useRef(drawings);

  const [fullscreen, setFullscreen] = useState(false);
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const dockPanelRef = useRef<HTMLDivElement>(null);

  // ── Recent slidesets state ─────────────────────────────────────
  const [recentSets, setRecentSets] = useState<{ name: string; timestamp: string; fileCount: number }[]>([]);
  const [loadingRecent, setLoadingRecent] = useState(false);
  const currentFolderName = useRef('');

  const fetchRecent = useCallback(async () => {
    setLoadingRecent(true);
    try {
      const res = await fetch('/api/slides/list');
      const data = await res.json();
      setRecentSets(data.slidesets || []);
    } catch {} finally {
      setLoadingRecent(false);
    }
  }, []);

  useEffect(() => { fetchRecent(); }, [fetchRecent]);

  // ── Save uploaded files ────────────────────────────────────────
  const saveSlideset = useCallback(async (name: string, map: Map<string, string>) => {
    const obj: Record<string, string> = {};
    for (const [k, v] of map) obj[k] = v;
    try {
      await fetch('/api/slides/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, files: obj }),
      });
      fetchRecent();
    } catch {}
  }, [fetchRecent]);

  // ── Countdown timer state ─────────────────────────────────────
  const [cdMinutes, setCdMinutes] = useState(5);
  const [cdSeconds, setCdSeconds] = useState(0);
  const [cdRemaining, setCdRemaining] = useState(0);
  const [cdRunning, setCdRunning] = useState(false);
  const [cdFinished, setCdFinished] = useState(false);
  const cdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [showTimerWidget, setShowTimerWidget] = useState(false);

  drawingsRef.current = drawings;

  // ── Close dock panel on outside click ─────────────────────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dockPanelRef.current && !dockPanelRef.current.contains(e.target as Node)) {
        setActivePanel(null);
      }
    };
    if (activePanel) {
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }
  }, [activePanel]);

  // ── File processing ──────────────────────────────────────────
  const processFiles = useCallback((map: Map<string, string>, folderName?: string) => {
    setError('');
    const slides: string[] = [];
    for (const [path] of map) {
      const n = path.replace(/\\/g, '/');
      if (n.endsWith('.html') && n.includes('/')) slides.push(n);
    }
    slides.sort((a, b) => {
      const na = parseInt(a.match(/(\d+)/)?.[1] || '0', 10);
      const nb = parseInt(b.match(/(\d+)/)?.[1] || '0', 10);
      return na - nb;
    });
    if (slides.length === 0) {
      setLoading(false);
      setError('No HTML slides found in the "slides/" folder.');
      return;
    }
    setFiles(map);
    setSlidePaths(slides);
    setCurrentIdx(0);
    setDrawings(new Map());
    setUploaded(true);
    setLoading(false);

    // Save to disk in background
    const name = folderName || `slideset-${Date.now()}`;
    saveSlideset(name, map);
  }, [saveSlideset]);

  // ── Load saved slideset ────────────────────────────────────────
  const loadSlideset = useCallback(async (name: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/slides/load', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (data.files) {
        const entries = Object.entries(data.files) as [string, string][];
        const map = new Map<string, string>(entries);
        processFiles(map);
      }
    } catch {
      setError('Failed to load slideset');
      setLoading(false);
    }
  }, [processFiles]);

  const readEntry = useCallback(async (
    entry: FileSystemEntry, base = ''
  ): Promise<{ path: string; content: string }[]> => {
    const results: { path: string; content: string }[] = [];
    if (entry.isFile) {
      const fe = entry as FileSystemFileEntry;
      const file = await new Promise<File>((res) => fe.file(res));
      results.push({ path: base + file.name, content: await file.text() });
    } else if (entry.isDirectory) {
      const de = entry as FileSystemDirectoryEntry;
      const reader = de.createReader();
      const entries = await new Promise<FileSystemEntry[]>((res) => reader.readEntries(res));
      for (const child of entries) {
        const sub = await readEntry(child, base + entry.name + '/');
        results.push(...sub);
      }
    }
    return results;
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    setLoading(true);
    const map = new Map<string, string>();
    let folderName = '';
    await Promise.all(
      Array.from(e.dataTransfer.items).map(async (item) => {
        const entry = item.webkitGetAsEntry();
        if (entry) {
          if (!folderName) folderName = entry.name;
          const results = await readEntry(entry);
          for (const r of results) map.set(r.path.replace(/\\/g, '/'), r.content);
        }
      })
    );
    processFiles(map, folderName);
  }, [readEntry, processFiles]);

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setDragOver(true); };
  const handleDragLeave = () => setDragOver(false);

  const handleFolderPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fl = e.target.files;
    if (!fl || fl.length === 0) return;
    setLoading(true);
    const map = new Map<string, string>();
    const folderName = fl[0].webkitRelativePath.split('/')[0];
    for (let i = 0; i < fl.length; i++) {
      const file = fl[i];
      const rel = file.webkitRelativePath.replace(/\\/g, '/');
      const path = rel.split('/').slice(1).join('/');
      if (file.name.endsWith('.html') || file.name.endsWith('.css') || file.type.startsWith('text/')) {
        map.set(path, await file.text());
      }
    }
    processFiles(map, folderName);
    e.target.value = '';
  };

  const getThemeCss = useCallback(() => {
    for (const [path, content] of files) {
      if (path.replace(/\\/g, '/').endsWith('theme.css')) return content;
    }
    return '';
  }, [files]);

  const currentSrcDoc = useCallback(() => {
    if (!slidePaths[currentIdx]) return '';
    const html = files.get(slidePaths[currentIdx]) || '';
    const css = getThemeCss();
    const responsiveReset = `
      *{margin:0;padding:0;box-sizing:border-box}
      html,body{width:100%;height:100%;overflow:hidden}
      body{display:flex;align-items:center;justify-content:center}
      #slide-wrap{width:100%;height:100%;max-width:100%;max-height:100%;overflow:auto;display:flex;align-items:center;justify-content:center}
      img,video,svg,canvas,table,iframe{max-width:100%!important;height:auto!important}
    `;
    return `<!DOCTYPE html>
<html><head><meta name="viewport" content="width=device-width,initial-scale=1.0">
<style>${responsiveReset}${css}</style></head>
<body><div id="slide-wrap">${html}</div></body></html>`;
  }, [files, slidePaths, currentIdx, getThemeCss]);

  const goNext = () => { if (currentIdx < slidePaths.length - 1) setCurrentIdx((i) => i + 1); };
  const goPrev = () => { if (currentIdx > 0) setCurrentIdx((i) => i - 1); };

  // ── Drawing ──────────────────────────────────────────────────
  const getCtx = () => canvasRef.current?.getContext('2d') || null;

  const redraw = useCallback(() => {
    const ctx = getCtx();
    const c = canvasRef.current;
    if (!ctx || !c) return;
    ctx.clearRect(0, 0, c.width, c.height);
    const strokes = drawingsRef.current.get(slidePaths[currentIdx]) || [];
    for (const s of strokes) {
      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = s.size;
      ctx.globalCompositeOperation = s.isEraser ? 'destination-out' : 'source-over';
      ctx.strokeStyle = s.isEraser ? 'rgba(0,0,0,1)' : s.color;
      ctx.beginPath();
      ctx.moveTo(s.points[0].x, s.points[0].y);
      for (let i = 1; i < s.points.length; i++) ctx.lineTo(s.points[i].x, s.points[i].y);
      ctx.stroke();
      ctx.restore();
    }
  }, [currentIdx, slidePaths]);

  const getCanvasPoint = (e: React.PointerEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    return rect ? { x: e.clientX - rect.left, y: e.clientY - rect.top } : { x: 0, y: 0 };
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!penMode) return;
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    const pt = getCanvasPoint(e);
    currentStrokeRef.current = { id: strokeId() + '-' + strokeCounter++, points: [pt], color: eraserMode ? 'rgba(0,0,0,1)' : penColor, size: penSize, isEraser: eraserMode };
    setIsDrawing(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawing || !currentStrokeRef.current) return;
    const pt = getCanvasPoint(e);
    currentStrokeRef.current.points.push(pt);
    const ctx = getCtx();
    if (!ctx) return;
    const s = currentStrokeRef.current;
    const pts = s.points;
    if (pts.length < 2) return;
    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = s.size;
    ctx.globalCompositeOperation = s.isEraser ? 'destination-out' : 'source-over';
    ctx.strokeStyle = s.isEraser ? 'rgba(0,0,0,1)' : s.color;
    ctx.beginPath();
    ctx.moveTo(pts[pts.length - 2].x, pts[pts.length - 2].y);
    ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
    ctx.stroke();
    ctx.restore();
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDrawing || !currentStrokeRef.current) return;
    e.preventDefault();
    setIsDrawing(false);
    const finished = currentStrokeRef.current;
    currentStrokeRef.current = null;
    if (finished.points.length < 2) return;
    const key = slidePaths[currentIdx];
    const next = new Map(drawings);
    next.set(key, [...(drawings.get(key) || []), finished]);
    setDrawings(next);
  };

  const clearDrawings = () => {
    const key = slidePaths[currentIdx];
    const next = new Map(drawings);
    next.delete(key);
    setDrawings(next);
  };

  const undoStroke = () => {
    const key = slidePaths[currentIdx];
    const prev = drawings.get(key) || [];
    if (prev.length === 0) return;
    const next = new Map(drawings);
    next.set(key, prev.slice(0, -1));
    setDrawings(next);
  };

  // ── Canvas resize ────────────────────────────────────────────
  useEffect(() => {
    const c = canvasRef.current;
    const p = containerRef.current;
    if (!c || !p) return;
    const resize = () => { const r = p.getBoundingClientRect(); c.width = r.width; c.height = r.height; redraw(); };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(p);
    return () => ro.disconnect();
  }, [redraw]);

  useEffect(() => { redraw(); }, [redraw, drawings]);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    c.style.pointerEvents = penMode ? 'auto' : 'none';
    c.style.cursor = penMode ? 'crosshair' : (c.style.cursor = 'default');
  }, [penMode]);

  // ── Keyboard shortcuts ───────────────────────────────────────
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev();
      if (e.key === 'p' || e.key === 'P') setPenMode((v) => !v);
      if (e.key === 'e' || e.key === 'E') setEraserMode((v) => !v);
      if ((e.key === 'z' || e.key === 'Z') && (e.metaKey || e.ctrlKey)) { e.preventDefault(); undoStroke(); }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  });

  // ── Countdown timer ──────────────────────────────────────────
  useEffect(() => {
    if (cdRunning && cdRemaining > 0) {
      cdTimerRef.current = setInterval(() => {
        setCdRemaining((prev) => {
          if (prev <= 1) {
            setCdRunning(false);
            setCdFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => { if (cdTimerRef.current) clearInterval(cdTimerRef.current); };
  }, [cdRunning, cdRemaining]);

  const startCountdown = () => {
    const total = cdMinutes * 60 + cdSeconds;
    if (total <= 0) return;
    setCdRemaining(total);
    setCdRunning(true);
    setCdFinished(false);
    setShowTimerWidget(true);
  };

  const stopCountdown = () => {
    setCdRunning(false);
    if (cdTimerRef.current) clearInterval(cdTimerRef.current);
  };

  const resetCountdown = () => {
    stopCountdown();
    setCdRemaining(0);
    setCdFinished(false);
  };

  // ── Fullscreen ───────────────────────────────────────────────
  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      setFullscreen(true);
    } else {
      await document.exitFullscreen();
      setFullscreen(false);
    }
  };
  useEffect(() => {
    const h = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', h);
    return () => document.removeEventListener('fullscreenchange', h);
  }, []);

  // ── Toggle pen from dock ─────────────────────────────────────
  const togglePen = () => {
    const next = !penMode;
    setPenMode(next);
    if (next && activePanel !== 'pen') setActivePanel('pen');
    else if (!next && activePanel === 'pen') setActivePanel(null);
  };

  // ── RENDER: upload zone ──────────────────────────────────────
  if (!uploaded) {
    return (
      <div className="min-h-screen bg-[#fcfdfd] flex flex-col">
        <div className="border-b border-slate-200/60 bg-white px-4 sm:px-8 lg:px-16 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 text-slate-500 hover:text-[#0b3d2b] transition-colors text-xs font-mono font-bold group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back</span>
          </Link>
          <span className="text-[9px] font-mono font-extrabold text-slate-400 uppercase tracking-wider">Teaching Board</span>
        </div>
        <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl">
            <div className="text-center mb-8">
              <span className="inline-flex items-center space-x-1.5 text-[10px] font-mono font-black uppercase tracking-widest text-[#0b3d2b] bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 leading-none mb-4">
                <FileText className="w-3.5 h-3.5 text-emerald-700" />
                <span>Slide Upload</span>
              </span>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#07130d] tracking-tight mt-4">Teaching Board</h1>
              <p className="text-slate-500 text-sm mt-3 max-w-md mx-auto leading-relaxed">
                Upload your slides folder. Structure: <code className="text-[#0b3d2b] bg-emerald-50 px-1.5 py-0.5 text-xs font-mono font-bold">assets/theme.css</code> + <code className="text-[#0b3d2b] bg-emerald-50 px-1.5 py-0.5 text-xs font-mono font-bold">slides/*.html</code>
              </p>
            </div>
            <div
              onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed p-12 sm:p-16 text-center transition-all duration-200 cursor-pointer relative overflow-hidden ${
                dragOver ? 'border-[#0b3d2b] bg-emerald-50/50' : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="absolute -right-12 -bottom-12 w-36 h-36 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
              <motion.div animate={dragOver ? { scale: 1.05 } : { scale: 1 }} className="relative">
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center">
                  {loading ? <div className="w-6 h-6 border-2 border-[#0b3d2b] border-t-transparent rounded-full animate-spin" /> : <FolderOpen className="w-7 h-7 text-slate-400" />}
                </div>
                <p className="font-display text-lg font-bold text-[#07130d] mb-2">
                  {loading ? 'Reading files…' : dragOver ? 'Drop folder here' : 'Drop your slides folder here'}
                </p>
                <p className="text-xs text-slate-400 font-mono font-medium mb-5">or click to browse</p>
                <input ref={fileInputRef} type="file" {...{ webkitdirectory: '' } as React.InputHTMLAttributes<HTMLInputElement>} className="hidden" onChange={handleFolderPick} />
                <div className="inline-flex items-center space-x-2 bg-[#0b3d2b] text-white font-mono text-xs font-bold px-5 py-2.5 hover:bg-[#0a3525] transition-colors">
                  <Upload className="w-4 h-4" />
                  <span>Choose Folder</span>
                </div>
              </motion.div>
            </div>
            <div className="mt-6 p-4 bg-slate-50 border border-slate-200">
              <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">Expected folder structure</p>
              <pre className="text-[11px] font-mono text-slate-600 leading-relaxed">{`your-folder/
  assets/
    theme.css
  slides/
    1page.html
    2page.html
    3page.html`}</pre>
            </div>
            {/* ── Recent Slidesets ── */}
            {recentSets.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[9px] font-mono font-extrabold text-slate-400 uppercase tracking-wider flex items-center">
                    <Clock className="w-3 h-3 mr-1.5" /> Recent
                  </span>
                  {loadingRecent && <div className="w-3 h-3 border-2 border-[#0b3d2b] border-t-transparent rounded-full animate-spin" />}
                </div>
                <div className="space-y-2">
                  {recentSets.map((set) => (
                    <div key={set.name}
                      className="flex items-center justify-between bg-white border border-slate-200 px-4 py-3 hover:border-[#0b3d2b]/30 transition-colors">
                      <div className="flex items-center space-x-3 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-mono font-bold text-[#07130d] truncate">{set.name}</p>
                          <p className="text-[9px] font-mono text-slate-400">
                            {new Date(set.timestamp).toLocaleDateString()} · {set.fileCount} files
                          </p>
                        </div>
                      </div>
                      <button onClick={() => loadSlideset(set.name)}
                        className="ml-3 shrink-0 px-3 py-1.5 text-[10px] font-mono font-bold bg-[#0b3d2b] text-white hover:bg-[#0a3525] transition-colors">
                        Load
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {error && (
              <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                className="mt-5 bg-rose-50 border-2 border-rose-200 px-4 py-3 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <p className="text-rose-700 text-xs font-mono font-bold">{error}</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  // ── RENDER: slide viewer ─────────────────────────────────────
  const currentLabel = slidePaths[currentIdx]?.split('/').pop() || '';
  const totalSlides = slidePaths.length;

  return (
    <div className="h-screen bg-[#fcfdfd] flex flex-col overflow-hidden">
      {/* Top bar */}
      <div className="border-b border-slate-200/60 bg-white shrink-0">
        <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-slate-500 hover:text-[#0b3d2b] transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <span className="text-[9px] font-mono font-extrabold text-slate-400 uppercase tracking-wider hidden sm:block">Teaching Board</span>
            <div className="h-4 w-px bg-slate-200 hidden sm:block" />
            <div className="flex items-center space-x-2">
              <button onClick={goPrev} disabled={currentIdx === 0}
                className="p-1.5 text-slate-400 hover:text-[#0b3d2b] disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono font-bold text-[#07130d] tabular-nums">{currentIdx + 1} / {totalSlides}</span>
              <button onClick={goNext} disabled={currentIdx >= totalSlides - 1}
                className="p-1.5 text-slate-400 hover:text-[#0b3d2b] disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
              <span className="text-[10px] font-mono text-slate-400 ml-2 hidden sm:inline">{currentLabel}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={toggleFullscreen} className="p-1.5 text-slate-400 hover:text-[#0b3d2b] transition-colors">
              {fullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Slide area */}
        <div className="flex-1 relative bg-slate-100/50" ref={containerRef}>
          <iframe
            ref={iframeRef}
            srcDoc={currentSrcDoc()}
            className="w-full h-full border-0"
            title={`Slide ${currentIdx + 1}`}
          />
          <canvas
            ref={canvasRef}
            className="absolute inset-0"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          />

          {/* Pen mode indicator */}
          {penMode && (
            <div className="absolute top-3 left-3 flex items-center space-x-2 bg-white/90 border border-slate-200 px-2.5 py-1.5 shadow-sm">
              <Pen className={`w-3 h-3 ${eraserMode ? 'text-slate-300' : 'text-rose-500'}`} />
              <span className="text-[9px] font-mono font-bold text-slate-500 uppercase">{eraserMode ? 'Eraser' : 'Pen'}</span>
              <span className="w-3 h-3 rounded-full border border-slate-200" style={{ backgroundColor: eraserMode ? 'transparent' : penColor }} />
            </div>
          )}

          {/* ── Slide Navigation Arrows ── */}
          {currentIdx > 0 && (
            <button onClick={goPrev}
              className="absolute left-0 top-0 bottom-0 w-16 flex items-center justify-start pl-2 text-white/0 hover:text-white/80 hover:bg-black/10 transition-all duration-200 z-10 group cursor-pointer">
              <ChevronLeft className="w-8 h-8 drop-shadow-lg" />
            </button>
          )}
          {currentIdx < totalSlides - 1 && (
            <button onClick={goNext}
              className="absolute right-0 top-0 bottom-0 w-16 flex items-center justify-end pr-2 text-white/0 hover:text-white/80 hover:bg-black/10 transition-all duration-200 z-10 group cursor-pointer">
              <ChevronRight className="w-8 h-8 drop-shadow-lg" />
            </button>
          )}

          {/* ── Floating Countdown Timer Widget ── */}
          <AnimatePresence>
            {showTimerWidget && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute top-4 right-4 z-20 bg-white border-2 border-[#0b3d2b]/20 shadow-[3px_3px_0px_#0b3d2b]/10 min-w-[160px]"
              >
                <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-100">
                  <span className="text-[8px] font-mono font-extrabold text-slate-400 uppercase tracking-wider flex items-center">
                    <Timer className="w-3 h-3 mr-1" /> Countdown
                  </span>
                  <button onClick={() => { resetCountdown(); setShowTimerWidget(false); }}
                    className="text-slate-300 hover:text-slate-500 transition-colors">
                    <X className="w-3 h-3" />
                  </button>
                </div>

                {cdRemaining > 0 || cdRunning || cdFinished ? (
                  <div className="p-3 text-center">
                    <div className={`text-3xl font-mono font-black tabular-nums tracking-tight ${
                      cdFinished ? 'text-rose-500 animate-pulse' : cdRemaining <= 10 && cdRunning ? 'text-amber-500' : 'text-[#07130d]'
                    }`}>
                      {formatTime(cdRemaining)}
                    </div>
                    {cdFinished ? (
                      <div className="mt-2 text-[10px] font-mono font-bold text-rose-500 uppercase">Time&apos;s up!</div>
                    ) : cdRunning ? (
                      <button onClick={stopCountdown}
                        className="mt-2 w-full flex items-center justify-center space-x-1.5 py-1.5 text-[10px] font-mono font-bold bg-amber-500 text-white hover:bg-amber-600 transition-colors">
                        <Pause className="w-3 h-3" />
                        <span>Pause</span>
                      </button>
                    ) : (
                      <div className="flex space-x-1 mt-2">
                        <button onClick={() => setCdRunning(true)}
                          className="flex-1 flex items-center justify-center space-x-1 py-1.5 text-[10px] font-mono font-bold bg-[#0b3d2b] text-white hover:bg-[#0a3525] transition-colors">
                          <Play className="w-3 h-3 fill-white" />
                          <span>Resume</span>
                        </button>
                        <button onClick={resetCountdown}
                          className="flex items-center justify-center px-2 py-1.5 text-[10px] font-mono font-bold bg-white border border-slate-200 text-slate-500 hover:border-slate-300 transition-colors">
                          <Square className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-3">
                    <div className="flex items-center space-x-1 mb-2">
                      <input type="number" min={0} max={99} value={cdMinutes}
                        onChange={(e) => setCdMinutes(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-12 text-center text-sm font-mono font-bold text-[#07130d] border border-slate-200 py-1 focus:outline-none focus:border-[#0b3d2b] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="text-sm font-mono font-bold text-slate-400">:</span>
                      <input type="number" min={0} max={59} value={cdSeconds}
                        onChange={(e) => setCdSeconds(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
                        className="w-12 text-center text-sm font-mono font-bold text-[#07130d] border border-slate-200 py-1 focus:outline-none focus:border-[#0b3d2b] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>
                    <button onClick={startCountdown}
                      className="w-full flex items-center justify-center space-x-1.5 py-2 text-[10px] font-mono font-bold bg-[#0b3d2b] text-white hover:bg-[#0a3525] transition-colors">
                      <Play className="w-3 h-3 fill-white" />
                      <span>Start Countdown</span>
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Sidebar Dock ── */}
        <div className="w-11 border-l border-slate-200/60 bg-white flex flex-col items-center py-2 shrink-0">
          {/* Pen */}
          <button onClick={togglePen}
            className={`w-8 h-8 flex items-center justify-center rounded-sm transition-all text-xs ${
              penMode ? 'bg-[#0b3d2b] text-white' : 'text-slate-400 hover:text-[#0b3d2b] hover:bg-slate-50'
            }`}
            title="Pen (P)">
            <Pen className="w-4 h-4" />
          </button>

          {/* Pen panel trigger */}
          {penMode && (
            <button onClick={() => setActivePanel(activePanel === 'pen' ? null : 'pen')}
              className={`w-8 h-8 flex items-center justify-center rounded-sm transition-all text-xs ${
                activePanel === 'pen' ? 'bg-[#0b3d2b] text-white' : 'text-slate-400 hover:text-[#0b3d2b] hover:bg-slate-50'
              }`}
              title="Pen Settings">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          )}

          <div className="w-5 h-px bg-slate-100 my-1.5" />

          {/* Timer */}
          <button onClick={() => { setActivePanel(activePanel === 'timer' ? null : 'timer'); }}
            className={`w-8 h-8 flex items-center justify-center rounded-sm transition-all text-xs ${
              activePanel === 'timer' ? 'bg-[#0b3d2b] text-white' : 'text-slate-400 hover:text-[#0b3d2b] hover:bg-slate-50'
            }`}
            title="Timer">
            <Clock className="w-4 h-4" />
          </button>

          <div className="w-5 h-px bg-slate-100 my-1.5" />

          {/* Slides list */}
          <button onClick={() => setActivePanel(activePanel === 'slides' ? null : 'slides')}
            className={`w-8 h-8 flex items-center justify-center rounded-sm transition-all text-xs ${
              activePanel === 'slides' ? 'bg-[#0b3d2b] text-white' : 'text-slate-400 hover:text-[#0b3d2b] hover:bg-slate-50'
            }`}
            title="Slide List">
            <FileText className="w-4 h-4" />
          </button>

          <div className="flex-1" />

          {/* Fullscreen */}
          <button onClick={toggleFullscreen}
            className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-[#0b3d2b] hover:bg-slate-50 rounded-sm transition-all text-xs"
            title="Fullscreen">
            {fullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>

        {/* ── Dock Flyout Panel ── */}
        <AnimatePresence>
          {activePanel && (
            <motion.div
              ref={dockPanelRef}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 260, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="border-l border-slate-200/60 bg-white overflow-hidden shrink-0"
            >
              <div className="w-[260px] h-full flex flex-col overflow-y-auto">
                {/* ── Pen Panel ── */}
                {activePanel === 'pen' && (
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[9px] font-mono font-extrabold text-slate-400 uppercase tracking-wider flex items-center">
                        <Pen className="w-3 h-3 mr-1.5" /> Drawing Tools
                      </span>
                    </div>
                    <div className="space-y-3">
                      <button onClick={() => setEraserMode((v) => !v)}
                        className={`w-full flex items-center justify-center space-x-2 py-2 text-xs font-mono font-bold border-2 transition-all ${
                          eraserMode ? 'bg-rose-50 border-rose-200 text-rose-600' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                        }`}>
                        <Eraser className="w-3.5 h-3.5" />
                        <span>Eraser</span>
                      </button>

                      <div>
                        <span className="block text-[8px] font-mono font-extrabold text-slate-400 uppercase mb-1.5">Brush Size</span>
                        <div className="flex space-x-1.5">
                          {BRUSH_SIZES.map((bs) => (
                            <button key={bs.value} onClick={() => setPenSize(bs.value)}
                              className={`flex-1 py-2 text-xs font-mono font-bold border-2 transition-all ${
                                penSize === bs.value ? 'bg-[#0b3d2b] text-white border-[#0b3d2b]' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                              }`}>
                              {bs.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="block text-[8px] font-mono font-extrabold text-slate-400 uppercase mb-1.5">Color</span>
                        <div className="grid grid-cols-4 gap-1.5">
                          {PRESET_COLORS.map((c) => (
                            <button key={c} onClick={() => { setPenColor(c); setEraserMode(false); }}
                              className={`w-full aspect-square rounded-sm border-2 transition-all ${
                                penColor === c && !eraserMode ? 'border-[#0b3d2b] scale-105' : 'border-slate-200 hover:border-slate-300'
                              }`}
                              style={{ backgroundColor: c }}>
                              {penColor === c && !eraserMode && (
                                <Check className={`w-3 h-3 mx-auto ${c === '#ffffff' || c === '#000000' ? 'text-black' : 'text-white'}`} />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-2 pt-1">
                        <button onClick={undoStroke}
                          className="flex-1 flex items-center justify-center space-x-1 py-2 text-xs font-mono font-bold bg-white border-2 border-slate-200 text-slate-500 hover:border-slate-300 transition-colors">
                          <RotateCcw className="w-3 h-3" />
                          <span>Undo</span>
                        </button>
                        <button onClick={clearDrawings}
                          className="flex-1 flex items-center justify-center space-x-1 py-2 text-xs font-mono font-bold bg-white border-2 border-slate-200 text-slate-500 hover:border-rose-200 hover:text-rose-600 transition-colors">
                          <Trash2 className="w-3 h-3" />
                          <span>Clear</span>
                        </button>
                      </div>

                      <div className="text-[9px] font-mono text-slate-400 text-center pt-1">
                        <kbd className="bg-slate-100 px-1.5 py-0.5 text-[8px] font-bold">P</kbd> toggle ·{' '}
                        <kbd className="bg-slate-100 px-1.5 py-0.5 text-[8px] font-bold">E</kbd> eraser ·{' '}
                        <kbd className="bg-slate-100 px-1.5 py-0.5 text-[8px] font-bold">⌘Z</kbd> undo
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Timer Panel ── */}
                {activePanel === 'timer' && (
                  <div className="p-4">
                    <span className="text-[9px] font-mono font-extrabold text-slate-400 uppercase tracking-wider flex items-center mb-4">
                      <Clock className="w-3 h-3 mr-1.5" /> Timer
                    </span>

                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-4">
                        <input type="number" min={0} max={99} value={cdMinutes}
                          onChange={(e) => setCdMinutes(Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-16 text-center text-2xl font-mono font-black text-[#07130d] border-2 border-slate-200 py-2 focus:outline-none focus:border-[#0b3d2b] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <span className="text-2xl font-mono font-black text-slate-300">:</span>
                        <input type="number" min={0} max={59} value={cdSeconds}
                          onChange={(e) => setCdSeconds(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
                          className="w-16 text-center text-2xl font-mono font-black text-[#07130d] border-2 border-slate-200 py-2 focus:outline-none focus:border-[#0b3d2b] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>

                      <button onClick={startCountdown}
                        className="w-full flex items-center justify-center space-x-2 py-3 text-xs font-mono font-bold bg-[#0b3d2b] text-white hover:bg-[#0a3525] transition-colors border-2 border-[#07130d] shadow-[3px_3px_0px_#07130d] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#07130d] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none">
                        <Play className="w-4 h-4 fill-white" />
                        <span>Add Timer Widget</span>
                      </button>

                      {showTimerWidget && (
                        <div className="mt-3 p-2 bg-emerald-50 border border-emerald-200">
                          <p className="text-[9px] font-mono font-bold text-emerald-700 text-center">Timer widget active on screen</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* ── Slides Panel ── */}
                {activePanel === 'slides' && (
                  <div className="p-4">
                    <span className="text-[9px] font-mono font-extrabold text-slate-400 uppercase tracking-wider flex items-center mb-3">
                      <FileText className="w-3 h-3 mr-1.5" /> Slides ({totalSlides})
                    </span>
                    <div className="space-y-1 max-h-[70vh] overflow-y-auto">
                      {slidePaths.map((path, i) => (
                        <button key={path} onClick={() => { setCurrentIdx(i); setActivePanel(null); }}
                          className={`w-full text-left px-3 py-2 text-xs font-mono transition-colors ${
                            i === currentIdx
                              ? 'bg-[#0b3d2b] text-white font-bold'
                              : 'text-slate-500 hover:bg-slate-50 font-medium'
                          }`}>
                          <span className="tabular-nums mr-2 opacity-60">{i + 1}.</span>
                          {path.split('/').pop()}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

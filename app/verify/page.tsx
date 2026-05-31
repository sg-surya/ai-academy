'use client';

import React, { useState } from 'react';
import { Search, Award, User, Calendar, FileText, TicketCheck, ExternalLink } from 'lucide-react';

const dummyCert = {
  id: 'VAA-CERT-2026-0042',
  name: 'Aarav Sharma',
  workshop: 'Learn AI From Scratch — Free Live Workshop',
  date: 'May 31, 2026',
  status: 'Verified',
  issuer: 'Vasudev AI Academy',
};

export default function VerifyPage() {
  const [certId, setCertId] = useState('');
  const [result, setResult] = useState<typeof dummyCert | null>(null);
  const [searched, setSearched] = useState(false);

  const handleVerify = () => {
    setSearched(true);
    if (certId.trim().toLowerCase() === dummyCert.id.toLowerCase()) {
      setResult(dummyCert);
    } else {
      setResult(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF9F6] text-[#07130d] font-sans selection:bg-emerald-500/10 selection:text-[#0b3d2b]">

      <div className="fixed inset-0 bg-[linear-gradient(to_right,#14422e06_1px,transparent_1px),linear-gradient(to_bottom,#14422e06_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-emerald-100/30 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed top-[40%] left-[-100px] w-[600px] h-[600px] bg-amber-500/[0.04] rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md py-3.5 border-b border-[#0b3d2b]/10 shadow-[0_4px_24px_rgba(11,61,43,0.03)] px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          <div className="flex items-center space-x-2.5 group cursor-pointer" onClick={() => window.location.href = '/'}>
            <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-[#0b3d2b] border border-emerald-500/10 shadow-sm transition duration-300">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4L12 20L20 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 12H16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <div className="font-display text-sm sm:text-base font-black tracking-tight text-[#07130d] leading-none">
                VASUDEV AI
              </div>
              <span className="block text-[8px] sm:text-[9px] font-mono tracking-widest text-[#0b3d2b] font-extrabold uppercase mt-0.5">
                ACADEMY
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 font-mono text-[10px] tracking-wider uppercase font-bold text-slate-500">
            <a href="/cohot-1-Lean-ai-from-scratch#curriculum" className="hover:text-[#0b3d2b] transition-colors">Curriculum</a>
            <a href="/cohot-1-Lean-ai-from-scratch#speaker" className="hover:text-[#0b3d2b] transition-colors">About Surya</a>
            <a href="/cohot-1-Lean-ai-from-scratch#certificate-section" className="hover:text-[#0b3d2b] transition-colors">Syllabus & Certificate</a>
            <a href="/cohot-1-Lean-ai-from-scratch#faq" className="hover:text-[#0b3d2b] transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center space-x-3">
            <a
              href="/cohot-1-Lean-ai-from-scratch#registration-section"
              className="bg-[#0b3d2b] text-white font-mono text-[10px] tracking-wider uppercase font-bold py-2 px-4 shadow-[3px_3px_0px_#07130d] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#07130d] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all duration-150 border border-[#07130d]"
            >
              Register Free
            </a>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 pt-32 pb-12">
        <div className="max-w-lg mx-auto mt-8 sm:mt-12">

          <div className="text-center mb-8">
            <span className="inline-flex items-center space-x-1.5 text-[10px] font-mono font-black uppercase tracking-widest text-[#0b3d2b] bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 leading-none mb-4">
              <Award className="w-3.5 h-3.5 text-emerald-700" />
              <span>Certificate Verification</span>
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#07130d] tracking-tight mt-4">
              Verify Your Certificate
            </h1>
            <p className="text-slate-500 text-sm mt-3 max-w-md mx-auto leading-relaxed">
              Enter your certificate ID below to verify its authenticity and view details.
            </p>
          </div>

          <div className="flex items-stretch gap-2 mb-8">
            <input
              type="text"
              value={certId}
              onChange={(e) => setCertId(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleVerify(); }}
              placeholder="Enter Certificate ID (e.g. VAA-CERT-2026-0042)"
              className="flex-1 bg-white border-2 border-slate-200 px-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 font-semibold focus:outline-none focus:border-[#0b3d2b] transition-all duration-200"
            />
            <button
              type="button"
              onClick={handleVerify}
              className="bg-[#0b3d2b] hover:bg-[#0a3525] text-white font-mono text-xs font-black uppercase tracking-wider px-6 py-3.5 border-2 border-[#0b3d2b] shadow-[3px_3px_0px_#07130d] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#07130d] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all duration-150 flex items-center gap-2 shrink-0"
            >
              <Search className="w-4 h-4" />
              Verify
            </button>
          </div>

          {searched && !result && (
            <div className="bg-rose-50 border border-rose-200 p-5 text-center">
              <span className="text-rose-800 text-sm font-bold block">
                Certificate not found
              </span>
              <span className="text-rose-600 text-xs mt-1 block">
                No certificate matches the ID &quot;{certId}&quot;. Please check and try again.
              </span>
            </div>
          )}

          {result && (
            <div className="bg-white border-2 border-[#0b3d2b]/20 shadow-[6px_6px_0px_#0b3d2b]/10 overflow-hidden">
              <div className="bg-[#0b3d2b] px-5 py-3 flex items-center justify-between">
                <span className="text-[10px] font-mono font-black uppercase tracking-widest text-emerald-400">
                  Verified Certificate
                </span>
                <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5">
                  <TicketCheck className="w-3 h-3" />
                  {result.status}
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-[#0b3d2b] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 block">Name</span>
                    <span className="text-base font-bold text-[#07130d]">{result.name}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-[#0b3d2b] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 block">Certificate ID</span>
                    <span className="text-sm font-mono font-bold text-[#07130d]">{result.id}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-[#0b3d2b] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 block">Workshop</span>
                    <span className="text-sm font-semibold text-[#07130d]">{result.workshop}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-[#0b3d2b] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 block">Issue Date</span>
                    <span className="text-sm font-bold text-[#07130d]">{result.date}</span>
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-100 text-center">
                  <span className="text-[9px] font-mono font-extrabold uppercase tracking-wider text-slate-400">
                    Issued by {result.issuer}
                  </span>
                </div>
              </div>
            </div>
          )}

          <p className="text-center text-[10px] font-mono text-slate-400 mt-6">
            Try: <span className="font-bold text-slate-500">VAA-CERT-2026-0042</span>
          </p>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-stone-50 border-t border-slate-200 py-10 px-4 sm:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="block font-bold text-slate-700">
              &copy; 2026 Vasudev AI Academy. All Rights Reserved.
            </span>
            <p className="text-[10px] text-slate-400 font-mono">
              Empowering early learners, students, and young pioneers globally.
            </p>
          </div>

          <div className="flex items-center space-x-5 font-mono text-[10px] font-bold">
            <a
              href="https://youtube.com/@vasudevai"
              target="_blank"
              rel="noreferrer"
              className="hover:text-red-600 transition-colors flex items-center space-x-1"
            >
              <span>YouTube</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href="https://instagram.com/vasudevai"
              target="_blank"
              rel="noreferrer"
              className="hover:text-pink-600 transition-colors flex items-center space-x-1"
            >
              <span>Instagram</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href="https://www.linkedin.com/company/vasudev-ai/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-700 transition-colors flex items-center space-x-1"
            >
              <span>LinkedIn</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}

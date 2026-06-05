'use client';

import React, { useState } from 'react';
import { Search, Award, User, Calendar, FileText, TicketCheck, ExternalLink, Loader, Bell, Sparkles, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface CertData {
  id: string;
  name: string;
  workshop: string;
  date: string;
  status: string;
  issuer: string;
}

export default function VerifyPage() {
  const [certId, setCertId] = useState('');
  const [result, setResult] = useState<CertData | null>(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleVerify = async () => {
    setSearched(true);
    setLoading(true);
    setResult(null);
    setErrorMsg(null);
    try {
      const res = await fetch(`/api/verify?id=${encodeURIComponent(certId.trim())}`);
      if (res.ok) {
        const data = await res.json();
        setResult(data as CertData);
      } else {
        const errData = await res.json().catch(() => ({ error: 'Unknown error' }));
        setErrorMsg(errData.error || 'Certificate not found');
        setResult(null);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      console.error('Verification error:', msg);
      setErrorMsg(msg);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF9F6] text-[#07130d] font-sans selection:bg-emerald-500/10 selection:text-[#0b3d2b]">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#14422e06_1px,transparent_1px),linear-gradient(to_bottom,#14422e06_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-emerald-100/30 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed top-[40%] left-[-100px] w-[600px] h-[600px] bg-amber-500/[0.04] rounded-full blur-[140px] pointer-events-none -z-10" />

      <header className="fixed top-0 left-0 w-full z-50 bg-[#07130d]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-[#39ff14] border border-[#39ff14]/30 shadow-sm transition duration-300">
              <svg className="w-5 h-5 text-[#07130d]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4L12 20L20 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 12H16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <div className="font-display text-sm sm:text-base font-black tracking-tight text-white leading-none">
                VASUDEV AI
              </div>
              <span className="block text-[8px] sm:text-[9px] font-mono tracking-widest text-[#39ff14] font-extrabold uppercase mt-0.5">
                ACADEMY
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 font-mono text-[10px] tracking-wider uppercase font-bold text-slate-400">
            <Link href="/cohot-1-Lean-ai-from-scratch" className="hover:text-[#39ff14] transition-colors">Workshop</Link>
            <Link href="/cohot-1-Lean-ai-from-scratch#resources" className="hover:text-[#39ff14] transition-colors">Resources</Link>
            <Link href="/cohot-1-Lean-ai-from-scratch#next-workshop" className="hover:text-[#39ff14] transition-colors">Next Cohort</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 pt-28 pb-12">
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
              placeholder="Enter Certificate ID (e.g. VAI26-C01-001)"
              className="flex-1 bg-white border-2 border-slate-200 px-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 font-semibold focus:outline-none focus:border-[#0b3d2b] transition-all duration-200"
            />
            <button
              type="button"
              onClick={handleVerify}
              disabled={loading}
              className="bg-[#0b3d2b] hover:bg-[#0a3525] disabled:bg-slate-400 text-white font-mono text-xs font-black uppercase tracking-wider px-6 py-3.5 border-2 border-[#0b3d2b] shadow-[3px_3px_0px_#07130d] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#07130d] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all duration-150 flex items-center gap-2 shrink-0 disabled:shadow-none disabled:hover:translate-x-0 disabled:hover:translate-y-0"
            >
              {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              {loading ? 'Verifying...' : 'Verify'}
            </button>
          </div>

          {searched && !loading && !result && !errorMsg && (
            <div className="bg-rose-50 border border-rose-200 p-5 text-center">
              <span className="text-rose-800 text-sm font-bold block">
                Certificate not found
              </span>
              <span className="text-rose-600 text-xs mt-1 block">
                No certificate matches the ID &quot;{certId}&quot;. Please check and try again.
              </span>
            </div>
          )}

          {errorMsg && (
            <div className="bg-rose-50 border border-rose-200 p-5 text-center">
              <span className="text-rose-800 text-xs font-mono font-bold block">
                Error: {errorMsg}
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
        </div>

        <div className="max-w-2xl mx-auto mt-20 sm:mt-24">
          <WaitlistForm />
        </div>
      </main>

      <footer className="bg-[#07130d] border-t border-white/5 py-10 px-4 sm:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="block font-bold text-slate-400">
              &copy; 2026 Vasudev AI Academy. All Rights Reserved.
            </span>
            <p className="text-[10px] text-slate-600 font-mono">
              Empowering early learners, students, and young pioneers globally.
            </p>
          </div>
          <div className="flex items-center space-x-5 font-mono text-[10px] font-bold">
            <a href="https://youtube.com/@vasudevai" target="_blank" rel="noreferrer" className="hover:text-red-500 transition-colors flex items-center space-x-1">
              <span>YouTube</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a href="https://instagram.com/vasudevai" target="_blank" rel="noreferrer" className="hover:text-pink-500 transition-colors flex items-center space-x-1">
              <span>Instagram</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a href="https://www.linkedin.com/company/vasudev-ai/" target="_blank" rel="noreferrer" className="hover:text-blue-500 transition-colors flex items-center space-x-1">
              <span>LinkedIn</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function WaitlistForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          cohort: 'Cohort #02 - Build With AI',
        }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({ error: 'Something went wrong' }));
        throw new Error(errData.error || 'Something went wrong');
      }
      setSubmitted(true);
    } catch (err) {
      console.error('Waitlist error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white border-2 border-[#0b3d2b]/20 p-6 sm:p-10 text-center relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#14422e04_1px,transparent_1px),linear-gradient(to_bottom,#14422e04_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="relative z-10">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-black uppercase tracking-widest text-[#0b3d2b] bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 mb-5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
          <span>Coming Soon</span>
        </span>
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#07130d] tracking-tight mt-2">
          Join the <span className="text-[#0b3d2b] underline decoration-emerald-300 decoration-2 underline-offset-4">Waitlist</span>
        </h2>
        <p className="text-slate-500 text-sm mt-3 max-w-lg mx-auto font-medium">
          Cohort #02: Build With AI is in the works. Get early access, exclusive resources, and a special discount.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="mt-6 max-w-md mx-auto">
            {error && (
              <div className="mb-4 bg-rose-50 border border-rose-200 p-3">
                <p className="text-rose-700 text-xs font-medium">{error}</p>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                required
                className="w-full sm:flex-1 bg-[#FAF9F6] border-2 border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 font-semibold focus:outline-none focus:border-[#0b3d2b] transition-all duration-200"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                required
                className="w-full sm:flex-1 bg-[#FAF9F6] border-2 border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 font-semibold focus:outline-none focus:border-[#0b3d2b] transition-all duration-200"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0b3d2b] hover:bg-[#0a3525] disabled:bg-slate-400 text-white font-mono text-xs font-black uppercase tracking-wider px-6 py-3 border-2 border-[#0b3d2b] shadow-[3px_3px_0px_#07130d] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#07130d] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all duration-150 shrink-0 disabled:shadow-none disabled:hover:translate-x-0 disabled:hover:translate-y-0"
              >
                {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Bell className="w-4 h-4" />}
                {loading ? 'Saving...' : 'Join Waitlist'}
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-6 bg-emerald-50 border border-emerald-200 p-6 max-w-md mx-auto">
            <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
            <p className="font-display text-lg font-black text-[#07130d]">
              You&apos;re on the list!
            </p>
            <p className="text-slate-500 text-sm mt-1 font-medium">
              We&apos;ll notify you when Cohort #02 opens.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

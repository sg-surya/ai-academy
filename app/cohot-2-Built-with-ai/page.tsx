'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Bell, 
  CheckCircle, 
  Loader, 
  ArrowLeft, 
  Globe, 
  MessageSquare, 
  Cpu, 
  Layers, 
  Terminal, 
  Zap,
  Check,
  Users,
  Clock,
  Wrench,
  Star,
  BookOpen,
  ArrowRight,
  ChevronDown,
  Award,
  Video,
  Code,
  Shield,
  HelpCircle,
  FileText,
  Download,
  ClipboardList,
  Gift
} from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function BuildWithAiLandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  // Waitlist form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setLoading(true);
    setError(null);
    try {
      await addDoc(collection(db, 'waitlist'), {
        name: name.trim(),
        email: email.trim(),
        cohort: 'Cohort #02 - Build With AI',
        timestamp: new Date().toLocaleString('en-IN'),
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Waitlist error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080B11] text-slate-100 font-sans selection:bg-cyan-500/20 selection:text-[#22d3ee] overflow-x-hidden relative pt-16">
      {/* Background Grids and Ambient Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute middle-[50%] right-[10%] w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* NAVBAR */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080B11]/90 backdrop-blur-xl border-b border-white/5 shadow-lg'
          : 'bg-transparent'
      } px-4 sm:px-8`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-cyan-400 border border-cyan-400/30 shadow-sm transition duration-300">
              <svg className="w-5 h-5 text-[#07130d]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4L12 20L20 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 12H16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <div className="font-display text-sm sm:text-base font-black tracking-tight text-white leading-none">
                VASUDEV AI
              </div>
              <span className="block text-[8px] sm:text-[9px] font-mono tracking-widest text-cyan-400 font-extrabold uppercase mt-0.5">
                ACADEMY
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 font-mono text-[10px] tracking-wider uppercase font-bold text-slate-400">
            <a href="#highlights" className="hover:text-cyan-400 transition-colors">Highlights</a>
            <a href="#curriculum" className="hover:text-cyan-400 transition-colors">Syllabus</a>
            <a href="#reviews" className="hover:text-cyan-400 transition-colors">Reviews</a>
            <a href="#credentials" className="hover:text-cyan-400 transition-colors">Certificate</a>
            <a href="#resources" className="hover:text-cyan-400 transition-colors">Resources</a>
          </nav>

          <a
            href="#waitlist"
            className="bg-gradient-to-r from-cyan-400 to-violet-500 text-slate-950 font-mono text-[10px] tracking-wider uppercase font-black py-2 px-4 hover:brightness-110 transition-all duration-150 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
          >
            Join Waitlist
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-20 pb-20 sm:pt-28">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-500/20 px-4 py-1.5 mb-6 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span className="font-mono text-[10px] sm:text-[11px] tracking-widest bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent font-black uppercase">
                Now Enrolling Waitlist
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.05] uppercase">
              BUILD <br />
              <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(34,211,238,0.15)]">WITH AI</span>
            </h1>

            <p className="text-slate-400 text-base sm:text-lg mt-6 max-w-2xl font-medium leading-relaxed">
              Stop just querying AI. Start building SaaS apps, AI agents, and production-grade landing pages in 3 action-packed weeks — no prior coding experience required.
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-5 mt-6 text-sm sm:text-base">
              {[
                { icon: <Clock className="w-4 h-4 text-cyan-400" />, label: "3 Weeks Live" },
                { icon: <Cpu className="w-4 h-4 text-indigo-400" />, label: "6+ Deployed Apps" },
                { icon: <Code className="w-4 h-4 text-purple-400" />, label: "React & Next.js" },
                { icon: <Wrench className="w-4 h-4 text-cyan-400" />, label: "AI Builders (bolt/v0)" },
                { icon: <Star className="w-4 h-4 fill-violet-400 text-violet-400" />, label: "Alumni Verified" },
              ].map((item, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 text-slate-300 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-white/5 px-2.5 py-1 border border-white/5">
                  {item.icon}
                  {item.label}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 sm:gap-4 mt-10">
              <a href="#waitlist" className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-violet-500 text-slate-950 font-mono text-xs font-black uppercase tracking-wider px-6 py-3.5 hover:brightness-110 transition-all duration-200 shadow-[0_0_30px_rgba(6,182,212,0.25)]">
                Join waitlist & save 30%
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#curriculum" className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white font-mono text-xs font-bold uppercase tracking-wider px-5 py-3.5 hover:bg-white/10 transition-all duration-200">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                Syllabus Sneak Peek
              </a>
            </div>

            <div className="mt-12 border-t border-white/5 pt-6 flex items-center gap-2 text-slate-500 font-mono text-[9px] uppercase tracking-wider font-bold">
              <span className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-ping" />
              Join 17+ Alumni Stars from Cohort #01
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="relative z-10 py-12 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "3 Weeks", label: "Intensive Live Cohort" },
              { num: "3+", label: "Real SaaS Projects Deployed" },
              { num: "30%", label: "Waitlist Exclusive Discount" },
              { num: "100%", label: "No-Code to Pro-Code Approach" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent font-display tracking-tight">
                  {stat.num}
                </div>
                <div className="text-xs text-slate-400 font-mono uppercase tracking-wider mt-1.5 font-bold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKSHOP HIGHLIGHTS / VALUE PROPS */}
      <section id="highlights" className="py-20 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-16">
            <span className="font-mono text-[10px] font-black text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-3.5 py-1.5 uppercase tracking-widest leading-none">
              Highlights
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black mt-4 text-white uppercase tracking-tight">
              Why Join Build with AI?
            </h2>
            <p className="text-slate-400 mt-2 text-sm max-w-md mx-auto font-medium">
              We focus 100% on execution. You won&apos;t just watch lectures; you will write, generate, and launch actual apps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                icon: <Terminal className="w-5 h-5" />, 
                title: "Next-Gen AI Builders", 
                desc: "Harness bolt.new, Lovable, v0, and Cursor. Code at 10x speed even if you don't know syntax.", 
                color: "text-cyan-400 bg-cyan-400/10 border-cyan-500/20"
              },
              { 
                icon: <Layers className="w-5 h-5" />, 
                title: "State-of-the-Art LLMs", 
                desc: "Integrate APIs from Gemini 1.5, Claude 3.5, and OpenAI. Understand system prompt designs.", 
                color: "text-indigo-400 bg-indigo-400/10 border-indigo-500/20"
              },
              { 
                icon: <Zap className="w-5 h-5" />, 
                title: "Production Deployment", 
                desc: "Launch your products live using Vercel and Netlify. Hook up Firestore databases securely.", 
                color: "text-purple-400 bg-purple-400/10 border-purple-500/20"
              },
            ].map((card, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/5 p-6 hover:border-cyan-500/20 transition-all duration-300">
                <div className={`w-10 h-10 flex items-center justify-center border mb-5 ${card.color}`}>
                  {card.icon}
                </div>
                <h3 className="font-mono text-xs font-black text-white uppercase tracking-wide mb-2">
                  {card.title}
                </h3>
                <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE COVERED / ROADMAP */}
      <section id="curriculum" className="py-20 bg-white/[0.01] border-y border-white/5 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-16">
            <span className="font-mono text-[10px] font-black text-violet-400 bg-violet-400/10 border border-violet-400/20 px-3.5 py-1.5 uppercase tracking-widest leading-none">
              Syllabus
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black mt-4 text-white uppercase tracking-tight">
              3-Week Hands-On Roadmap
            </h2>
            <p className="text-slate-400 mt-2 text-sm max-w-md mx-auto font-medium">
              Every single session has a clear, actionable build objective.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                week: "Week 01",
                title: "AI Prototyping & Layouts",
                lessons: [
                  "System prompt design principles",
                  "Building clean UI components with v0",
                  "Connecting interfaces in bolt.new",
                  "Deploying a prototype in under 10m"
                ]
              },
              {
                week: "Week 02",
                title: "AI Agents & Custom APIs",
                lessons: [
                  "Integrating Gemini & Claude APIs",
                  "Creating dynamic system agents",
                  "Handling files, contexts, and memory",
                  "Structuring backend serverless endpoints"
                ]
              },
              {
                week: "Week 03",
                title: "SaaS Features & Launch",
                lessons: [
                  "Firebase Authentication & Security",
                  "Firestore read/write document architecture",
                  "Handling billing endpoints & triggers",
                  "Graduation Project: Live Deploy"
                ]
              }
            ].map((w, idx) => (
              <div key={idx} className="bg-white/[0.02] border border-white/5 hover:border-violet-500/20 transition-all duration-300 flex flex-col">
                <div className="p-4 sm:p-5 border-b border-white/5 flex items-center justify-between">
                  <span className="font-mono text-[10px] font-black text-violet-400 bg-violet-400/10 px-2.5 py-1 uppercase">
                    {w.week}
                  </span>
                  <Award className="w-4 h-4 text-slate-600" />
                </div>
                <div className="p-5 sm:p-6 flex-1">
                  <h3 className="font-mono text-xs font-black text-white uppercase tracking-wide mb-4">
                    {w.title}
                  </h3>
                  <ul className="space-y-2.5">
                    {w.lessons.map((lesson, lIdx) => (
                      <li key={lIdx} className="flex items-start gap-2 text-[11px] text-slate-400 font-medium">
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{lesson}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COHORT 1 STARS / SHOWCASE */}
      <section className="py-20 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-16">
            <span className="font-mono text-[10px] font-black text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-3.5 py-1.5 uppercase tracking-widest leading-none">
              Alumni Stars
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black mt-4 text-white uppercase tracking-tight">
              Cohort #1 Top Performers
            </h2>
            <p className="text-slate-400 mt-2 text-sm max-w-md mx-auto font-medium">
              We celebrate execution. Here are the builders who went above and beyond during our last cohort.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { name: "Priya Sharma", role: "UI Designer", achievement: "Built 3 unique prompt generators", avatar: "P" },
              { name: "Rahul Verma", role: "Product Manager", achievement: "Designed an automated email assistant", avatar: "R" },
              { name: "Siddharth Sen", role: "Software Engineer", achievement: "Created a full developer CLI blueprint", avatar: "S" },
            ].map((perf, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/5 p-5 hover:border-cyan-500/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-tr from-cyan-500 to-violet-600 flex items-center justify-center font-mono font-black text-sm text-white shrink-0">
                    {perf.avatar}
                  </div>
                  <div>
                    <h3 className="font-mono text-xs font-black text-white uppercase tracking-wide leading-tight">
                      {perf.name}
                    </h3>
                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                      {perf.role}
                    </p>
                  </div>
                </div>
                <div className="bg-white/[0.02] border border-white/5 p-3 font-mono text-[10px] text-cyan-300 font-bold">
                  ★ {perf.achievement}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEEDBACK & REVIEWS */}
      <section id="reviews" className="py-20 bg-white/[0.01] border-y border-white/5 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-16">
            <span className="font-mono text-[10px] font-black text-indigo-400 bg-indigo-400/10 border border-indigo-400/20 px-3.5 py-1.5 uppercase tracking-widest leading-none">
              Reviews
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black mt-4 text-white uppercase tracking-tight">
              What Alumni Said
            </h2>
            <p className="text-slate-400 mt-2 text-sm max-w-md mx-auto font-medium">
              Authentic quotes from participants who started exactly where you are now.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { 
                quote: "The live build-alongs demystified how to integrate APIs. I built my first functional OpenAI chat agent in a single evening!", 
                author: "Ananya Roy", 
                context: "Cohort #01 Participant" 
              },
              { 
                quote: "Building with bolt.new changed my entire startup workflow. I can mock up working MVPs for pitch meetings without waiting for devs.", 
                author: "Vikram Malhotra", 
                context: "Founder & PM" 
              }
            ].map((rev, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/5 p-6 hover:border-violet-500/20 transition-all duration-300">
                <p className="text-xs text-slate-300 font-medium leading-relaxed italic">
                  &ldquo;{rev.quote}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-violet-400" />
                  <span className="font-mono text-[10px] font-black text-white uppercase tracking-wide">
                    {rev.author}
                  </span>
                  <span className="text-[9px] text-slate-500 font-semibold">— {rev.context}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATE PREVIEW SECTION */}
      <section id="credentials" className="py-20 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-mono text-[10px] font-black text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-3.5 py-1.5 uppercase tracking-widest leading-none">
                Credentials
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-black mt-4 text-white uppercase tracking-tight">
                Earn Your Certification
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-4 leading-relaxed font-semibold">
                Upon successfully building and deploying your final SaaS app, you will receive a verifiable, blockchain-secured certificate of completion.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Verifiable using a unique Certificate ID",
                  "Showcase your live portfolio items directly on-chain",
                  "Shareable to LinkedIn, resumes, and profiles"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-[11px] text-slate-300 font-semibold">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Certificate Visual Card */}
            <div className="bg-gradient-to-br from-violet-600/10 to-cyan-500/10 border border-white/10 p-6 sm:p-8 relative shadow-2xl">
              <div className="absolute top-2 right-2 font-mono text-[8px] font-black text-slate-500 tracking-wider">
                CERTIFICATE ID: VAI26-C02-WAIT
              </div>
              <div className="text-center py-6 border border-white/5 bg-slate-950/40 p-6">
                <Award className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h4 className="font-mono text-[9px] font-black text-violet-400 uppercase tracking-widest">
                  Certificate of Achievement
                </h4>
                <p className="text-slate-400 text-[10px] mt-2 font-mono">THIS IS PRESENTED TO</p>
                <div className="font-display text-xl font-extrabold text-white mt-1 border-b border-white/10 pb-2 max-w-xs mx-auto">
                  [Your Name Here]
                </div>
                <p className="text-slate-400 text-[9px] mt-3 font-semibold leading-relaxed max-w-sm mx-auto">
                  for successfully completing the 3-week immersive live workshop and building &amp; deploying SaaS applications.
                </p>
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-slate-500 font-mono text-[8px] uppercase tracking-wider">
                  <div>
                    <span className="block text-slate-400 font-bold">ISSUER</span>
                    <span>AI ACADEMY</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 font-bold">STATUS</span>
                    <span className="text-cyan-400">VERIFIED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESOURCES HUB PREVIEW */}
      <section id="resources" className="py-20 bg-white/[0.01] border-y border-white/5 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-12">
            <span className="font-mono text-[10px] font-black text-violet-400 bg-violet-400/10 border border-violet-400/20 px-3.5 py-1.5 uppercase tracking-widest leading-none">
              Resources
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black mt-4 text-white uppercase tracking-tight">
              Pre-Workshop Downloads
            </h2>
            <p className="text-slate-400 mt-2 text-sm max-w-md mx-auto font-medium">
              Waitlist members unlock immediate access to copy-paste blueprints.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { icon: <FileText className="w-5 h-5" />, title: "Pre-Read Slides", desc: "Foundational AI mental models", free: true },
              { icon: <ClipboardList className="w-5 h-5" />, title: "Cohort Prompt PDF", desc: "100+ copy-paste developer formulas", free: true, link: "/cohort-prompt.pdf" },
              { icon: <Gift className="w-5 h-5" />, title: "SaaS Boilerplate", desc: "Ready-to-deploy Next.js templates", free: false },
            ].map((res, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/5 p-6 hover:border-violet-500/20 transition-all duration-300 flex flex-col">
                <div className="w-10 h-10 bg-violet-400/10 border border-violet-500/20 text-violet-400 flex items-center justify-center mb-4">
                  {res.icon}
                </div>
                <h3 className="font-mono text-xs font-black text-white uppercase tracking-wide mb-1">
                  {res.title}
                </h3>
                <p className="text-[10px] text-slate-400 font-semibold mb-4 flex-1">
                  {res.desc}
                </p>
                {res.free ? (
                  <a 
                    href={res.link || "#waitlist"} 
                    target={res.link ? "_blank" : undefined}
                    rel={res.link ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-1.5 font-mono text-[9px] font-bold text-cyan-400 uppercase tracking-wider hover:text-cyan-300 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    {res.link ? "Free Download" : "Waitlist Access"}
                  </a>
                ) : (
                  <span className="font-mono text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                    Waitlist Only
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER SECTION */}
      <section className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <div className="bg-gradient-to-r from-violet-600/5 to-cyan-500/5 border border-white/5 p-6 sm:p-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-28 h-28 bg-gradient-to-tr from-cyan-500 to-violet-600 flex items-center justify-center font-mono font-black text-3xl text-white shrink-0">
              V
            </div>
            <div>
              <span className="font-mono text-[9px] font-black text-violet-400 uppercase tracking-widest bg-violet-400/10 border border-violet-400/20 px-2 py-0.5">
                Instructor
              </span>
              <h3 className="font-display text-2xl font-black text-white uppercase mt-2">
                Vasudev
              </h3>
              <p className="text-slate-400 text-xs mt-3 leading-relaxed font-semibold">
                An expert AI engineer, developer, and builder passionate about teaching non-technical founders and creators how to master software production alongside AI. Having trained over 17+ students in Cohort #1, he focuses on practical execution above all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WAITLIST SIGNUP SECTION (Matches Cohort 1 NextWorkshopSection) */}
      <section id="waitlist" className="relative py-24 bg-[#05070A] overflow-hidden border-t border-white/5 z-10">
        <div className="absolute inset-0 bg-grid-dark opacity-30 pointer-events-none" />
        <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 px-4 py-1.5 mb-6 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span className="font-mono text-[10px] sm:text-[11px] tracking-widest text-cyan-400 font-black uppercase">
                Reserve Your Spot
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05]">
              JOIN THE <br />
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">WAITLIST</span>
            </h2>
            <p className="text-slate-400 text-base sm:text-lg mt-4 max-w-2xl mx-auto font-semibold">
              Get 30% off, instant notifications, and free early-bird prompt guides.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto space-y-3">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 p-3">
                    <p className="text-red-400 text-xs font-medium">{error}</p>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    required
                    className="flex-1 bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-slate-500 font-semibold focus:outline-none focus:border-cyan-500/50 transition-all duration-200"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email"
                    required
                    className="flex-1 bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-slate-500 font-semibold focus:outline-none focus:border-cyan-500/50 transition-all duration-200"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-400 to-violet-500 text-slate-950 font-mono text-xs font-black uppercase tracking-wider px-6 py-3.5 hover:brightness-110 disabled:brightness-50 disabled:cursor-not-allowed transition-all duration-200 shadow-[0_0_30px_rgba(6,182,212,0.15)]"
                >
                  {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Bell className="w-4 h-4" />}
                  {loading ? 'Saving Your Spot...' : 'Join Waitlist'}
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 bg-cyan-400/10 border border-cyan-400/20 p-6 max-w-md mx-auto"
              >
                <CheckCircle className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                <p className="text-cyan-400 font-display text-lg font-black">
                  You&apos;re on the list!
                </p>
                <p className="text-slate-400 text-sm mt-1 font-medium">
                  We will send you details and resources right away.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* COMMUNITY SECTION */}
      <section className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Join the Builder Community
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-3 max-w-md mx-auto">
            Get instant access to chat rooms, share portfolios, and receive support from cohort mentors.
          </p>
          <a href="#" className="inline-flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-mono text-xs font-black uppercase px-6 py-3.5 mt-8">
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            Enter WhatsApp Community
          </a>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 bg-white/[0.01] border-t border-white/5 relative z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight uppercase text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              { 
                q: "What tools do I need for this workshop?", 
                a: "You only need a modern browser, a Google account, and free accounts on platforms like bolt.new, Vercel, and GitHub. No paid plans are required." 
              },
              { 
                q: "How does the waitlist discount work?", 
                a: "Waitlist members get a direct registration invite link offering a 30% discount compared to the public release pricing." 
              },
              { 
                q: "What is the format of the classes?", 
                a: "Classes are highly interactive, live sessions featuring screen sharing, collaborative coding, QA sessions, and step-by-step builds." 
              }
            ].map((f, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/5 p-5 hover:border-violet-500/20 transition-all duration-300">
                <h4 className="font-mono text-xs font-black text-cyan-400 uppercase tracking-wide mb-2 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-violet-400 shrink-0" />
                  <span>{f.q}</span>
                </h4>
                <p className="text-[11px] text-slate-400 font-medium leading-relaxed pl-6">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/5 py-12 text-center text-slate-500 font-mono text-[10px] uppercase tracking-wider bg-[#05070A]">
        <p>© 2026 AI Academy. All rights reserved.</p>
      </footer>
    </div>
  );
}

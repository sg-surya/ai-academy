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
  Gift,
  Calendar,
  Smartphone,
  Bot,
  Linkedin,
  Instagram,
  Github,
  User,
  Mail,
  Link2,
  Youtube
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
    <div className="min-h-screen bg-[#FAF9F6] text-[#07130d] font-sans selection:bg-orange-500/10 selection:text-orange-900 overflow-x-hidden relative pt-16">
      {/* Import Caveat font for handwriting styling */}
      <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap" rel="stylesheet" />

      {/* Background Grids and Ambient Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* NAVBAR */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF9F6]/90 backdrop-blur-xl border-b border-[#07130d]/5 shadow-sm'
          : 'bg-transparent'
      } px-4 sm:px-8`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 group">
            {/* Styled VA Logo */}
            <div className="flex items-center shrink-0">
              <svg className="w-8 h-8 mr-2" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 25 L42 75 L50 75 L77 25" stroke="#f75c03" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M42 75 L62 25" stroke="#07130d" strokeWidth="12" strokeLinecap="round" />
              </svg>
              <div>
                <div className="font-display text-sm sm:text-base font-black tracking-tight text-[#07130d] leading-none uppercase">
                  VASUDEV
                </div>
                <span className="block text-[8px] sm:text-[9px] font-mono tracking-widest text-[#f75c03] font-extrabold uppercase mt-0.5">
                  AI ACADEMY
                </span>
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 font-mono text-[10px] tracking-wider uppercase font-bold text-slate-500">
            <Link href="/" className="hover:text-[#f75c03] transition-colors">Home</Link>
            <Link href="/cohot-1-Lean-ai-from-scratch" className="hover:text-[#f75c03] transition-colors">Cohort #01</Link>
            <a href="#highlights" className="hover:text-[#f75c03] transition-colors">About</a>
            <a href="#curriculum" className="hover:text-[#f75c03] transition-colors">Curriculum</a>
            <a href="#faq" className="hover:text-[#f75c03] transition-colors">FAQs</a>
          </nav>

          <a
            href="#waitlist"
            className="inline-flex items-center gap-1.5 bg-[#f75c03] hover:bg-[#e05302] text-white font-mono text-[10px] tracking-wider uppercase font-black py-2.5 px-4 rounded-xl transition-all duration-150 shadow-md shadow-orange-500/10"
          >
            <Users className="w-3.5 h-3.5" />
            Join Waitlist
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-20 pb-20 sm:pt-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Cohort capsule */}
              <div className="inline-flex items-center gap-1.5 bg-[#f75c03]/10 border border-[#f75c03]/20 px-3.5 py-1.5 mb-6 rounded-full text-[#f75c03]">
                <span className="text-[12px] leading-none">☀️</span>
                <span className="font-mono text-[10px] sm:text-[11px] tracking-widest font-black uppercase">
                  Cohort #02
                </span>
              </div>

              {/* Title */}
              <h1 className="font-display text-5xl sm:text-6xl lg:text-[5rem] font-black text-[#07130d] tracking-tight leading-[0.95] uppercase relative">
                BUILD <br />
                <span className="text-[#f75c03] relative inline-block">
                  WITH AI
                  {/* Curved underline */}
                  <svg className="absolute left-0 bottom-[-10px] w-full h-[12px] text-[#f75c03]/80" viewBox="0 0 300 20" fill="none" preserveAspectRatio="none">
                    <path d="M5 15 C 90 5, 210 5, 295 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
                  </svg>
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-slate-700 text-base sm:text-lg mt-8 max-w-xl font-medium leading-relaxed">
                Build websites, apps and AI tools without traditional coding.
              </p>

              {/* Three Value Cards */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-8 max-w-xl">
                {/* Rating Card */}
                <div className="bg-white border border-slate-200/80 p-4 rounded-2xl flex flex-col justify-center items-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                  <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-[#f75c03] mb-2">
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <span className="font-display text-lg font-black text-[#07130d]">4.4/5</span>
                  <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider mt-0.5 leading-tight">Rating from Cohort #01</span>
                </div>

                {/* Learners Card */}
                <div className="bg-white border border-slate-200/80 p-4 rounded-2xl flex flex-col justify-center items-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                  <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-[#f75c03] mb-2">
                    <Users className="w-4 h-4" />
                  </div>
                  <span className="font-display text-lg font-black text-[#07130d]">17+</span>
                  <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider mt-0.5 leading-tight">Learners Trained</span>
                </div>

                {/* Seats Card */}
                <div className="bg-white border border-slate-200/80 p-4 rounded-2xl flex flex-col justify-center items-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                  <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-[#f75c03] mb-2">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <span className="font-display text-xs sm:text-sm font-black text-[#07130d] leading-none uppercase">Coming Soon</span>
                  <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider mt-1 leading-tight">Limited Seats</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 sm:gap-4 mt-8">
                <a href="#waitlist" className="inline-flex items-center gap-2 bg-[#f75c03] text-white font-mono text-xs font-black uppercase tracking-wider px-6 py-4 rounded-xl hover:bg-[#e05302] transition-all duration-200 shadow-md shadow-orange-500/20">
                  Join Waitlist
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link href="/cohot-1-Lean-ai-from-scratch" className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 font-mono text-xs font-bold uppercase tracking-wider px-5 py-4 rounded-xl hover:bg-slate-50 transition-all duration-200">
                  👁️ See Cohort #01
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right Column (Laptop Mockup) */}
          <div className="lg:col-span-7 relative mt-8 lg:mt-0">
            {/* Laptop Mockup Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative mx-auto max-w-[800px] z-10"
            >
              {/* Handwriting text and arrow */}
              <div className="absolute top-[-50px] left-[-10px] z-20 pointer-events-none hidden sm:block">
                <div className="font-['Caveat'] text-2xl font-bold text-slate-800 rotate-[-8deg] leading-none">
                  From AI Users <br /> to <span className="text-[#f75c03]">AI Builders</span>
                </div>
                <svg className="w-14 h-14 text-[#f75c03] ml-28 mt-1 rotate-[10deg]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                  <path d="M10,20 Q40,10 70,40 M70,40 L60,32 M70,40 L62,48" />
                </svg>
              </div>

              <img 
                src="/hero iamge.png" 
                alt="Build with AI Platform Dashboard" 
                className="w-full h-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
              />
            </motion.div>
            
            {/* Visual Orange Slash/Spark Decoration */}
            <div className="absolute right-[-10px] top-[40%] text-[#f75c03] text-xl font-bold select-none rotate-[20deg] hidden sm:block">
              {"// ✨"}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU'LL BUILD */}
      <section className="py-20 relative z-10 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-black text-[#07130d] tracking-tight uppercase relative inline-block">
              What You&apos;ll Build
              <span className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-12 h-1 bg-[#f75c03] rounded" />
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Websites",
                desc: "Build and deploy modern websites using AI."
              },
              {
                icon: <Smartphone className="w-8 h-8" />,
                title: "Apps",
                desc: "Create real applications without traditional coding."
              },
              {
                icon: <Bot className="w-8 h-8" />,
                title: "AI Tools",
                desc: "Build your own AI tools and intelligent chatbots."
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Automations",
                desc: "Automate tasks and save hours with smart AI workflows."
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white border border-slate-200 p-6 sm:p-8 flex flex-col items-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-md hover:border-orange-200/80 transition-all duration-300 rounded-3xl"
              >
                <div className="w-16 h-16 rounded-full bg-orange-500/10 text-[#f75c03] flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="font-display text-lg font-black text-[#07130d] mb-3">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COHORT #01 RESULTS */}
      <section className="py-20 relative z-10 bg-[#FAF9F6] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Title and Stats */}
            <div className="lg:col-span-5">
              <h2 className="font-display text-xl sm:text-2xl font-black text-[#07130d] tracking-tight uppercase mb-8">
                COHORT #01 RESULTS
              </h2>

              <div className="flex items-center justify-between gap-4 sm:gap-6 mt-6 w-full">
                {/* Stat 1 */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 flex items-center justify-center text-slate-700 mb-1">
                    <Users className="w-8 h-8 stroke-[2.5]" />
                  </div>
                  <span className="text-2xl sm:text-3xl font-black text-[#07130d] font-display">17+</span>
                  <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider font-bold mt-1">Learners</span>
                </div>

                {/* Divider */}
                <div className="w-[1px] h-12 bg-slate-200" />

                {/* Stat 2 */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 flex items-center justify-center text-orange-500 mb-1">
                    <Star className="w-8 h-8 fill-orange-500 text-orange-500" />
                  </div>
                  <span className="text-2xl sm:text-3xl font-black text-[#07130d] font-display">4.4/5</span>
                  <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider font-bold mt-1">Rating</span>
                </div>

                {/* Divider */}
                <div className="w-[1px] h-12 bg-slate-200" />

                {/* Stat 3 */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 flex items-center justify-center text-orange-500 mb-1">
                    <Shield className="w-8 h-8 text-orange-500 stroke-[2.5]" />
                  </div>
                  <span className="text-2xl sm:text-3xl font-black text-[#07130d] font-display">100%</span>
                  <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider font-bold mt-1">Certificates</span>
                </div>

                {/* Divider */}
                <div className="w-[1px] h-12 bg-slate-200" />

                {/* Stat 4 */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 flex items-center justify-center text-orange-500 mb-1">
                    <Award className="w-8 h-8 text-orange-500 stroke-[2.5]" />
                  </div>
                  <span className="text-2xl sm:text-3xl font-black text-[#07130d] font-display">Top</span>
                  <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider font-bold mt-1">Participants</span>
                </div>
              </div>
            </div>

            {/* Right Column: Results Image */}
            <div className="lg:col-span-7 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="w-full h-auto"
              >
                <img 
                  src="/cohort 1 card.png" 
                  alt="Cohort #01 Results Card" 
                  className="w-full h-auto object-contain rounded-2xl"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT PARTICIPANTS SAID & MEET THE HOSTS */}
      <section className="py-20 relative z-10 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: What Participants Said */}
            <div className="lg:col-span-8">
              <h2 className="font-display text-xl sm:text-2xl font-black text-[#07130d] tracking-tight uppercase mb-8 text-center lg:text-left">
                What Participants Said
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Card 1: Naman Anand */}
                <div className="bg-white border border-slate-200/80 p-5 rounded-2xl flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-md transition-shadow">
                  <div>
                    <div className="flex gap-1 text-orange-500 mb-3.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-[11px] text-slate-600 font-semibold leading-relaxed">
                      Every topic was very easy to understand. Learned a lot. Thank you so much!
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <span className="text-[10px] text-slate-500 font-bold">— Naman Anand</span>
                    <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 font-mono text-[10px] font-black flex items-center justify-center">
                      N
                    </div>
                  </div>
                </div>

                {/* Card 2: Dattu */}
                <div className="bg-white border border-slate-200/80 p-5 rounded-2xl flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-md transition-shadow">
                  <div>
                    <div className="flex gap-1 text-orange-500 mb-3.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-[11px] text-slate-600 font-semibold leading-relaxed">
                      Excellent job by both the mentors. Explained everything well.
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <span className="text-[10px] text-slate-500 font-bold">— Dattu</span>
                    <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 font-mono text-[10px] font-black flex items-center justify-center">
                      D
                    </div>
                  </div>
                </div>

                {/* Card 3: Gunjan Kumari */}
                <div className="bg-white border border-slate-200/80 p-5 rounded-2xl flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-md transition-shadow">
                  <div>
                    <div className="flex gap-1 text-orange-500 mb-3.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-[11px] text-slate-600 font-semibold leading-relaxed">
                      Would love to see a Vibe Coding session in the future. Amazing!
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <span className="text-[10px] text-slate-500 font-bold">— Gunjan Kumari</span>
                    <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 font-mono text-[10px] font-black flex items-center justify-center">
                      G
                    </div>
                  </div>
                </div>

                {/* Card 4: Arnay Tiwari */}
                <div className="bg-white border border-slate-200/80 p-5 rounded-2xl flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-md transition-shadow">
                  <div>
                    <div className="flex gap-1 text-orange-500 mb-3.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-[11px] text-slate-600 font-semibold leading-relaxed">
                      Really enjoyed the session. Learned many new concepts and gained confidence in applying them practically. Thank you!
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <span className="text-[10px] text-slate-500 font-bold">— Arnay Tiwari</span>
                    <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 font-mono text-[10px] font-black flex items-center justify-center">
                      A
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Meet the Hosts */}
            <div className="lg:col-span-4">
              <h2 className="font-display text-xl sm:text-2xl font-black text-[#07130d] tracking-tight uppercase mb-8 text-center lg:text-left">
                Meet the Hosts
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Host 1 */}
                <div className="flex items-start gap-4">
                  <img 
                    src="/Speaker.png" 
                    alt="Surya Pratap Singh" 
                    className="w-20 h-20 rounded-2xl object-cover border border-slate-100 shadow-sm"
                  />
                  <div>
                    <h3 className="font-display text-base font-black text-[#07130d] leading-snug">
                      Surya Pratap Singh
                    </h3>
                    <span className="inline-block text-[9px] font-mono font-bold text-orange-600 bg-orange-50 border border-orange-100 px-2 py-0.5 mt-1.5 uppercase">
                      Founder
                    </span>
                    <div className="text-[10px] text-slate-500 font-semibold mt-2.5 space-y-0.5">
                      <p>AI Builder</p>
                      <p>Mentor</p>
                      <p>Speaker</p>
                    </div>
                    <div className="flex gap-2.5 mt-3.5 text-slate-400">
                      <a href="#" className="hover:text-orange-500 transition-colors">
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a href="#" className="hover:text-orange-500 transition-colors">
                        <Instagram className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Host 2 */}
                <div className="flex items-start gap-4">
                  <img 
                    src="/Aman.png" 
                    alt="Aman Dangi" 
                    className="w-20 h-20 rounded-2xl object-cover border border-slate-100 shadow-sm"
                  />
                  <div>
                    <h3 className="font-display text-base font-black text-[#07130d] leading-snug">
                      Aman Dangi
                    </h3>
                    <span className="inline-block text-[9px] font-mono font-bold text-orange-600 bg-orange-50 border border-orange-100 px-2 py-0.5 mt-1.5 uppercase">
                      Co-Founder
                    </span>
                    <div className="text-[10px] text-slate-500 font-semibold mt-2.5 space-y-0.5">
                      <p>Full Stack Developer</p>
                      <p>AI Enthusiast</p>
                    </div>
                    <div className="flex gap-2.5 mt-3.5 text-slate-400">
                      <a href="#" className="hover:text-orange-500 transition-colors">
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a href="#" className="hover:text-orange-500 transition-colors">
                        <Github className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* WAITLIST SIGNUP SECTION */}
      <section id="waitlist" className="relative py-20 bg-[#FAF9F6] border-t border-slate-200 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="bg-[#FFFDF9] border border-orange-100 rounded-3xl p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.02)] relative overflow-hidden">
            {/* Ambient Background Glows inside container */}
            <div className="absolute right-0 bottom-0 w-80 h-80 bg-orange-500/5 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Side: Copy and Badges */}
              <div className="lg:col-span-5 text-left">
                <h2 className="font-display text-4xl sm:text-5xl font-black text-[#07130d] tracking-tight leading-tight mb-3">
                  Be the first to know
                </h2>
                <p className="text-sm sm:text-base text-slate-500 font-semibold mb-8 leading-relaxed max-w-sm">
                  Join the waitlist and get early access when Cohort #02 launches.
                </p>
                
                {/* Badges Grid */}
                <div className="grid grid-cols-2 gap-y-4 gap-x-6 max-w-md">
                  {[
                    { icon: <Users className="w-5 h-5 text-orange-500 shrink-0" />, text: "Limited Seats" },
                    { icon: <BookOpen className="w-5 h-5 text-orange-500 shrink-0" />, text: "Practical Learning" },
                    { icon: <MessageSquare className="w-5 h-5 text-orange-500 shrink-0" />, text: "Community Access" },
                    { icon: <Award className="w-5 h-5 text-orange-500 shrink-0" />, text: "Certificate Included" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      {item.icon}
                      <span className="text-[11px] sm:text-xs text-slate-700 font-bold uppercase tracking-wider">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Middle: Waitlist Form */}
              <div className="lg:col-span-4">
                <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.03)] text-left">
                  {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {error && (
                        <div className="bg-red-500/5 border border-red-500/10 p-3 rounded-lg">
                          <p className="text-red-500 text-xs font-medium">{error}</p>
                        </div>
                      )}
                      
                      {/* Name input */}
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your Name"
                          required
                          className="w-full bg-slate-50 border border-slate-200 pl-10 pr-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 font-semibold focus:outline-none focus:border-orange-500/50 transition-all duration-200 rounded-xl"
                        />
                      </div>

                      {/* Email input */}
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Your Email"
                          required
                          className="w-full bg-slate-50 border border-slate-200 pl-10 pr-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 font-semibold focus:outline-none focus:border-orange-500/50 transition-all duration-200 rounded-xl"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full inline-flex items-center justify-center gap-2 bg-[#f75c03] text-white font-mono text-xs font-black uppercase tracking-wider px-6 py-4 hover:bg-[#e05302] disabled:brightness-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md shadow-orange-500/10 rounded-xl"
                      >
                        {loading ? <Loader className="w-4 h-4 animate-spin" /> : <span>Join Waitlist</span>}
                        {!loading && <ArrowRight className="w-4 h-4" />}
                      </button>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-4"
                    >
                      <CheckCircle className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                      <p className="text-orange-600 font-display text-lg font-black">
                        You&apos;re on the list!
                      </p>
                      <p className="text-slate-500 text-xs mt-1 font-medium leading-relaxed">
                        We will send you details and resources right away.
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Right Side: 3D Rocket Image */}
              <div className="lg:col-span-3 flex justify-center lg:justify-end relative overflow-visible mt-6 lg:mt-0">
                <div className="relative w-48 sm:w-56 lg:w-64 h-auto select-none lg:-mr-12 lg:-mb-12">
                  <img 
                    src="/rocket.png" 
                    alt="Rocket Blasting Off" 
                    className="w-full h-auto object-contain transform rotate-[-5deg] drop-shadow-[0_15px_30px_rgba(247,92,3,0.1)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* FOOTER */}
      <footer className="relative z-10 border-t border-slate-200/60 py-6 bg-[#FAF9F6] px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-700">
          
          {/* Left: Logo & Slogan */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center group">
              <svg className="w-7 h-7 mr-2" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 25 L42 75 L50 75 L77 25" stroke="#f75c03" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M42 75 L62 25" stroke="#07130d" strokeWidth="12" strokeLinecap="round" />
              </svg>
              <div className="text-left">
                <div className="font-display text-xs font-black tracking-tight text-[#07130d] leading-none uppercase">
                  VASUDEV
                </div>
                <span className="block text-[7px] font-mono tracking-widest text-[#f75c03] font-extrabold uppercase mt-0.5">
                  AI ACADEMY
                </span>
              </div>
            </Link>
            
            <div className="hidden md:block h-6 w-[1px] bg-slate-200" />
            
            <div className="text-[11px] text-slate-500 font-mono uppercase tracking-wider hidden sm:block">
              Learn <span className="text-orange-500">•</span> Build <span className="text-orange-500">•</span> Automate
            </div>
          </div>

          {/* Center: Domain links */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-[11px]">
            <a 
              href="https://academy.vasudevai.in" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 text-slate-600 hover:text-[#f75c03] transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span>academy.vasudevai.in</span>
            </a>
            
            <a 
              href="https://vasudevai.in" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 text-slate-600 hover:text-[#f75c03] transition-colors"
            >
              <Link2 className="w-3.5 h-3.5 text-slate-400" />
              <span>vasudevai.in</span>
            </a>
          </div>

          {/* Right: Social Follows */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block h-6 w-[1px] bg-slate-200" />
            
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono font-bold">
              Follow Us
            </span>
            
            <div className="flex items-center gap-3">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-400 hover:text-[#f75c03] transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-400 hover:text-[#f75c03] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-400 hover:text-[#f75c03] transition-colors"
              >
                <Youtube className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}

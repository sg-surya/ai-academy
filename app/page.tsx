'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  BookOpen, 
  Terminal, 
  Cpu, 
  Sparkles, 
  Clock, 
  Calendar, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp,
  Users, 
  ShieldCheck, 
  Code, 
  ArrowUpRight, 
  ExternalLink,
  Lock,
  Smartphone,
  Video,
  User,
  Mail,
  Phone,
  Briefcase,
  HelpCircle,
  FileText,
  Rocket,
  Check,
  Zap,
  Star,
  Globe,
  Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Structuring leads type for Admin Viewer
interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  reason: string;
  timestamp: string;
}

export default function WorkshopLandingPage() {
  // Navigation states & registration state
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [registeredEmail, setRegisteredEmail] = useState<string>('');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [showAdminPanel, setShowAdminPanel] = useState<boolean>(false);
  const [localLeads, setLocalLeads] = useState<Lead[]>([]);

  // Monitor scroll for floating pill header transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Registration form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Student',
    reason: ''
  });
  const [formError, setFormError] = useState('');

  // Countdown States (Targeting the coming Sunday 10:00 AM IST)
  const [timeLeft, setTimeLeft] = useState({
    days: '02',
    hours: '14',
    minutes: '37',
    seconds: '58'
  });

  // Calculate upcoming Sunday at 10:00 AM IST dynamically so it always ticks
  useEffect(() => {
    function getNextSunday() {
      const now = new Date();
      const resultDate = new Date();
      // Set to upcoming Sunday (day 0)
      resultDate.setDate(now.getDate() + (7 - now.getDay()) % 7);
      // Set to 10:00 AM IST
      resultDate.setHours(10, 0, 0, 0);
      
      // If it is Sunday past 10:00 AM, choose next Sunday
      if (resultDate.getTime() < now.getTime()) {
        resultDate.setDate(resultDate.getDate() + 7);
      }
      return resultDate;
    }

    const targetDate = getNextSunday();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference <= 0) {
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        clearInterval(interval);
      } else {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days: d < 10 ? `0${d}` : `${d}`,
          hours: h < 10 ? `0${h}` : `${h}`,
          minutes: m < 10 ? `0${m}` : `${m}`,
          seconds: s < 10 ? `0${s}` : `${s}`
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Sync leads state with localStorage
  const syncLeadsFromStorage = () => {
    const savedLeadsStr = localStorage.getItem('vasudev_ai_leads');
    if (savedLeadsStr) {
      try {
        const parsed = JSON.parse(savedLeadsStr);
        setTimeout(() => {
          setLocalLeads(parsed);
        }, 0);
      } catch (e) {
        // Ignore
      }
    }
  };

  // Initialize seeds in localStorage initially for registration demo
  useEffect(() => {
    const savedLeads = localStorage.getItem('vasudev_ai_leads');
    if (!savedLeads) {
      const seeds: Lead[] = [
        {
          id: 'ws-892',
          name: 'Aravind Shaji',
          email: 'aravind@example.com',
          phone: '9845621455',
          role: 'Student',
          reason: 'Interested in running LLMs offline and automatic tools.',
          timestamp: new Date(Date.now() - 3600 * 4 * 1000).toLocaleString()
        },
        {
          id: 'ws-712',
          name: 'Pooja Sharma',
          email: 'pooja.s@example.com',
          phone: '8123490890',
          role: 'Freelancer/Creator',
          reason: 'Want to optimize my digital campaigns with ChatGPT & Claude.',
          timestamp: new Date(Date.now() - 3600 * 12 * 1000).toLocaleString()
        }
      ];
      localStorage.setItem('vasudev_ai_leads', JSON.stringify(seeds));
      setTimeout(() => {
        setLocalLeads(seeds);
      }, 0);
    } else {
      syncLeadsFromStorage();
    }
  }, []);

  // Check if current user is already registered based on localStorage session
  useEffect(() => {
    const sessionRegistered = localStorage.getItem('vasudev_user_registered');
    if (sessionRegistered) {
      setTimeout(() => {
        setIsRegistered(true);
        setRegisteredEmail(sessionRegistered);
      }, 0);
    }
  }, []);

  // Handle Input Changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setFormError('');
  };

  // Submit Registration Form
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone, role, reason } = formData;

    if (!name.trim()) return setFormError('Please enter your full name.');
    if (!email.trim() || !email.includes('@')) return setFormError('Please enter a valid email address.');
    if (!phone.trim() || phone.length < 8) return setFormError('Please enter a valid WhatsApp number.');

    const newLead: Lead = {
      id: 'ws-' + Math.random().toString(36).substring(2, 7),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      role: role,
      reason: reason.trim() || 'No feedback shared',
      timestamp: new Date().toLocaleString()
    };

    const savedLeadsStr = localStorage.getItem('vasudev_ai_leads');
    let savedLeads: Lead[] = [];
    if (savedLeadsStr) {
      try {
        savedLeads = JSON.parse(savedLeadsStr);
      } catch (e) {
        // ignore
      }
    }
    const updatedLeads = [newLead, ...savedLeads];
    localStorage.setItem('vasudev_ai_leads', JSON.stringify(updatedLeads));
    setLocalLeads(updatedLeads);
    localStorage.setItem('vasudev_user_registered', email.trim());
    
    setIsRegistered(true);
    setRegisteredEmail(email.trim());
    
    // Smooth scroll to top of success state card
    const formSection = document.getElementById('registration-section');
    formSection?.scrollIntoView({ behavior: 'smooth' });
  };

  // Upcoming Sunday date label in a localized readable format
  const getUpcomingDateString = () => {
    const nextSunday = new Date();
    nextSunday.setDate(nextSunday.getDate() + (7 - nextSunday.getDay()) % 7);
    return nextSunday.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <div className="relative min-h-screen bg-[#FAF9F6] text-[#07130d] font-sans selection:bg-emerald-500/10 selection:text-[#0b3d2b] overflow-x-hidden">
      
      {/* Dynamic linear background grids mapping sharp architectural theme */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#14422e06_1px,transparent_1px),linear-gradient(to_bottom,#14422e06_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      
      {/* Ambient gradient glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-100/30 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-[40%] left-[-100px] w-[600px] h-[600px] bg-amber-500/[0.04] rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* TOP NAVBAR CONTAINER */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md py-3.5 border-[#0b3d2b]/10 shadow-[0_4px_24px_rgba(11,61,43,0.03)]' 
          : 'bg-transparent py-5 border-transparent shadow-none'
      } px-4 sm:px-8`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo with intersecting geometric look */}
          <div className="flex items-center space-x-2.5 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
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

          {/* Desktop Links (Linear / Bento Aesthetic) */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 font-mono text-[10px] tracking-wider uppercase font-bold text-slate-500">
            <a href="#curriculum" className="hover:text-[#0b3d2b] transition-colors">Curriculum</a>
            <a href="#speaker" className="hover:text-[#0b3d2b] transition-colors">About Surya</a>
            <a href="#certificate-section" className="hover:text-[#0b3d2b] transition-colors">Syllabus & Certificate</a>
            <a href="#faq" className="hover:text-[#0b3d2b] transition-colors">FAQ</a>
          </nav>

          {/* Header Action */}
          <div className="flex items-center space-x-3">
            <a 
              href="#registration-section" 
              className="bg-[#0b3d2b] text-white font-mono text-[10px] tracking-wider uppercase font-bold py-2 px-4 shadow-[3px_3px_0px_#07130d] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#07130d] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all duration-150 border border-[#07130d]"
            >
              Register Free
            </a>
          </div>
        </div>
      </header>

      {/* CORE CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-24 sm:pt-32 pb-32">
        
        {/* HERO SECTION DESIGNED AS BENTO LAYOUT INTRO */}
        <section id="hero" className="pt-6 pb-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Left Column: Premium copywriting, taglines, countdown, and core indicators */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-8 bg-white border border-[#0b3d2b]/15 p-6 sm:p-10 shadow-sm relative">
              
              <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 font-mono text-[9px] font-black px-3.5 py-1 tracking-wider uppercase border-l border-b border-[#0b3d2b]/15 flex items-center gap-1.5 animate-pulse">
                <span className="w-1.5 h-1.5 bg-slate-950 rounded-full shrink-0" />
                Saves ₹2,999
              </div>

              <div>
                {/* Micro announcement bar */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <span className="inline-flex items-center space-x-1.5 bg-emerald-500/10 text-[#0b3d2b] border border-emerald-500/20 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 bg-[#0b3d2b] rounded-full animate-ping" />
                    <span>Free Live Workshop</span>
                  </span>
                  <span className="inline-flex items-center space-x-1 bg-amber-500/10 text-amber-700 border border-amber-500/10 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-wider">
                    <Star className="w-3 h-3 text-amber-600 fill-amber-500" />
                    <span>From Beginner to AI Builder</span>
                  </span>
                </div>

                {/* Main Hero Header emphasizing the new title */}
                <h1 className="font-display text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-black text-[#07130d] tracking-tight leading-[1.08]">
                  Learn AI <br />
                  <span className="text-emerald-800">From Scratch</span>
                </h1>
                
                {/* Bold subheading text block */}
                <p className="text-slate-600 text-sm sm:text-base mt-6 leading-relaxed max-w-2xl font-semibold">
                  A beginner-friendly live workshop to help you understand AI, explore powerful tools, and build practical AI projects. Understand AI tools, practical projects, automation and future-ready skills from absolute beginner level.
                </p>

                {/* Ultimate positioning statement - "The wow factor" */}
                <div className="border-l-4 border-amber-500 bg-amber-500/5 p-4 mt-6 font-mono text-xs sm:text-sm text-[#07130d] leading-relaxed uppercase tracking-tight font-extrabold flex items-start gap-3">
                  <span className="text-amber-500 text-lg">🚀</span>
                  <div>
                    AI sirf use mat karo. <br className="sm:hidden" />
                    <span className="text-emerald-800">AI samajhna aur build karna seekho.</span>
                  </div>
                </div>
              </div>

              {/* Quick checks stacked elegantly */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                <div className="flex items-start space-x-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs text-slate-600 font-medium">
                    Designed for School, College & Non-tech learners
                  </span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs text-slate-600 font-medium">
                    Build 4 Real Projects Live without coding
                  </span>
                </div>
              </div>

              {/* Timer Dashboard inside the Bento card */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <span className="block text-[8px] font-mono tracking-widest text-slate-400 font-bold uppercase mb-1">
                    🎯 STATUS: COHORT STARTING SOON
                  </span>
                  <p className="text-[#0b3d2b] font-bold text-xs">
                    Limited Registrations • Only 14 Seats Left
                  </p>
                </div>

                {/* Clean Countdown with custom ticks */}
                <div className="flex items-center space-x-2 bg-[#07130d] text-white px-4 py-2.5 rounded-none border border-[#0b3d2b]/40">
                  <div className="text-center min-w-[32px]">
                    <span className="block font-mono text-xs sm:text-sm font-black text-emerald-400">{timeLeft.days}</span>
                    <span className="text-[7px] text-slate-400 font-mono uppercase tracking-tighter">Days</span>
                  </div>
                  <span className="text-emerald-500/50 font-mono">:</span>
                  <div className="text-center min-w-[32px]">
                    <span className="block font-mono text-xs sm:text-sm font-black text-emerald-400">{timeLeft.hours}</span>
                    <span className="text-[7px] text-slate-400 font-mono uppercase tracking-tighter">Hours</span>
                  </div>
                  <span className="text-emerald-500/50 font-mono">:</span>
                  <div className="text-center min-w-[32px]">
                    <span className="block font-mono text-xs sm:text-sm font-black text-emerald-400">{timeLeft.minutes}</span>
                    <span className="text-[7px] text-slate-400 font-mono uppercase tracking-tighter">Mins</span>
                  </div>
                  <span className="text-emerald-500/50 font-mono">:</span>
                  <div className="text-center min-w-[32px]">
                    <span className="block font-mono text-xs sm:text-sm font-black text-rose-500 animate-pulse">{timeLeft.seconds}</span>
                    <span className="text-[7px] text-slate-400 font-mono uppercase tracking-tighter">Secs</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Premium Active Interactive Form styled in clean strict sharp edges */}
            <div className="lg:col-span-5 bg-white border border-[#0b3d2b]/15 p-6 sm:p-8 flex flex-col justify-between shadow-sm relative">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                  <div>
                    <span className="block text-[9px] font-mono tracking-wider text-emerald-800 font-extrabold uppercase">
                      CLAIM FREE ADMISSION
                    </span>
                    <h3 className="font-display text-lg font-black text-[#07130d] mt-0.5">
                      Start Learning AI Today
                    </h3>
                  </div>
                  <div className="bg-amber-500/10 text-amber-800 border border-amber-500/10 font-mono text-[9.5px] font-bold px-2 py-1 uppercase rounded-none leading-none shrink-0 self-start">
                    ₹2,999 → FREE
                  </div>
                </div>

                {formError && (
                  <div className="mb-4 bg-rose-50 border border-rose-150 text-rose-800 p-3 text-xs font-semibold flex items-center leading-none">
                    <span className="w-1.5 h-1.5 bg-rose-500 rounded-full mr-2" />
                    {formError}
                  </div>
                )}

                <AnimatePresence mode="wait">
                  {!isRegistered ? (
                    <form onSubmit={handleRegisterSubmit} className="space-y-4">
                      
                      {/* Name field */}
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 border-r border-slate-100 pr-2.5">
                          <User className="w-3.5 h-3.5" />
                        </div>
                        <input 
                          type="text" 
                          name="name" 
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your Full Name" 
                          className="w-full bg-slate-50 border border-slate-200/95 pl-11 pr-4 py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0b3d2b] focus:bg-white transition-colors"
                        />
                      </div>

                      {/* Email field */}
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 border-r border-slate-100 pr-2.5">
                          <Mail className="w-3.5 h-3.5" />
                        </div>
                        <input 
                          type="email" 
                          name="email" 
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Email Address" 
                          className="w-full bg-slate-50 border border-slate-200/95 pl-11 pr-4 py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0b3d2b] focus:bg-white transition-colors"
                        />
                      </div>

                      {/* Telephone / Whatsapp field */}
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 border-r border-slate-100 pr-2.5">
                          <Phone className="w-3.5 h-3.5 text-emerald-600/70" />
                        </div>
                        <input 
                          type="tel" 
                          name="phone" 
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="WhatsApp Phone Number" 
                          className="w-full bg-slate-50 border border-slate-200/95 pl-11 pr-4 py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0b3d2b] focus:bg-white transition-colors"
                        />
                      </div>

                      {/* Role dropdown */}
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 border-r border-slate-100 pr-2.5">
                          <Briefcase className="w-3.5 h-3.5" />
                        </div>
                        <select 
                          name="role"
                          value={formData.role}
                          onChange={handleInputChange}
                          className="w-full bg-slate-50 border border-slate-200/95 pl-11 pr-4 py-3 text-xs sm:text-sm text-slate-750 focus:outline-none focus:border-[#0b3d2b] focus:bg-white transition-colors cursor-pointer"
                        >
                          <option value="Student">Student (Class 9–12 / College)</option>
                          <option value="Working Professional">Working Professional</option>
                          <option value="Freelancer/Creator">Freelancer / Creator</option>
                          <option value="Other">Other Category / Curious Learner</option>
                        </select>
                      </div>

                      {/* Reason text */}
                      <div className="relative">
                        <textarea 
                          name="reason"
                          value={formData.reason}
                          onChange={handleInputChange}
                          rows={2}
                          placeholder="Optional: Why are you joining 'Learn AI From Scratch'?" 
                          className="w-full bg-slate-50 border border-slate-200/95 px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0b3d2b] focus:bg-white transition-colors resize-none"
                        />
                      </div>

                      <button 
                        type="submit"
                        className="w-full bg-emerald-700 hover:bg-[#0b3d2b] text-white py-3.5 font-mono text-[11px] tracking-wider uppercase font-black transition-all duration-150 flex items-center justify-center space-x-2 border border-[#07130d] shadow-[3px_3px_0px_#07130d] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#07130d] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none cursor-pointer"
                      >
                        <span>Reserve My Free Seat</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <div className="flex items-center justify-center space-x-1 text-[10px] text-slate-400 pt-2 font-mono uppercase font-bold">
                        <Lock className="w-3 h-3" />
                        <span>🛡️ 100% Secure • No Spam Guarantee</span>
                      </div>
                    </form>
                  ) : (
                    <motion.div 
                      initial={{ scale: 0.98, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center py-6 space-y-5"
                    >
                      <div className="w-14 h-14 bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-sm">
                        <CheckCircle2 className="w-7 h-7" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-display text-lg font-black text-slate-900 leading-tight">
                          Seat Reserved Successfully!
                        </p>
                        <p className="text-slate-500 text-xs font-semibold">
                          A direct calendar invite was sent to <span className="font-bold text-[#0b3d2b]">{registeredEmail}</span>
                        </p>
                      </div>

                      {/* Live Join Dashboard Detail */}
                      <div className="bg-emerald-500/5 border border-emerald-600/10 p-4 text-left text-xs space-y-2.5 font-sans">
                        <div className="flex items-center justify-between text-[11px] font-bold text-[#0b3d2b]">
                          <span className="font-mono text-[9px] uppercase tracking-wider">🗓️ Streaming Schedule</span>
                          <span className="font-mono text-[8px] bg-[#0b3d2b] text-white px-2 py-0.5 uppercase">Status: Active</span>
                        </div>
                        <div className="text-slate-700 leading-relaxed font-semibold">
                          <strong>Date:</strong> {getUpcomingDateString()}<br />
                          <strong>Time:</strong> 10:00 AM IST (Live)<br />
                          <strong>Access:</strong> Google Meet Workspace Links
                        </div>
                      </div>
                      
                      {/* WhatsApp Funnel Element */}
                      <div className="pt-2">
                        <a 
                          href="https://chat.whatsapp.com/invite/vasudevai"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex w-full items-center justify-center space-x-2 bg-[#1ea853] hover:bg-[#188c44] text-white py-3.5 px-4 font-mono text-[10px] tracking-wider uppercase font-extrabold transition duration-150 hover:shadow-md"
                        >
                          <Phone className="w-4 h-4 text-white shrink-0" />
                          <span>Join Exclusive Candidates WhatsApp Group</span>
                        </a>
                      </div>

                      <button 
                        onClick={() => {
                          setIsRegistered(false);
                          localStorage.removeItem('vasudev_user_registered');
                        }}
                        className="text-[9px] font-mono text-slate-400 hover:text-slate-600 uppercase tracking-widest block mx-auto underline mt-2"
                      >
                        Register Another Account
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Verified badge footer */}
              <div className="pt-4 border-t border-slate-100 mt-6 text-[9px] text-slate-400 font-mono flex items-center justify-between">
                <span>VERIFIED PRESENTATION</span>
                <span>COHORT BATCH #01</span>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 1: THE CORE BENTO GRID OF WHAT YOU'LL LEARN (CURRICULUM) */}
        <section id="curriculum" className="py-16 border-t border-slate-200/60">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#0b3d2b] bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 leading-none">
              🚀 MASTERCLASS ROADMAP
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold mt-4 text-[#07130d] tracking-tight">
              Workshop Curriculum
            </h2>
            <p className="text-slate-500 mt-2 text-sm max-w-xl mx-auto font-medium">
              Designed carefully to eliminate fear of technology and show you the dynamic, magical potential of building with AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            
            {/* Box 1: PART 1 — AI BASICS */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-white border border-[#0b3d2b]/15 p-6 sm:p-7 flex flex-col justify-between hover:border-emerald-600/30 transition-all duration-300 relative group"
            >
              <div>
                {/* Meta details header bar in bento style */}
                <div className="flex items-center justify-between text-[9px] font-mono font-bold text-slate-400 mb-6 uppercase tracking-wider">
                  <span>Part 01</span>
                  <span className="bg-emerald-500/5 text-[#0b3d2b] px-2 py-0.5 border border-[#0b3d2b]/10 font-black">AI Basics</span>
                </div>

                <div className="flex items-center space-x-3 mb-5">
                  <div className="w-10 h-10 bg-slate-50 border border-slate-200 text-[#0b3d2b] flex items-center justify-center shrink-0 font-mono font-black text-sm">
                    01
                  </div>
                  <div>
                    <h3 className="font-mono text-xs text-slate-400 font-extrabold tracking-widest uppercase">SECTION GOAL</h3>
                    <p className="text-emerald-950 text-xs font-extrabold uppercase">Fear remove karna</p>
                  </div>
                </div>
                
                <ul className="space-y-3.5 font-sans text-xs text-slate-600 border-t border-slate-100 pt-5">
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-600 mt-0.5 font-bold shrink-0">✦</span>
                    <span className="font-semibold text-slate-700">AI kya hai? (Simple approach)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-600 mt-0.5 font-bold shrink-0">✦</span>
                    <span className="font-semibold text-slate-700">What is Machine Learning?</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-600 mt-0.5 font-bold shrink-0">✦</span>
                    <span className="font-semibold text-slate-700">What are LLMs? (Beginner friendly)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-600 mt-0.5 font-bold shrink-0">✦</span>
                    <span className="font-semibold text-slate-700">ChatGPT kaise kaam karta hai?</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-600 mt-0.5 font-bold shrink-0">✦</span>
                    <span className="font-semibold text-slate-700">The Future & Opportunities</span>
                  </li>
                </ul>
              </div>

              {/* Card visual accent */}
              <div className="absolute right-4 bottom-4 opacity-10 group-hover:scale-110 transition duration-300 pointer-events-none">
                <BookOpen className="w-12 h-12 text-[#0b3d2b]" />
              </div>
            </motion.div>

            {/* Box 2: PART 2 - AI TOOLS */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white border border-[#0b3d2b]/15 p-6 sm:p-7 flex flex-col justify-between hover:border-emerald-600/30 transition-all duration-300 relative group"
            >
              <div>
                <div className="flex items-center justify-between text-[9px] font-mono font-bold text-slate-400 mb-6 uppercase tracking-wider">
                  <span>Part 02</span>
                  <span className="bg-amber-500/10 text-amber-800 px-2 py-0.5 border border-amber-500/15 font-black">Ecosystem</span>
                </div>

                <div className="flex items-center space-x-3 mb-5">
                  <div className="w-10 h-10 bg-slate-50 border border-slate-200 text-[#0b3d2b] flex items-center justify-center shrink-0 font-mono font-black text-sm">
                    02
                  </div>
                  <div>
                    <h3 className="font-mono text-xs text-slate-400 font-extrabold tracking-widest uppercase">SECTION GOAL</h3>
                    <p className="text-emerald-950 text-xs font-extrabold uppercase">Explore Modern Tools</p>
                  </div>
                </div>
                
                <ul className="space-y-3.5 font-sans text-xs text-slate-600 border-t border-slate-100 pt-5">
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-600 mt-0.5 font-bold shrink-0">✦</span>
                    <span className="font-semibold text-slate-700">ChatGPT & Claude Prompting</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-600 mt-0.5 font-bold shrink-0">✦</span>
                    <span className="font-semibold text-slate-700">Gemini & Workspace Tools</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-600 mt-0.5 font-bold shrink-0">✦</span>
                    <span className="font-semibold text-slate-700">AI Image Tools (Midjourney, etc)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-600 mt-0.5 font-bold shrink-0">✦</span>
                    <span className="font-semibold text-slate-700">No-Code AI App Builders</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-600 mt-0.5 font-bold shrink-0">✦</span>
                    <span className="font-semibold text-slate-700">Practical AI Coding Creators</span>
                  </li>
                </ul>
              </div>

              <div className="absolute right-4 bottom-4 opacity-10 group-hover:scale-110 transition duration-300 pointer-events-none">
                <Cpu className="w-12 h-12 text-[#0b3d2b]" />
              </div>
            </motion.div>

            {/* Box 3: PART 3 - PRACTICAL PROJECTS */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white border border-[#0b3d2b]/15 p-6 sm:p-7 flex flex-col justify-between hover:border-emerald-600/30 transition-all duration-300 relative group animate-pulse-glow"
            >
              <div>
                <div className="flex items-center justify-between text-[9px] font-mono font-bold text-slate-400 mb-6 uppercase tracking-wider">
                  <span>Part 03</span>
                  <span className="bg-emerald-500/10 text-emerald-800 px-2 py-0.5 border border-emerald-500/25 font-black">Live Builds</span>
                </div>

                <div className="flex items-center space-x-3 mb-5">
                  <div className="w-10 h-10 bg-slate-50 border border-slate-200 text-[#0b3d2b] flex items-center justify-center shrink-0 font-mono font-black text-sm">
                    03
                  </div>
                  <div>
                    <h3 className="font-mono text-xs text-slate-400 font-extrabold tracking-widest uppercase">SECTION GOAL</h3>
                    <p className="text-emerald-950 text-xs font-extrabold uppercase">Live &quot;WOW&quot; Moment</p>
                  </div>
                </div>
                
                <ul className="space-y-3.5 font-sans text-xs text-slate-600 border-t border-slate-100 pt-5">
                  <li className="flex items-start space-x-2">
                    <span className="text-amber-600 mt-0.5 font-bold shrink-0">✦</span>
                    <span className="font-bold text-slate-800">Build Live AI Chatbot</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-amber-600 mt-0.5 font-bold shrink-0">✦</span>
                    <span className="font-bold text-slate-800">Generate fully customized Webpage</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-amber-600 mt-0.5 font-bold shrink-0">✦</span>
                    <span className="font-bold text-slate-800">Create smart automated actions</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-amber-600 mt-0.5 font-bold shrink-0">✦</span>
                    <span className="font-bold text-slate-800">Run Offline AI systems locally</span>
                  </li>
                </ul>
              </div>

              <div className="absolute right-4 bottom-4 opacity-10 group-hover:scale-110 transition duration-300 pointer-events-none">
                <Sparkles className="w-12 h-12 text-amber-600" />
              </div>
            </motion.div>

            {/* Box 4: PART 4 - CAREER & FUTURE */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-white border border-[#0b3d2b]/15 p-6 sm:p-7 flex flex-col justify-between hover:border-emerald-600/30 transition-all duration-300 relative group"
            >
              <div>
                <div className="flex items-center justify-between text-[9px] font-mono font-bold text-slate-400 mb-6 uppercase tracking-wider">
                  <span>Part 04</span>
                  <span className="bg-amber-500/10 text-amber-800 px-2 py-0.5 border border-amber-500/15 font-black">Future-proof</span>
                </div>

                <div className="flex items-center space-x-3 mb-5">
                  <div className="w-10 h-10 bg-slate-50 border border-slate-200 text-[#0b3d2b] flex items-center justify-center shrink-0 font-mono font-black text-sm">
                    04
                  </div>
                  <div>
                    <h3 className="font-mono text-xs text-slate-400 font-extrabold tracking-widest uppercase">SECTION GOAL</h3>
                    <p className="text-emerald-950 text-xs font-extrabold uppercase">Motivate + Roadmap</p>
                  </div>
                </div>
                
                <ul className="space-y-3.5 font-sans text-xs text-slate-600 border-t border-slate-100 pt-5">
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-600 mt-0.5 font-bold shrink-0">✦</span>
                    <span className="font-semibold text-slate-700">AI Careers & Job Opportunities</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-600 mt-0.5 font-bold shrink-0">✦</span>
                    <span className="font-semibold text-slate-700">Detailed AI Skills Roadmap</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-600 mt-0.5 font-bold shrink-0">✦</span>
                    <span className="font-semibold text-slate-700">Curated resource templates</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-600 mt-0.5 font-bold shrink-0">✦</span>
                    <span className="font-semibold text-slate-700">How to keep learning easily</span>
                  </li>
                </ul>
              </div>

              <div className="absolute right-4 bottom-4 opacity-10 group-hover:scale-110 transition duration-300 pointer-events-none">
                <Rocket className="w-12 h-12 text-[#0b3d2b]" />
              </div>
            </motion.div>

          </div>
        </section>

        {/* SECTION 2: BIO & WORKSHOP STATS AS NESTED SHARP-BORDER BENTO CARDS */}
        <section className="py-12 border-t border-slate-200/60">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* Left Card: Speaker Biography Card */}
            <motion.div 
              id="speaker" 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-[#0b3d2b]/15 p-6 sm:p-10 flex flex-col justify-between"
            >
              <div>
                <span className="block text-[8px] font-mono tracking-wider font-extrabold text-slate-400 uppercase mb-5">
                  ABOUT THE HOST / INSTRUCTOR
                </span>
                
                <div className="flex items-center space-x-5 mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 border border-[#0b3d2b]/20 flex items-center justify-center relative">
                    <Image 
                      src="/speaker.png" 
                      alt="Surya Pratap Singh" 
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="font-display text-lg sm:text-xl font-black text-[#07130d] leading-none">
                      Surya Pratap Singh
                    </h4>
                    <span className="text-xs text-emerald-800 font-mono font-extrabold mt-1.5 block">
                      Founder, Vasudev AI Academy
                    </span>
                  </div>
                </div>

                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6 font-medium">
                  Hi! I am Surya, an AI builder, developer, and digital content creator. My goal with Vasudev AI Academy is to break down complex AI, LLMs, and automation into simple, engaging, and practical mental frameworks. No boring jargon or endless lines of complex code—we focus entirely on tools, workflows, and hands-on project creation.
                </p>
              </div>

              {/* Badges row */}
              <div className="flex flex-wrap gap-2 pt-5 border-t border-slate-100">
                <span className="bg-emerald-500/5 border border-emerald-500/20 text-[#0b3d2b] font-mono text-[9px] font-bold py-1 px-2.5">
                  ✓ AI Developer
                </span>
                <span className="bg-amber-500/10 border border-amber-500/15 text-amber-800 font-mono text-[9px] font-bold py-1 px-2.5">
                  ⚡ Automation Architect
                </span>
                <span className="bg-slate-100 border border-slate-200 text-slate-600 font-mono text-[9px] font-bold py-1 px-2.5">
                  ✪ Creator & Educator
                </span>
              </div>
            </motion.div>

            {/* Right Card: Dynamic Schedule & Platform Details Bento */}
            <motion.div 
              id="workshop-details" 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-[#0b3d2b]/15 p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Backglow decor */}
              <div className="absolute -right-20 -bottom-20 w-44 h-44 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

              <div>
                <span className="block text-[8px] font-mono tracking-wider font-extrabold text-slate-400 uppercase mb-5">
                  WORKSHOP ACCESS CRITERIA
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-slate-800 font-sans">
                  <div className="flex items-start space-x-3.5">
                    <Calendar className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="block text-[9px] text-slate-400 font-mono uppercase font-black">Date</span>
                      <span className="text-sm font-extrabold text-[#07130d]">{getUpcomingDateString()}</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3.5">
                    <Clock className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="block text-[9px] text-slate-400 font-mono uppercase font-black">Time</span>
                      <span className="text-sm font-extrabold text-[#07130d]">10:00 AM IST (Live Session)</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3.5">
                    <Video className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="block text-[9px] text-slate-400 font-mono uppercase font-black">Platform</span>
                      <span className="text-sm font-extrabold text-[#07130d]">Google Meet & Live Stream</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3.5">
                    <Award className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="block text-[9px] text-slate-400 font-mono uppercase font-black">Certification</span>
                      <span className="text-sm font-extrabold text-[#07130d]">Vasudev Verified Certificate</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive confirmation badge */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs mt-6">
                <div>
                  <h5 className="font-bold text-[#07130d]">Interactive Live Session</h5>
                  <p className="text-[11px] text-slate-400 font-medium">Q&A session to build custom tools live together</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-100 shrink-0">
                  <Zap className="w-4 h-4 text-[#0b3d2b]" />
                </div>
              </div>

            </motion.div>

          </div>
        </section>

        {/* SECTION 3: INDUSTRY ACCREDITATION & CERTIFICATE OF COMPLETION */}
        <section id="certificate-section" className="py-16 border-t border-slate-200/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Description Column */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-6 space-y-6 text-left"
            >
              <div className="inline-flex items-center space-x-1.5 bg-emerald-500/10 text-emerald-800 border border-emerald-500/25 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-wider">
                <Award className="w-3.5 h-3.5" />
                <span>Gain Credential</span>
              </div>
              
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#07130d] tracking-tight leading-tight">
                Get Verifiable <br />
                <span className="text-emerald-800">Certificate of Completion</span>
              </h2>
              
              <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                Add power to your Resume / College application. Upon complete participation and live project check-in during the <strong>Learn AI From Scratch Workshop</strong>, you will receive a verifiable certificate of accomplishment validated by <strong>Vasudev AI Academy</strong>.
              </p>

              <div className="space-y-3.5 pt-2">
                <div className="flex items-start space-x-3 text-xs">
                  <div className="w-4.5 h-4.5 bg-emerald-50 border border-emerald-100 text-[#0b3d2b] flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-bold font-mono text-[11px] uppercase">Unique Credential ID</strong>
                    <span className="text-slate-500">Each certificate is stamped with a unique token to verify authentication instantly.</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-xs">
                  <div className="w-4.5 h-4.5 bg-emerald-50 border border-emerald-100 text-[#0b3d2b] flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-bold font-mono text-[11px] uppercase">One-Click LinkedIn Share</strong>
                    <span className="text-slate-500">Export directly to your virtual social channels or professional job portals.</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Certificate Graphic Mockup */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-6 flex justify-center"
            >
              <div className="bg-white border border-[#0b3d2b]/15 p-3.5 sm:p-5 shadow-sm hover:border-[#0b3d2b]/30 transition duration-300 relative">
                <div className="absolute top-0 right-0 bg-[#0b3d2b] text-white font-mono text-[8px] px-2 py-0.5 uppercase tracking-wider font-bold">
                  Demo Template
                </div>
                <Image 
                  src="/certificate.png" 
                  alt="Vasudev AI Certificate Preview" 
                  width={550}
                  height={380}
                  className="w-full h-auto object-cover grayscale-[20%] hover:grayscale-0 transition duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>

          </div>
        </section>

        {/* SECTION 4: FREQUENTLY ASKED QUESTIONS */}
        <section id="faq" className="py-16 border-t border-slate-200/60">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#0b3d2b] bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 leading-none">
              FAQ
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold mt-4 text-[#07130d] tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 max-w-5xl mx-auto">
            
            {/* Column Left */}
            <div className="space-y-3.5">
              
              {/* FAQ 1 */}
              <div className="bg-white border border-[#0b3d2b]/15 rounded-none overflow-hidden transition-all duration-200">
                <button 
                  onClick={() => toggleFaq(1)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between font-mono text-xs font-bold text-[#07130d] hover:bg-slate-50 transition duration-150 cursor-pointer"
                >
                  <span>1. Is this workshop beginner friendly?</span>
                  {activeFaq === 1 ? <ChevronUp className="w-4 h-4 text-[#0b3d2b]" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                <AnimatePresence initial={false}>
                  {activeFaq === 1 && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="p-4 sm:p-5 pt-0 text-slate-500 text-xs sm:text-sm leading-relaxed border-t border-slate-100 font-medium bg-[#fafbf9]">
                        Yes, definitely! The entire workshop flow has been structured specifically for absolute beginners. We do not use any complicated programming syntax or deep technical math. Whether you are a student, creator, or professional, you can follow easily.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* FAQ 2 */}
              <div className="bg-white border border-[#0b3d2b]/15 rounded-none overflow-hidden transition-all duration-200">
                <button 
                  onClick={() => toggleFaq(2)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between font-mono text-xs font-bold text-[#07130d] hover:bg-slate-50 transition duration-150 cursor-pointer"
                >
                  <span>2. Will I get the recording link?</span>
                  {activeFaq === 2 ? <ChevronUp className="w-4 h-4 text-[#0b3d2b]" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                <AnimatePresence initial={false}>
                  {activeFaq === 2 && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="p-4 sm:p-5 pt-0 text-slate-500 text-xs sm:text-sm leading-relaxed border-t border-slate-100 font-medium bg-[#fafbf9]">
                        Although we strongly recommend attending the live broadcast to participate in live project check-ins and live active building Q&A, yes: recording references will be shared within the candidate-only secure WhatsApp channel.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* FAQ 3 */}
              <div className="bg-white border border-[#0b3d2b]/15 rounded-none overflow-hidden transition-all duration-200">
                <button 
                  onClick={() => toggleFaq(3)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between font-mono text-xs font-bold text-[#07130d] hover:bg-slate-50 transition duration-150 cursor-pointer"
                >
                  <span>3. Is coding background required?</span>
                  {activeFaq === 3 ? <ChevronUp className="w-4 h-4 text-[#0b3d2b]" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                <AnimatePresence initial={false}>
                  {activeFaq === 3 && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="p-4 sm:p-5 pt-0 text-slate-500 text-xs sm:text-sm leading-relaxed border-t border-slate-100 font-medium bg-[#fafbf9]">
                        Zero coding! This workshop is made completely for class 9–12 students, college beginners, creators, and freelancers. We use visual tools, straightforward prompting logic, and automation templates that anyone can implement easily.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

            {/* Column Right */}
            <div className="space-y-3.5 mt-3.5 md:mt-0">
              
              {/* FAQ 4 */}
              <div className="bg-white border border-[#0b3d2b]/15 rounded-none overflow-hidden transition-all duration-200">
                <button 
                  onClick={() => toggleFaq(4)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between font-mono text-xs font-bold text-[#07130d] hover:bg-slate-50 transition duration-150 cursor-pointer"
                >
                  <span>4. Will there be a real certificate?</span>
                  {activeFaq === 4 ? <ChevronUp className="w-4 h-4 text-[#0b3d2b]" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                <AnimatePresence initial={false}>
                  {activeFaq === 4 && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="p-4 sm:p-5 pt-0 text-slate-500 text-xs sm:text-sm leading-relaxed border-t border-slate-100 font-medium bg-[#fafbf9]">
                        Yes! Upon successfully attending the workshop and completing the simple project check-in link, a verified digital certificate issued by Vasudev AI Academy will be sent directly to your registered email address.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* FAQ 5 */}
              <div className="bg-white border border-[#0b3d2b]/15 rounded-none overflow-hidden transition-all duration-200">
                <button 
                  onClick={() => toggleFaq(5)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between font-mono text-xs font-bold text-[#07130d] hover:bg-slate-50 transition duration-150 cursor-pointer"
                >
                  <span>5. How do I join the streaming?</span>
                  {activeFaq === 5 ? <ChevronUp className="w-4 h-4 text-[#0b3d2b]" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                <AnimatePresence initial={false}>
                  {activeFaq === 5 && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="p-4 sm:p-5 pt-0 text-slate-500 text-xs sm:text-sm leading-relaxed border-t border-slate-100 font-medium bg-[#fafbf9]">
                        Google Meet and live streaming access credentials will be delivered straight to your inbox and WhatsApp broadcast channel 30 minutes before Sunday, 10:00 AM IST. Make sure to reserve your seat beforehand!
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* FAQ 6 */}
              <div className="bg-white border border-[#0b3d2b]/15 rounded-none overflow-hidden transition-all duration-200">
                <button 
                  onClick={() => toggleFaq(6)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between font-mono text-xs font-bold text-[#07130d] hover:bg-slate-50 transition duration-150 cursor-pointer"
                >
                  <span>6. Why is this workshop free?</span>
                  {activeFaq === 6 ? <ChevronUp className="w-4 h-4 text-[#0b3d2b]" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                <AnimatePresence initial={false}>
                  {activeFaq === 6 && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="p-4 sm:p-5 pt-0 text-slate-500 text-xs sm:text-sm leading-relaxed border-t border-slate-100 font-medium bg-[#fafbf9]">
                        Our primary goal is to foster high-scale digital literacy and curiosity among early learners, students, and young creators. It acts as our entry pathway to invite active dreamers into our inner circle community!
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

          </div>
        </section>

        {/* SECTION 5: LOWER FOOTER ACTION CONTAINER */}
        <section id="registration-section" className="py-12">
          <div className="bg-[#0b3d2b] text-white border-2 border-[#07130d] p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-[4px_4px_0px_#07130d]">
            <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gradient-to-l from-emerald-600/10 to-transparent pointer-events-none" />
            
            <div className="space-y-1 text-left relative z-10">
              <span className="text-amber-500 font-mono text-[10px] uppercase tracking-widest font-black leading-none block">
                🚀 BECOME READY FOR THE FUTURE
              </span>
              <h4 className="font-display text-lg sm:text-2xl font-black leading-tight text-white">
                Start Your AI Journey Today!
              </h4>
              <p className="text-emerald-100/70 text-xs font-medium max-w-xl">
                Don&apos;t keep sitting behind the curve. Join Vasudev AI Academy to understand, construct and master the complete digital environment.
              </p>
            </div>

            <a 
              href="#hero" 
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-[11px] uppercase tracking-wider font-extrabold px-6 py-3.5 border border-slate-950 shadow-[3px_3px_0px_#07130d] hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-[1.5px_1.5px_0px_#07130d] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all duration-150 relative z-10 shrink-0 text-center w-full md:w-auto"
            >
              Register Free Now →
            </a>
          </div>
        </section>

        {/* COLLAPSIBLE DASHBOARD PANEL FOR REAL-TIME LEADS VIEW (ADMIN ONLY / HOST CONSOLE) */}
        <section className="mt-8 border border-dashed border-stone-300 bg-[#f7f6f2] p-4 sm:p-6 rounded-none">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-[#0b3d2b]">
              <Database className="w-4 h-4 shrink-0" />
              <div>
                <h5 className="font-mono text-[10px] font-black uppercase tracking-widest leading-none">
                  Landed Admissions Database
                </h5>
                <span className="text-[9px] text-slate-400 font-medium">Host Supervisor Console</span>
              </div>
            </div>
            
            <button 
              onClick={() => setShowAdminPanel(!showAdminPanel)}
              className="px-3 py-1 bg-white hover:bg-slate-50 border border-slate-200 text-[10px] font-mono text-slate-600 font-bold transition duration-150 flex items-center space-x-1"
            >
              <span>{showAdminPanel ? '▼ Hide Leads Logs' : '▲ Show Registrations Log'}</span>
              <span className="bg-[#0b3d2b] text-white font-mono text-[9px] px-1.5 py-0.5 ml-1.5 font-bold">
                {localLeads.length} Total
              </span>
            </button>
          </div>

          <AnimatePresence>
            {showAdminPanel && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mt-4 pt-4 border-t border-slate-200/80"
              >
                {localLeads.length === 0 ? (
                  <p className="text-center font-mono text-xs text-slate-400 py-6">
                    No registrations in local memory yet. Fill out the capture form above to see real-time updates!
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-mono text-[10px] text-slate-700 bg-white border border-slate-200/80">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-black">
                          <th className="p-3">CODE ID</th>
                          <th className="p-3">CANDIDATE NAME</th>
                          <th className="p-3">EMAIL ADDRESS</th>
                          <th className="p-3">WHATSAPP</th>
                          <th className="p-3">ROLE CATEGORY</th>
                          <th className="p-3">REASON / OUTCOME EXPECTATION</th>
                          <th className="p-3 text-right">REGISTERED TIME</th>
                        </tr>
                      </thead>
                      <tbody>
                        {localLeads.map((cd, index) => (
                          <tr key={cd.id || index} className="border-b border-slate-100 hover:bg-slate-50">
                            <td className="p-3 font-bold text-emerald-800">{cd.id}</td>
                            <td className="p-3 font-sans font-bold text-slate-900">{cd.name}</td>
                            <td className="p-3">{cd.email}</td>
                            <td className="p-3 text-slate-800">{cd.phone}</td>
                            <td className="p-3 font-sans font-bold">
                              <span className="bg-emerald-50 px-2 py-0.5 border border-emerald-100 text-emerald-800 text-[9px]">
                                {cd.role}
                              </span>
                            </td>
                            <td className="p-3 font-sans max-w-xs truncate text-[11px] text-slate-500" title={cd.reason}>
                              {cd.reason}
                            </td>
                            <td className="p-3 text-right text-slate-400 font-mono">{cd.timestamp}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    
                    <div className="flex items-center justify-between text-[9px] text-slate-400 mt-2">
                      <span>✓ Synchronized with LocalStorage data store</span>
                      <button 
                        onClick={() => {
                          if (confirm("Reset candidates list to factory default simulation dataset?")) {
                            localStorage.removeItem('vasudev_ai_leads');
                            window.location.reload();
                          }
                        }}
                        className="text-rose-500 hover:underline hover:text-rose-600 uppercase font-black"
                      >
                        Reset Log List
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

      </main>

      {/* FOOTER ACCORDING TO THE NEW SYSTEM SPECIFICATIONS */}
      <footer className="bg-stone-50 border-t border-slate-200 py-10 px-4 sm:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="block font-bold text-slate-700">
              © 2026 Vasudev AI Academy. All Rights Reserved.
            </span>
            <p className="text-[10px] text-slate-400 font-mono">
              Empowering early learners, students, and young pioneers globally.
            </p>
          </div>

          {/* Social connections */}
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

      {/* BOTTOM STICKY ENROLL BANNER FOR EASY SCROLL REGISTER */}
      <AnimatePresence>
        {isScrolled && !isRegistered && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 20 }}
            className="fixed bottom-0 left-0 right-0 z-50 w-full bg-[#07130d] border-t border-[#0b3d2b]/30 text-white px-4 py-3 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] font-mono"
          >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Information */}
              <div className="flex items-center space-x-3.5 text-center md:text-left justify-center md:justify-start">
                <div className="hidden sm:flex w-8 h-8 rounded-full bg-emerald-500/10 items-center justify-center text-emerald-400 border border-emerald-500/20 animate-pulse">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="bg-amber-500 text-slate-950 text-[8px] tracking-widest uppercase font-black px-2 py-0.5 leading-none shrink-0">
                      Limited Offer
                    </span>
                    <h5 className="font-display font-black text-xs text-white leading-none uppercase tracking-tight font-sans">
                      Learn AI From Scratch Workshop
                    </h5>
                  </div>
                  <div className="flex items-center space-x-2 mt-1.5 text-[11px] font-mono text-slate-350 justify-center md:justify-start">
                    <span>Regular Fee:</span>
                    <span className="line-through decoration-red-600 decoration-2 text-slate-500">₹2,999</span>
                    <span className="font-bold text-emerald-400">₹0 (100% FREE Admission Today)</span>
                  </div>
                </div>
              </div>

              {/* Action buttons and timer */}
              <div className="flex items-center justify-center gap-4 w-full md:w-auto">
                <div className="hidden sm:flex items-center space-x-1 bg-slate-900 px-3 py-1.5 border border-slate-800 text-[11px]">
                  <span className="text-slate-500 mr-1.5 font-bold">TIMER:</span>
                  <span className="text-emerald-400 font-extrabold">{timeLeft.days}d</span>
                  <span className="text-slate-600">:</span>
                  <span className="text-emerald-400 font-extrabold">{timeLeft.hours}h</span>
                  <span className="text-slate-600">:</span>
                  <span className="text-emerald-400 font-extrabold">{timeLeft.minutes}m</span>
                  <span className="text-slate-600">:</span>
                  <span className="text-rose-500 animate-pulse font-extrabold">{timeLeft.seconds}s</span>
                </div>

                <a
                  href="#registration-section"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-[10.5px] uppercase tracking-wider font-extrabold py-2.5 px-5 border border-slate-950 shadow-[2px_2px_0px_#ffffff] hover:shadow-[1px_1px_0px_#ffffff] transition-all duration-150 text-center shrink-0"
                >
                  Start Learning Today
                </a>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

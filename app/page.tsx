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
  Database,
  Target,
  X,
  Gift
} from 'lucide-react';

import { motion, AnimatePresence } from 'motion/react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';


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
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const { name, email, phone, role, reason } = formData;

    if (!name.trim()) return setFormError('Please enter your full name.');
    if (!email.trim() || !email.includes('@')) return setFormError('Please enter a valid email address.');
    if (!phone.trim() || phone.length < 8) return setFormError('Please enter a valid WhatsApp number.');

    setIsSubmitting(true);
    setFormError('');

    const registrationId = 'ws-' + Math.random().toString(36).substring(2, 15);
    const newLead: Lead = {
      id: registrationId,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      role: role,
      reason: reason.trim() || 'No feedback shared',
      timestamp: new Date().toISOString()
    };

    try {
      // Destructure 'id' out to match Firestore security rules which check for exactly 6 keys
      const { id, ...firebaseLead } = newLead;
      await setDoc(doc(db, 'registrations', registrationId), firebaseLead);
    } catch (error) {
      setIsSubmitting(false);
      handleFirestoreError(error, OperationType.CREATE, `registrations/${registrationId}`);
      return;
    }

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
    setIsSubmitting(false);
    setShowSuccessModal(true);
  };

  // Upcoming Sunday date label in a localized readable format
  const getUpcomingDateString = () => {
    return 'To Be Announced';
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
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-16 sm:pt-20 pb-20">
        
        {/* HERO SECTION DESIGNED AS BENTO LAYOUT INTRO */}
        <section id="hero" className="pt-2 pb-12 lg:pb-16 lg:pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Left Column: Premium copywriting, taglines, countdown, and core indicators */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-7 flex flex-col justify-between space-y-8 bg-white border border-[#0b3d2b]/15 p-6 sm:p-10 shadow-sm relative"
            >
              
              <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 font-mono text-[10px] sm:text-xs font-black px-4 py-2 tracking-wider uppercase border-l-2 border-b-2 border-[#0b3d2b] flex items-center gap-1.5 shadow-[2px_2px_0px_rgba(7,19,13,0.15)]">
                <Sparkles className="w-3.5 h-3.5 text-slate-950 fill-slate-950 shrink-0" />
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
                  <Rocket className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    Don&apos;t just use AI tools. <br className="sm:hidden" />
                    <span className="text-emerald-800 font-black">Learn to understand and build AI.</span>
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
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start space-x-1.5 mb-1.5">
                    <Target className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span className="block text-[10px] sm:text-xs font-mono tracking-widest text-[#0b3d2b] font-black uppercase">
                      STATUS: COHORT STARTING SOON
                    </span>
                  </div>
                  <p className="text-[#0b3d2b] font-extrabold text-sm">
                    Limited Registrations • Only 14 Seats Left
                  </p>
                </div>

                {/* Live Session Date & Time Badge */}
                <div className="flex flex-col items-center justify-center bg-[#07130d] text-white px-6 py-5 rounded-none border-2 border-emerald-500/30 shadow-[4px_4px_0px_#0b3d2b] min-w-[240px] text-center">
                  <span className="block text-[9px] text-amber-500 font-mono uppercase font-black tracking-widest mb-3">LIVE SESSION SCHEDULE</span>
                  <div className="flex items-center justify-center space-x-2.5 font-mono">
                    <div className="flex flex-col items-center">
                      <span className="text-lg sm:text-xl font-black text-emerald-400 leading-none">{timeLeft.days}</span>
                      <span className="text-[8px] text-slate-400 font-bold uppercase mt-1">Days</span>
                    </div>
                    <span className="text-slate-600 font-bold text-lg leading-none -mt-3">:</span>
                    <div className="flex flex-col items-center">
                      <span className="text-lg sm:text-xl font-black text-emerald-400 leading-none">{timeLeft.hours}</span>
                      <span className="text-[8px] text-slate-400 font-bold uppercase mt-1">Hours</span>
                    </div>
                    <span className="text-slate-600 font-bold text-lg leading-none -mt-3">:</span>
                    <div className="flex flex-col items-center">
                      <span className="text-lg sm:text-xl font-black text-emerald-400 leading-none">{timeLeft.minutes}</span>
                      <span className="text-[8px] text-slate-400 font-bold uppercase mt-1">Mins</span>
                    </div>
                    <span className="text-slate-600 font-bold text-lg leading-none -mt-3">:</span>
                    <div className="flex flex-col items-center">
                      <span className="text-lg sm:text-xl font-black text-rose-500 leading-none">{timeLeft.seconds}</span>
                      <span className="text-[8px] text-slate-400 font-bold uppercase mt-1">Secs</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Premium Active Interactive Form styled in clean strict sharp edges */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className="lg:col-span-5 bg-white border-2 border-[#0b3d2b] p-6 sm:p-8 flex flex-col justify-between shadow-[6px_6px_0px_#0b3d2b] relative"
            >
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 mb-6 gap-3">
                  <div>
                    <span className="block text-[10px] font-mono tracking-wider text-emerald-800 font-extrabold uppercase mb-0.5">
                      CLAIM FREE ADMISSION
                    </span>
                    <h3 className="font-display text-xl font-black text-[#07130d]">
                      Start Learning AI Today
                    </h3>
                  </div>
                  {/* Huge striking pricing ticket badge */}
                  <div className="bg-amber-500 text-slate-950 border-2 border-slate-950 px-4 py-2 font-mono text-center uppercase shadow-[3px_3px_0px_#07130d] transform -rotate-1 hover:rotate-0 transition-transform duration-150 shrink-0 self-start">
                    <span className="line-through text-slate-800/70 text-xs font-bold mr-2">₹2,999</span>
                    <span className="text-sm sm:text-base font-black text-[#07130d]">100% FREE</span>
                  </div>
                </div>

                {formError && (
                  <div className="mb-4 bg-rose-50 border border-rose-150 text-rose-800 p-3 text-xs font-semibold flex items-center leading-none">
                    <span className="w-1.5 h-1.5 bg-rose-500 rounded-full mr-2" />
                    {formError}
                  </div>
                )}

                {!isRegistered ? (
                    <form onSubmit={handleRegisterSubmit} className="space-y-4">
                      
                      {/* Name field */}
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 border-r border-slate-150 pr-3">
                          <User className="w-4 h-4 text-slate-500" />
                        </div>
                        <input 
                          type="text" 
                          name="name" 
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your Full Name" 
                          className="w-full bg-slate-50 border-2 border-slate-200 pl-13 pr-4 py-4 text-sm sm:text-base text-slate-900 placeholder-slate-400 font-semibold focus:outline-none focus:border-[#0b3d2b] focus:bg-white transition-all duration-200"
                        />
                      </div>

                      {/* Email field */}
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 border-r border-slate-150 pr-3">
                          <Mail className="w-4 h-4 text-slate-500" />
                        </div>
                        <input 
                          type="email" 
                          name="email" 
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Email Address" 
                          className="w-full bg-slate-50 border-2 border-slate-200 pl-13 pr-4 py-4 text-sm sm:text-base text-slate-900 placeholder-slate-400 font-semibold focus:outline-none focus:border-[#0b3d2b] focus:bg-white transition-all duration-200"
                        />
                      </div>

                      {/* Telephone / Whatsapp field */}
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 border-r border-slate-150 pr-3">
                          <Phone className="w-4 h-4 text-emerald-700 font-bold" />
                        </div>
                        <input 
                          type="tel" 
                          name="phone" 
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="WhatsApp Phone Number" 
                          className="w-full bg-slate-50 border-2 border-slate-200 pl-13 pr-4 py-4 text-sm sm:text-base text-slate-900 placeholder-slate-400 font-semibold focus:outline-none focus:border-[#0b3d2b] focus:bg-white transition-all duration-200"
                        />
                      </div>

                      {/* Role dropdown */}
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 border-r border-slate-150 pr-3">
                          <Briefcase className="w-4 h-4 text-slate-500" />
                        </div>
                        <select 
                          name="role"
                          value={formData.role}
                          onChange={handleInputChange}
                          className="w-full bg-slate-50 border-2 border-slate-200 pl-13 pr-4 py-4 text-sm sm:text-base text-slate-750 font-semibold focus:outline-none focus:border-[#0b3d2b] focus:bg-white transition-all duration-200 cursor-pointer"
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
                          className="w-full bg-slate-50 border-2 border-slate-200 px-4 py-3.5 text-sm sm:text-base text-slate-900 placeholder-slate-400 font-semibold focus:outline-none focus:border-[#0b3d2b] focus:bg-white transition-all duration-200 resize-none"
                        />
                      </div>

                      {/* Massive Registration Button CTA */}
                      <button 
                        type="submit"
                        className="w-full bg-emerald-800 hover:bg-[#0b3d2b] text-white py-5 px-6 font-mono text-xs sm:text-sm tracking-widest uppercase font-black transition-all duration-150 flex items-center justify-center space-x-2.5 border-2 border-[#07130d] shadow-[5px_5px_0px_#07130d] hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-[3.5px_3.5px_0px_#07130d] active:translate-x-[5px] active:translate-y-[5px] active:shadow-none cursor-pointer"
                      >
                        <span>Reserve My Free Seat Now</span>
                        <ArrowRight className="w-5 h-5 animate-pulse shrink-0" />
                      </button>

                      <div className="flex items-center justify-center space-x-1.5 text-[10px] text-slate-400 pt-2 font-mono uppercase font-bold">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>100% Secure • No Spam Guarantee</span>
                      </div>
                    </form>
                  ) : (
                    <div className="text-center py-6 space-y-5">
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
                          <span className="flex items-center space-x-1 font-mono text-[9px] uppercase tracking-wider">
                            <Calendar className="w-3.5 h-3.5 text-[#07130d]" />
                            <span>Streaming Schedule</span>
                          </span>
                          <span className="font-mono text-[8px] bg-[#0b3d2b] text-white px-2 py-0.5 uppercase">Status: Active</span>
                        </div>
                        <div className="text-slate-700 leading-relaxed font-semibold">
                          <strong>Date:</strong> {getUpcomingDateString()}<br />
                          <strong>Time:</strong> To Be Announced (Updates inside WhatsApp Group)<br />
                          <strong>Access:</strong> Google Meet Workspace Links
                        </div>
                      </div>
                      
                      {/* WhatsApp Funnel Element */}
                      <div className="pt-2">
                        <p className="text-xs text-amber-600 font-extrabold uppercase font-mono mb-2 text-center">
                          ⚠️ Action Required: Join the WhatsApp Group Below!
                        </p>
                        <a 
                          href="https://chat.whatsapp.com/LxRtUPfuXws0ho8QmSzmsQ"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex w-full items-center justify-center space-x-2 bg-[#1ea853] hover:bg-[#188c44] text-white py-3.5 px-4 font-mono text-[10px] tracking-wider uppercase font-extrabold transition duration-150 hover:shadow-md"
                        >
                          <Phone className="w-4 h-4 text-white shrink-0" />
                          <span>Join Official Candidates WhatsApp Group</span>
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
                    </div>
                  )}
              </div>

              {/* Verified badge footer */}
              <div className="pt-4 border-t border-slate-100 mt-6 text-[9px] text-slate-400 font-mono flex items-center justify-between">
                <span>VERIFIED PRESENTATION</span>
                <span>COHORT BATCH #01</span>
              </div>
            </motion.div>

          </div>
        </section>

        {/* SECTION 1: THE CORE BENTO GRID OF WHAT YOU'LL LEARN (CURRICULUM) */}
         <section id="curriculum" className="py-16 border-t border-slate-200/60">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center space-x-1.5 text-[10px] font-mono font-black uppercase tracking-widest text-[#0b3d2b] bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 leading-none">
              <Rocket className="w-3.5 h-3.5 text-emerald-700" />
              <span>Masterclass Roadmap</span>
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0 }}
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
                    <p className="text-emerald-950 text-xs font-extrabold uppercase">Eliminate Tech Fear</p>
                  </div>
                </div>
                
                <ul className="space-y-3.5 font-sans text-xs text-slate-600 border-t border-slate-100 pt-5">
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-600 mt-0.5 font-bold shrink-0">✦</span>
                    <span className="font-semibold text-slate-700">What is AI? (Simple approach)</span>
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
                    <span className="font-semibold text-slate-700">How does ChatGPT work?</span>
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white border border-[#0b3d2b]/15 p-6 sm:p-7 flex flex-col justify-between hover:border-emerald-600/30 transition-all duration-300 relative group"
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
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

        <ProjectShowcaseSection />
        
        <BeforeAfterSection />

        {/* NEW HIGHLY INTERACTIVE PREMIUM COMPONENT: LIVE PROMPT OPTIMIZATION LAB */}
        <section className="py-16 border-t border-slate-200/60 font-sans">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            
            {/* Component Header */}
            <div className="text-center mb-10">
              <span className="inline-flex items-center space-x-1.5 text-[10px] font-mono font-black uppercase tracking-widest text-[#0b3d2b] bg-[#0b3d2b]/5 border border-[#0b3d2b]/15 px-3.5 py-1.5 leading-none">
                <Terminal className="w-3.5 h-3.5 text-emerald-800" />
                <span>Try It Live • Prompt Lab</span>
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold mt-3 text-[#07130d] tracking-tight">
                Prompt Quality Preview
              </h3>
              <p className="text-slate-500 mt-2 text-xs sm:text-sm font-medium max-w-lg mx-auto">
                See how normal prompts get refined into structured AI Master Scripts inside our exclusive live workshop. Click any category below to experiment.
              </p>
            </div>

            {/* Main Interactive Bento Grid Card */}
            <div className="bg-white border-2 border-[#0b3d2b] shadow-[6px_6px_0px_#0b3d2b] p-6 sm:p-8 relative">
              
              {/* Internal State management simulator inside client layout */}
              <PromptLabSandbox />
              
            </div>
          </motion.div>
        </section>

        {/* SECTION 2: BIO & WORKSHOP STATS AS NESTED SHARP-BORDER BENTO CARDS */}
        <section className="py-12 border-t border-slate-200/60">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* Left Card: Speaker Biography Card */}
            <motion.div 
              id="speaker" 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white border border-[#0b3d2b]/15 p-6 sm:p-10 flex flex-col justify-between"
            >
              <div>
                <span className="block text-[8px] font-mono tracking-wider font-extrabold text-slate-400 uppercase mb-5">
                  ABOUT THE HOST / INSTRUCTOR
                </span>
                
                <div className="flex items-center space-x-5 mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 border border-[#0b3d2b]/20 flex items-center justify-center relative">
                    <Image 
                      src="/Speaker.png" 
                      alt="Surya Pratap Singh" 
                      fill
                      sizes="64px"
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
              <div className="flex flex-wrap gap-2 pt-5 border-t border-slate-100 items-center">
                <span className="inline-flex items-center bg-emerald-500/5 border border-emerald-500/20 text-[#0b3d2b] font-mono text-[9px] font-bold py-1 px-2.5">
                  <Check className="w-3 h-3 mr-1 text-[#0b3d2b]" /> AI Developer
                </span>
                <span className="inline-flex items-center bg-amber-500/10 border border-amber-500/15 text-amber-800 font-mono text-[9px] font-bold py-1 px-2.5">
                  <Zap className="w-3 h-3 text-amber-600 fill-amber-500 mr-1" /> Automation Architect
                </span>
                <span className="inline-flex items-center bg-slate-100 border border-slate-200 text-slate-600 font-mono text-[9px] font-bold py-1 px-2.5">
                  <Sparkles className="w-3 h-3 text-slate-500 mr-1" /> Creator & Educator
                </span>
              </div>
            </motion.div>

            {/* Right Card: Dynamic Schedule & Platform Details Bento */}
            <motion.div 
              id="workshop-details" 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
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
                      <span className="text-sm font-extrabold text-[#07130d]">To Be Announced</span>
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

        <AudienceSection />

        {/* SECTION 3: INDUSTRY ACCREDITATION & CERTIFICATE OF COMPLETION */}
        <section id="certificate-section" className="py-16 border-t border-slate-200/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Description Column */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
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
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
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

        <BonusesSection />

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

          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 max-w-5xl mx-auto"
          >
            
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
                {activeFaq === 1 && (
                  <div className="overflow-hidden border-t border-slate-100 bg-[#fafbf9]">
                    <p className="p-4 sm:p-5 text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
                      Yes, definitely! The entire workshop flow has been structured specifically for absolute beginners. We do not use any complicated programming syntax or deep technical math. Whether you are a student, creator, or professional, you can follow easily.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ 2 */}
              <div className="bg-white border border-[#0b3d2b]/15 rounded-none overflow-hidden transition-all duration-200">
                <button 
                  onClick={() => toggleFaq(2)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between font-[#07130d] font-mono text-xs font-bold hover:bg-slate-50 transition duration-150 cursor-pointer"
                >
                  <span>2. Will I get the recording link?</span>
                  {activeFaq === 2 ? <ChevronUp className="w-4 h-4 text-[#0b3d2b]" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {activeFaq === 2 && (
                  <div className="overflow-hidden border-t border-slate-100 bg-[#fafbf9]">
                    <p className="p-4 sm:p-5 text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
                      Although we strongly recommend attending the live broadcast to participate in live project check-ins and live active building Q&A, yes: recording references will be shared within the candidate-only secure WhatsApp channel.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ 3 */}
              <div className="bg-white border border-[#0b3d2b]/15 rounded-none overflow-hidden transition-all duration-200">
                <button 
                  onClick={() => toggleFaq(3)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between font-[#07130d] font-mono text-xs font-bold hover:bg-slate-50 transition duration-150 cursor-pointer"
                >
                  <span>3. Is coding background required?</span>
                  {activeFaq === 3 ? <ChevronUp className="w-4 h-4 text-[#0b3d2b]" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {activeFaq === 3 && (
                  <div className="overflow-hidden border-t border-slate-100 bg-[#fafbf9]">
                    <p className="p-4 sm:p-5 text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
                      Zero coding! This workshop is made completely for class 9–12 students, college beginners, creators, and freelancers. We use visual tools, straightforward prompting logic, and automation templates that anyone can implement easily.
                    </p>
                  </div>
                )}
              </div>

            </div>

            {/* Column Right */}
            <div className="space-y-3.5 mt-3.5 md:mt-0">
              
              {/* FAQ 4 */}
              <div className="bg-white border border-[#0b3d2b]/15 rounded-none overflow-hidden transition-all duration-200">
                <button 
                  onClick={() => toggleFaq(4)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between font-[#07130d] font-mono text-xs font-bold hover:bg-slate-50 transition duration-150 cursor-pointer"
                >
                  <span>4. Will there be a real certificate?</span>
                  {activeFaq === 4 ? <ChevronUp className="w-4 h-4 text-[#0b3d2b]" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {activeFaq === 4 && (
                  <div className="overflow-hidden border-t border-slate-100 bg-[#fafbf9]">
                    <p className="p-4 sm:p-5 text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
                      Yes! Upon successfully attending the workshop and completing the simple project check-in link, a verified digital certificate issued by Vasudev AI Academy will be sent directly to your registered email address.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ 5 */}
              <div className="bg-white border border-[#0b3d2b]/15 rounded-none overflow-hidden transition-all duration-200">
                <button 
                  onClick={() => toggleFaq(5)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between font-[#07130d] font-mono text-xs font-bold hover:bg-slate-50 transition duration-150 cursor-pointer"
                >
                  <span>5. How do I join the streaming?</span>
                  {activeFaq === 5 ? <ChevronUp className="w-4 h-4 text-[#0b3d2b]" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {activeFaq === 5 && (
                  <div className="overflow-hidden border-t border-slate-100 bg-[#fafbf9]">
                    <p className="p-4 sm:p-5 text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
                      Google Meet and live streaming access credentials will be delivered straight to your inbox and WhatsApp broadcast channel 30 minutes before the workshop starts. Since the date and time are To Be Announced, we will update all registered candidates as soon as the schedule is finalized!
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ 6 */}
              <div className="bg-white border border-[#0b3d2b]/15 rounded-none overflow-hidden transition-all duration-200">
                <button 
                  onClick={() => toggleFaq(6)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between font-[#07130d] font-mono text-xs font-bold hover:bg-slate-50 transition duration-150 cursor-pointer"
                >
                  <span>6. Why is this workshop free?</span>
                  {activeFaq === 6 ? <ChevronUp className="w-4 h-4 text-[#0b3d2b]" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {activeFaq === 6 && (
                  <div className="overflow-hidden border-t border-slate-100 bg-[#fafbf9]">
                    <p className="p-4 sm:p-5 text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
                      Our primary goal is to foster high-scale digital literacy and curiosity among early learners, students, and young creators. It acts as our entry pathway to invite active dreamers into our inner circle community!
                    </p>
                  </div>
                )}
              </div>

            </div>

          </motion.div>
        </section>

        {/* SECTION 5: LOWER FOOTER ACTION CONTAINER */}
        <section id="registration-section" className="py-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-[#0b3d2b] text-white border-2 border-[#07130d] p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-[4px_4px_0px_#07130d]"
          >
            <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gradient-to-l from-emerald-600/10 to-transparent pointer-events-none" />
            
            <div className="space-y-1.5 text-left relative z-10">
              <span className="inline-flex items-center space-x-1.5 text-amber-500 font-mono text-[10px] uppercase tracking-widest font-black leading-none">
                <Rocket className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>BECOME READY FOR THE FUTURE</span>
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
          </motion.div>
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
      {isScrolled && !isRegistered && (
        <div className="fixed bottom-0 left-0 right-0 z-50 w-full bg-[#07130d] border-t border-[#0b3d2b]/30 text-white px-4 py-3 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] font-mono">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Information */}
            <div className="flex items-center space-x-3.5 text-center md:text-left justify-center md:justify-start">
              <div className="hidden sm:flex w-8 h-8 rounded-full bg-emerald-500/10 items-center justify-center text-emerald-400 border border-emerald-500/20">
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
                <span className="text-rose-500 font-extrabold">{timeLeft.seconds}s</span>
              </div>

              <a
                href="#registration-section"
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-[10.5px] uppercase tracking-wider font-extrabold py-2.5 px-5 border border-slate-950 shadow-[2px_2px_0px_#ffffff] hover:shadow-[1px_1px_0px_#ffffff] transition-all duration-150 text-center shrink-0"
              >
                Start Learning Today
              </a>
            </div>

          </div>
        </div>
      )}

      {/* SUCCESS MODAL POPUP */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSuccessModal(false)}
              className="absolute inset-0 bg-[#07130d]/80 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 25 }}
              transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
              className="relative w-full max-w-md bg-white border-4 border-[#0b3d2b] p-6 sm:p-8 text-[#07130d] shadow-[8px_8px_0px_#07130d] z-10 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-amber-500" />

              {/* Close Button */}
              <button
                onClick={() => setShowSuccessModal(false)}
                className="absolute top-4 right-4 text-slate-450 hover:text-[#0b3d2b] transition-colors p-1 border border-transparent hover:border-slate-200 cursor-pointer"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Success Content */}
              <div className="text-center space-y-5 pt-3">
                {/* Animated Ring Checkmark */}
                <div className="w-16 h-16 bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto rounded-full border-2 border-emerald-500/20 shadow-md">
                  <CheckCircle2 className="w-9 h-9 animate-bounce text-emerald-700" />
                </div>

                <div className="space-y-2">
                  <span className="inline-flex items-center space-x-1.5 bg-emerald-500/10 text-[#0b3d2b] border border-emerald-500/20 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-wider">
                    Registration Confirmed
                  </span>
                  <h3 className="font-display text-2xl font-black text-[#07130d] tracking-tight leading-tight">
                    Seat Reserved! 🎉
                  </h3>
                  <p className="text-slate-500 text-xs font-semibold leading-relaxed px-4">
                    A direct calendar invite has been dispatched to your email:<br />
                    <span className="font-bold text-[#0b3d2b] break-all">{registeredEmail}</span>
                  </p>
                </div>

                {/* Info Block */}
                <div className="bg-stone-50 border border-slate-200/80 p-4 text-left text-xs space-y-2.5 font-sans">
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                    <span>Live Access Pass</span>
                    <span className="text-[#0b3d2b]">100% Free Admission</span>
                  </div>
                  <div className="text-slate-600 leading-relaxed font-semibold">
                    💡 <strong>Status:</strong> Active & Confirmed<br />
                    📅 <strong>Schedule:</strong> TBA (All announcements & class links will be sent inside WhatsApp group)
                  </div>
                </div>

                {/* Interactive WhatsApp Ring CTA */}
                <div className="pt-2 space-y-3">
                  <p className="text-[11px] text-amber-600 font-extrabold uppercase font-mono tracking-tight animate-pulse">
                    ⚠️ CRITICAL STEP: JOIN THE GROUP BELOW!
                  </p>
                  
                  <a
                    href="https://chat.whatsapp.com/LxRtUPfuXws0ho8QmSzmsQ"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center space-x-2.5 bg-[#1ea853] hover:bg-[#188c44] text-white py-4 px-6 font-mono text-[11px] tracking-wider uppercase font-black transition-all duration-200 border-2 border-[#07130d] shadow-[4px_4px_0px_#07130d] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_#07130d] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
                  >
                    <Phone className="w-4 h-4 text-white shrink-0" />
                    <span>Join Candidates WhatsApp Group</span>
                  </a>
                  
                  <p className="text-[9px] font-mono text-slate-400 font-bold uppercase leading-none mt-2">
                    *Links to Google Meet will only be shared in WhatsApp group
                  </p>
                </div>

                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="text-[10px] font-mono text-[#0b3d2b] hover:text-emerald-800 uppercase tracking-widest font-extrabold block mx-auto underline pt-2 cursor-pointer"
                >
                  Close & Explore Website
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Interactive Prompt Engineering Sandbox implementation
function PromptLabSandbox() {
  const [activeCategory, setActiveCategory] = useState<'study' | 'copywriting' | 'coding'>('study');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [copied, setCopied] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const categories = {
    study: {
      title: 'Academic Study Prep',
      description: 'Struggling to understand hard topics',
      metric: 'Conceptual clarity for Student / Learners',
      raw: 'explain photosynthesis simply and quickly.',
      optimized: `[System Directive] Act as a senior scientific research supervisor and elite academic mentor with 20+ years of pedagogic experience.

[Task & Topic Constraints] Breakdown the complex biology of "Photosynthesis" (light and dark biochemical cycles) into a structured, non-technical explanation.

[Analogy Mandate] You must explain the core concept using a relatable real-world analogy (e.g. solar grids or a bakery production line).

[Required Output Format]
1. THE CORE IDEA: 1-sentence executive summary.
2. BAKERY ANALOGY: A simple, memorable breakdown.
3. STEP-BY-STEP: Crisply separate the Light Cycle and Dark Cycle.
4. MEMORY DRILL: 2 quick self-evaluation questions.`
    },
    copywriting: {
      title: 'Digital Storytelling',
      description: 'Struggling to write viral headlines',
      metric: '92% higher click-through potential',
      raw: 'write a promotion post for our upcoming school science exhibition.',
      optimized: `[System Directive] Act as an award-winning direct response copywriter and digital creator specializing in student community building.

[Task Constraints] Craft a highly compelling, hook-driven digital bulletin announcing our regional School Science Exhibition.

[Target Audience] Parents, fellow scholars, local engineering judges, and teachers.

[Details to Incorporate] Date: Coming Sunday, Location: Main Auditorium, Featured Experiments: Student built AI Voice cloning assistant & high-density solar glider.

[Required Hook Framework]
- BEGIN with a startling question regarding the future of engineering.
- USE clean whitespace, bullet points, and bulleted benefits.
- CONCLUDE with a high-priority call-to-action.`
    },
    coding: {
      title: 'Frontend Coding',
      description: 'Writing custom styling or scripts',
      metric: 'Fully commented ready-to-use production scripts',
      raw: 'write code for a digital clock widget with a nice font.',
      optimized: `[System Directive] Act as a Principal Frontend Engineer specializing in lightweight mobile-first web experiences and Tailwind CSS layouts.

[Engineering Challenge] Construct a complete responsive digital clock component enclosed in a stunning high-contrast dashboard card.

[Technical Constraints]
- Built entirely within a single-file template (index.html).
- Styled dynamically using Tailwind CSS utility classes.
- Use smooth CSS transitions, soft amber ambient glow shadows, and a clean tracking-widest monospace font configuration.
- Write modular vanilla JavaScript to synchronize local live time.

[Required Delivery] Provide cleanly formatted code with informative debugging comments.`
    }
  };

  const current = categories[activeCategory];

  const handleOptimize = () => {
    setIsOptimizing(true);
    setShowResult(false);
    setLogs([]);
    const sequence = [
      'Initializing Vasudev Prompt Matrix Engine...',
      'Injecting expert persona variables...',
      'Mapping structured output requirements...',
      'Structuring task and detail context...',
      'Applying negative constraints and formatting rules...',
      'Finalizing Master Prompt Configuration!'
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step < sequence.length) {
        setLogs((prev) => [...prev, sequence[step]]);
        step++;
      } else {
        clearInterval(interval);
        setIsOptimizing(false);
        setShowResult(true);
      }
    }, 450);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(current.optimized);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {(Object.keys(categories) as Array<keyof typeof categories>).map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setShowResult(false);
              setLogs([]);
            }}
            className={`p-4 border text-left cursor-pointer transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-[#0b3d2b] text-white border-[#06241a] shadow-[3.5px_3.5px_0px_#07130d] transform -translate-y-0.5'
                : 'bg-stone-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
            }`}
          >
            <span className="block font-sans text-xs font-black uppercase tracking-wider leading-none mb-1">
              {categories[cat].title}
            </span>
            <span className="block font-sans text-[10px] text-slate-400 font-medium">
              {categories[cat].description}
            </span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Raw vs Action */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="bg-slate-50 border border-slate-200 p-5 flex flex-col justify-between h-full space-y-4">
            <div>
              <span className="block font-mono text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-2">
                What a standard user writes:
              </span>
              <div className="bg-white border text-sm text-slate-500 font-sans p-3 italic rounded-none">
                &ldquo;{current.raw}&rdquo;
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200/60">
              <span className="block font-mono text-[9px] text-amber-600 font-black uppercase tracking-widest mb-1.5">
                ENGINE STATUS
              </span>
              <p className="text-slate-600 text-xs font-medium leading-relaxed">
                Ordinary prompts output shallow, generic, or incorrect responses. Our structured approach results in:
              </p>
              <div className="inline-flex items-center space-x-1.5 bg-emerald-500/10 border border-emerald-500/20 text-[#0b3d2b] px-2.5 py-1 font-mono text-[9.5px] font-black uppercase mt-3">
                <Check className="w-3.5 h-3.5" />
                <span>{current.metric}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleOptimize}
            disabled={isOptimizing}
            className="w-full bg-emerald-800 hover:bg-[#0b3d2b] disabled:bg-slate-300 text-white py-4 font-mono text-xs tracking-widest uppercase font-black transition-all border-2 border-[#07130d] shadow-[4px_4px_0px_#07130d] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_#07130d] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none cursor-pointer flex items-center justify-center space-x-2 shrink-0 animate-pulse-glow"
          >
            <Zap className={`w-4 h-4 text-amber-400 ${isOptimizing ? 'animate-spin' : ''}`} />
            <span>{isOptimizing ? 'PROCESSING ENGINE...' : 'OPTIMIZE WITH VASUDEV PROTOCOL'}</span>
          </button>
        </div>

        {/* Right Column: Engine Output Console */}
        <div className="lg:col-span-7 bg-slate-950 text-slate-100 border-2 border-slate-905 p-5 font-mono text-xs flex flex-col justify-between relative shadow-inner min-h-[300px]">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4 text-[9px] text-slate-400">
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 bg-red-500 rounded-full inline-block animate-ping" />
                <span>VASUDEV AI OPTIMIZATION TERMINAL V1.4</span>
              </span>
              <span>OUTPUT FORMAT: STR-MD</span>
            </div>

            {/* In optimization status logs */}
            {isOptimizing && (
              <div className="space-y-2 text-emerald-400 font-mono text-[11px]">
                {logs.map((log, index) => (
                  <div key={index} className="flex items-start space-x-1">
                    <span className="text-slate-600">&gt;</span>
                    <span>{log}</span>
                  </div>
                ))}
                <span className="inline-block w-2.5 h-3.5 bg-emerald-400 animate-pulse ml-1" />
              </div>
            )}

            {/* Static output initially */}
            {!isOptimizing && !showResult && (
              <div className="flex flex-col items-center justify-center py-16 text-center text-slate-500 font-mono space-y-3">
                <Terminal className="w-8 h-8 text-slate-700" />
                <div>
                  <p className="text-xs uppercase font-bold text-slate-400">Awaiting Target Selection</p>
                  <p className="text-[10px] text-slate-600 mt-1 max-w-xs">Select a category and hit the optimization launch button to view output telemetry.</p>
                </div>
              </div>
            )}

            {/* Output result */}
            {showResult && !isOptimizing && (
              <div className="text-slate-300 whitespace-pre-line leading-relaxed font-mono text-[10.5px] overflow-y-auto max-h-[340px] pr-2 scrollbar-thin scrollbar-thumb-slate-800">
                {current.optimized}
              </div>
            )}
          </div>

          {/* Copy trigger */}
          {showResult && !isOptimizing && (
            <div className="pt-3 border-t border-slate-900 mt-4 flex items-center justify-between text-[10px] bg-slate-950 shrink-0">
              <span className="text-emerald-500 font-bold flex items-center space-x-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>Optimal Prompt Ready!</span>
              </span>
              <button
                onClick={handleCopy}
                className="bg-emerald-950 text-emerald-400 border border-emerald-800/40 hover:bg-emerald-900/40 px-3 py-1.5 font-bold uppercase cursor-pointer transition duration-150"
              >
                {copied ? '✓ Prompt Copied' : 'Copy Optimized Prompt'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectShowcaseSection() {
  const [activeProject, setActiveProject] = useState(0);

  const projects = [
    {
      title: "AI Chatbot",
      desc: "Build a custom intelligent assistant.",
      icon: <Terminal className="w-5 h-5" />,
      color: "emerald",
      visual: (
        <div className="flex flex-col h-full bg-slate-50 border border-slate-200 shadow-inner p-4 space-y-4">
          <div className="flex justify-start"><div className="bg-white border border-slate-200 p-2 text-xs rounded-tr-lg rounded-br-lg rounded-bl-lg max-w-[80%] shadow-sm font-sans">Hello! How can I help you today?</div></div>
          <div className="flex justify-end"><div className="bg-emerald-100 border border-emerald-200 text-emerald-900 p-2 text-xs rounded-tl-lg rounded-bl-lg rounded-br-lg max-w-[80%] shadow-sm font-sans">I need to automate my daily emails.</div></div>
          <div className="flex justify-start"><div className="bg-white border border-slate-200 p-2 text-xs rounded-tr-lg rounded-br-lg rounded-bl-lg max-w-[80%] shadow-sm font-sans">I can help with that. Let's set up a workflow.</div></div>
          <div className="mt-auto bg-white border border-slate-200 p-2 flex items-center text-slate-400 text-xs shadow-sm font-sans">Type a message...</div>
        </div>
      )
    },
    {
      title: "Custom Webpage",
      desc: "Generate full UI/UX from simple text prompts.",
      icon: <Globe className="w-5 h-5" />,
      color: "amber",
      visual: (
        <div className="flex flex-col h-full bg-white border border-slate-200 shadow-inner overflow-hidden">
          <div className="bg-slate-100 p-2 border-b border-slate-200 flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-rose-400"></div><div className="w-2 h-2 rounded-full bg-amber-400"></div><div className="w-2 h-2 rounded-full bg-emerald-400"></div>
          </div>
          <div className="p-4 space-y-3">
            <div className="w-3/4 h-6 bg-slate-100 mx-auto"></div>
            <div className="w-1/2 h-3 bg-slate-100 mx-auto mt-2"></div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="h-16 bg-emerald-50 border border-emerald-100"></div>
              <div className="h-16 bg-amber-50 border border-amber-100"></div>
            </div>
            <div className="w-1/3 h-8 bg-[#0b3d2b] mx-auto mt-4"></div>
          </div>
        </div>
      )
    },
    {
      title: "Smart Automation",
      desc: "Connect apps and automate repetitive tasks.",
      icon: <Zap className="w-5 h-5" />,
      color: "rose",
      visual: (
        <div className="flex flex-col h-full bg-slate-50 border border-slate-200 shadow-inner p-4 items-center justify-center space-y-2">
           <div className="bg-white border-2 border-slate-300 p-3 flex items-center justify-center shadow-sm w-32"><Mail className="w-5 h-5 text-slate-500 mr-2"/> <span className="text-xs font-bold text-slate-700 font-sans">Gmail</span></div>
           <div className="w-0.5 h-6 bg-slate-300"></div>
           <div className="bg-white border-2 border-[#0b3d2b] p-3 flex items-center justify-center shadow-[4px_4px_0px_#0b3d2b] w-32"><Cpu className="w-5 h-5 text-[#0b3d2b] mr-2"/> <span className="text-xs font-bold text-[#0b3d2b] font-sans">Filter AI</span></div>
           <div className="w-0.5 h-6 bg-slate-300"></div>
           <div className="bg-white border-2 border-slate-300 p-3 flex items-center justify-center shadow-sm w-32"><Database className="w-5 h-5 text-slate-500 mr-2"/> <span className="text-xs font-bold text-slate-700 font-sans">Sheets</span></div>
        </div>
      )
    },
    {
      title: "Local LLMs",
      desc: "Run completely offline, private AI models.",
      icon: <Database className="w-5 h-5" />,
      color: "blue",
      visual: (
        <div className="flex flex-col h-full bg-[#07130d] border border-slate-800 shadow-inner p-4 font-mono">
          <div className="text-emerald-500 text-[10px] mb-2">root@local-ai:~$ ./start-model</div>
          <div className="text-slate-400 text-[10px]">[INFO] Loading weights into memory...</div>
          <div className="text-slate-400 text-[10px]">[INFO] Model initialized. Ready.</div>
          <div className="text-emerald-500 text-[10px] mt-4">root@local-ai:~$ query "summarize"</div>
          <div className="text-amber-400 text-[10px] mt-1">Processing locally... [100%]</div>
          <div className="text-white text-[10px] mt-2 border-l-2 border-slate-600 pl-2 leading-relaxed">Data summarized. Zero network calls made. Privacy maintained.</div>
        </div>
      )
    }
  ];

  return (
    <section className="py-16 border-t border-slate-200/60 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center space-x-1.5 text-[10px] font-mono font-black uppercase tracking-widest text-[#0b3d2b] bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 leading-none">
            <Terminal className="w-3.5 h-3.5 text-emerald-700" />
            <span>Interactive Showcase</span>
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold mt-4 text-[#07130d] tracking-tight">
            What You Will Build
          </h2>
          <p className="text-slate-500 mt-2 text-sm max-w-xl mx-auto font-medium">
            During the workshop, we won't just talk theory. You will practically construct these 4 tools from scratch.
          </p>
        </div>

        <div className="bg-white border-2 border-[#0b3d2b] shadow-[8px_8px_0px_#0b3d2b] p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: Project List */}
          <div className="lg:col-span-5 flex flex-col space-y-3">
            {projects.map((proj, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveProject(idx)}
                className={`p-4 text-left border-2 flex items-center justify-between group transition-all duration-200 cursor-pointer ${
                  activeProject === idx 
                  ? 'border-[#0b3d2b] bg-slate-50 shadow-[4px_4px_0px_#0b3d2b] translate-y-[-2px]' 
                  : 'border-slate-100 hover:border-[#0b3d2b]/30 bg-white'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 flex items-center justify-center border transition-colors ${
                    activeProject === idx ? 'bg-[#0b3d2b] text-white border-[#0b3d2b]' : 'bg-slate-50 text-slate-500 border-slate-200 group-hover:text-[#0b3d2b]'
                  }`}>
                    {proj.icon}
                  </div>
                  <div>
                    <h4 className={`font-mono text-xs sm:text-sm font-black uppercase tracking-wide ${activeProject === idx ? 'text-[#07130d]' : 'text-slate-600'}`}>{proj.title}</h4>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5 font-sans">{proj.desc}</p>
                  </div>
                </div>
                {activeProject === idx && <ArrowRight className="w-4 h-4 text-[#0b3d2b]" />}
              </button>
            ))}
          </div>

          {/* Right: Visual Display */}
          <div className="lg:col-span-7 bg-slate-100 border-2 border-slate-200 p-4 relative overflow-hidden min-h-[300px] flex items-center justify-center">
            <div className="absolute top-0 right-0 bg-white border-b-2 border-l-2 border-slate-200 px-3 py-1 font-mono text-[9px] font-bold text-slate-400 uppercase z-10">
              Live Preview
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full max-w-md mx-auto aspect-video"
              >
                {projects[activeProject].visual}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function BeforeAfterSection() {
  return (
    <section className="py-16 border-t border-slate-200/60 bg-stone-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#07130d] tracking-tight">
            The AI Transformation
          </h2>
          <p className="text-slate-500 mt-2 text-sm max-w-xl mx-auto font-medium">
            See exactly how learning these tools shifts your daily capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-2 border-[#0b3d2b] shadow-[8px_8px_0px_#0b3d2b] bg-white">
          
          {/* Before Column */}
          <div className="p-8 border-b md:border-b-0 md:border-r border-slate-200 relative overflow-hidden bg-rose-50/30">
            <div className="absolute top-0 left-0 w-full h-1 bg-rose-500/20"></div>
            <div className="flex items-center space-x-2 mb-8">
              <div className="w-8 h-8 rounded-none bg-rose-100 text-rose-600 flex items-center justify-center border border-rose-200">
                <X className="w-4 h-4 font-bold" />
              </div>
              <h3 className="font-mono text-sm font-black text-rose-900 uppercase tracking-widest">Before (Without AI)</h3>
            </div>
            
            <ul className="space-y-6">
              <li className="flex items-start space-x-3">
                <div className="mt-1 text-rose-500 shrink-0 text-sm">❌</div>
                <div>
                  <span className="block text-sm font-bold text-slate-800">Fear of Coding</span>
                  <span className="text-xs text-slate-500 leading-relaxed block mt-0.5">Feeling intimidated by technical terms and complex programming languages.</span>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="mt-1 text-rose-500 shrink-0 text-sm">❌</div>
                <div>
                  <span className="block text-sm font-bold text-slate-800">Manual Copywriting</span>
                  <span className="text-xs text-slate-500 leading-relaxed block mt-0.5">Spending hours drafting emails, posts, or content from scratch.</span>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="mt-1 text-rose-500 shrink-0 text-sm">❌</div>
                <div>
                  <span className="block text-sm font-bold text-slate-800">Prompt Confusion</span>
                  <span className="text-xs text-slate-500 leading-relaxed block mt-0.5">Getting generic or useless answers because of poor prompt structuring.</span>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="mt-1 text-rose-500 shrink-0 text-sm">❌</div>
                <div>
                  <span className="block text-sm font-bold text-slate-800">Lagging Behind</span>
                  <span className="text-xs text-slate-500 leading-relaxed block mt-0.5">Watching competitors and peers automate tasks while you do them manually.</span>
                </div>
              </li>
            </ul>
          </div>

          {/* After Column */}
          <div className="p-8 relative overflow-hidden bg-emerald-50/30">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#0b3d2b]"></div>
            <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="flex items-center space-x-2 mb-8">
              <div className="w-8 h-8 rounded-none bg-[#0b3d2b] text-white flex items-center justify-center shadow-[2px_2px_0px_#07130d]">
                <Check className="w-4 h-4 font-bold" />
              </div>
              <h3 className="font-mono text-sm font-black text-[#0b3d2b] uppercase tracking-widest">After (With Vasudev AI)</h3>
            </div>
            
            <ul className="space-y-6">
              <li className="flex items-start space-x-3">
                <div className="mt-1 text-emerald-600 shrink-0 text-sm">✅</div>
                <div>
                  <span className="block text-sm font-bold text-[#07130d]">Build Without Code</span>
                  <span className="text-xs text-slate-600 leading-relaxed block mt-0.5">Create fully functional web apps and tools using simple English commands.</span>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="mt-1 text-emerald-600 shrink-0 text-sm">✅</div>
                <div>
                  <span className="block text-sm font-bold text-[#07130d]">Master AI Scripts</span>
                  <span className="text-xs text-slate-600 leading-relaxed block mt-0.5">Write advanced, structured prompts that yield professional, high-quality output instantly.</span>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="mt-1 text-emerald-600 shrink-0 text-sm">✅</div>
                <div>
                  <span className="block text-sm font-bold text-[#07130d]">Run Local Offline Models</span>
                  <span className="text-xs text-slate-600 leading-relaxed block mt-0.5">Deploy private AI models on your own machine with zero data sharing.</span>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="mt-1 text-emerald-600 shrink-0 text-sm">✅</div>
                <div>
                  <span className="block text-sm font-bold text-[#07130d]">Future-Proof Career</span>
                  <span className="text-xs text-slate-600 leading-relaxed block mt-0.5">Become the most efficient person in the room by automating your workflow.</span>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}

function AudienceSection() {
  return (
    <section className="py-16 border-t border-slate-200/60 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center space-x-1.5 text-[10px] font-mono font-black uppercase tracking-widest text-[#0b3d2b] bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 leading-none">
            <Users className="w-3.5 h-3.5 text-emerald-700" />
            <span>Target Audience</span>
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold mt-4 text-[#07130d] tracking-tight">
            Is This Workshop For You?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white border border-[#0b3d2b]/15 p-6 hover:border-[#0b3d2b] transition-all duration-300 relative group">
            <div className="absolute top-0 left-0 w-full h-1 bg-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            <div className="w-12 h-12 bg-slate-50 border border-slate-200 text-[#0b3d2b] flex items-center justify-center mb-5">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-mono text-sm font-black text-[#07130d] uppercase tracking-wide mb-3">Students & Learners</h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-start"><span className="text-emerald-500 mr-2 shrink-0 text-sm">✦</span> <span>Ace your assignments faster with AI structuring.</span></li>
              <li className="flex items-start"><span className="text-emerald-500 mr-2 shrink-0 text-sm">✦</span> <span>Build a stellar college portfolio using real AI projects.</span></li>
              <li className="flex items-start"><span className="text-emerald-500 mr-2 shrink-0 text-sm">✦</span> <span>Learn skills that secure high-paying future jobs.</span></li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-[#0b3d2b]/15 p-6 hover:border-[#0b3d2b] transition-all duration-300 relative group">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#0b3d2b] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            <div className="w-12 h-12 bg-slate-50 border border-slate-200 text-[#0b3d2b] flex items-center justify-center mb-5">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-mono text-sm font-black text-[#07130d] uppercase tracking-wide mb-3">Creators & Freelancers</h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-start"><span className="text-emerald-500 mr-2 shrink-0 text-sm">✦</span> <span>Generate endless content ideas and viral hooks.</span></li>
              <li className="flex items-start"><span className="text-emerald-500 mr-2 shrink-0 text-sm">✦</span> <span>Automate client outreach and email follow-ups.</span></li>
              <li className="flex items-start"><span className="text-emerald-500 mr-2 shrink-0 text-sm">✦</span> <span>Deliver higher quality work in half the time.</span></li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-[#0b3d2b]/15 p-6 hover:border-[#0b3d2b] transition-all duration-300 relative group">
            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            <div className="w-12 h-12 bg-slate-50 border border-slate-200 text-[#0b3d2b] flex items-center justify-center mb-5">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="font-mono text-sm font-black text-[#07130d] uppercase tracking-wide mb-3">Working Professionals</h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-start"><span className="text-emerald-500 mr-2 shrink-0 text-sm">✦</span> <span>Automate repetitive spreadsheet and data tasks.</span></li>
              <li className="flex items-start"><span className="text-emerald-500 mr-2 shrink-0 text-sm">✦</span> <span>Draft professional reports and presentations instantly.</span></li>
              <li className="flex items-start"><span className="text-emerald-500 mr-2 shrink-0 text-sm">✦</span> <span>Stand out as the tech-savvy leader in your office.</span></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function BonusesSection() {
  return (
    <section className="py-16 border-t border-slate-200/60 bg-[#fafbf9]">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
          <div>
            <span className="inline-flex items-center space-x-1.5 text-[10px] font-mono font-black uppercase tracking-widest text-amber-700 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 leading-none">
              <Gift className="w-3.5 h-3.5 text-amber-600" />
              <span>Free with Registration</span>
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold mt-3 text-[#07130d] tracking-tight">
              Exclusive Registration Bonuses
            </h2>
          </div>
          <div className="bg-white border-2 border-slate-200 px-4 py-2 text-xs font-mono font-bold text-slate-500 shadow-sm">
            Total Value: <span className="line-through mx-1">₹4,500</span> <span className="text-emerald-600 font-black">FREE</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Bonus 1 */}
          <div className="bg-white border border-[#0b3d2b] p-5 shadow-[4px_4px_0px_#0b3d2b] flex flex-col items-center text-center">
            <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center mb-4 border border-amber-100">
              <FileText className="w-5 h-5 text-amber-600" />
            </div>
            <h4 className="font-mono text-xs font-black text-[#07130d] uppercase mb-2">AI Master Cheat Sheet</h4>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">100+ proven copy-paste prompt formulas for daily tasks.</p>
          </div>

          {/* Bonus 2 */}
          <div className="bg-white border border-[#0b3d2b] p-5 shadow-[4px_4px_0px_#0b3d2b] flex flex-col items-center text-center">
            <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center mb-4 border border-emerald-100">
              <Globe className="w-5 h-5 text-emerald-600" />
            </div>
            <h4 className="font-mono text-xs font-black text-[#07130d] uppercase mb-2">Secret Tools Directory</h4>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Curated list of 50+ free AI tools that nobody talks about.</p>
          </div>

          {/* Bonus 3 */}
          <div className="bg-white border border-[#0b3d2b] p-5 shadow-[4px_4px_0px_#0b3d2b] flex flex-col items-center text-center">
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mb-4 border border-blue-100">
              <Zap className="w-5 h-5 text-blue-600" />
            </div>
            <h4 className="font-mono text-xs font-black text-[#07130d] uppercase mb-2">Automation Templates</h4>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Plug-and-play workflows to automate emails and data entry.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

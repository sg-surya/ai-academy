'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-[#07130d]/90 backdrop-blur-xl border-b border-white/10 shadow-lg'
        : 'bg-transparent'
    } px-4 sm:px-8`}>
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
          <a href="#highlights" className="hover:text-[#39ff14] transition-colors">Highlights</a>
          <a href="#stats" className="hover:text-[#39ff14] transition-colors">Stats</a>
          <a href="#feedback" className="hover:text-[#39ff14] transition-colors">Feedback</a>
          <a href="#resources" className="hover:text-[#39ff14] transition-colors">Resources</a>
          <a href="#next-workshop" className="hover:text-[#39ff14] transition-colors">Next Cohort</a>
        </nav>

        <a
          href="#next-workshop"
          className="bg-[#39ff14] text-[#07130d] font-mono text-[10px] tracking-wider uppercase font-black py-2 px-4 hover:brightness-110 transition-all duration-150 border border-[#39ff14]/50"
        >
          Join Waitlist
        </a>
      </div>
    </header>
  );
}

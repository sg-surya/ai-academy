'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Users, Clock, Wrench, Zap, Star, ArrowRight, MessageCircle, BookOpen } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-[#07130d] overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20">
      <div className="absolute inset-0 bg-grid-dark pointer-events-none" />
      <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] bg-[#39ff14]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-200px] left-[-200px] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 bg-[#39ff14]/10 border border-[#39ff14]/20 px-4 py-1.5 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#39ff14]" />
            <span className="font-mono text-[10px] sm:text-[11px] tracking-widest text-[#39ff14] font-black uppercase">
              COHORT #01 SUCCESSFULLY COMPLETED
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.05]">
            Learn AI <br />
            <span className="text-[#39ff14]">From Scratch</span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base mt-5 leading-relaxed max-w-2xl font-semibold">
            A beginner-friendly live workshop that helped absolute beginners understand AI, explore powerful tools, and build practical AI projects — all without coding.
          </p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-5 mt-6 text-sm sm:text-base">
            {[
              { icon: <Users className="w-4 h-4" />, label: "17+ Participants" },
              { icon: <Clock className="w-4 h-4" />, label: "2 Hours Live" },
              { icon: <Wrench className="w-4 h-4" />, label: "5+ AI Tools" },
              { icon: <Zap className="w-4 h-4" />, label: "4 Live Demos" },
              { icon: <Star className="w-4 h-4 fill-[#39ff14] text-[#39ff14]" />, label: "4.4/5 Rating" },
            ].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 text-slate-300 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                {item.icon}
                {item.label}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 sm:gap-4 mt-10">
            <a href="#resources" className="inline-flex items-center gap-2 glass text-white font-mono text-xs font-bold uppercase tracking-wider px-5 py-3 hover:glass-hover transition-all duration-200">
              <BookOpen className="w-4 h-4" />
              View Resources
            </a>
            <a href="#community" className="inline-flex items-center gap-2 glass text-white font-mono text-xs font-bold uppercase tracking-wider px-5 py-3 hover:glass-hover transition-all duration-200">
              <MessageCircle className="w-4 h-4" />
              Join Community
            </a>
            <a href="#next-workshop" className="inline-flex items-center gap-2 bg-[#39ff14] text-[#07130d] font-mono text-xs font-black uppercase tracking-wider px-6 py-3 hover:brightness-110 transition-all duration-200 border border-[#39ff14]/50 shadow-[0_0_30px_rgba(57,255,20,0.15)]">
              Join Next Workshop Waitlist
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="mt-12 border-t border-white/5 pt-6 flex items-center gap-2 text-slate-500 font-mono text-[9px] uppercase tracking-wider font-bold">
            <span className="w-2 h-2 bg-[#39ff14] rounded-full" />
            Workshop completed — 8 real participants · 4.5★ average · Certificates issuing
          </div>
        </motion.div>
      </div>
    </section>
  );
}

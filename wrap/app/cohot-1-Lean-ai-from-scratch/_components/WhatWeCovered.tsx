'use client';

import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Wrench, Code, Compass, Check } from 'lucide-react';

const milestones = [
  {
    icon: <BookOpen className="w-5 h-5" />,
    title: "AI Foundations",
    subtitle: "Part 01",
    outcomes: [
      "Understand what AI, ML & LLMs really mean",
      "Know exactly how ChatGPT works under the hood",
      "Eliminate the fear of technical terminology",
    ],
  },
  {
    icon: <Wrench className="w-5 h-5" />,
    title: "Modern AI Tools",
    subtitle: "Part 02",
    outcomes: [
      "Master prompting in ChatGPT, Claude & Gemini",
      "Explore AI image generation & no-code builders",
      "Navigate the AI ecosystem with confidence",
    ],
  },
  {
    icon: <Code className="w-5 h-5" />,
    title: "Live Builds",
    subtitle: "Part 03",
    outcomes: [
      "Build a live AI chatbot from scratch",
      "Generate a fully customized webpage without code",
      "Run offline AI models on your own machine",
    ],
  },
  {
    icon: <Compass className="w-5 h-5" />,
    title: "Career Roadmap",
    subtitle: "Part 04",
    outcomes: [
      "Discover AI career paths & job opportunities",
      "Get a detailed learning roadmap",
      "Access curated resources to keep growing",
    ],
  },
];

export default function WhatWeCovered() {
  return (
    <section className="py-16 sm:py-20 bg-[#FAF9F6]">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-14">
          <span className="inline-flex items-center space-x-1.5 text-[10px] font-mono font-black uppercase tracking-widest text-[#0b3d2b] bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 leading-none">
            <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
            <span>Curriculum Delivered</span>
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold mt-4 text-[#07130d] tracking-tight">
            What We Covered
          </h2>
          <p className="text-slate-500 mt-2 text-sm max-w-xl mx-auto font-medium">
            From absolute basics to building real AI projects — all in 2 hours.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-[23px] sm:left-1/2 top-0 bottom-0 w-0.5 bg-emerald-200 -translate-x-1/2 hidden sm:block" />

          <div className="space-y-10 sm:space-y-16">
            {milestones.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex flex-col sm:flex-row items-start gap-6 ${
                  i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                <div className="hidden sm:flex sm:w-1/2 justify-end">
                  <div className={`${i % 2 === 0 ? 'text-right pr-10' : 'text-left pl-10'}`}>
                    <span className="font-mono text-[9px] text-[#0b3d2b] font-black uppercase tracking-widest">
                      {item.subtitle}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-black text-[#07130d] mt-1">
                      {item.title}
                    </h3>
                    <ul className="mt-4 space-y-2.5">
                      {item.outcomes.map((o, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 font-medium">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="hidden sm:flex items-center justify-center shrink-0 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-white border-2 border-[#0b3d2b] flex items-center justify-center text-[#0b3d2b] shadow-[0_0_0_4px_#FAF9F6]">
                    {item.icon}
                  </div>
                </div>

                <div className="hidden sm:flex sm:w-1/2" />

                <div className="sm:hidden flex items-start gap-4 w-full">
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-[#0b3d2b] flex items-center justify-center text-[#0b3d2b] shrink-0 shadow-[0_0_0_4px_#FAF9F6] relative z-10">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-mono text-[8px] text-[#0b3d2b] font-black uppercase tracking-widest">
                      {item.subtitle}
                    </span>
                    <h3 className="font-display text-lg font-black text-[#07130d]">
                      {item.title}
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {item.outcomes.map((o, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs text-slate-600 font-medium">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

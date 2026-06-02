'use client';

import React from 'react';
import { motion } from 'motion/react';
import { FileText, Download, BookOpen, ClipboardList, Gift, ArrowRight } from 'lucide-react';

const resources = [
  { icon: <FileText className="w-5 h-5" />, title: "Workshop Slides", desc: "Full deck from the live session", free: true, link: "/AI-Workshop.pdf" },
  { icon: <ClipboardList className="w-5 h-5" />, title: "Prompt Templates", desc: "100+ proven copy-paste formulas", free: true, link: "/cohort-prompt.pdf" },
  { icon: <Gift className="w-5 h-5" />, title: "Cheatsheets", desc: "Quick reference guides for all tools", free: true, link: "#" },
  { icon: <BookOpen className="w-5 h-5" />, title: "Bonus Guide", desc: "Secret AI tools directory", free: false, link: "" },
];

export default function ResourcesHub() {
  return (
    <section id="resources" className="py-16 sm:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center space-x-1.5 text-[10px] font-mono font-black uppercase tracking-widest text-[#0b3d2b] bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 leading-none">
            <Download className="w-3.5 h-3.5 text-emerald-700" />
            <span>Resource Hub</span>
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold mt-4 text-[#07130d] tracking-tight">
            Workshop Resources
          </h2>
          <p className="text-slate-500 mt-2 text-sm max-w-xl mx-auto font-medium">
            Everything from the workshop — free downloads and exclusive materials.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {resources.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`bg-white border-2 p-5 sm:p-6 flex flex-col ${
                r.free
                  ? 'border-[#0b3d2b]/15 shadow-[4px_4px_0px_#0b3d2b]/10'
                  : 'border-amber-200 shadow-[4px_4px_0px_rgba(251,191,36,0.15)] bg-amber-50/30'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 flex items-center justify-center border ${
                  r.free ? 'bg-emerald-50 border-emerald-100 text-[#0b3d2b]' : 'bg-amber-50 border-amber-100 text-amber-700'
                }`}>
                  {r.icon}
                </div>
                {!r.free && (
                  <span className="text-[8px] font-mono font-black text-amber-700 uppercase tracking-widest bg-amber-100 border border-amber-200 px-2 py-0.5">
                    Waitlist Only
                  </span>
                )}
              </div>
              <h3 className="font-mono text-xs font-black text-[#07130d] uppercase tracking-wide mb-1">
                {r.title}
              </h3>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed flex-1">
                {r.desc}
              </p>
              {r.free ? (
                <a
                  href={r.link}
                  target={r.link !== '#' ? '_blank' : undefined}
                  rel={r.link !== '#' ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-1 mt-4 text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wider hover:text-emerald-800 transition-colors"
                >
                  <Download className="w-3 h-3" />
                  Free Download
                </a>
              ) : (
                <a
                  href="#next-workshop"
                  className="inline-flex items-center gap-1 mt-4 text-[10px] font-mono font-bold text-amber-700 uppercase tracking-wider hover:text-amber-800 transition-colors"
                >
                  Join Waitlist to Access
                  <ArrowRight className="w-3 h-3" />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

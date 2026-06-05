'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Image, Monitor, MessageCircle, Globe, Smartphone, Cpu, Trophy, Camera } from 'lucide-react';

const highlights = [
  { icon: <Monitor className="w-6 h-6" />, label: "Welcome Session", desc: "Opening & Introduction" },
  { icon: <MessageCircle className="w-6 h-6" />, label: "ChatGPT Demo", desc: "Live Prompting Session" },
  { icon: <MessageCircle className="w-6 h-6" />, label: "Claude Demo", desc: "Advanced AI Interaction" },
  { icon: <Cpu className="w-6 h-6" />, label: "Gemini Demo", desc: "Google AI in Action" },
  { icon: <Globe className="w-6 h-6" />, label: "Website Build", desc: "No-Code Site Creation" },
  { icon: <Smartphone className="w-6 h-6" />, label: "LM Studio Demo", desc: "Offline AI Models" },
  { icon: <Trophy className="w-6 h-6" />, label: "Leaderboard", desc: "Top Performers" },
  { icon: <Camera className="w-6 h-6" />, label: "Workshop Moments", desc: "Session Screenshots" },
];

export default function WorkshopHighlights() {
  return (
    <section id="highlights" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center space-x-1.5 text-[10px] font-mono font-black uppercase tracking-widest text-[#0b3d2b] bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 leading-none">
            <Camera className="w-3.5 h-3.5 text-emerald-700" />
            <span>Workshop Gallery</span>
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold mt-4 text-[#07130d] tracking-tight">
            Workshop Highlights
          </h2>
          <p className="text-slate-500 mt-2 text-sm max-w-xl mx-auto font-medium">
            Moments from the live session where beginners became AI builders.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {highlights.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative bg-slate-100 border-2 border-slate-200 aspect-[4/3] flex flex-col items-center justify-center overflow-hidden hover:border-[#0b3d2b] transition-all duration-300"
            >
              <div className="relative z-10 flex flex-col items-center text-center p-4">
                <div className="w-12 h-12 bg-white border border-slate-200 flex items-center justify-center text-[#0b3d2b] mb-3 group-hover:bg-[#0b3d2b] group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <span className="font-mono text-[10px] font-black text-slate-700 uppercase tracking-wider group-hover:text-[#0b3d2b] transition-colors">
                  {item.label}
                </span>
                <span className="text-[9px] text-slate-400 font-medium mt-0.5">
                  {item.desc}
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-200/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-2 right-2 bg-white/80 text-[8px] font-mono font-bold text-slate-400 uppercase px-2 py-0.5 border border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity">
                Photo Soon
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Trophy, Medal, Crown } from 'lucide-react';

const performers = [
  { rank: 1, name: "Dattu", title: "AI Master", icon: <Crown className="w-5 h-5 text-amber-500" />, color: "amber" },
  { rank: 2, name: "Naman Anand", title: "AI Expert", icon: <Medal className="w-5 h-5 text-slate-400" />, color: "slate" },
  { rank: 3, name: "Aman", title: "AI Explorer", icon: <Medal className="w-5 h-5 text-amber-700" />, color: "amber" },
];

export default function TopPerformers() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center space-x-1.5 text-[10px] font-mono font-black uppercase tracking-widest text-[#0b3d2b] bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 leading-none">
            <Trophy className="w-3.5 h-3.5 text-emerald-700" />
            <span>Top Performers</span>
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold mt-4 text-[#07130d] tracking-tight">
            Leaderboard
          </h2>
          <p className="text-slate-500 mt-2 text-sm max-w-xl mx-auto font-medium">
            Participants who stood out during the workshop.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {performers.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`bg-white border-2 p-6 text-center shadow-[4px_4px_0px_#0b3d2b]/10 ${
                i === 0
                  ? 'border-amber-400 shadow-[6px_6px_0px_rgba(251,191,36,0.3)] scale-105 sm:scale-110 relative z-10'
                  : 'border-[#0b3d2b]/15'
              }`}
            >
              {i === 0 && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-[#07130d] font-mono text-[8px] font-black uppercase tracking-widest px-3 py-1">
                  Top Performer
                </div>
              )}
              <div className="flex justify-center mb-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                  i === 0 ? 'bg-amber-50 border-amber-400' : 'bg-slate-50 border-slate-200'
                }`}>
                  <span className="font-display text-2xl font-black text-[#0b3d2b]">
                    {p.rank === 1 ? '🥇' : p.rank === 2 ? '🥈' : '🥉'}
                  </span>
                </div>
              </div>
              <h3 className="font-display text-xl font-black text-[#07130d]">
                {p.name}
              </h3>
              <span className="inline-block mt-1 font-mono text-[10px] font-bold text-[#0b3d2b] uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5">
                {p.title}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="bg-slate-50 border-2 border-slate-200 p-4 sm:p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 bg-[#0b3d2b] text-white font-mono text-[8px] px-3 py-1 uppercase tracking-wider font-bold">
            Activity Leaderboard
          </div>
          <div className="relative w-full aspect-[16/7] max-w-2xl mx-auto">
            <Image
              src="/activity_leaderboard.png"
              alt="Workshop Leaderboard"
              fill
              className="object-contain"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

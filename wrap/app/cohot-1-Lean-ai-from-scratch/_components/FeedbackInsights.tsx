'use client';

import React from 'react';
import { motion } from 'motion/react';
import { BarChart3, Heart, Lightbulb, TrendingUp } from 'lucide-react';

const lovedTopics = [
  { rank: 1, topic: "What is AI & How it works", votes: 3, percentage: 100 },
  { rank: 2, topic: "ChatGPT / Claude / Gemini Demo", votes: 2, percentage: 66 },
  { rank: 3, topic: "Prompt Engineering", votes: 1, percentage: 33 },
  { rank: 4, topic: "No-Code Website Building", votes: 1, percentage: 33 },
];

const requestedTopics = [
  "Vibe Coding",
  "Real AI Projects",
  "Marketing With AI",
  "End-to-End Development Using LLMs",
];

export default function FeedbackInsights() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center space-x-1.5 text-[10px] font-mono font-black uppercase tracking-widest text-[#0b3d2b] bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 leading-none">
            <BarChart3 className="w-3.5 h-3.5 text-emerald-700" />
            <span>Feedback Analytics</span>
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold mt-4 text-[#07130d] tracking-tight">
            Insights From Participants
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="bg-white border-2 border-[#0b3d2b]/15 p-6 sm:p-8 shadow-[4px_4px_0px_#0b3d2b]/10"
          >
            <div className="flex items-center gap-2 mb-6">
              <Heart className="w-5 h-5 text-rose-500" />
              <h3 className="font-display text-lg font-black text-[#07130d]">
                Most Loved Topics
              </h3>
            </div>
            <div className="space-y-4">
              {lovedTopics.map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-black text-slate-400">
                        #{item.rank}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-[#07130d]">
                        {item.topic}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      {item.votes} vote{item.votes > 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 border border-slate-200 overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 transition-all duration-700"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="bg-white border-2 border-[#0b3d2b]/15 p-6 sm:p-8 shadow-[4px_4px_0px_#0b3d2b]/10"
          >
            <div className="flex items-center gap-2 mb-6">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              <h3 className="font-display text-lg font-black text-[#07130d]">
                Most Requested for Cohort #02
              </h3>
            </div>
            <div className="space-y-3">
              {requestedTopics.map((topic, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-slate-50 border border-slate-100 p-4 group hover:border-[#0b3d2b]/20 transition-colors"
                >
                  <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-[#07130d]">
                    {topic}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-amber-500/5 border border-amber-500/15 p-4">
              <p className="text-[10px] font-mono font-bold text-amber-800 uppercase tracking-wider text-center">
                Cohort #02 will feature these requeste topics
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

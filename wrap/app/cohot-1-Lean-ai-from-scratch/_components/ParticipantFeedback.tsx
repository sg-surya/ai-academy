'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote, MessageCircle } from 'lucide-react';

const testimonials = [
  {
    name: "Naman Anand",
    rating: 5,
    background: "Complete beginner",
    favorite: "Prompt Engineering",
    quote: "The workshop was incredible. I came in knowing nothing about AI and left understanding how to craft powerful prompts that actually work. The Prompt Engineering session was a game-changer for me.",
    recommend: 5,
  },
  {
    name: "Anish Raj",
    rating: 5,
    background: "Heard about AI but never used it",
    favorite: "ChatGPT / Claude / Gemini Demo",
    quote: "I had heard about ChatGPT but never actually tried it. Seeing all three tools — ChatGPT, Claude, and Gemini — demonstrated live was eye-opening. Now I'm excited to explore Claude on my own.",
    recommend: 5,
  },
  {
    name: "Jayita Mondal",
    rating: 5,
    background: "Used ChatGPT a few times",
    favorite: "What is AI & How it works",
    quote: "I've used ChatGPT casually but never understood what was happening behind the scenes. The way the fundamentals were explained made everything click. Now I finally get how AI actually works.",
    recommend: 4,
  },
  {
    name: "Dattu",
    rating: 4,
    background: "Used ChatGPT a few times",
    favorite: "No-Code Website Building",
    quote: "Building a website without writing a single line of code was the highlight for me. I never thought I could create something like that. Definitely going to explore Bolt and Lovable more.",
    recommend: 4,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < rating ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'
          }`}
        />
      ))}
    </div>
  );
}

export default function ParticipantFeedback() {
  return (
    <section id="feedback" className="py-16 sm:py-20 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center space-x-1.5 text-[10px] font-mono font-black uppercase tracking-widest text-[#0b3d2b] bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 leading-none">
            <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
            <span>Real Feedback</span>
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold mt-4 text-[#07130d] tracking-tight">
            What Participants Said
          </h2>
          <p className="text-slate-500 mt-2 text-sm max-w-xl mx-auto font-medium">
            Honest feedback from real workshop attendees.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white border-2 border-[#0b3d2b]/15 p-6 sm:p-7 shadow-[4px_4px_0px_#0b3d2b]/10 relative"
            >
              <Quote className="absolute top-4 right-4 w-6 h-6 text-emerald-100" />
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#0b3d2b] flex items-center justify-center text-white font-display font-black text-sm shrink-0">
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-display text-base font-black text-[#07130d] leading-tight">
                    {t.name}
                  </h4>
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                    {t.background}
                  </span>
                </div>
              </div>
              <div className="mb-3 flex items-center gap-3">
                <StarRating rating={t.rating} />
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                  {t.rating}/5
                </span>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[9px] font-mono font-bold text-emerald-700 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/20">
                  Loved: {t.favorite}
                </span>
                <span className="text-[9px] font-mono text-slate-400">
                  Would recommend: {t.recommend}/5
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

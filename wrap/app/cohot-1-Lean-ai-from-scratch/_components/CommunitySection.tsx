'use client';

import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Youtube, Instagram, Users, Megaphone, BookOpen, Network, Zap } from 'lucide-react';

const platforms = [
  {
    icon: <MessageCircle className="w-6 h-6" />,
    name: "WhatsApp Community",
    desc: "Join the active discussion group",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    href: "#",
    cta: "Join Group",
  },
  {
    icon: <Youtube className="w-6 h-6" />,
    name: "YouTube",
    desc: "Workshop recordings & tutorials",
    color: "text-red-500",
    bg: "bg-red-50",
    border: "border-red-200",
    href: "https://youtube.com/@vasudevai",
    cta: "Subscribe",
  },
  {
    icon: <Instagram className="w-6 h-6" />,
    name: "Instagram",
    desc: "Daily AI tips & community posts",
    color: "text-pink-500",
    bg: "bg-pink-50",
    border: "border-pink-200",
    href: "https://instagram.com/vasudevai",
    cta: "Follow",
  },
];

const benefits = [
  { icon: <Megaphone className="w-4 h-4" />, text: "Future Workshop Announcements" },
  { icon: <BookOpen className="w-4 h-4" />, text: "Exclusive Resources & Templates" },
  { icon: <Network className="w-4 h-4" />, text: "Network with Fellow AI Builders" },
  { icon: <Zap className="w-4 h-4" />, text: "Behind-the-Scenes AI Insights" },
];

export default function CommunitySection() {
  return (
    <section id="community" className="py-16 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center space-x-1.5 text-[10px] font-mono font-black uppercase tracking-widest text-[#0b3d2b] bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 leading-none">
            <Users className="w-3.5 h-3.5 text-emerald-700" />
            <span>Community</span>
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold mt-4 text-[#07130d] tracking-tight">
            Join the Vasudev AI Community
          </h2>
          <p className="text-slate-500 mt-2 text-sm max-w-xl mx-auto font-medium">
            Stay connected, keep learning, and grow with fellow AI enthusiasts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {platforms.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`bg-white border-2 ${p.border} p-6 text-center shadow-[4px_4px_0px_#0b3d2b]/10 hover:shadow-[4px_4px_0px_#0b3d2b]/20 transition-all duration-300`}
            >
              <div className={`w-14 h-14 ${p.bg} ${p.border} border flex items-center justify-center mx-auto mb-4 ${p.color}`}>
                {p.icon}
              </div>
              <h3 className="font-display text-lg font-black text-[#07130d]">
                {p.name}
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-1 mb-5">
                {p.desc}
              </p>
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-[#0b3d2b] hover:bg-[#0a3525] text-white font-mono text-[10px] font-black uppercase tracking-wider px-5 py-2.5 border-2 border-[#0b3d2b] shadow-[3px_3px_0px_#07130d] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#07130d] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all duration-150"
              >
                {p.cta} →
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="bg-[#07130d] border border-white/10 p-6 sm:p-8"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center">
            {benefits.map((b, i) => (
              <div key={i} className="flex flex-col items-center gap-2 text-slate-400">
                <div className="text-[#39ff14]">{b.icon}</div>
                <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider">
                  {b.text}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

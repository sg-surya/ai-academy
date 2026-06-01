'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Users, Quote } from 'lucide-react';

const founders = [
  {
    name: "Surya Pratap Singh",
    role: "Founder, Vasudev AI Academy",
    image: "/Speaker.png",
    bio: "Surya Pratap Singh is the Founder of Vasudev AI Academy and the creator of Vasudev AI. Passionate about Artificial Intelligence, automation, and emerging technologies, he focuses on making advanced technology accessible to everyone through practical, beginner-friendly education.",
    quote: "Don't just use AI. Learn how to build with it.",
    expertise: ["Artificial Intelligence", "AI Automation", "AI Assistants", "Web Development", "Product Building", "Tech Education"],
  },
  {
    name: "Aman Dangi",
    role: "Co-Founder & Developer, Vasudev AI",
    image: "/Aman.png",
    bio: "Aman Dangi is a Developer and Co-Founder of Vasudev AI. He specializes in building modern web applications, SaaS platforms, and AI-powered solutions, combining technology with user-centric design to solve real-world challenges.",
    quote: "The future belongs to those who build, experiment, and keep learning.",
    expertise: ["Full-Stack Development", "SaaS Applications", "AI-Powered Solutions", "Product Engineering", "Automation Systems", "Startup Innovation"],
  },
];

export default function FounderSection() {
  return (
    <section id="founders" className="py-16 sm:py-20 bg-[#FAF9F6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center space-x-1.5 text-[10px] font-mono font-black uppercase tracking-widest text-[#0b3d2b] bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 leading-none">
            <Users className="w-3.5 h-3.5 text-emerald-700" />
            <span>Meet the Team</span>
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold mt-4 text-[#07130d] tracking-tight">
            Behind Vasudev AI Academy
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {founders.map((person, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white border-2 border-[#0b3d2b]/15 p-6 sm:p-8 shadow-[4px_4px_0px_#0b3d2b]/10"
            >
              <div className="flex items-center gap-5 mb-5">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 border-2 border-[#0b3d2b]/20 shrink-0 relative grayscale hover:grayscale-0 transition-all duration-500">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-display text-xl font-black text-[#07130d] leading-tight">
                    {person.name}
                  </h3>
                  <span className="text-xs text-emerald-800 font-mono font-extrabold mt-1 block">
                    {person.role}
                  </span>
                </div>
              </div>

              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium mb-4">
                {person.bio}
              </p>

              <div className="mb-4">
                <div className="flex flex-wrap gap-1.5">
                  {person.expertise.map((skill, j) => (
                    <span
                      key={j}
                      className="text-[8px] font-mono font-bold text-slate-500 bg-slate-50 border border-slate-200 px-2 py-0.5 uppercase tracking-wider"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-l-2 border-emerald-500/30 pl-3">
                <Quote className="w-3.5 h-3.5 text-emerald-400 mb-1" />
                <p className="text-slate-400 text-xs italic font-medium leading-relaxed">
                  &ldquo;{person.quote}&rdquo;
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

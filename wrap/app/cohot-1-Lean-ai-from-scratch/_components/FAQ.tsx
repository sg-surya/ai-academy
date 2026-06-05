'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    q: "When is Cohort #02 happening?",
    a: "We're currently planning Cohort #02 — 'Build With AI'. Exact dates will be announced soon. Join the waitlist to get early access, exclusive resources, and a special discount when it launches.",
  },
  {
    q: "Will I get access to the workshop recording and resources?",
    a: "Yes! Workshop slides, prompt templates, and cheatsheets are available for free in the Resources section. The full session recording and bonus materials are exclusive to waitlist members.",
  },
  {
    q: "How do I verify my certificate?",
    a: "Each certificate has a unique ID (e.g., VAI26-C01-001). Visit our /verify page, enter your certificate ID, and you'll see the verified details instantly.",
  },
  {
    q: "Is the Vasudev AI community active?",
    a: "Absolutely! Join our WhatsApp group for daily AI discussions, resource sharing, networking, and early access to future workshops and events.",
  },
];

export default function FAQ() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <section id="faq" className="py-16 sm:py-20 bg-[#FAF9F6]">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center space-x-1.5 text-[10px] font-mono font-black uppercase tracking-widest text-[#0b3d2b] bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 leading-none">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
            <span>FAQ</span>
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold mt-4 text-[#07130d] tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="space-y-3"
        >
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white border border-[#0b3d2b]/15 overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between font-mono text-xs font-bold text-[#07130d] hover:bg-slate-50 transition duration-150 cursor-pointer"
              >
                <span className="pr-4">{faq.q}</span>
                {activeFaq === i ? (
                  <ChevronUp className="w-4 h-4 text-[#0b3d2b] shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>
              {activeFaq === i && (
                <div className="border-t border-slate-100 bg-[#fafbf9]">
                  <p className="p-4 sm:p-5 text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

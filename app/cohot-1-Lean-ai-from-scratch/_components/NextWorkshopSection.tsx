'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Bell, CheckCircle, Loader } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

export default function NextWorkshopSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setLoading(true);
    setError(null);
    try {
      await addDoc(collection(db, 'waitlist'), {
        name: name.trim(),
        email: email.trim(),
        cohort: 'Cohort #02 - Build With AI',
        timestamp: new Date().toLocaleString('en-IN'),
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Waitlist error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="next-workshop" className="relative py-20 sm:py-28 bg-[#07130d] overflow-hidden">
      <div className="absolute inset-0 bg-grid-dark pointer-events-none" />
      <div className="absolute top-[-150px] right-[-150px] w-[500px] h-[500px] bg-[#39ff14]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-150px] left-[-150px] w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-[#39ff14]/10 border border-[#39ff14]/20 px-4 py-1.5 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#39ff14]" />
            <span className="font-mono text-[10px] sm:text-[11px] tracking-widest text-[#39ff14] font-black uppercase">
              Coming Soon
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05]">
            BUILD <span className="text-[#39ff14]">WITH AI</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-4 max-w-2xl mx-auto font-semibold">
            Create Websites, Chatbots &amp; AI Apps — Live &amp; Interactive
          </p>
          <p className="text-slate-500 text-sm mt-2 max-w-xl mx-auto font-medium">
            Cohort #02 is in the works. Join the waitlist to get early access, exclusive resources, and a special discount.
          </p>

          <div className="mt-8 flex items-center justify-center gap-2 text-slate-500 font-mono text-[10px] uppercase tracking-wider font-bold">
            <span className="w-2 h-2 bg-[#39ff14] rounded-full animate-ping" />
            Join 17+ alumni from Cohort #01
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto">
              {error && (
                <div className="mb-4 bg-red-500/10 border border-red-500/20 p-3">
                  <p className="text-red-400 text-xs font-medium">{error}</p>
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  required
                  className="flex-1 bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-slate-500 font-semibold focus:outline-none focus:border-[#39ff14]/50 transition-all duration-200"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  required
                  className="flex-1 bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-slate-500 font-semibold focus:outline-none focus:border-[#39ff14]/50 transition-all duration-200"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 bg-[#39ff14] text-[#07130d] font-mono text-xs font-black uppercase tracking-wider px-6 py-3 hover:brightness-110 disabled:brightness-50 disabled:cursor-not-allowed transition-all duration-200 border border-[#39ff14]/50 shadow-[0_0_30px_rgba(57,255,20,0.15)] shrink-0"
                >
                  {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Bell className="w-4 h-4" />}
                  {loading ? 'Saving...' : 'Join Waitlist'}
                </button>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 bg-[#39ff14]/10 border border-[#39ff14]/20 p-6 max-w-md mx-auto"
            >
              <CheckCircle className="w-8 h-8 text-[#39ff14] mx-auto mb-3" />
              <p className="text-[#39ff14] font-display text-lg font-black">
                You&apos;re on the list!
              </p>
              <p className="text-slate-400 text-sm mt-1 font-medium">
                We&apos;ll notify you when Cohort #02 opens.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

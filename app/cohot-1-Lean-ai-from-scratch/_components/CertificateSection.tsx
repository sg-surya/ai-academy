'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Award, ShieldCheck, ArrowRight, Linkedin, FileCheck } from 'lucide-react';

export default function CertificateSection() {
  return (
    <section id="certificate" className="py-16 sm:py-20 bg-[#FAF9F6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center space-x-1.5 text-[10px] font-mono font-black uppercase tracking-widest text-[#0b3d2b] bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 leading-none">
            <Award className="w-3.5 h-3.5 text-emerald-700" />
            <span>Certificate Verification</span>
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold mt-4 text-[#07130d] tracking-tight">
            Verifiable Certificates of Completion
          </h2>
          <p className="text-slate-500 mt-2 text-sm max-w-xl mx-auto font-medium">
            Every participant receives a uniquely ID&#39;d certificate issued by Vasudev AI Academy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6"
          >
            <div className="bg-white border-2 border-[#0b3d2b]/15 p-4 sm:p-6 shadow-[6px_6px_0px_#0b3d2b]/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#0b3d2b] text-white font-mono text-[8px] px-3 py-1 uppercase tracking-wider font-bold z-10">
                Sample: VAI26-C01-001
              </div>
              <Image
                src="/certificate.png"
                alt="Vasudev AI Certificate"
                width={550}
                height={380}
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-emerald-50 border border-emerald-100 text-[#0b3d2b] flex items-center justify-center shrink-0 mt-0.5">
                  <FileCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-mono text-[11px] font-black text-[#07130d] uppercase tracking-wider">
                    Unique Credential ID
                  </h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Each certificate is stamped with a verifiable unique ID (e.g., VAI26-C01-001).
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-emerald-50 border border-emerald-100 text-[#0b3d2b] flex items-center justify-center shrink-0 mt-0.5">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-mono text-[11px] font-black text-[#07130d] uppercase tracking-wider">
                    One-Click LinkedIn Share
                  </h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Add your accomplishment to your professional profile instantly.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-emerald-50 border border-emerald-100 text-[#0b3d2b] flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-mono text-[11px] font-black text-[#07130d] uppercase tracking-wider">
                    Instant Verification
                  </h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Anyone can verify authenticity using the unique certificate ID.
                  </p>
                </div>
              </div>
            </div>

            <a
              href="/verify"
              className="inline-flex items-center gap-2 bg-[#0b3d2b] hover:bg-[#0a3525] text-white font-mono text-xs font-black uppercase tracking-wider px-6 py-3.5 border-2 border-[#0b3d2b] shadow-[4px_4px_0px_#07130d] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_#07130d] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all duration-150"
            >
              Verify Your Certificate
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

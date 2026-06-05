'use client';

import React from 'react';
import { ExternalLink, Award } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#07130d] border-t border-white/5 py-12 px-4 sm:px-8 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <span className="inline-flex items-center gap-1 bg-[#39ff14]/10 text-[#39ff14] border border-[#39ff14]/20 px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-wider">
              <Award className="w-2.5 h-2.5" />
              Cohort #01 Completed
            </span>
          </div>
          <span className="block font-bold text-slate-400 text-xs">
            &copy; 2026 Vasudev AI Academy. All Rights Reserved.
          </span>
          <p className="text-[10px] text-slate-600 font-mono">
            Empowering early learners, students, and young pioneers globally.
          </p>
        </div>

        <div className="flex items-center space-x-5 font-mono text-[10px] font-bold">
          <a
            href="https://youtube.com/@vasudevai"
            target="_blank"
            rel="noreferrer"
            className="hover:text-red-500 transition-colors flex items-center space-x-1"
          >
            <span>YouTube</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://instagram.com/vasudevai"
            target="_blank"
            rel="noreferrer"
            className="hover:text-pink-500 transition-colors flex items-center space-x-1"
          >
            <span>Instagram</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://www.linkedin.com/company/vasudev-ai/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-500 transition-colors flex items-center space-x-1"
          >
            <span>LinkedIn</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <Link
            href="/verify"
            className="hover:text-[#39ff14] transition-colors flex items-center space-x-1"
          >
            <span>Verify Certificate</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}

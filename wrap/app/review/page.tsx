import Link from 'next/link';
import { ArrowLeft, Heart } from 'lucide-react';

export default function ReviewPage() {
  return (
    <div className="min-h-screen bg-[#fcfdfd] flex flex-col">
      <div className="border-b border-slate-200/60 bg-white">
        <div className="px-4 sm:px-8 lg:px-16 py-4 flex items-center justify-between">
          <Link href="/cohot-1-Lean-ai-from-scratch" className="flex items-center space-x-2 text-slate-500 hover:text-[#0b3d2b] transition-colors text-xs font-mono font-bold group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back</span>
          </Link>
          <span className="text-[9px] font-mono font-extrabold text-slate-400 uppercase tracking-wider">
            Vasudev AI Academy
          </span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-6">
            <span className="inline-flex items-center space-x-1.5 text-[10px] font-mono font-black uppercase tracking-widest text-[#0b3d2b] bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 leading-none mb-4">
              <Heart className="w-3.5 h-3.5 text-emerald-700" />
              <span>Share Your Experience</span>
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#07130d] tracking-tight mt-4">
              Workshop Review
            </h1>
            <p className="text-slate-500 text-sm mt-3 max-w-lg mx-auto leading-relaxed">
              We&apos;d love to hear about your experience. Fill out the form below to share your feedback.
            </p>
          </div>

          <div className="bg-white border-2 border-[#0b3d2b]/20 shadow-[6px_6px_0px_#0b3d2b]/10 overflow-hidden">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSdjrJ5wG9J7X_ZIL0kbXiI2aPsYiX6B7rxZPqBdY2njWz_HXA/viewform?embedded=true"
              className="w-full min-h-[700px] sm:min-h-[800px]"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
            >
              Loading…
            </iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';
import { ArrowRight, Award, Calendar, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white border-2 border-[#0b3d2b] shadow-[8px_8px_0px_#0b3d2b] p-6 sm:p-8">
        <div className="text-center mb-6">
          <span className="inline-flex items-center space-x-1.5 text-[9px] font-mono font-black uppercase tracking-widest text-[#0b3d2b] bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 leading-none">
            <Award className="w-3 h-3 text-emerald-700" />
            <span>Workshops</span>
          </span>
        </div>

        <Link
          href="/cohot-1-Lean-ai-from-scratch"
          className="group block bg-white border-2 border-[#0b3d2b]/20 hover:border-[#0b3d2b] p-5 transition-all duration-200 shadow-[4px_4px_0px_#0b3d2b]/10 hover:shadow-[6px_6px_0px_#0b3d2b] hover:-translate-y-0.5"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <span className="text-[10px] font-mono font-black text-amber-700 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 uppercase tracking-wider">
                Cohort #01
              </span>
              <h2 className="font-display text-lg font-black text-[#07130d] mt-2 leading-tight">
                Learn AI From Scratch
              </h2>
            </div>
            <div className="w-10 h-10 bg-[#0b3d2b] flex items-center justify-center shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
          </div>

          <p className="text-xs text-slate-500 font-medium leading-relaxed mb-4">
            A beginner-friendly live workshop — understand AI, explore tools, and build practical projects.
          </p>

          <div className="flex items-center gap-4 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" /> 31 May 2026
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" /> Free
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

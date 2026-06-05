import Link from 'next/link';
import { ArrowRight, Calendar, Users, Sparkles, Star, ArrowUpRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        <div className="bg-[#07130d] border border-white/10 p-6 sm:p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-dark opacity-30 pointer-events-none" />
          <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] bg-[#39ff14]/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 bg-[#39ff14]/10 border border-[#39ff14]/20 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-[#39ff14] mb-4">
              <Sparkles className="w-3 h-3" />
              <span>Coming Soon</span>
            </div>
            <h1 className="font-display text-2xl font-black text-white leading-tight">
              Next Workshop
            </h1>
            <p className="text-3xl sm:text-4xl font-display font-black text-[#39ff14] mt-1">
              BUILD WITH AI
            </p>
            <p className="text-slate-400 text-xs mt-3 font-medium">
              Create Websites, Chatbots & AI Apps — Live & Interactive
            </p>
            <Link
              href="/cohot-2-Built-with-ai"
              className="inline-flex items-center gap-2 mt-5 bg-[#39ff14] text-[#07130d] font-mono text-[10px] font-black uppercase tracking-wider px-5 py-3 hover:brightness-110 transition-all border border-[#39ff14]/50"
            >
              Join Waitlist
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
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
              <span className="ml-2 text-[10px] font-mono font-black text-emerald-700 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 uppercase tracking-wider">
                Completed ✓
              </span>
              <h2 className="font-display text-lg font-black text-[#07130d] mt-2 leading-tight">
                Learn AI From Scratch
              </h2>
            </div>
            <div className="w-10 h-10 bg-[#0b3d2b] flex items-center justify-center shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
              <ArrowUpRight className="w-5 h-5 text-white" />
            </div>
          </div>

          <p className="text-xs text-slate-500 font-medium leading-relaxed mb-4">
            A beginner-friendly live workshop — understand AI, explore tools, and build practical projects. 17+ participants, ⭐ 4.5/5 rating.
          </p>

          <div className="flex items-center gap-4 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" /> 31 May 2026
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" /> 17+ Participants
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-500" /> 4.5/5
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

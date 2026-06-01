'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Users, Clock, Wrench, Layout, Star, Gift } from 'lucide-react';

const stats = [
  { icon: <Users className="w-5 h-5" />, value: 17, suffix: "+", label: "Participants" },
  { icon: <Clock className="w-5 h-5" />, value: 2, suffix: "", label: "Hours Live" },
  { icon: <Wrench className="w-5 h-5" />, value: 5, suffix: "+", label: "AI Tools" },
  { icon: <Layout className="w-5 h-5" />, value: 4, suffix: "", label: "Projects Built" },
  { icon: <Star className="w-5 h-5 fill-amber-500 text-amber-500" />, value: 4.5, suffix: "/5", label: "Avg Rating" },
  { icon: <Gift className="w-5 h-5" />, value: 100, suffix: "%", label: "Free Workshop" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 1500;
          const step = Math.ceil(value / (duration / 16));
          const timer = setInterval(() => {
            start += step;
            if (start >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 16);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function WorkshopStats() {
  return (
    <section id="stats" className="py-16 sm:py-20 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center space-x-1.5 text-[10px] font-mono font-black uppercase tracking-widest text-[#0b3d2b] bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 leading-none">
            <Users className="w-3.5 h-3.5 text-emerald-700" />
            <span>Workshop Impact</span>
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold mt-4 text-[#07130d] tracking-tight">
            By the Numbers
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white border-2 border-[#0b3d2b]/15 p-5 sm:p-6 text-center shadow-[4px_4px_0px_#0b3d2b]/10 hover:shadow-[4px_4px_0px_#0b3d2b]/20 transition-all duration-300"
            >
              <div className="w-10 h-10 bg-emerald-50 text-[#0b3d2b] flex items-center justify-center mx-auto mb-3 border border-emerald-100">
                {stat.icon}
              </div>
              <div className="font-display text-2xl sm:text-3xl font-black text-[#07130d] tracking-tight">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[10px] sm:text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import React from 'react';
import { dictionary, Language } from '@/lib/dictionary';
import { ShieldCheck, Rocket, Zap, Globe2, Trophy, Award } from 'lucide-react';

interface TrustBarProps {
  lang: Language;
}

export const TrustBar: React.FC<TrustBarProps> = ({ lang }) => {
  const t = dictionary[lang].trust;

  const logos = [
    { icon: Globe2, label: 'DWG FastView (1.5M+ DAU)' },
    { icon: Trophy, label: 'KingCamp Outdoors (DTC SEO & Ads)' },
    { icon: Rocket, label: 'Yoybuy (Cross-Border E-Commerce)' },
    { icon: Zap, label: 'Clash of Kings (Global Affiliate UA)' },
    { icon: ShieldCheck, label: 'PostPony (US Logistics SaaS)' },
    { icon: Award, label: 'Perfect Optimizer (ClickBank Affiliate Manager)' },
  ];

  return (
    <section className="py-12 border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 relative transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm sm:text-base font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-8">
          {t.heading}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {logos.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center justify-center sm:justify-start space-x-3 px-4 py-3 rounded-xl bg-slate-50/80 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-sm"
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400 shrink-0" />
                <span className="text-sm sm:text-base font-bold tracking-tight">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

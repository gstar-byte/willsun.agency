'use client';

import React from 'react';
import { dictionary, Language } from '@/lib/dictionary';
import { ShieldCheck, Rocket, Zap, Globe2, Trophy } from 'lucide-react';

interface TrustBarProps {
  lang: Language;
}

export const TrustBar: React.FC<TrustBarProps> = ({ lang }) => {
  const t = dictionary[lang].trust;

  const logos = [
    { icon: Rocket, label: 'SaaS Monetization' },
    { icon: Globe2, label: 'Cross-Border E-Commerce' },
    { icon: ShieldCheck, label: 'B2B Industrial Exports' },
    { icon: Trophy, label: 'Niche Engineering Portals' },
    { icon: Zap, label: 'Mobile Utility Apps' },
  ];

  return (
    <section className="py-10 border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-8">
          {t.heading}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {logos.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center space-x-2.5 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-semibold tracking-wide">
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

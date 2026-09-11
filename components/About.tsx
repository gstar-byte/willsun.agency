'use client';

import React from 'react';
import { dictionary, Language } from '@/lib/dictionary';
import { Award, Code2, LineChart, Video, Globe } from 'lucide-react';
import { Logo } from '@/components/Logo';

interface AboutProps {
  lang: Language;
}

export const About: React.FC<AboutProps> = ({ lang }) => {
  const t = dictionary[lang].about;

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Left Column - Founder Profile Card */}
          <div className="lg:col-span-5">
            <div className="bg-glass-card-light dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 relative group overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />

              <div className="mb-6">
                <Logo size={44} />
              </div>

              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-1">Will Sun</h3>
              <p className="text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
                Founder & Lead Commercialization Strategist
              </p>

              <div className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                <div className="flex items-center space-x-2.5">
                  <Award className="w-4.5 h-4.5 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>17+ Yrs Cross-Border Growth & Monetization</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <LineChart className="w-4.5 h-4.5 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>10 Yrs Traffic Growth + 7 Yrs Revenue Monetization</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Video className="w-4.5 h-4.5 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>In-House AI Visual & Video Design Capabilities</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Code2 className="w-4.5 h-4.5 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>Vibe Coding & Next.js Rapid Web/Tool Engineering</span>
                </div>
                <div className="flex items-center space-x-2.5 text-blue-600 dark:text-blue-400 font-bold pt-1 border-t border-slate-100 dark:border-slate-800/80">
                  <Globe className="w-4.5 h-4.5 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>{t.languages}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Text Bio & 17-Year Timeline */}
          <div className="lg:col-span-7">
            <div className="inline-block px-3.5 py-1 rounded-full border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-950/60 text-slate-800 dark:text-blue-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 shadow-sm">
              {t.badge}
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
              {t.title}
            </h2>

            <p className="text-slate-700 dark:text-slate-200 text-base leading-relaxed mb-6 font-normal">
              {t.p1}
            </p>

            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-10 font-normal">
              {t.p2}
            </p>

            {/* 17-Year Milestone Timeline */}
            <div className="mb-10">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
                {t.timelineTitle}
              </h3>

              <div className="space-y-4 border-l-2 border-slate-200 dark:border-slate-800 pl-6 ml-2">
                {t.timeline.map((item, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-blue-600 border-2 border-white dark:border-slate-900" />
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                      {item.phase}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {t.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-sm"
                >
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-1">
                    {item.num}
                  </div>
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    {item.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

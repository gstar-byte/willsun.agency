'use client';

import React from 'react';
import { dictionary, Language } from '@/lib/dictionary';
import { Award, Code2, LineChart, Video } from 'lucide-react';
import { Logo } from '@/components/Logo';

interface AboutProps {
  lang: Language;
}

export const About: React.FC<AboutProps> = ({ lang }) => {
  const t = dictionary[lang].about;

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Left Column - Founder Profile Card */}
          <div className="lg:col-span-5">
            <div className="bg-glass-card-light rounded-3xl p-8 border border-slate-200 relative group overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />

              <div className="mb-6">
                <Logo size={44} />
              </div>

              <h3 className="text-2xl font-black text-slate-900 mb-1">Will Sun</h3>
              <p className="text-blue-600 text-xs font-bold uppercase tracking-wider mb-6">
                Founder & Lead Commercialization Strategist
              </p>

              <div className="space-y-3 pt-6 border-t border-slate-100 text-xs font-semibold text-slate-700">
                <div className="flex items-center space-x-2.5">
                  <Award className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>17+ Yrs Cross-Border Growth & Monetization</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <LineChart className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>10 Yrs Traffic Growth + 7 Yrs Revenue Monetization</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Video className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>In-House AI Visual & Video Design Capabilities</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Code2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Vibe Coding & Next.js Rapid Web/Tool Engineering</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Text Bio & 17-Year Timeline */}
          <div className="lg:col-span-7">
            <div className="inline-block px-3.5 py-1 rounded-full border border-blue-200 bg-blue-50 text-slate-800 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
              {t.badge}
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-6">
              {t.title}
            </h2>

            <p className="text-slate-700 text-base leading-relaxed mb-6 font-normal">
              {t.p1}
            </p>

            <p className="text-slate-600 text-base leading-relaxed mb-10 font-normal">
              {t.p2}
            </p>

            {/* 17-Year Milestone Timeline */}
            <div className="mb-10">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                {t.timelineTitle}
              </h4>

              <div className="space-y-4 border-l-2 border-slate-200 pl-6 ml-2">
                {t.timeline.map((item, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-blue-600 border-2 border-white" />
                    <h5 className="text-xs font-bold text-slate-900 mb-1">
                      {item.phase}
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
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
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center shadow-sm"
                >
                  <div className="text-2xl font-black text-slate-900 mb-1">
                    {item.num}
                  </div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
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

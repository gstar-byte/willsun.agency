'use client';

import React from 'react';
import { dictionary, Language } from '@/lib/dictionary';
import { Compass, Search, Target, Video, Code, ArrowUpRight } from 'lucide-react';

interface ServicesProps {
  lang: Language;
  onOpenContact: () => void;
}

export const Services: React.FC<ServicesProps> = ({ lang, onOpenContact }) => {
  const t = dictionary[lang].services;

  const icons = [Compass, Search, Target, Video, Code];

  return (
    <section id="services" className="py-24 relative bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3.5 py-1 rounded-full border border-blue-200 bg-blue-50 text-slate-800 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            {t.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            {t.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.items.map((service, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div
                key={service.id}
                className="bg-glass-card-light rounded-2xl p-8 border border-slate-200 hover:border-blue-500/50 transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 group-hover:scale-110 group-hover:bg-slate-900 group-hover:text-blue-400 transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black text-slate-300 group-hover:text-blue-600 transition-colors">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {service.desc}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={onOpenContact}
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-900 hover:text-blue-600 transition-colors"
                  >
                    <span>Consult on this capability</span>
                    <ArrowUpRight className="w-4 h-4 text-blue-600" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

'use client';

import React from 'react';
import Link from 'next/link';
import { dictionary, Language } from '@/lib/dictionary';
import { Compass, Target, DollarSign, Code, CheckCircle2, ArrowUpRight, Sparkles } from 'lucide-react';

interface ServicesProps {
  lang: Language;
  onOpenContact: () => void;
  compact?: boolean;
}

export const Services: React.FC<ServicesProps> = ({ lang, onOpenContact, compact = false }) => {
  const t = dictionary[lang].services;

  const icons = [Compass, Target, DollarSign, Code];

  return (
    <section id="services" className="py-16 md:py-24 relative bg-slate-50 dark:bg-slate-900/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Shown only on Home Page digest; full page uses PageClientWrapper header) */}
        {compact && (
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-block px-3.5 py-1 rounded-full border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-950/60 text-slate-800 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
              {t.badge}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              {t.title}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
              {t.subtitle}
            </p>
          </div>
        )}

        {/* 2x2 Full-Lifecycle Solution Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {t.items.map((service, index) => {
            const Icon = icons[index % icons.length];
            const deliverables = (service as { deliverables?: string[] }).deliverables || [];
            return (
              <div
                key={service.id}
                className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 hover:border-blue-500/60 dark:hover:border-blue-500/60 transition-all duration-300 relative group flex flex-col justify-between shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:bg-slate-900 dark:group-hover:bg-blue-600 group-hover:text-blue-400 dark:group-hover:text-white transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {lang === 'en' ? `PILLAR 0${index + 1}` : `核心模块 0${index + 1}`}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-5">
                    {service.desc}
                  </p>

                  {/* Track Record Proof Callout (Shown on Full Services Page) */}
                  {!compact && service.details && (
                    <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/50 text-xs sm:text-sm text-slate-800 dark:text-blue-200 mb-6 flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <span className="font-medium leading-relaxed">{service.details}</span>
                    </div>
                  )}

                  {/* Concrete Deliverables Checklist (Shown on Full Services Page) */}
                  {!compact && deliverables.length > 0 && (
                    <div className="mb-6">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                        {lang === 'en' ? 'Included End-to-End Deliverables:' : '具体落地交付清单：'}
                      </div>
                      <ul className="space-y-3">
                        {deliverables.map((item, dIdx) => {
                          const colonIdx = item.indexOf('：') !== -1 ? item.indexOf('：') : item.indexOf(':');
                          const hasLabel = colonIdx !== -1 && colonIdx < 65;
                          const label = hasLabel ? item.slice(0, colonIdx + 1) : '';
                          const rest = hasLabel ? item.slice(colonIdx + 1) : item;
                          return (
                            <li
                              key={dIdx}
                              className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed"
                            >
                              <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                              <span>
                                {hasLabel && (
                                  <strong className="font-bold text-slate-900 dark:text-white">
                                    {label}
                                  </strong>
                                )}
                                {rest}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="pt-5 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex flex-wrap gap-2 mb-5">
                    {service.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="px-3 py-1 rounded-md text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {compact ? (
                    <Link
                      href="/services"
                      className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <span>
                        {lang === 'en'
                          ? 'View Full Deliverables & Track Record'
                          : '查看完整交付清单与实战战绩'}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </Link>
                  ) : (
                    <button
                      onClick={onOpenContact}
                      className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <span>
                        {lang === 'en'
                          ? 'Discuss this solution for your project'
                          : '咨询该模块的定制落地方案'}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { dictionary, Language } from '@/lib/dictionary';
import { TrendingUp, CheckCircle, ExternalLink, ArrowRight } from 'lucide-react';

interface CasesProps {
  lang: Language;
}

export const Cases: React.FC<CasesProps> = ({ lang }) => {
  const t = dictionary[lang].cases;
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const uniqueCategories = Array.from(new Set(t.items.map((item) => item.category)));
  const categories = ['All', ...uniqueCategories];

  const filteredCases = activeCategory === 'All'
    ? t.items
    : t.items.filter((c) => c.category === activeCategory);

  return (
    <section id="cases" className="py-24 relative bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-3.5 py-1 rounded-full border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-950/60 text-slate-800 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            {t.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            {t.subtitle}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-slate-900 dark:bg-blue-600 text-white shadow-md font-bold'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {cat === 'All' ? (lang === 'en' ? 'All Case Studies' : '全部实战案例') : cat}
            </button>
          ))}
        </div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCases.map((item: any, idx: number) => (
            <div
              key={idx}
              className="bg-glass-card-light dark:bg-slate-900 rounded-2xl p-8 border border-slate-200/90 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 relative group overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-md bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/50">
                    {item.category}
                  </span>
                  <div className="flex items-center space-x-1 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-bold">
                    <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>{lang === 'en' ? 'Verified Track Record' : '真实操盘战绩'}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                  {item.desc}
                </p>

                {item.fullStory && (
                  <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                    {item.fullStory}
                  </p>
                )}
              </div>

              <div>
                {/* Highlight Result Card */}
                <div className="p-4 rounded-xl bg-slate-900 dark:bg-slate-950 border border-slate-800 dark:border-slate-800 text-white mb-6 shadow-md">
                  <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-400 mb-1">
                    {lang === 'en' ? 'Key Growth & Monetization Impact' : '核心增长与变现成果'}
                  </div>
                  <div className="text-base sm:text-lg font-extrabold text-white">
                    {item.result}
                  </div>
                </div>

                {/* Metrics */}
                <div className="flex flex-wrap gap-4 mb-4">
                  {item.metrics.map((m: string, mIdx: number) => (
                    <div
                      key={mIdx}
                      className="flex items-center space-x-1.5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300"
                    >
                      <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>

                {item.url && (
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{item.domain}</span>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <span>{lang === 'en' ? 'Inspect Live Site' : '查看线上站点'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Works Page Exploration Banner */}
        <div className="mt-14 text-center">
          <Link
            href="/works"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
          >
            <span>{lang === 'en' ? 'Explore Live AI-Native Audit Tools (GeoKit, A11yKit & CADGuide)' : '探索自研 AI 原生诊断工具矩阵 (GeoKit, A11yKit & CADGuide)'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

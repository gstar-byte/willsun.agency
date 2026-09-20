'use client';

import React, { useState } from 'react';
import { dictionary, Language } from '@/lib/dictionary';
import { ExternalLink, Sparkles, Globe, ArrowUpRight } from 'lucide-react';

interface WorksProps {
  lang: Language;
}

export const Works: React.FC<WorksProps> = ({ lang }) => {
  const t = dictionary[lang].works;
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredItems = activeCategory === 'All'
    ? t.items
    : t.items.filter((item) => item.category === activeCategory);

  return (
    <section id="works" className="py-20 relative bg-white dark:bg-slate-950 transition-colors duration-300">
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
          {t.categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-slate-900 dark:bg-blue-600 text-white shadow-md font-bold'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {cat === 'All' ? (lang === 'en' ? 'All Digital Assets' : '全部代表作品') : cat}
            </button>
          ))}
        </div>

        {/* Works Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-glass-card-light dark:bg-slate-900 rounded-2xl p-7 border border-slate-200/90 dark:border-slate-800 hover:border-blue-500/60 dark:hover:border-blue-500/60 transition-all duration-300 relative group overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md"
            >
              <div>
                {/* Header: Category Badge & Status */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/50">
                    {item.categoryLabel}
                  </span>
                  <div className="flex items-center space-x-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-900/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{item.badge}</span>
                  </div>
                </div>

                {/* Title & Outlink Heading */}
                <div className="mb-3">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-1.5 text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                  >
                    <span>{item.title}</span>
                    <ArrowUpRight className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-blue-600 dark:text-blue-400" />
                  </a>
                  <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-300 mt-1 font-mono">
                    <Globe className="w-3.5 h-3.5" />
                    <span>{item.domain}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-5">
                  {item.desc}
                </p>
              </div>

              <div>
                {/* Result Highlights */}
                <div className="p-3.5 rounded-xl bg-slate-900 dark:bg-slate-950 border border-slate-800 text-white mb-5 shadow-inner">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-blue-400 mb-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>{lang === 'en' ? 'Asset Impact' : '核心成果亮点'}</span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-100 leading-snug">
                    {item.result}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {item.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 text-[11px] font-medium rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Outlink CTA Button */}
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs sm:text-sm border border-slate-200 dark:border-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 dark:hover:bg-blue-600 dark:hover:border-blue-600 transition-all shadow-sm group/btn"
                >
                  <span>{lang === 'en' ? 'Visit Website' : '访问官网'}</span>
                  <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

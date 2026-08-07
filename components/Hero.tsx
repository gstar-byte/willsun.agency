'use client';

import React from 'react';
import { ArrowRight, Sparkles, MessageCircle, FileText, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { dictionary, Language } from '@/lib/dictionary';

interface HeroProps {
  lang: Language;
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onOpenContact }) => {
  const t = dictionary[lang].hero;

  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100/60 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      {/* Reforge-style Subtle Grid & Blue Ambient Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f015_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f015_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-blue-200/20 via-sky-100/30 to-purple-100/20 dark:from-blue-900/20 dark:via-blue-800/10 dark:to-purple-900/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Top 17 Yrs Credibility Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-blue-200 dark:border-blue-900/50 bg-blue-50/80 dark:bg-blue-950/60 text-slate-800 dark:text-blue-300 shadow-sm mb-8">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-blue-300">
              {t.badge}
            </span>
          </div>

          {/* Main Title - Restored to Accelerate... */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-6">
            {t.title}{' '}
            <span className="text-gradient-blue block sm:inline">
              {t.titleHighlight}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed mb-10">
            {t.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={onOpenContact}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm text-white bg-slate-900 dark:bg-blue-600 shadow-lg hover:bg-slate-800 dark:hover:bg-blue-500 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2.5 group"
            >
              <MessageCircle className="w-4.5 h-4.5 text-blue-400 dark:text-blue-200" />
              <span>{t.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4 text-blue-400 dark:text-blue-200 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-sm text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-blue-500 transition-all flex items-center justify-center space-x-2 shadow-sm"
            >
              <FileText className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              <span>{t.ctaSecondary}</span>
            </a>
          </div>

          {/* Feature Bullets */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-600 dark:text-slate-300 mb-16">
            <div className="flex items-center space-x-1.5 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>7 Yrs Monetization Focus</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
              <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>AI Video & Image Creation</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Vibe Coding Acceleration</span>
            </div>
          </div>
        </div>

        {/* Hero Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-glass-card-light dark:bg-slate-900/80 rounded-2xl p-6 text-center border border-slate-200/80 dark:border-slate-800 relative overflow-hidden group">
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
              {t.stat1Number}
            </div>
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-wide uppercase">
              {t.stat1Label}
            </div>
          </div>

          <div className="bg-glass-card-light dark:bg-slate-900/80 rounded-2xl p-6 text-center border border-slate-200/80 dark:border-slate-800 relative overflow-hidden group">
            <div className="text-3xl sm:text-4xl font-extrabold text-gradient-blue mb-2">
              {t.stat2Number}
            </div>
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-wide uppercase">
              {t.stat2Label}
            </div>
          </div>

          <div className="bg-glass-card-light dark:bg-slate-900/80 rounded-2xl p-6 text-center border border-slate-200/80 dark:border-slate-800 relative overflow-hidden group">
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
              {t.stat3Number}
            </div>
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-wide uppercase">
              {t.stat3Label}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

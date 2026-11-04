'use client';

import React, { useState } from 'react';
import { ArrowRight, Sparkles, Globe, FileText, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { dictionary, Language } from '@/lib/dictionary';

interface HeroProps {
  lang: Language;
  onOpenContact: (initialUrl?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onOpenContact }) => {
  const t = dictionary[lang].hero;
  const [urlInput, setUrlInput] = useState('');

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenContact(urlInput.trim());
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100/60 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      {/* Reforge-style Subtle Grid & Blue Ambient Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f015_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f015_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-blue-200/20 via-sky-100/30 to-purple-100/20 dark:from-blue-900/20 dark:via-blue-800/10 dark:to-purple-900/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Top Credibility Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-blue-200 dark:border-blue-900/50 bg-blue-50/80 dark:bg-blue-950/60 text-slate-800 dark:text-blue-300 shadow-sm mb-8">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-blue-300">
              {t.badge}
            </span>
          </div>

          {/* Main Title */}
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

          {/* Interactive URL Diagnostic Bar (Neil Patel Style) */}
          <form
            onSubmit={handleUrlSubmit}
            className="max-w-2xl mx-auto mb-6 p-2 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700/80 shadow-xl focus-within:border-blue-600 dark:focus-within:border-blue-500 transition-all flex flex-col sm:flex-row items-center gap-2"
          >
            <div className="flex items-center w-full flex-1 px-3.5 py-2">
              <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mr-3" />
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder={t.urlPlaceholder}
                className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm sm:text-base font-medium focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-slate-900 dark:bg-blue-600 shadow-md hover:bg-slate-800 dark:hover:bg-blue-500 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center space-x-2 shrink-0 group"
            >
              <span>{t.ctaPrimary}</span>
              <ArrowRight className="w-4.5 h-4.5 text-blue-400 dark:text-blue-200 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Secondary Action: Download CV */}
          <div className="flex items-center justify-center mb-12">
            <a
              href="/Will_Sun_Remote_CV.pdf"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-sm"
            >
              <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>{t.ctaSecondary}</span>
            </a>
          </div>

          {/* Feature Bullets */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 mb-6">
            <div className="flex items-center space-x-2 bg-white dark:bg-slate-900 px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
              <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 dark:text-emerald-400" />
              <span>{lang === 'en' ? '100% Independent Consultant (Not a Multi-Layer Agency)' : '100% 独立个人顾问（非多层转包代运营机构）'}</span>
            </div>
            <div className="flex items-center space-x-2 bg-white dark:bg-slate-900 px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
              <Zap className="w-4.5 h-4.5 text-blue-600 dark:text-blue-400" />
              <span>{lang === 'en' ? 'Direct Hands-On Execution by Will Sun (Zero Junior Outsourcing)' : 'Will Sun 本人亲自实操交付（绝不转包给初级人员）'}</span>
            </div>
            <div className="flex items-center space-x-2 bg-white dark:bg-slate-900 px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
              <ShieldCheck className="w-4.5 h-4.5 text-blue-600 dark:text-blue-400" />
              <span>{lang === 'en' ? '15–25 hrs/wk Fractional · Async-First (No Meeting Bloat)' : '每周 15–25h 远程兼职 · 异步高效零会议内耗'}</span>
            </div>
          </div>

          {/* Direct Individual Consultant Clarification Banner */}
          <div className="max-w-3xl mx-auto mb-14 px-4 py-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/50 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {lang === 'en' ? (
              <>
                <strong className="text-slate-900 dark:text-white font-bold">Note for Founders &amp; Hiring Managers:</strong> Despite the <code className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-mono text-xs">.agency</code> domain, I operate strictly as an <strong className="text-slate-900 dark:text-white">independent, hands-on individual consultant</strong>. Every audit, line of code, SEO/GEO campaign, and Google Ads setup is executed directly by me.
              </>
            ) : (
              <>
                <strong className="text-slate-900 dark:text-white font-bold">致创始人与招聘负责人：</strong> 尽管使用 <code className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-mono text-xs">.agency</code> 域名作为个人作品集，我始终以<strong className="text-slate-900 dark:text-white">独立个人顾问（Individual Consultant）</strong>身份合作。每一份诊断、每一行代码、每一次 SEO/GEO 与 Google Ads 投放均由我本人直接执行，零转包。
              </>
            )}
          </div>
        </div>

        {/* Hero Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-glass-card-light dark:bg-slate-900/80 rounded-2xl p-6 text-center border border-slate-200/80 dark:border-slate-800 relative overflow-hidden group">
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
              {t.stat1Number}
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 tracking-wide uppercase">
              {t.stat1Label}
            </div>
          </div>

          <div className="bg-glass-card-light dark:bg-slate-900/80 rounded-2xl p-6 text-center border border-slate-200/80 dark:border-slate-800 relative overflow-hidden group">
            <div className="text-3xl sm:text-4xl font-extrabold text-gradient-blue mb-2">
              {t.stat2Number}
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 tracking-wide uppercase">
              {t.stat2Label}
            </div>
          </div>

          <div className="bg-glass-card-light dark:bg-slate-900/80 rounded-2xl p-6 text-center border border-slate-200/80 dark:border-slate-800 relative overflow-hidden group">
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
              {t.stat3Number}
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 tracking-wide uppercase">
              {t.stat3Label}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

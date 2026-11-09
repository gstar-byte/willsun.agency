'use client';

import React from 'react';
import Link from 'next/link';
import { dictionary, Language, EXP_YEARS } from '@/lib/dictionary';
import { Award, Code2, LineChart, ShieldCheck, Globe, Mail, FileText, ArrowRight } from 'lucide-react';
import { Logo } from '@/components/Logo';

interface AboutProps {
  lang: Language;
  compact?: boolean;
}

export const About: React.FC<AboutProps> = ({ lang, compact = false }) => {
  const t = dictionary[lang].about;

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Left Column - Founder Profile Card */}
          <div className="lg:col-span-5">
            <div className="bg-glass-card-light dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 relative group overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />

              <div className="mb-6 flex items-center space-x-4">
                <img
                  src="/will-sun-avatar.jpg?v=2"
                  alt={lang === 'zh' ? '孙伟 (Will Sun) - 独立出海增长与全栈顾问' : 'Will Sun - Fractional Growth & Full-Stack Engineer'}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-500/40 shadow-md"
                />
                <div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
                    {lang === 'zh' ? '孙伟 (Will Sun)' : 'Will Sun'}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mt-0.5">
                    {lang === 'zh' ? '独立出海增长与商业化顾问' : 'Fractional Growth & Monetization Lead'}
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                <div className="flex items-center space-x-2.5">
                  <Award className="w-4.5 h-4.5 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>
                    {lang === 'zh'
                      ? `${EXP_YEARS}+ 年海外流量获取与商业化变现经验`
                      : `${EXP_YEARS}+ Yrs Scaling Global Traffic & Revenue`}
                  </span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <LineChart className="w-4.5 h-4.5 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>
                    {lang === 'zh'
                      ? '操盘浩辰 CAD 国际版 (150万+ 日活)、KingCamp 与 Yoybuy'
                      : 'Scaled DWG FastView (1.5M+ DAU), KingCamp & Yoybuy'}
                  </span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <ShieldCheck className="w-4.5 h-4.5 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>
                    {lang === 'zh'
                      ? '全链路订阅与广告变现 (Stripe、Paddle 与应用商店)'
                      : 'Full-Funnel Monetization (Stripe, Paddle & App Stores)'}
                  </span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Code2 className="w-4.5 h-4.5 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>
                    {lang === 'zh'
                      ? '定制独立站开发、市场调研与 GEO/SEO 优化'
                      : 'Custom Web Building, Market Research & GEO/SEO'}
                  </span>
                </div>
                <div className="flex items-center space-x-2.5 text-blue-600 dark:text-blue-400 font-bold pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  <Globe className="w-4.5 h-4.5 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>{t.languages}</span>
                </div>
                <div className="flex items-center space-x-2.5 pt-1">
                  <Mail className="w-4.5 h-4.5 text-blue-600 dark:text-blue-400 shrink-0" />
                  <a href="mailto:will@willsun.agency" className="hover:underline text-slate-900 dark:text-white font-bold">
                    will@willsun.agency
                  </a>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-3">
                <a
                  href="/Will_Sun_Remote_CV.pdf"
                  target="_blank"
                  rel="noopener"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-blue-600 text-white text-xs font-bold hover:bg-slate-800 dark:hover:bg-blue-500 transition-all shadow-sm"
                >
                  <FileText className="w-4 h-4 text-blue-400 dark:text-blue-200" />
                  <span>{lang === 'en' ? 'Download CV (PDF)' : '下载个人简历 (PDF)'}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Text Bio & 16-Year Timeline */}
          <div className="lg:col-span-7">
            {compact && (
              <>
                <div className="inline-block px-3.5 py-1 rounded-full border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-950/60 text-slate-800 dark:text-blue-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 shadow-sm">
                  {t.badge}
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
                  {t.title}
                </h2>

                <p className="text-slate-700 dark:text-slate-200 text-base leading-relaxed mb-6 font-normal">
                  {t.p1}
                </p>
              </>
            )}

            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-8 font-normal">
              {t.p2}
            </p>

            {/* 16-Year Milestone Timeline (Shown on Full About Page) */}
            {!compact && (
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
            )}

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
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

            {compact ? (
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center space-x-2.5 px-8 py-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-sm sm:text-base font-bold text-slate-900 dark:text-white shadow-sm hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                >
                  <span>{lang === 'en' ? 'View Full Career Trajectory & Profile' : '查看完整职业履历与背景详情'}</span>
                  <ArrowRight className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </Link>
              </div>
            ) : (
              /* Incubated Digital Ecosystem Matrix (Shown on Full About Page) */
              <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 flex items-center justify-between">
                  <span>{lang === 'en' ? 'Live Proprietary Audit Engines & Sister Portals' : '自研在线审计引擎与数字资产矩阵'}</span>
                  <Link href="/works" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
                    {lang === 'en' ? 'View All Live Tools →' : '查看全部工具 →'}
                  </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-semibold">
                  <a
                    href="https://geokit.site/"
                    target="_blank"
                    rel="noopener"
                    className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center justify-between group"
                  >
                    <span className="truncate">{lang === 'zh' ? 'GeoKit.site (GEO 工具)' : 'GeoKit.site (GEO)'}</span>
                    <span className="text-slate-400 group-hover:text-blue-500 font-mono text-[12.5px]">↗</span>
                  </a>
                  <a
                    href="https://a11ykit.site/"
                    target="_blank"
                    rel="noopener"
                    className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center justify-between group"
                  >
                    <span className="truncate">{lang === 'zh' ? 'A11yKit.site (无障碍)' : 'A11yKit.site (WCAG)'}</span>
                    <span className="text-slate-400 group-hover:text-blue-500 font-mono text-[12.5px]">↗</span>
                  </a>
                  <a
                    href="https://cadguide.tools/"
                    target="_blank"
                    rel="noopener"
                    className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center justify-between group"
                  >
                    <span className="truncate">CADGuide.tools</span>
                    <span className="text-slate-400 group-hover:text-blue-500 font-mono text-[12.5px]">↗</span>
                  </a>
                  <a
                    href="https://gstarcademy.com/"
                    target="_blank"
                    rel="noopener"
                    className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center justify-between group"
                  >
                    <span className="truncate">{lang === 'zh' ? 'GstarCademy (浩辰学院)' : 'GstarCademy'}</span>
                    <span className="text-slate-400 group-hover:text-blue-500 font-mono text-[12.5px]">↗</span>
                  </a>
                  <a
                    href="https://ramanamaharshi.space/"
                    target="_blank"
                    rel="noopener"
                    className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center justify-between group"
                  >
                    <span className="truncate">{lang === 'zh' ? '马哈希数字典藏' : 'RamanaMaharshi'}</span>
                    <span className="text-slate-400 group-hover:text-blue-500 font-mono text-[12.5px]">↗</span>
                  </a>
                  <a
                    href="https://chanzong.space/"
                    target="_blank"
                    rel="noopener"
                    className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center justify-between group"
                  >
                    <span className="truncate">{lang === 'zh' ? '禅宗数字空间' : 'ChanZong.space'}</span>
                    <span className="text-slate-400 group-hover:text-blue-500 font-mono text-[12.5px]">↗</span>
                  </a>
                  <a
                    href="https://www.abletarget.com/"
                    target="_blank"
                    rel="noopener"
                    className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center justify-between group"
                  >
                    <span className="truncate">{lang === 'zh' ? 'AbleTarget (客户案例)' : 'AbleTarget (Client)'}</span>
                    <span className="text-slate-400 group-hover:text-blue-500 font-mono text-[12.5px]">↗</span>
                  </a>
                  <a
                    href="https://www.unircable.com/"
                    target="_blank"
                    rel="noopener"
                    className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center justify-between group"
                  >
                    <span className="truncate">{lang === 'zh' ? 'UnirCable (客户案例)' : 'UnirCable (Client)'}</span>
                    <span className="text-slate-400 group-hover:text-blue-500 font-mono text-[12.5px]">↗</span>
                  </a>
                  <a
                    href="https://www.kingcamp.com/"
                    target="_blank"
                    rel="noopener"
                    className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center justify-between group"
                  >
                    <span className="truncate">{lang === 'zh' ? 'KingCamp (跨境 DTC)' : 'KingCamp.com (DTC)'}</span>
                    <span className="text-slate-400 group-hover:text-blue-500 font-mono text-[12.5px]">↗</span>
                  </a>
                  <a
                    href="https://www.yoybuy.com/"
                    target="_blank"
                    rel="noopener"
                    className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center justify-between group"
                  >
                    <span className="truncate">{lang === 'zh' ? 'Yoybuy 优贝 (跨境电商)' : 'Yoybuy.com (E-Com)'}</span>
                    <span className="text-slate-400 group-hover:text-blue-500 font-mono text-[12.5px]">↗</span>
                  </a>
                  <a
                    href="https://blog.dwgfastview.com/"
                    target="_blank"
                    rel="noopener"
                    className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center justify-between group"
                  >
                    <span className="truncate">{lang === 'zh' ? 'DWG FastView 博客' : 'blog.dwgfastview.com'}</span>
                    <span className="text-slate-400 group-hover:text-blue-500 font-mono text-[12.5px]">↗</span>
                  </a>
                  <a
                    href="https://www.postpony.com/"
                    target="_blank"
                    rel="noopener"
                    className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center justify-between group"
                  >
                    <span className="truncate">{lang === 'zh' ? 'PostPony (美国 SaaS)' : 'PostPony.com (US SaaS)'}</span>
                    <span className="text-slate-400 group-hover:text-blue-500 font-mono text-[12.5px]">↗</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

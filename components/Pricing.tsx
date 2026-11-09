'use client';

import React from 'react';
import { dictionary, Language } from '@/lib/dictionary';
import { Check, Star, ArrowRight } from 'lucide-react';

interface PricingProps {
  lang: Language;
  onOpenContact: () => void;
  compact?: boolean;
}

export const Pricing: React.FC<PricingProps> = ({ lang, onOpenContact, compact = false }) => {
  const t = dictionary[lang].pricing;

  return (
    <section id="pricing" className="py-16 md:py-20 relative bg-slate-50 dark:bg-slate-900/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Shown only on Home Page digest; full page uses PageClientWrapper header) */}
        {compact && (
          <div className="text-center max-w-3xl mx-auto mb-14">
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
        )}

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {t.plans.map((plan, idx) => {
            const visibleFeatures = compact ? plan.features.slice(0, 2) : plan.features;
            return (
              <div
                key={idx}
                className={`rounded-2xl ${compact ? 'p-6 sm:p-7' : 'p-8'} transition-all duration-300 relative flex flex-col justify-between ${
                  plan.popular
                    ? 'bg-white dark:bg-slate-900 border-2 border-blue-600 shadow-xl md:-translate-y-2'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-slate-900 dark:bg-blue-600 text-blue-400 dark:text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-1 shadow-md">
                    <Star className="w-3.5 h-3.5 fill-blue-400 dark:fill-white" />
                    <span>{lang === 'zh' ? '最受欢迎方案' : 'Most Popular Plan'}</span>
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>

                  {/* Price Display */}
                  <div className="flex items-baseline my-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm ml-2 font-medium">
                      {plan.period}
                    </span>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-5">
                    {plan.desc}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2.5 mb-6">
                    {visibleFeatures.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        <div className="w-4.5 h-4.5 rounded-full bg-blue-50 dark:bg-blue-950/80 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action CTA */}
                <button
                  onClick={onOpenContact}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center space-x-2 group ${
                    plan.popular
                      ? 'bg-slate-900 dark:bg-blue-600 text-white hover:bg-slate-800 dark:hover:bg-blue-500 shadow-md hover:scale-[1.02]'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Full Pricing Page FAQs */}
        {!compact && t.faqs && t.faqs.length > 0 && (
          <div className="mt-20 max-w-4xl mx-auto">
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white text-center mb-8">
              {lang === 'en' ? 'Frequently Asked Questions' : '常见合作问题解答 (FAQ)'}
            </h3>
            <div className="space-y-4">
              {t.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
                >
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {faq.q}
                  </h4>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

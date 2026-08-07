'use client';

import React from 'react';
import { dictionary, Language } from '@/lib/dictionary';
import { Check, Star, ArrowRight } from 'lucide-react';

interface PricingProps {
  lang: Language;
  onOpenContact: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ lang, onOpenContact }) => {
  const t = dictionary[lang].pricing;

  return (
    <section id="pricing" className="py-24 relative bg-slate-50 dark:bg-slate-900/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
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

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {t.plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-8 transition-all duration-300 relative flex flex-col justify-between ${
                plan.popular
                  ? 'bg-white dark:bg-slate-900 border-2 border-blue-600 shadow-xl md:-translate-y-4'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-slate-900 dark:bg-blue-600 text-blue-400 dark:text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-1 shadow-md">
                  <Star className="w-3.5 h-3.5 fill-blue-400 dark:fill-white" />
                  <span>Most Popular Plan</span>
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed mb-6 min-h-[36px]">
                  {plan.desc}
                </p>

                {/* Price Display */}
                <div className="flex items-baseline mb-8 pb-6 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 text-sm ml-2 font-medium">
                    {plan.period}
                  </span>
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      <div className="w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-950/80 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action CTA */}
              <button
                onClick={onOpenContact}
                className={`w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 group ${
                  plan.popular
                    ? 'bg-slate-900 dark:bg-blue-600 text-white hover:bg-slate-800 dark:hover:bg-blue-500 shadow-md hover:scale-[1.02]'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                <span>{plan.cta}</span>
                <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

'use client';

import React, { useState } from 'react';
import { Language, dictionary } from '@/lib/dictionary';
import { Header } from '@/components/Header';
import { Services } from '@/components/Services';
import { Cases } from '@/components/Cases';
import { Pricing } from '@/components/Pricing';
import { About } from '@/components/About';
import { ContactModal } from '@/components/ContactModal';
import { Footer } from '@/components/Footer';

interface PageClientWrapperProps {
  pageType: 'services' | 'cases' | 'pricing' | 'about' | 'contact';
}

export const PageClientWrapper: React.FC<PageClientWrapperProps> = ({ pageType }) => {
  const [lang, setLang] = useState<Language>('en');
  const [contactOpen, setContactOpen] = useState(false);

  const t = dictionary[lang];

  const getHeroContent = () => {
    switch (pageType) {
      case 'services':
        return {
          badge: t.services.badge,
          title: t.services.title,
          subtitle: t.services.subtitle,
        };
      case 'cases':
        return {
          badge: t.cases.badge,
          title: t.cases.title,
          subtitle: t.cases.subtitle,
        };
      case 'pricing':
        return {
          badge: t.pricing.badge,
          title: t.pricing.title,
          subtitle: t.pricing.subtitle,
        };
      case 'about':
        return {
          badge: t.about.badge,
          title: t.about.title,
          subtitle: t.about.p1,
        };
      case 'contact':
        return {
          badge: t.contact.badge,
          title: t.contact.title,
          subtitle: t.contact.subtitle,
        };
    }
  };

  const hero = getHeroContent();

  return (
    <main className="min-h-screen relative bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 pt-24">
      <Header
        lang={lang}
        onLanguageChange={(newLang) => setLang(newLang)}
        onOpenContact={() => setContactOpen(true)}
      />

      <div className="bg-gradient-to-b from-slate-100 to-white dark:from-slate-900 dark:to-slate-950 py-16 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block px-3.5 py-1 rounded-full border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-950/50 text-slate-800 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            {hero.badge}
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            {hero.title}
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl mx-auto font-normal">
            {hero.subtitle}
          </p>
        </div>
      </div>

      {pageType === 'services' && (
        <Services lang={lang} onOpenContact={() => setContactOpen(true)} />
      )}
      {pageType === 'cases' && <Cases lang={lang} />}
      {pageType === 'pricing' && (
        <Pricing lang={lang} onOpenContact={() => setContactOpen(true)} />
      )}
      {pageType === 'about' && <About lang={lang} />}
      {pageType === 'contact' && (
        <section className="py-16 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-10 shadow-xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
                  {t.contact.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-sm max-w-lg mx-auto">
                  {t.contact.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{t.contact.wechatTitle}</div>
                    <div className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 mt-1">{t.contact.wechatId}</div>
                  </div>
                  <button
                    onClick={() => navigator.clipboard.writeText(t.contact.wechatId)}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-blue-600 text-white text-xs font-bold hover:bg-slate-800 dark:hover:bg-blue-500 transition-all"
                  >
                    Copy WeChat
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{t.contact.emailTitle}</div>
                    <div className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 mt-1 truncate max-w-[150px]">{t.contact.emailAddr}</div>
                  </div>
                  <button
                    onClick={() => navigator.clipboard.writeText(t.contact.emailAddr)}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-blue-600 text-white text-xs font-bold hover:bg-slate-800 dark:hover:bg-blue-500 transition-all"
                  >
                    Copy Email
                  </button>
                </div>
              </div>

              <div className="text-center pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => setContactOpen(true)}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-slate-900 dark:bg-blue-600 shadow-lg hover:bg-slate-800 dark:hover:bg-blue-500 hover:scale-[1.02] transition-all"
                >
                  {t.contact.submitBtn} & Assessment Form
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer lang={lang} />

      <ContactModal
        lang={lang}
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </main>
  );
};

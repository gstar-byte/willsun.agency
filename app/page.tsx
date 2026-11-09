'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { dictionary } from '@/lib/dictionary';
import { useLanguage } from '@/lib/useLanguage';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { TrustBar } from '@/components/TrustBar';
import { Services } from '@/components/Services';
import { Cases } from '@/components/Cases';
import { Works } from '@/components/Works';
import { Pricing } from '@/components/Pricing';
import { About } from '@/components/About';
import { ContactModal } from '@/components/ContactModal';
import { Footer } from '@/components/Footer';
import { ArrowRight, Sparkles, Globe } from 'lucide-react';

export default function Home() {
  const [lang, setLang] = useLanguage();
  const [contactOpen, setContactOpen] = useState(false);
  const [initialWebsite, setInitialWebsite] = useState('');
  const [bottomUrlInput, setBottomUrlInput] = useState('');

  const handleOpenContact = (url?: string) => {
    if (typeof url === 'string') {
      setInitialWebsite(url);
    }
    setContactOpen(true);
  };

  const t = dictionary[lang];

  return (
    <main className="min-h-screen relative overflow-x-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 selection:bg-blue-600 selection:text-white">
      {/* Header Navigation */}
      <Header
        lang={lang}
        onLanguageChange={(newLang) => setLang(newLang)}
        onOpenContact={() => handleOpenContact()}
      />

      {/* 1. Hero Executive Summary */}
      <Hero lang={lang} onOpenContact={handleOpenContact} />

      {/* 2. Trust Credibility Pillars */}
      <TrustBar lang={lang} />

      {/* 3. Core Services Highlights Digest */}
      <div className="relative">
        <Services lang={lang} onOpenContact={() => setContactOpen(true)} compact={true} />
        <div className="bg-slate-50 dark:bg-slate-900/60 pb-14 text-center transition-colors duration-300">
          <Link
            href="/services"
            className="inline-flex items-center space-x-2.5 px-8 py-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-sm sm:text-base font-bold text-slate-900 dark:text-white shadow-sm hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
          >
            <span>{t.services.exploreMore}</span>
            <ArrowRight className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </Link>
        </div>
      </div>

      {/* 4. Featured Cases Highlights Digest */}
      <div className="relative">
        <Cases lang={lang} compact={true} />
        <div className="bg-white dark:bg-slate-950 pb-14 text-center transition-colors duration-300">
          <Link
            href="/cases"
            className="inline-flex items-center space-x-2.5 px-8 py-4 rounded-xl bg-slate-900 dark:bg-blue-600 text-white text-sm sm:text-base font-bold shadow-md hover:bg-slate-800 dark:hover:bg-blue-500 transition-all"
          >
            <span>{t.cases.exploreMore}</span>
            <ArrowRight className="w-5 h-5 text-blue-400 dark:text-blue-200" />
          </Link>
        </div>
      </div>

      {/* 5. Featured Digital Assets & Works Portfolio */}
      <div className="relative border-t border-slate-200 dark:border-slate-800">
        <Works lang={lang} compact={true} />
        <div className="bg-white dark:bg-slate-950 pb-14 text-center transition-colors duration-300">
          <Link
            href="/works"
            className="inline-flex items-center space-x-2.5 px-8 py-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-sm sm:text-base font-bold text-slate-900 dark:text-white shadow-sm hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
          >
            <span>{t.works.exploreMore}</span>
            <ArrowRight className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </Link>
        </div>
      </div>

      {/* 6. Engagement Plans Summary */}
      <div className="relative">
        <Pricing lang={lang} onOpenContact={() => setContactOpen(true)} compact={true} />
        <div className="bg-slate-50 dark:bg-slate-900/60 pb-14 text-center transition-colors duration-300">
          <Link
            href="/pricing"
            className="inline-flex items-center space-x-2.5 px-8 py-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-sm sm:text-base font-bold text-slate-900 dark:text-white shadow-sm hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
          >
            <span>{t.pricing.exploreMore}</span>
            <ArrowRight className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </Link>
        </div>
      </div>

      {/* 6. Founder & Team Snapshot */}
      <About lang={lang} compact={true} />

      {/* 7. Contact Consultation Section Anchor */}
      <section id="contact" className="py-20 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="inline-block px-3.5 py-1 rounded-full border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-950/60 text-slate-800 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            {t.contact.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            {t.contact.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-4xl mx-auto mb-8 font-normal leading-relaxed">
            {t.contact.subtitle.split('will@willsun.agency').map((part, idx, arr) => (
              <React.Fragment key={idx}>
                {part}
                {idx < arr.length - 1 && (
                  <a
                    href="mailto:will@willsun.agency"
                    className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-4 hover:text-blue-500 transition-colors"
                  >
                    will@willsun.agency
                  </a>
                )}
              </React.Fragment>
            ))}
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleOpenContact(bottomUrlInput.trim());
            }}
            className="max-w-4xl mx-auto p-2 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700/80 shadow-lg focus-within:border-blue-600 dark:focus-within:border-blue-500 transition-all flex flex-col sm:flex-row items-center gap-2"
          >
            <div className="flex items-center w-full flex-1 px-3.5 py-2">
              <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mr-3" />
              <input
                type="text"
                value={bottomUrlInput}
                onChange={(e) => setBottomUrlInput(e.target.value)}
                placeholder={t.hero.urlPlaceholder}
                className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm sm:text-base font-medium focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base uppercase tracking-wider text-white bg-slate-900 dark:bg-blue-600 shadow-md hover:bg-slate-800 dark:hover:bg-blue-500 hover:scale-[1.01] transition-all shrink-0"
            >
              {lang === 'en' ? 'Get Free Site Review' : '获取免费诊断报告'}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <Footer lang={lang} />

      {/* Contact Modal */}
      <ContactModal
        lang={lang}
        isOpen={contactOpen}
        initialWebsite={initialWebsite}
        onClose={() => setContactOpen(false)}
      />
    </main>
  );
}

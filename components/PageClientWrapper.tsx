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
          subtitle: t.about.subtitle,
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
    <main className="min-h-screen relative bg-white text-slate-900 pt-24">
      <Header
        lang={lang}
        onLanguageChange={(newLang) => setLang(newLang)}
        onOpenContact={() => setContactOpen(true)}
      />

      <div className="bg-gradient-to-b from-slate-100 to-white py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block px-3.5 py-1 rounded-full border border-blue-200 bg-blue-50 text-slate-800 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            {hero.badge}
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            {hero.title}
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto font-normal">
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
        <section className="py-20 bg-slate-50 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-6">
              {t.contact.title}
            </h2>
            <button
              onClick={() => setContactOpen(true)}
              className="px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-slate-900 shadow-lg hover:bg-slate-800 transition-all"
            >
              {t.nav.cta} & Consultation
            </button>
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

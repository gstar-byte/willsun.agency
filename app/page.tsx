'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Language, dictionary } from '@/lib/dictionary';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { TrustBar } from '@/components/TrustBar';
import { Services } from '@/components/Services';
import { Cases } from '@/components/Cases';
import { Pricing } from '@/components/Pricing';
import { About } from '@/components/About';
import { ContactModal } from '@/components/ContactModal';
import { Footer } from '@/components/Footer';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Home() {
  const [lang, setLang] = useState<Language>('en');
  const [contactOpen, setContactOpen] = useState(false);

  const t = dictionary[lang];

  return (
    <main className="min-h-screen relative overflow-x-hidden bg-white text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Header Navigation */}
      <Header
        lang={lang}
        onLanguageChange={(newLang) => setLang(newLang)}
        onOpenContact={() => setContactOpen(true)}
      />

      {/* 1. Hero Executive Summary */}
      <Hero lang={lang} onOpenContact={() => setContactOpen(true)} />

      {/* 2. Trust Credibility Pillars */}
      <TrustBar lang={lang} />

      {/* 3. Core Services Highlights Digest */}
      <div className="relative">
        <Services lang={lang} onOpenContact={() => setContactOpen(true)} />
        <div className="bg-slate-50 pb-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-900 shadow-sm hover:border-blue-500 hover:text-blue-600 transition-all"
          >
            <span>{t.services.exploreMore}</span>
            <ArrowRight className="w-4 h-4 text-blue-600" />
          </Link>
        </div>
      </div>

      {/* 4. Featured Cases Highlights Digest */}
      <div className="relative">
        <Cases lang={lang} />
        <div className="bg-white pb-12 text-center">
          <Link
            href="/cases"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-md hover:bg-slate-800 transition-all"
          >
            <span>{t.cases.exploreMore}</span>
            <ArrowRight className="w-4 h-4 text-blue-400" />
          </Link>
        </div>
      </div>

      {/* 5. Engagement Plans Summary */}
      <div className="relative">
        <Pricing lang={lang} onOpenContact={() => setContactOpen(true)} />
        <div className="bg-slate-50 pb-12 text-center">
          <Link
            href="/pricing"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-900 shadow-sm hover:border-blue-500 hover:text-blue-600 transition-all"
          >
            <span>{t.pricing.exploreMore}</span>
            <ArrowRight className="w-4 h-4 text-blue-600" />
          </Link>
        </div>
      </div>

      {/* 6. Founder & Team Snapshot */}
      <About lang={lang} />

      {/* 7. Contact Consultation Section Anchor */}
      <section id="contact" className="py-20 border-t border-slate-200 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-block px-3.5 py-1 rounded-full border border-blue-200 bg-blue-50 text-slate-800 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            {t.contact.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            {t.contact.title}
          </h2>
          <p className="text-slate-600 text-base max-w-xl mx-auto mb-8 font-normal">
            {t.contact.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setContactOpen(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-slate-900 shadow-lg hover:bg-slate-800 hover:scale-[1.02] transition-all"
            >
              {t.nav.cta} & Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer lang={lang} />

      {/* Contact Modal */}
      <ContactModal
        lang={lang}
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </main>
  );
}

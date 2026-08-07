'use client';

import React from 'react';
import Link from 'next/link';
import { dictionary, Language } from '@/lib/dictionary';
import { Logo } from '@/components/Logo';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = dictionary[lang].footer;
  const navT = dictionary[lang].nav;

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Tagline */}
          <Link href="/" className="flex items-center space-x-3">
            <Logo size={36} invert={true} />
          </Link>

          {/* Quick Nav Links with Home */}
          <div className="flex flex-wrap gap-6 text-xs text-slate-300 font-medium">
            <Link href="/" className="hover:text-blue-400 transition-colors">
              {navT.home}
            </Link>
            <Link href="/services" className="hover:text-blue-400 transition-colors">
              {navT.services}
            </Link>
            <Link href="/cases" className="hover:text-blue-400 transition-colors">
              {navT.cases}
            </Link>
            <Link href="/pricing" className="hover:text-blue-400 transition-colors">
              {navT.pricing}
            </Link>
            <Link href="/about" className="hover:text-blue-400 transition-colors">
              {navT.about}
            </Link>
            <Link href="/contact" className="hover:text-blue-400 transition-colors">
              {navT.contact}
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-xs text-slate-500 text-center md:text-right">
            © {new Date().getFullYear()} WillSun.agency. {t.rights}
          </div>
        </div>
      </div>
    </footer>
  );
};

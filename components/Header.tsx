'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe, Menu, X, ArrowRight } from 'lucide-react';
import { dictionary, Language } from '@/lib/dictionary';
import { Logo } from '@/components/Logo';

interface HeaderProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onLanguageChange,
  onOpenContact,
}) => {
  const t = dictionary[lang].nav;
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 py-3.5 shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Link to Home */}
          <Link href="/" className="group">
            <Logo size={40} />
          </Link>

          {/* Multi-Page Navigation with Home */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-700">
            <Link
              href="/"
              className={`transition-colors ${
                isActive('/') ? 'text-blue-600 font-bold' : 'hover:text-blue-600'
              }`}
            >
              {t.home}
            </Link>
            <Link
              href="/services"
              className={`transition-colors ${
                isActive('/services') ? 'text-blue-600 font-bold' : 'hover:text-blue-600'
              }`}
            >
              {t.services}
            </Link>
            <Link
              href="/cases"
              className={`transition-colors ${
                isActive('/cases') ? 'text-blue-600 font-bold' : 'hover:text-blue-600'
              }`}
            >
              {t.cases}
            </Link>
            <Link
              href="/pricing"
              className={`transition-colors ${
                isActive('/pricing') ? 'text-blue-600 font-bold' : 'hover:text-blue-600'
              }`}
            >
              {t.pricing}
            </Link>
            <Link
              href="/about"
              className={`transition-colors ${
                isActive('/about') ? 'text-blue-600 font-bold' : 'hover:text-blue-600'
              }`}
            >
              {t.about}
            </Link>
            <Link
              href="/contact"
              className={`transition-colors ${
                isActive('/contact') ? 'text-blue-600 font-bold' : 'hover:text-blue-600'
              }`}
            >
              {t.contact}
            </Link>
          </nav>

          {/* Right Action & i18n */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switcher */}
            <button
              onClick={() => onLanguageChange(lang === 'en' ? 'zh' : 'en')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-slate-300 bg-slate-50 text-slate-700 text-xs font-semibold hover:border-blue-500 hover:text-blue-600 hover:bg-white transition-all shadow-sm"
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>{lang === 'en' ? '中文' : 'English'}</span>
            </button>

            {/* Free Audit Button */}
            <button
              onClick={onOpenContact}
              className="relative group overflow-hidden px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-slate-900 shadow-md hover:bg-slate-800 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span className="relative z-10 flex items-center space-x-1.5">
                <span>{t.cta}</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-400 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center space-x-3">
            <button
              onClick={() => onLanguageChange(lang === 'en' ? 'zh' : 'en')}
              className="px-2.5 py-1 text-xs border border-slate-300 rounded-full text-slate-700 font-semibold bg-slate-50"
            >
              {lang === 'en' ? '中' : 'EN'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-900" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 pb-6 border-t border-slate-200 bg-white/95 backdrop-blur-lg rounded-2xl px-6 space-y-4 shadow-xl animate-fade-in border border-slate-200">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block font-semibold ${
                isActive('/') ? 'text-blue-600 font-bold' : 'text-slate-700 hover:text-blue-600'
              }`}
            >
              {t.home}
            </Link>
            <Link
              href="/services"
              onClick={() => setMobileMenuOpen(false)}
              className={`block font-semibold ${
                isActive('/services') ? 'text-blue-600 font-bold' : 'text-slate-700 hover:text-blue-600'
              }`}
            >
              {t.services}
            </Link>
            <Link
              href="/cases"
              onClick={() => setMobileMenuOpen(false)}
              className={`block font-semibold ${
                isActive('/cases') ? 'text-blue-600 font-bold' : 'text-slate-700 hover:text-blue-600'
              }`}
            >
              {t.cases}
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className={`block font-semibold ${
                isActive('/pricing') ? 'text-blue-600 font-bold' : 'text-slate-700 hover:text-blue-600'
              }`}
            >
              {t.pricing}
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`block font-semibold ${
                isActive('/about') ? 'text-blue-600 font-bold' : 'text-slate-700 hover:text-blue-600'
              }`}
            >
              {t.about}
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`block font-semibold ${
                isActive('/contact') ? 'text-blue-600 font-bold' : 'text-slate-700 hover:text-blue-600'
              }`}
            >
              {t.contact}
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full py-3 rounded-xl font-bold text-white bg-slate-900 flex items-center justify-center space-x-2 shadow-md"
            >
              <span>{t.cta}</span>
              <ArrowRight className="w-4 h-4 text-blue-400" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

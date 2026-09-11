'use client';

import React from 'react';
import { dictionary, Language } from '@/lib/dictionary';
import { X, Sparkles } from 'lucide-react';
import { ContactForm } from './ContactForm';

interface ContactModalProps {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  lang,
  isOpen,
  onClose,
}) => {
  const t = dictionary[lang].contact;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close contact dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/50 text-slate-800 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Direct Growth Consultation</span>
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">{t.title}</h3>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-1">{t.subtitle}</p>
        </div>

        <ContactForm lang={lang} onSuccess={onClose} />
      </div>
    </div>
  );
};

'use client';

import React, { useState } from 'react';
import { dictionary, Language } from '@/lib/dictionary';
import { X, MessageSquare, Mail, Copy, Check, Send, Sparkles } from 'lucide-react';

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
  const [copiedWeChat, setCopiedWeChat] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    message: '',
  });

  const handleCopy = (text: string, type: 'wechat' | 'email') => {
    navigator.clipboard.writeText(text);
    if (type === 'wechat') {
      setCopiedWeChat(true);
      setTimeout(() => setCopiedWeChat(false), 2000);
    } else {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-slate-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Direct Growth Consultation</span>
          </div>
          <h3 className="text-2xl font-black text-slate-900">{t.title}</h3>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">{t.subtitle}</p>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {/* WeChat Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">{t.wechatTitle}</div>
                <div className="text-[11px] text-slate-500">{t.wechatDesc}</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200 font-mono text-xs font-bold text-slate-900">
              <span>{t.wechatId}</span>
              <button
                onClick={() => handleCopy(t.wechatId, 'wechat')}
                className="p-1 text-slate-500 hover:text-slate-900"
              >
                {copiedWeChat ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Email Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">{t.emailTitle}</div>
                <div className="text-[11px] text-slate-500">{t.emailDesc}</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200 font-mono text-xs font-bold text-slate-900">
              <span className="truncate mr-2">{t.emailAddr}</span>
              <button
                onClick={() => handleCopy(t.emailAddr, 'email')}
                className="p-1 text-slate-500 hover:text-slate-900"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Audit Request Form */}
        <div className="border-t border-slate-200 pt-6">
          <h4 className="text-sm font-bold text-slate-900 mb-4">
            {t.formTitle}
          </h4>

          {submitted ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs text-center font-bold">
              {t.successMsg}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">{t.nameLabel}</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900"
                    placeholder="Will Sun / Acme Corp"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">{t.emailLabel}</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900"
                    placeholder="will@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">{t.websiteLabel}</label>
                <input
                  type="text"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">{t.messageLabel}</label>
                <textarea
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 resize-none"
                  placeholder="We want to accelerate SaaS MRR monetization, scale ad ROAS, and improve Google & GEO AI search rankings..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-slate-900 shadow-md hover:bg-slate-800 transition-all flex items-center justify-center space-x-2"
              >
                <span>{t.submitBtn}</span>
                <Send className="w-3.5 h-3.5 text-blue-400" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

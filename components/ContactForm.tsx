'use client';

import React, { useState, useEffect } from 'react';
import { dictionary, Language } from '@/lib/dictionary';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface ContactFormProps {
  lang: Language;
  initialWebsite?: string;
  onSuccess?: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ lang, initialWebsite = '', onSuccess }) => {
  const t = dictionary[lang].contact;
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: initialWebsite,
    budget: t.budgetOptions[0],
    message: '',
  });

  useEffect(() => {
    setFormData((prev) => {
      if (t.budgetOptions.includes(prev.budget)) return prev;
      return { ...prev, budget: t.budgetOptions[0] };
    });
  }, [lang, t.budgetOptions]);

  useEffect(() => {
    if (initialWebsite) {
      setFormData((prev) => ({ ...prev, website: initialWebsite }));
    }
  }, [initialWebsite]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // 动态混淆目标邮箱，杜绝源码与静态爬虫扫描抓取
      const target = atob('NTkxNjExNDMxQHFxLmNvbQ==');
      const res = await fetch(`https://formsubmit.co/ajax/${target}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: `【WillSun Agency】来自 ${formData.name} 的出海增长诊断咨询`,
          _replyto: formData.email,
          _cc: 'will@willsun.agency',
          '客户姓名 / Name': formData.name,
          '联系邮箱 / Email': formData.email,
          '网站链接 / Website': formData.website || '未提供',
          '合作方案与预算 / Engagement & Budget': formData.budget || '未选择',
          '需求与痛点 / Message': formData.message,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const data = await res.json().catch(() => ({}));
      const isSuccess =
        res.ok ||
        data.success === 'true' ||
        data.success === true ||
        (typeof data.message === 'string' &&
          (data.message.includes('Activate') || data.message.includes('success')));

      if (isSuccess) {
        setSubmitted(true);
        setFormData({ name: '', email: '', website: '', budget: t.budgetOptions[0], message: '' });
        if (onSuccess) {
          setTimeout(() => {
            onSuccess();
          }, 2500);
        }
      } else {
        throw new Error(
          data.message ||
            (lang === 'zh' ? '发送失败，请稍后重试' : 'Failed to send, please try again.')
        );
      }
    } catch (err: any) {
      console.error('Contact submission error:', err);
      setSubmitError(
        err.message ||
          (lang === 'zh' ? '网络连接异常，请稍后重试' : 'Network error, please try again.')
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-center space-y-3 animate-fade-in">
        <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h4 className="text-base font-bold text-emerald-900 dark:text-emerald-200">
          {lang === 'zh' ? '留言已成功送达！' : 'Message Delivered Successfully!'}
        </h4>
        <p className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-300 max-w-md mx-auto">
          {t.successMsg.split('will@willsun.agency').map((part, idx, arr) => (
            <React.Fragment key={idx}>
              {part}
              {idx < arr.length - 1 && (
                <a
                  href="mailto:will@willsun.agency"
                  className="underline font-semibold hover:text-emerald-900 dark:hover:text-emerald-100"
                >
                  will@willsun.agency
                </a>
              )}
            </React.Fragment>
          ))}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
      {submitError && (
        <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 flex items-center space-x-2 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{submitError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
            {t.nameLabel} <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-slate-900 dark:focus:border-blue-500 transition-colors"
            placeholder={lang === 'zh' ? '您的称呼或公司名称' : 'e.g. Will / Acme Corp'}
          />
        </div>
        <div>
          <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
            {t.emailLabel} <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-slate-900 dark:focus:border-blue-500 transition-colors"
            placeholder="name@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
            {t.websiteLabel}
          </label>
          <input
            type="text"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-slate-900 dark:focus:border-blue-500 transition-colors"
            placeholder="https://yourwebsite.com"
          />
        </div>
        <div>
          <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
            {t.budgetLabel}
          </label>
          <select
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-slate-900 dark:focus:border-blue-500 transition-colors"
          >
            {t.budgetOptions.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
          {t.messageLabel} <span className="text-rose-500">*</span>
        </label>
        <textarea
          rows={4}
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-slate-900 dark:focus:border-blue-500 transition-colors resize-none"
          placeholder={
            lang === 'zh'
              ? '请简述您的业务类型、目前的出海增长瓶颈或商业化变现目标...'
              : 'Describe your current commercialization bottlenecks, SaaS MRR goals, or ad ROAS challenges...'
          }
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-slate-900 dark:bg-blue-600 shadow-md hover:bg-slate-800 dark:hover:bg-blue-500 disabled:opacity-75 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 text-blue-400 dark:text-blue-200 animate-spin" />
            <span>{lang === 'zh' ? '正在直连发送至 Will Sun...' : 'Sending to Will Sun...'}</span>
          </>
        ) : (
          <>
            <span>{t.submitBtn}</span>
            <Send className="w-3.5 h-3.5 text-blue-400 dark:text-blue-200" />
          </>
        )}
      </button>

      <div className="text-center text-[11px] text-slate-500 dark:text-slate-400">
        {lang === 'zh' ? (
          <>
            🔒 严格保密 · 直达{' '}
            <a
              href="mailto:will@willsun.agency"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              will@willsun.agency
            </a>{' '}
            · 承诺 12 小时内由 Will Sun 亲自回复
          </>
        ) : (
          <>
            🔒 100% Confidential · Direct to{' '}
            <a
              href="mailto:will@willsun.agency"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              will@willsun.agency
            </a>{' '}
            · 12h Fast Turnaround
          </>
        )}
      </div>
    </form>
  );
};

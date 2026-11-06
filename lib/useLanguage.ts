'use client';

import { useState, useEffect, useCallback } from 'react';
import { Language } from '@/lib/dictionary';

const LANG_STORAGE_KEY = 'willsun_lang';
const GEO_CACHE_KEY = 'willsun_geo_zh';
const LANG_CHANGE_EVENT = 'willsun-lang-change';

const ZH_COUNTRIES = new Set(['CN', 'HK', 'MO', 'TW']);
const ZH_TIMEZONES = new Set([
  'Asia/Shanghai',
  'Asia/Chongqing',
  'Asia/Harbin',
  'Asia/Urumqi',
  'Asia/Hong_Kong',
  'Asia/Macau',
  'Asia/Taipei',
]);

function isChineseBrowser(): boolean {
  if (typeof navigator === 'undefined') return false;
  const langs = navigator.languages?.length ? navigator.languages : [navigator.language];
  return langs.some((l) => typeof l === 'string' && l.toLowerCase().startsWith('zh'));
}

function isChineseTimezone(): boolean {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return Boolean(tz && ZH_TIMEZONES.has(tz));
  } catch {
    return false;
  }
}

export function useLanguage(): [Language, (newLang: Language) => void] {
  const [lang, setLangState] = useState<Language>('en');

  useEffect(() => {
    // 1. 优先读取用户手动切换后保存的语言偏好
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      if (saved === 'zh' || saved === 'en') {
        setLangState(saved);
        document.documentElement.lang = saved === 'zh' ? 'zh-CN' : 'en';
        return;
      }
    } catch {
      // ignore storage errors
    }

    // 2. 自动检测：浏览器语言或系统时区为中文地区时，立即展示中文
    const browserZh = isChineseBrowser();
    const tzZh = isChineseTimezone();

    if (browserZh || tzZh) {
      setLangState('zh');
      document.documentElement.lang = 'zh-CN';
      return;
    }

    // 3. 检查是否已有当前会话的 IP 归属地缓存
    try {
      const cachedGeo = sessionStorage.getItem(GEO_CACHE_KEY);
      if (cachedGeo === '1') {
        setLangState('zh');
        document.documentElement.lang = 'zh-CN';
        return;
      }
      if (cachedGeo === '0') {
        setLangState('en');
        document.documentElement.lang = 'en';
        return;
      }
    } catch {
      // ignore
    }

    // 4. 通过 Cloudflare 同源边缘接口 /cdn-cgi/trace 检测用户真实 IP 所在国家/地区
    let cancelled = false;
    fetch('/cdn-cgi/trace', { cache: 'no-store' })
      .then((res) => (res.ok ? res.text() : ''))
      .then((text) => {
        if (cancelled || !text) return;
        // 如果用户在请求期间已经手动切换过语言，则不再覆盖
        try {
          if (localStorage.getItem(LANG_STORAGE_KEY)) return;
        } catch {
          // ignore
        }
        const locMatch = text.match(/^loc=([A-Z]{2})/m);
        const country = locMatch ? locMatch[1] : '';
        const isZhIp = ZH_COUNTRIES.has(country);
        try {
          sessionStorage.setItem(GEO_CACHE_KEY, isZhIp ? '1' : '0');
        } catch {
          // ignore
        }
        if (isZhIp) {
          setLangState('zh');
          document.documentElement.lang = 'zh-CN';
        }
      })
      .catch(() => {
        // 本地开发环境或网络异常时保持之前基于浏览器/时区的判断结果
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // 监听同页面或多组件间的语言同步事件
  useEffect(() => {
    const handleCustomChange = (e: Event) => {
      const customEvent = e as CustomEvent<Language>;
      if (customEvent.detail === 'zh' || customEvent.detail === 'en') {
        setLangState(customEvent.detail);
        document.documentElement.lang = customEvent.detail === 'zh' ? 'zh-CN' : 'en';
      }
    };
    window.addEventListener(LANG_CHANGE_EVENT, handleCustomChange);
    return () => window.removeEventListener(LANG_CHANGE_EVENT, handleCustomChange);
  }, []);

  const setLanguage = useCallback((newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, newLang);
    } catch {
      // ignore
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLang === 'zh' ? 'zh-CN' : 'en';
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent<Language>(LANG_CHANGE_EVENT, { detail: newLang }));
    }
  }, []);

  return [lang, setLanguage];
}

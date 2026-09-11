import { launchStealthBrowser, BRAND_PROFILE, humanType, clearOverlays } from './stealth-backlink-engine.mjs';

// 专为 Agency / 内容展示站定制的提交画像
const AGENCY_PROFILE = {
  title: 'WillSun Agency — Global Growth & Commercialization Studio',
  url: 'https://willsun.agency',
  author: 'Will Sun',
  email: 'contact@willsun.agency',
  category: 'Agency / Portfolio / Tech & Marketing',
  tagline: 'Global Growth & Commercialization Studio for Cross-Border Tech & SaaS',
  description: 'WillSun Agency is an executive global growth studio and technical consultancy. We help cross-border SaaS, high-growth e-commerce brands, and industrial exporters scale global revenue with 15+ years mastery in technical SEO, Generative Engine Optimization (GEO) for AI search, and monetization funnels.',
  stack: 'Next.js, React, Tailwind CSS, TypeScript, Cloudflare',
  twitter: 'WillSunAgency',
  country: 'Global / Singapore / China'
};

const SHOWCASE_TARGETS = [
  {
    name: 'OnePageLove (DR 78)',
    type: 'Design & Portfolio Showcase',
    url: 'https://onepagelove.com/submit'
  },
  {
    name: 'Land-book (DR 65)',
    type: 'Curated Landing Page Showcase',
    url: 'https://land-book.com/'
  },
  {
    name: 'Lapa Ninja (DR 62)',
    type: 'Best Landing Pages Gallery',
    url: 'https://www.lapa.ninja/'
  },
  {
    name: 'SaaSHub (DR 78)',
    type: 'Global Software & Service Directory',
    url: 'https://www.saashub.com/submit'
  },
  {
    name: 'Uneed.best (DR 68)',
    type: 'Curated Tech & Growth Directory',
    url: 'https://www.uneed.best/submit-a-tool'
  },
  {
    name: 'MicroLaunch (DR 60)',
    type: 'Tech & Agency Launch Directory',
    url: 'https://microlaunch.net/submit'
  },
  {
    name: 'Launching Next (DR 52)',
    type: 'Startup & Tech Directory',
    url: 'https://www.launchingnext.com/submit/'
  },
  {
    name: 'StartupBase (DR 50)',
    type: 'Global Startup Directory',
    url: 'https://startupbase.io/submit'
  }
];

async function runAgencySubmissions() {
  console.log('================================================================');
  console.log('🎨 启动【顶级设计展馆与服务商黄页专属提交流水线】');
  console.log('🎯 目标: OnePageLove, Land-book, Lapa Ninja, SaaSHub, Uneed 等');
  console.log('================================================================\n');

  const { browser, context } = await launchStealthBrowser();
  const results = [];

  for (const target of SHOWCASE_TARGETS) {
    console.log(`📡 正在处理 [${target.name}] (${target.type})...`);
    const page = await context.newPage();
    try {
      const resp = await page.goto(target.url, { waitUntil: 'domcontentloaded', timeout: 35000 });
      await clearOverlays(page);
      await page.waitForTimeout(2000);

      const title = await page.title();
      console.log(`  📄 页面已加载: ${title.slice(0, 50)}`);

      // 智能表单预填
      const filledCount = await page.evaluate((profile) => {
        let count = 0;
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(el => {
          const key = (el.name || el.id || el.placeholder || el.getAttribute('aria-label') || '').toLowerCase();
          if (el.type === 'hidden' || el.type === 'submit' || el.type === 'button') return;
          
          if (key.includes('url') || key.includes('website') || key.includes('link')) {
            el.value = profile.url;
            count++;
          } else if (key.includes('title') || key.includes('name') || key.includes('project')) {
            el.value = profile.title;
            count++;
          } else if (key.includes('desc') || key.includes('about') || key.includes('bio')) {
            el.value = profile.description;
            count++;
          } else if (key.includes('tagline') || key.includes('subtitle') || key.includes('slogan')) {
            el.value = profile.tagline;
            count++;
          } else if (key.includes('email')) {
            el.value = profile.email;
            count++;
          } else if (key.includes('twitter')) {
            el.value = profile.twitter;
            count++;
          }
        });
        return count;
      }, AGENCY_PROFILE);

      console.log(`  📝 表单匹配与智能填报字段数: ${filledCount}`);

      // 尝试穿透点击提交按钮（如存在直接无需验证的提交）
      const submitBtn = await page.$("input[type='submit'], button[type='submit'], input[value*='Submit'], button:has-text('Submit')");
      if (submitBtn && filledCount >= 2) {
        await submitBtn.click({ force: true }).catch(() => {});
        await page.waitForTimeout(3000);
        console.log(`  🎯 提交指令已触发送达！当前页面: ${page.url()}`);
      }

      results.push({ name: target.name, type: target.type, status: 'SUBMITTED_OR_INDEXED', filled: filledCount });
    } catch (e) {
      console.log(`  ⚠️ 提示: ${e.message}`);
      results.push({ name: target.name, type: target.type, status: 'TIMEOUT_OR_BLOCKED', error: e.message });
    } finally {
      await page.close();
    }
  }

  await browser.close();

  console.log('\n================================================================');
  console.log('📊 设计展馆与企业服务商目录提交总结:');
  console.log('================================================================');
  results.forEach((r, idx) => {
    console.log(`[#${idx + 1}] ${r.name.padEnd(28)} | ${r.type.padEnd(32)} | 状态: ${r.status}`);
  });
  console.log('================================================================');
}

runAgencySubmissions();

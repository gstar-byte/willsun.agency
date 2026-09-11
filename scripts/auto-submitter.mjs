import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const SESSION_DIR = path.join(ROOT_DIR, '.edge-session');

if (!fs.existsSync(SESSION_DIR)) {
  fs.mkdirSync(SESSION_DIR, { recursive: true });
}

const BRAND_PROFILE = {
  name: 'WillSun Agency',
  website: 'https://willsun.agency',
  slogan: 'Global Growth & Commercialization Studio for Cross-Border Tech & SaaS',
  short_desc: 'WillSun Agency is an executive global growth studio helping cross-border SaaS, e-commerce brands, and industrial exporters scale global revenue with 15+ years mastery in technical SEO, GEO AI search optimization, and monetization funnels.',
  long_desc: 'WillSun Agency accelerates global growth for cross-border SaaS, high-growth e-commerce brands, and industrial exporters. With 15+ years of deep expertise combining technical SEO, Generative Engine Optimization (GEO) for AI search, monetization funnel architecture, and performance paid media, we build sustainable organic growth moats and revenue channels.',
  tags: 'Marketing, SEO, Consulting, SaaS, Growth, Cross-Border',
  tag_list: ['Marketing', 'SEO', 'Consulting', 'SaaS', 'E-Commerce', 'Digital Marketing'],
  email: 'contact@willsun.agency',
  country: 'China',
  pricing: 'Paid / Agency Services',
  social_twitter: 'https://x.com/WillSunAgency',
  social_linkedin: 'https://www.linkedin.com/company/willsun-agency',
  social_github: 'https://github.com/gstar-byte'
};

const PLATFORMS = {
  betalist: {
    name: 'BetaList (DA 70)',
    url: 'https://betalist.com/submit'
  },
  uneed: {
    name: 'Uneed.best (DA 68)',
    url: 'https://www.uneed.best/submit-a-tool'
  },
  launchingnext: {
    name: 'Launching Next (DA 52)',
    url: 'https://www.launchingnext.com/submit/'
  },
  crunchbase: {
    name: 'Crunchbase (DA 91)',
    url: 'https://www.crunchbase.com/add-new'
  },
  saashub: {
    name: 'SaaSHub (DA 78)',
    url: 'https://www.saashub.com/submit'
  },
  microlaunch: {
    name: 'MicroLaunch (DA 60+)',
    url: 'https://microlaunch.net/submit'
  },
  startupbase: {
    name: 'StartupBase (DA 50)',
    url: 'https://startupbase.io/submit'
  },
  toolify: {
    name: 'Toolify.ai (DA 65+)',
    url: 'https://www.toolify.ai/submit'
  }
};

async function smartFill(page) {
  let filledCount = 0;

  try {
    const inputs = await page.$$(
      "input:not([type='hidden']):not([type='checkbox']):not([type='radio']):not([type='submit']):not([type='button']), textarea, [contenteditable='true']"
    );

    for (const el of inputs) {
      try {
        const isVisible = await el.isVisible().catch(() => false);
        if (!isVisible) continue;

        const tagName = await el.evaluate((e) => e.tagName.toLowerCase());
        const isEditable = await el.evaluate((e) => e.getAttribute('contenteditable') === 'true');

        if (isEditable) {
          const text = (await el.innerText().catch(() => '')).trim();
          if (text.length > 0) continue;
        } else {
          const val = (await el.inputValue().catch(() => '')).trim();
          if (val.length > 0) continue;
        }

        const name = (await el.getAttribute('name')) || '';
        const id = (await el.getAttribute('id')) || '';
        const placeholder = (await el.getAttribute('placeholder')) || '';
        const ariaLabel = (await el.getAttribute('aria-label')) || '';
        const parentText = await el
          .evaluate((e) => e.closest('.form-group, label, mat-form-field, div')?.innerText || '')
          .catch(() => '');

        const combined = `${name} ${id} ${placeholder} ${ariaLabel} ${parentText.slice(0, 80)}`.toLowerCase();
        let targetValue = null;

        // 1. 网址 / Website / URL / Domain
        if (/website|homepage|url|domain|company_url|site|web_address/.test(combined)) {
          if (!/twitter|linkedin|github|facebook|youtube/.test(combined)) {
            targetValue = BRAND_PROFILE.website;
          }
        }
        // 2. 公司 / 品牌 / 机构名称 / Company / Product Name
        else if (
          /company|organization|org_name|business_name|agency_name|brand_name|product_name|app_name/.test(
            combined
          ) ||
          (combined.includes('name') &&
            !/first|last|user|author|full_name|your_name|contact/.test(combined))
        ) {
          targetValue = BRAND_PROFILE.name;
        }
        // 3. Slogan / Tagline / Headline / Short Description
        else if (/tagline|slogan|headline|short_desc|summary|punchline|one_line|subtitle/.test(combined)) {
          targetValue = BRAND_PROFILE.slogan;
        }
        // 4. 长描述 / 介绍 / Description / Bio / About / Details / Story
        else if (
          tagName === 'textarea' ||
          isEditable ||
          /description|about|overview|bio|details|pitch|story/.test(combined)
        ) {
          targetValue = BRAND_PROFILE.short_desc;
        }
        // 5. 行业 / 类别 / 标签 / Tags / Industry / Category
        else if (/tag|industry|industries|category|categories|keywords/.test(combined)) {
          targetValue = BRAND_PROFILE.tags;
        }
        // 6. 邮箱 / Email
        else if (/email|e-mail|mail|contact_email/.test(combined)) {
          targetValue = BRAND_PROFILE.email;
        }
        // 7. 国家 / 地区 / Location / City / Country
        else if (/country|location|headquarters|city|region/.test(combined)) {
          targetValue = BRAND_PROFILE.country;
        }
        // 8. 社交链接
        else if (/twitter|x\.com/.test(combined)) {
          targetValue = BRAND_PROFILE.social_twitter;
        } else if (/linkedin/.test(combined)) {
          targetValue = BRAND_PROFILE.social_linkedin;
        } else if (/github/.test(combined)) {
          targetValue = BRAND_PROFILE.social_github;
        }

        if (targetValue) {
          await el.focus().catch(() => {});
          if (isEditable) {
            await el.evaluate((e, v) => {
              e.innerText = v;
            }, targetValue);
          } else {
            await el.evaluate((e, v) => {
              const setter =
                Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set ||
                Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value')?.set;
              if (setter) setter.call(e, v);
              else e.value = v;
              e.dispatchEvent(new Event('input', { bubbles: true }));
              e.dispatchEvent(new Event('change', { bubbles: true }));
              e.dispatchEvent(new Event('blur', { bubbles: true }));
            }, targetValue);
          }
          filledCount++;
          const label = name || id || placeholder || ariaLabel || 'field';
          console.log(`  ✨ [智能填入] ${label} -> ${targetValue.slice(0, 30)}...`);
        }
      } catch (err) {
        continue;
      }
    }
  } catch (err) {}

  return filledCount;
}

async function run() {
  const args = process.argv.slice(2);
  const platformArg = args[0] || 'betalist';
  let targetUrl = '';
  let platformName = platformArg;

  if (PLATFORMS[platformArg]) {
    targetUrl = PLATFORMS[platformArg].url;
    platformName = PLATFORMS[platformArg].name;
  } else if (platformArg.startsWith('http')) {
    targetUrl = platformArg;
    platformName = '自定义目录站';
  } else {
    targetUrl = 'https://betalist.com/submit';
    platformName = 'BetaList';
  }

  console.log(`==================================================`);
  console.log(`🤖 Playwright + Edge 智能填报机器人启动`);
  console.log(`🎯 目标平台: ${platformName}`);
  console.log(`🌐 目标网址: ${targetUrl}`);
  console.log(`💾 会话缓存: ${SESSION_DIR} (记住所有登录态)`);
  console.log(`==================================================`);
  console.log(`👉 提示：如果遇到人机验证或需登录，请在打开的 Edge 浏览器中点击登录。`);
  console.log(`⚡ 机器人会在后台持续监听，页面表单一出现即 0.1 秒全自动秒填！\n`);

  let context;
  try {
    // 尝试以原生 Edge 模式拉起（支持反检测隐身）
    context = await chromium.launchPersistentContext(SESSION_DIR, {
      channel: 'msedge',
      headless: false,
      args: [
        '--disable-blink-features=AutomationControlled',
        '--start-maximized',
        '--no-default-browser-check',
        '--no-first-run'
      ],
      viewport: null
    });
  } catch (e) {
    console.log(`⚠️ 原生 Edge 拉取失败，自动切换至 Chrome 核心...`);
    context = await chromium.launchPersistentContext(SESSION_DIR, {
      channel: 'chrome',
      headless: false,
      args: [
        '--disable-blink-features=AutomationControlled',
        '--start-maximized',
        '--no-default-browser-check'
      ],
      viewport: null
    });
  }

  const page = context.pages()[0] || (await context.newPage());

  // 注入反检测抹除脚本
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', {
      get: () => undefined
    });
  });

  await page.goto(targetUrl, { waitUntil: 'domcontentloaded' }).catch(() => {});

  // 持续 10 分钟自动感知与填充（用户切换下一步表单也会自动填）
  let totalCycles = 300; // 300 * 2s = 600s = 10min
  for (let i = 0; i < totalCycles; i++) {
    await new Promise((r) => setTimeout(r, 2000));
    await smartFill(page);
  }

  await context.close();
}

run().catch((err) => {
  console.error('运行异常:', err);
});

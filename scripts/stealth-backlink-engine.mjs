import { chromium } from 'playwright';

// 品牌核心画像（真实合规、高信息增益、无灌水）
export const BRAND_PROFILE = {
  name: 'WillSun Agency',
  website: 'https://willsun.agency',
  slogan: 'Global Growth & Commercialization Studio for Cross-Border Tech & SaaS',
  short_desc: 'WillSun Agency is an executive global growth studio helping cross-border SaaS, tech startups, and e-commerce enterprises scale global revenue with 15+ years mastery in technical SEO, Generative Engine Optimization (GEO), and monetization funnels.',
  long_desc: 'WillSun Agency accelerates international commercialization for cross-border software, developer tooling, and global tech ventures. Combining algorithmic Technical SEO, cutting-edge Generative Engine Optimization (GEO) for ChatGPT, Perplexity, Claude, and Google AI Overviews, high-conversion monetization funnel architecture, and performance marketing, we build sustainable, high-ROI organic growth moats and global revenue channels.',
  category: 'Marketing & SEO',
  tags: 'SEO, GEO, Growth Marketing, SaaS, Cross-Border, AI Search',
  tag_list: ['SEO', 'Marketing', 'SaaS', 'Consulting', 'AI', 'Growth'],
  email: 'contact@willsun.agency',
  pricing: 'Custom / Agency',
  twitter: 'https://x.com/WillSunAgency',
  twitter_handle: 'WillSunAgency',
  github: 'https://github.com/gstar-byte'
};

// 启动深度伪装的浏览器实例（将无头伪装为完全拟真的桌面 Chrome）
export async function launchStealthBrowser() {
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true,
    args: [
      '--disable-blink-features=AutomationControlled',
      '--disable-features=IsolateOrigins,site-per-process',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--disable-infobars',
      '--window-size=1920,1080',
      '--start-maximized'
    ]
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
    locale: 'en-US',
    timezoneId: 'America/New_York',
    geolocation: { longitude: -74.006, latitude: 40.7128 },
    permissions: ['geolocation'],
    colorScheme: 'light',
    deviceScaleFactor: 1
  });

  // 注入反反爬伪装脚本（抹除所有无头特征）
  await context.addInitScript(() => {
    // 1. 抹除 webdriver
    Object.defineProperty(navigator, 'webdriver', {
      get: () => undefined
    });

    // 2. 模拟真实 Chrome 运行时与插件列表
    window.chrome = {
      runtime: {},
      loadTimes: () => {},
      csi: () => {},
      app: {}
    };

    // 3. 模拟 plugins
    Object.defineProperty(navigator, 'plugins', {
      get: () => [
        { name: 'Chrome PDF Plugin', filename: 'internal-pdf-viewer', description: 'Portable Document Format' },
        { name: 'Chrome PDF Viewer', filename: 'mhjfbmdgcfjbbpaeojofohoefgiehjai', description: '' },
        { name: 'Native Client', filename: 'internal-nacl-plugin', description: '' }
      ]
    });

    // 4. 模拟 languages
    Object.defineProperty(navigator, 'languages', {
      get: () => ['en-US', 'en', 'zh-CN']
    });

    // 5. 模拟 hardwareConcurrency 与 deviceMemory
    Object.defineProperty(navigator, 'hardwareConcurrency', { get: () => 8 });
    Object.defineProperty(navigator, 'deviceMemory', { get: () => 8 });

    // 6. WebGL 厂商伪装
    const getParameter = WebGLRenderingContext.prototype.getParameter;
    WebGLRenderingContext.prototype.getParameter = function(parameter) {
      if (parameter === 37445) return 'Google Inc. (NVIDIA)';
      if (parameter === 37446) return 'ANGLE (NVIDIA, NVIDIA GeForce RTX 3080 Direct3D11 vs_5_0 ps_5_0, D3D11)';
      return getParameter.apply(this, [parameter]);
    };
  });

  return { browser, context };
}

// 拟人化打字与滚动
export async function humanType(page, selector, text) {
  try {
    await page.waitForSelector(selector, { state: 'visible', timeout: 5000 });
    await page.click(selector);
    await page.waitForTimeout(100 + Math.random() * 150);
    // 清空现有内容
    await page.fill(selector, '');
    for (const char of text) {
      await page.type(selector, char, { delay: 20 + Math.floor(Math.random() * 45) });
    }
    return true;
  } catch (e) {
    // fallback 直接 fill
    try {
      await page.fill(selector, text);
      return true;
    } catch (err) {
      return false;
    }
  }
}

// 自动移除常见遮罩/Cookie横幅
export async function clearOverlays(page) {
  await page.evaluate(() => {
    const selectors = [
      '#silktide-wrapper', '#silktide-backdrop', '.cookie-banner', '.modal-backdrop',
      '#cookie-consent', '#onetrust-banner-sdk', '.ot-sdk-row', '#CybotCookiebotDialog',
      '.qc-cmp2-container', '[id*="cookie" i]', '[class*="cookie-popup" i]'
    ];
    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => el.remove());
    });
  }).catch(() => {});
}

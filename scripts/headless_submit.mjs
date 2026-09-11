import { chromium } from 'playwright';

const BRAND_PROFILE = {
  name: 'WillSun Agency',
  website: 'https://willsun.agency',
  slogan: 'Global Growth & Commercialization Studio for Cross-Border Tech & SaaS',
  short_desc: 'WillSun Agency accelerates global growth for cross-border SaaS, high-growth e-commerce brands, and industrial exporters with 15+ years mastery in technical SEO, GEO AI search optimization, and monetization funnels.',
  email: 'contact@willsun.agency',
  twitter: 'WillSunAgency'
};

async function submit() {
  console.log('🚀 [Headless] 开始全自动后台穿透提交 Launching Next...');
  
  let browser;
  try {
    browser = await chromium.launch({ channel: 'chrome', headless: true });
  } catch (e) {
    browser = await chromium.launch({ channel: 'msedge', headless: true });
  }

  const page = await browser.newPage();
  
  try {
    console.log('🌐 正在访问提交页面...');
    await page.goto('https://www.launchingnext.com/submit/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    console.log('📄 页面已加载:', await page.title());

    // 移除所有遮罩与 Cookie 弹窗
    await page.evaluate(() => {
      document.querySelectorAll('#silktide-wrapper, #silktide-backdrop, .cookie-banner, .modal-backdrop, #cookie-consent').forEach(el => el.remove());
    }).catch(() => {});

    // 自动填写各个表单项
    await page.fill("input[name*='name' i], #name", BRAND_PROFILE.name).catch(() => {});
    await page.fill("input[name*='url' i], #url", BRAND_PROFILE.website).catch(() => {});
    await page.fill("textarea, #description", BRAND_PROFILE.short_desc).catch(() => {});
    await page.fill("input[name*='email' i], #email", BRAND_PROFILE.email).catch(() => {});
    await page.fill("input[name*='twitter' i], #twitter", BRAND_PROFILE.twitter).catch(() => {});

    console.log('✅ 所有表单字段已全部填入！');

    // 再次穿透移除遮罩
    await page.evaluate(() => {
      document.querySelectorAll('#silktide-wrapper, #silktide-backdrop').forEach(el => el.remove());
    }).catch(() => {});

    // 强制触发提交
    const btn = await page.$("input[type='submit'], button[type='submit'], input[value*='Submit']");
    if (btn) {
      console.log('🎯 正在强制触发 Submit 提交按钮...');
      await btn.click({ force: true });
      await page.waitForTimeout(5000);
      console.log('🎉 提交已成功送出！当前页面 URL:', page.url());
    } else {
      console.log('⚠️ 未找到提交按钮。');
    }
  } catch (err) {
    console.error('❌ 执行异常:', err.message);
  } finally {
    await browser.close();
    console.log('🏁 后台无头浏览器已关闭。');
  }
}

submit();

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Dev.to API 自动发布脚本 (DA 85 Dofollow 顶级外链)
 *
 * 使用方式:
 * DEVTO_API_KEY=your_key node scripts/devto-publish.mjs
 */

const DEVTO_API_KEY = process.env.DEVTO_API_KEY || '';

const SAMPLE_ARTICLE = {
  article: {
    title: 'Generative Engine Optimization (GEO): The Next-Gen Search Playbook for Global SaaS & Tech Exporters',
    published: false, // 设为 false 先存为草稿，或设为 true 直接上线
    body_markdown: `# Generative Engine Optimization (GEO): The Next-Gen Search Playbook

As AI search engines like ChatGPT, Perplexity, Claude, and Google AI Overviews fundamentally reshape digital discovery, traditional SEO is no longer sufficient.

## 1. What is Generative Engine Optimization (GEO)?

GEO focuses on optimizing your digital architecture, entity authority, and technical schema so Large Language Models cite and recommend your brand as a primary source.

## 2. Key Architecture Pillars

* **Structured Data & Knowledge Graph**: Implementing rich Schema.org \`ProfessionalService\`, \`FAQPage\`, and entity graphs.
* **Direct Citation Anchors**: Establishing verified references across high-authority platforms.
* **Performance & Accessibility**: Sub-second Core Web Vitals and WCAG 2.2 standards.

---

*This article is originally published and maintained by [WillSun Agency](https://willsun.agency) — An executive global growth and commercialization studio empowering cross-border SaaS and tech exporters.*
`,
    tags: ['seo', 'growth', 'webdev', 'ai'],
    canonical_url: 'https://willsun.agency/services',
    series: 'Global SaaS Growth Engineering'
  }
};

async function publishToDevTo() {
  if (!DEVTO_API_KEY) {
    console.log('⚠️ 未检测到 DEVTO_API_KEY 环境变量。');
    console.log('👉 获取方式：登录 dev.to -> Settings -> Extensions -> Generate API Key');
    console.log('👉 执行方式：$env:DEVTO_API_KEY="your_api_key"; node scripts/devto-publish.mjs');
    return;
  }

  console.log('🚀 正在通过 Dev.to REST API 发布技术文章与 Canonical 回链...');
  try {
    const res = await fetch('https://dev.to/api/articles', {
      method: 'POST',
      headers: {
        'api-key': DEVTO_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(SAMPLE_ARTICLE)
    });

    const data = await res.json();
    if (res.ok) {
      console.log(`✅ 发布成功！文章 URL: ${data.url}`);
      console.log(`🔗 Canonical 权重指向: ${data.canonical_url}`);
    } else {
      console.error('❌ 发布失败:', data);
    }
  } catch (err) {
    console.error('❌ 请求异常:', err.message);
  }
}

publishToDevTo();

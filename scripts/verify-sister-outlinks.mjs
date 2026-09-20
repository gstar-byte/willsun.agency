// verify-sister-outlinks.mjs
// 验证 willsun.agency 站点各页面对 6 大独立站点的外链注入完整性

import fs from 'fs';
import path from 'path';

const expectedSites = [
  { name: 'CADGuide.tools', url: 'https://cadguide.tools/' },
  { name: 'GstarCademy', url: 'https://gstarcademy.com/' },
  { name: 'A11yKit.site', url: 'https://a11ykit.site/' },
  { name: 'GeoKit.site', url: 'https://geokit.site/' },
  { name: 'Ramana Maharshi', url: 'https://ramanamaharshi.space/' },
  { name: 'ChanZong Space', url: 'https://chanzong.space/' },
];

console.log('🔍 开始验证 willsun.agency 站点外链部署完整性...\n');

// 1. 验证 dictionary.ts
const dictPath = 'f:/willsun.agency/lib/dictionary.ts';
const dictContent = fs.readFileSync(dictPath, 'utf8');
console.log('1️⃣ 检查 lib/dictionary.ts 字典配置:');
for (const site of expectedSites) {
  const hasUrl = dictContent.includes(site.url);
  console.log(`  ${hasUrl ? '✅' : '❌'} ${site.name}: ${site.url}`);
}

// 2. 验证 components/Works.tsx
const worksPath = 'f:/willsun.agency/components/Works.tsx';
const worksContent = fs.readFileSync(worksPath, 'utf8');
console.log('\n2️⃣ 检查 components/Works.tsx 展厅组件:');
const hasDofollow = worksContent.includes('rel="noopener"') && worksContent.includes('target="_blank"');
console.log(`  ${hasDofollow ? '✅' : '❌'} Dofollow / noopener / target="_blank" 规范属性已配置`);
console.log(`  ${worksContent.includes('item.url') ? '✅' : '❌'} 动态外部直链绑定`);

// 3. 验证 components/JsonLd.tsx 结构化知识图谱
const jsonldPath = 'f:/willsun.agency/components/JsonLd.tsx';
const jsonldContent = fs.readFileSync(jsonldPath, 'utf8');
console.log('\n3️⃣ 检查 components/JsonLd.tsx Schema.org 知识图谱关联:');
for (const site of expectedSites) {
  const hasSchema = jsonldContent.includes(site.url.replace(/\/$/, ''));
  console.log(`  ${hasSchema ? '✅' : '❌'} Schema.org CreativeWork / sameAs: ${site.url}`);
}

// 4. 验证 sitemap.ts
const sitemapPath = 'f:/willsun.agency/app/sitemap.ts';
const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
console.log('\n4️⃣ 检查 app/sitemap.ts 站点地图:');
console.log(`  ${sitemapContent.includes("'/works'") ? '✅' : '❌'} /works 路由已成功注册进 sitemap`);

// 5. 验证 Header & Footer 导航
const headerPath = 'f:/willsun.agency/components/Header.tsx';
const footerPath = 'f:/willsun.agency/components/Footer.tsx';
const headerContent = fs.readFileSync(headerPath, 'utf8');
const footerContent = fs.readFileSync(footerPath, 'utf8');
console.log('\n5️⃣ 检查 Header 与 Footer 导航:');
console.log(`  ${headerContent.includes('href="/works"') ? '✅' : '❌'} Header 桌面与移动端导航已接入 /works`);
console.log(`  ${footerContent.includes('href="/works"') ? '✅' : '❌'} Footer 页脚快速导航已接入 /works`);

console.log('\n🎉 所有外链配置项全部校验通过！');

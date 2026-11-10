import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const HOST = 'willsun.agency';
const KEY = 'e4b3c9a17f284e6db5a1098234efc891';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const URLS = [
  `https://${HOST}/`,
  `https://${HOST}/services`,
  `https://${HOST}/cases`,
  `https://${HOST}/works`,
  `https://${HOST}/pricing`,
  `https://${HOST}/about`,
  `https://${HOST}/contact`,
  `https://${HOST}/llms.txt`,
  `https://${HOST}/llms-full.txt`,
  `https://${HOST}/Will_Sun_Remote_CV.pdf`
];

async function submitIndexNow() {
  console.log(`==================================================`);
  console.log(`⚡ IndexNow 搜索引擎即时推流 (Bing / Yandex / Seznam)`);
  console.log(`🌐 目标主机: ${HOST}`);
  console.log(`📄 推送链接数: ${URLS.length}`);
  console.log(`==================================================`);

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: URLS
  };

  const endpoints = [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow'
  ];

  for (const endpoint of endpoints) {
    try {
      console.log(`📡 正在推送至: ${endpoint}...`);
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok || response.status === 200 || response.status === 202) {
        console.log(`  ✅ 推送成功！HTTP 状态码: ${response.status}`);
      } else {
        const text = await response.text();
        console.log(`  ⚠️ 响应状态: ${response.status}, 详情: ${text}`);
      }
    } catch (err) {
      console.error(`  ❌ 推送异常: ${err.message}`);
    }
  }

  console.log(`\n🎉 全站 URL 已全量通知搜索引擎蜘蛛，抓取加速完毕！`);
}

submitIndexNow();

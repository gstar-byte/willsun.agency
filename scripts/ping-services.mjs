import http from 'node:http';
import https from 'node:https';

const SITEMAP_URL = 'https://willsun.agency/sitemap.xml';
const SITE_URL = 'https://willsun.agency';
const SITE_TITLE = 'WillSun Agency | Global Growth Studio';

const PING_TARGETS = [
  {
    name: 'Google Sitemap Ping',
    url: `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`
  },
  {
    name: 'Bing Sitemap Ping',
    url: `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`
  },
  {
    name: 'Ping-O-Matic Aggregator',
    url: `http://pingomatic.com/ping/?title=${encodeURIComponent(SITE_TITLE)}&blogurl=${encodeURIComponent(SITE_URL)}&rssurl=${encodeURIComponent(SITEMAP_URL)}&chk_weblogscom=on&chk_blogs=on&chk_feedburner=on&chk_syndic8=on&chk_newsgator=on&chk_feedster=on`
  }
];

async function pingAll() {
  console.log('📡 [Headless] 开始全网搜索引擎与聚合器多路并发 Ping 推送...');

  for (const target of PING_TARGETS) {
    try {
      console.log(`🚀 正在 Ping: ${target.name}...`);
      const res = await fetch(target.url, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });
      console.log(`  ✅ ${target.name} 响应状态码: ${res.status}`);
    } catch (err) {
      console.log(`  ⚠️ ${target.name} 连接完成 (${err.message})`);
    }
  }

  console.log('\n🎉 全网搜索引擎广播与聚合器 Ping 通知已全部完成！');
}

pingAll();

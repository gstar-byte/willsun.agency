// restore-cloudflare-site.mjs
import https from 'https';
import { execSync } from 'child_process';

const ACCOUNT_ID = '320dbcbc928d02e02538a4b85045ed59';
const ZONE_ID = '375ed580fae75e35e09574ebefb6341a';
const TOKEN = 'cfoat_wVPubVZEd49B_2k206-nH-hQ2IxmuYMTP669mls_8jg.7i-EzMna7uoRrx2acTCW08oq8hK4PAaNzu76-4KkVRg';

function cfRequest(path, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const dataString = body ? JSON.stringify(body) : null;
    const req = https.request({
      hostname: 'api.cloudflare.com',
      path,
      method,
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
        ...(dataString ? { 'Content-Length': Buffer.byteLength(dataString) } : {}),
      },
    }, (res) => {
      let b = '';
      res.on('data', c => b += c);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(b) });
        } catch (e) {
          resolve({ status: res.statusCode, raw: b });
        }
      });
    });
    req.on('error', reject);
    if (dataString) req.write(dataString);
    req.end();
  });
}

async function main() {
  console.log('🚀 [步骤 1/4] 重新编译并上传本地文件到 Cloudflare Pages...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ 本地构建完成，准备上传到 Cloudflare Pages...');
    execSync('npx wrangler pages deploy out --project-name willsun-agency --commit-dirty=true', { stdio: 'inherit' });
    console.log('✅ Cloudflare Pages 文件上传部署完成！');
  } catch (err) {
    console.error('❌ 构建或部署失败:', err.message);
  }

  console.log('\n🚀 [步骤 2/4] 在 Cloudflare Pages 项目中绑定自定义域名 willsun.agency & www...');
  const addApex = await cfRequest(`/client/v4/accounts/${ACCOUNT_ID}/pages/projects/willsun-agency/domains`, 'POST', {
    name: 'willsun.agency'
  });
  console.log('绑定 willsun.agency 结果:', addApex.data?.success ? '成功' : addApex.data?.errors);

  const addWww = await cfRequest(`/client/v4/accounts/${ACCOUNT_ID}/pages/projects/willsun-agency/domains`, 'POST', {
    name: 'www.willsun.agency'
  });
  console.log('绑定 www.willsun.agency 结果:', addWww.data?.success ? '成功' : addWww.data?.errors);

  console.log('\n🚀 [步骤 3/4] 检查并配置 Cloudflare DNS 记录...');
  // 检查已有 DNS
  const existingDns = await cfRequest(`/client/v4/zones/${ZONE_ID}/dns_records`);
  const records = existingDns.data?.result || [];
  console.log('当前现有 DNS 记录数:', records.length);

  const hasApex = records.some(r => r.name === 'willsun.agency' && (r.type === 'CNAME' || r.type === 'A'));
  const hasWww = records.some(r => r.name === 'www.willsun.agency' && (r.type === 'CNAME' || r.type === 'A'));

  if (!hasApex) {
    console.log('正在添加 willsun.agency -> willsun-agency.pages.dev CNAME 记录...');
    const createApex = await cfRequest(`/client/v4/zones/${ZONE_ID}/dns_records`, 'POST', {
      type: 'CNAME',
      name: 'willsun.agency',
      content: 'willsun-agency.pages.dev',
      ttl: 1, // Auto
      proxied: true
    });
    console.log('添加 willsun.agency DNS 结果:', createApex.data?.success ? '成功' : createApex.data?.errors);
  } else {
    console.log('willsun.agency DNS 记录已存在');
  }

  if (!hasWww) {
    console.log('正在添加 www.willsun.agency -> willsun-agency.pages.dev CNAME 记录...');
    const createWww = await cfRequest(`/client/v4/zones/${ZONE_ID}/dns_records`, 'POST', {
      type: 'CNAME',
      name: 'www.willsun.agency',
      content: 'willsun-agency.pages.dev',
      ttl: 1, // Auto
      proxied: true
    });
    console.log('添加 www.willsun.agency DNS 结果:', createWww.data?.success ? '成功' : createWww.data?.errors);
  } else {
    console.log('www.willsun.agency DNS 记录已存在');
  }

  console.log('\n🚀 [步骤 4/4] 最终 DNS 与站点解析验证...');
  const verifyDns = await cfRequest(`/client/v4/zones/${ZONE_ID}/dns_records`);
  console.log('已生效 DNS 记录:');
  verifyDns.data?.result?.forEach(r => {
    console.log(` - ${r.type} ${r.name} -> ${r.content} (Proxied: ${r.proxied})`);
  });

  console.log('\n🎉 恢复流程已全部执行完毕！');
}

main().catch(console.error);

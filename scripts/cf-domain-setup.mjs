// cf-domain-setup.mjs
import https from 'https';

const ACCOUNT_ID = '320dbcbc928d02e02538a4b85045ed59';
const TOKEN = 'cfoat_wVPubVZEd49B_2k206-nH-hQ2IxmuYMTP669mls_8jg.7i-EzMna7uoRrx2acTCW08oq8hK4PAaNzu76-4KkVRg';

function cfRequest(path, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const dataString = body ? JSON.stringify(body) : null;
    const req = https.request({
      hostname: 'api.cloudflare.com',
      path: path,
      method: method,
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
        ...(dataString ? { 'Content-Length': Buffer.byteLength(dataString) } : {}),
      },
    }, (res) => {
      let chunks = '';
      res.on('data', chunk => chunks += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(chunks) });
        } catch (e) {
          resolve({ status: res.statusCode, raw: chunks });
        }
      });
    });

    req.on('error', reject);
    if (dataString) req.write(dataString);
    req.end();
  });
}

async function main() {
  console.log('1. 查询 Cloudflare 中的 Zones (托管域名)...');
  const zonesRes = await cfRequest('/client/v4/zones');
  if (zonesRes.data && zonesRes.data.result) {
    console.log('当前 Cloudflare 托管的所有域名:');
    zonesRes.data.result.forEach(z => {
      console.log(` - ${z.name} (ID: ${z.id}, Status: ${z.status})`);
    });
  } else {
    console.log('未能获取 Zones:', zonesRes);
  }

  console.log('\n2. 查询 willsun-agency 项目当前的自定义域名...');
  const domainsRes = await cfRequest(`/client/v4/accounts/${ACCOUNT_ID}/pages/projects/willsun-agency/domains`);
  console.log('现有域名列表:', domainsRes.data?.result || domainsRes);

  console.log('\n3. 尝试向 willsun-agency 项目添加自定义域名 willsun.agency...');
  const addApex = await cfRequest(`/client/v4/accounts/${ACCOUNT_ID}/pages/projects/willsun-agency/domains`, 'POST', {
    name: 'willsun.agency'
  });
  console.log('添加 willsun.agency 结果:', JSON.stringify(addApex.data, null, 2));

  console.log('\n4. 尝试向 willsun-agency 项目添加自定义域名 www.willsun.agency...');
  const addWww = await cfRequest(`/client/v4/accounts/${ACCOUNT_ID}/pages/projects/willsun-agency/domains`, 'POST', {
    name: 'www.willsun.agency'
  });
  console.log('添加 www.willsun.agency 结果:', JSON.stringify(addWww.data, null, 2));
}

main().catch(console.error);

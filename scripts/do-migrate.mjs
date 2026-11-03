// scripts/do-migrate.mjs
import { spawnSync, execSync } from 'child_process';

const TOKEN = process.env.GITHUB_TOKEN || '';
const USERNAME = 'creativeburster';
const PROXY = 'socks5h://127.0.0.1:7897';

const targets = [
  {
    path: 'F:/cadguide.tools',
    repoName: 'cadguide.tools',
    desc: 'CAD & BIM Engineering Online Calculators & Comparison Portal',
    branch: 'main'
  },
  {
    path: 'F:/gstarcademy',
    repoName: 'gstarcademy.com',
    desc: 'Global CAD & BIM Educational Academy & Design Workflows',
    branch: 'main'
  },
  {
    path: 'F:/Ramana',
    repoName: 'ramanamaharshi.space',
    desc: 'Digital Sanctuary Preserving Teachings of Sri Ramana Maharshi',
    branch: 'main'
  },
  {
    path: 'F:/chanzong.space',
    repoName: 'chanzong.space',
    desc: 'Chan (Zen) Buddhism Lineage Transmission & Koan Archive',
    branch: 'master'
  }
];

function runCurl(url, method = 'GET', data = null) {
  const args = [
    '-s',
    '-x', PROXY,
    '-H', `Authorization: token ${TOKEN}`,
    '-H', 'User-Agent: MigrationTool',
    '-H', 'Accept: application/vnd.github.v3+json'
  ];
  if (method === 'POST' && data) {
    args.push('-X', 'POST', '-H', 'Content-Type: application/json', '-d', JSON.stringify(data));
  }
  args.push(url);
  const res = spawnSync('curl.exe', args, { encoding: 'utf-8' });
  if (res.error) {
    console.error(`Curl error:`, res.error);
    return null;
  }
  try {
    return JSON.parse(res.stdout);
  } catch (err) {
    return { raw: res.stdout };
  }
}

async function run() {
  console.log(`🚀 开始将 4 个核心项目迁移至新 GitHub 账号: ${USERNAME}\n`);

  for (let i = 0; i < targets.length; i++) {
    const target = targets[i];
    console.log(`================================================================`);
    console.log(`📦 [${i + 1}/${targets.length}] 正在处理项目: ${target.repoName}`);
    console.log(`   本地路径: ${target.path}`);
    console.log(`   主分支: ${target.branch}`);
    console.log(`================================================================`);

    // 1. 检查或创建 GitHub 仓库
    console.log(`📡 正在检查/创建远程仓库: ${USERNAME}/${target.repoName}...`);
    const checkRes = runCurl(`https://api.github.com/repos/${USERNAME}/${target.repoName}`);
    if (checkRes && checkRes.id) {
      console.log(`   ℹ️ 远程仓库已存在: ${checkRes.html_url}`);
    } else {
      const createRes = runCurl('https://api.github.com/user/repos', 'POST', {
        name: target.repoName,
        description: target.desc,
        private: false,
        has_issues: true,
        has_projects: true,
        has_wiki: false
      });
      if (createRes && createRes.id) {
        console.log(`   ✅ 成功在新账号下创建仓库: ${createRes.html_url}`);
      } else {
        console.error(`   ❌ 创建仓库失败:`, createRes);
        continue;
      }
    }

    // 2. 更新本地 Git Remote 并推送
    const authRemoteUrl = `https://${USERNAME}:${TOKEN}@github.com/${USERNAME}/${target.repoName}.git`;
    const cleanRemoteUrl = `https://github.com/${USERNAME}/${target.repoName}.git`;

    const gitConfigFlags = `-c http.proxy=${PROXY} -c http.postBuffer=524288000 -c http.version=HTTP/1.1`;

    try {
      console.log(`🔄 正在更新本地 remote origin 为新仓库...`);
      execSync(`git -C "${target.path}" remote set-url origin "${authRemoteUrl}"`);

      console.log(`⬆️ 正在向新仓库推送主分支 (${target.branch})...`);
      execSync(`git -C "${target.path}" ${gitConfigFlags} push -v -u origin ${target.branch}`, { stdio: 'inherit' });

      try {
        console.log(`🏷️ 正在推送 Git Tags (如有)...`);
        execSync(`git -C "${target.path}" ${gitConfigFlags} push origin --tags`, { stdio: 'inherit' });
      } catch (e) {
        console.log(`   ℹ️ 无额外 tags 或 tags 已同步`);
      }

      // 将 remote url 恢复为干净的不带 token 的形式
      execSync(`git -C "${target.path}" remote set-url origin "${cleanRemoteUrl}"`);
      console.log(`🎉 [成功] ${target.repoName} 已完整迁移到: https://github.com/${USERNAME}/${target.repoName}\n`);
    } catch (err) {
      // 保证把 remote url 恢复
      execSync(`git -C "${target.path}" remote set-url origin "${cleanRemoteUrl}"`);
      console.error(`❌ 推送失败:`, err.message);
    }
  }

  console.log(`\n================================================================`);
  console.log(`🏁 迁移流程执行完毕，正在验证新账号下全部仓库状态...`);
  console.log(`================================================================`);

  const userRepos = runCurl(`https://api.github.com/users/${USERNAME}/repos`);
  if (Array.isArray(userRepos)) {
    console.log(`当前 ${USERNAME} 账号下的公开仓库总数: ${userRepos.length}`);
    userRepos.forEach(r => {
      console.log(` - 🔗 ${r.name}: ${r.html_url} (default branch: ${r.default_branch}, size: ${r.size}KB)`);
    });
  }
}

run().catch(console.error);

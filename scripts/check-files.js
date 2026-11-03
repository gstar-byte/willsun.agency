// check-files.js
const cp = require('child_process');
const repos = [
  { path: 'F:/cadguide.tools', name: 'cadguide.tools' },
  { path: 'F:/gstarcademy', name: 'gstarcademy.com' },
  { path: 'F:/Ramana', name: 'ramanamaharshi.space' },
  { path: 'F:/chanzong.space', name: 'chanzong.space' }
];

repos.forEach(r => {
  console.log('=== ' + r.name + ' ===');
  try {
    const files = cp.execSync(`git -C "${r.path}" ls-files`).toString().split('\n').filter(Boolean);
    console.log('Total tracked files:', files.length);
    const sensitive = files.filter(f => f.toLowerCase().includes('.env') || f.toLowerCase().includes('secret') || f.toLowerCase().includes('key'));
    console.log('Sensitive files in git:', sensitive.length ? sensitive : 'None');
  } catch (e) {
    console.log('Error:', e.message);
  }
});

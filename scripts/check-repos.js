// check-repos.js
const cp = require('child_process');
const repos = ['F:/cadguide.tools', 'F:/gstarcademy', 'F:/Ramana', 'F:/chanzong.space'];

repos.forEach(r => {
  console.log('=== ' + r + ' ===');
  try {
    const remotes = cp.execSync(`git -C "${r}" remote -v`).toString().trim();
    const branch = cp.execSync(`git -C "${r}" branch --show-current`).toString().trim();
    const status = cp.execSync(`git -C "${r}" status -s`).toString().trim();
    console.log('Remote:\n' + remotes);
    console.log('Branch:', branch);
    console.log('Dirty files:', status ? status.split('\n').length : 'Clean');
  } catch (e) {
    console.log('Error:', e.message);
  }
});

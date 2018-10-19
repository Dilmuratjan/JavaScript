const { spawn } = require('child_process');
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(`out put :${data}`);
});

ls.stderr.on('data', (data) => {
  console.log(`Error :${data}`);
});

ls.on('close', (code) => {
  console.log(`chilren_process exit code :${code}`);
});
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Collin> '
});
//rl.write('Delete this!');
rl.prompt();

rl.on('line', (line) => {
  switch (line.trim()) {
    case 'hello':
      console.log('world!');
      break;
    case 'close':
      rl.close();
      break;
    default:
      console.log(`Say what? I might have heard '${line.trim()}'`);
      break;
  }
});

rl.on('close', () => {
  console.log('Have a great day!');
  process.exit(0);
});
process.on('exit', (code) => {
  console.log(`About to exit with code: ${code}`);
});

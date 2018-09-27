const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Collin> '
});
rl.prompt();
rl.on('line', (input) => {
    console.log("Called:line")
    console.log(`Received: ${input.toString()}`);
    if (input == ''){
        rl.close();
    }
});

rl.on('close', () => {
    console.log('Called:close');
});

rl.on('pause', () => {
  console.log('Called:pause');
});

rl.on('resume', () => {
  console.log('Called:resume');
});

rl.question('input> ', (answer) => {

    console.log("Called:question");
    switch (answer){
        case 'pause': rl.pause();
            break;
        case 'resume': rl.resume();
            break;
        case 'input': 
            break;
        default: rl.close();
            break;
    }
    console.log(answer.length);
});
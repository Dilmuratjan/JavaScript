var fs = require("fs");

fs.readFile('input.txt', function (err, data) {
    if (err) return console.error(err);
    console.log(data.toString());
});

console.log("Finished!");


const buf = Buffer.from('Collin', 'ascii');


console.log(buf.toString('ascii')+'     #ascii');
console.log(buf.toString('utf8')+'     #utf8');
console.log(buf.toString('utf16le')+'     #utf16le');
console.log(buf.toString('ucs2')+'    #ucs2');
console.log(buf.toString('base64')+'     #base64');
console.log(buf.toString('latin1')+'     #latin1');
console.log(buf.toString('hex')+'     #hex');
console.log(buf.toString('binary')+'     #binary');
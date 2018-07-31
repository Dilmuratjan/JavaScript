const fs = require('fs');

for( let value of obj){
	//console.log("Start File" + value );
	let fileName = value;
	let objData = JSON.parse(fs.readFileSync(fileName));
}


arr.sort(function(a, b){
  // ASC  -> a.length - b.length
  // DESC -> b.length - a.length
  return b.length - a.length;
});
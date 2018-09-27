var readline=require("readline");
const r1=readline.createInterface({
    input:process.stdin,
    output:process.stdout
});
r1.on('line',function(line){
    //找到数组中最后一个空格
    var lastSpacebar = line.lastIndexOf(" ");
    //用splice获取最后一个字符串
    var lastWord = line.slice(lastSpacebar+1);
    console.log(lastWord.length);
});
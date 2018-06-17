(function(){
console.log("%c输入start()开始游戏","font-size:16px;")
console.log("%c先用鼠标点击网页 再使用键盘左右键移动","font-size:16px;")
var position = 18;
var score = 0;
var apples = [];
var creatApples,fallDown;
var Apple = function(){
  this.x=0;
  this.speed = 1;
  this.y=0;
}
var rander = function(){
  var result = '';
  for(var i=0;i<20;i++){
    result+="\n";
    for(var n =0;n<40;n++){
      var pic = '   ';
      if(i==19&&n==(position+1)){
        pic="[===]   ";result+=pic;
        n+=3;
        continue;
      }
      apples.forEach(function(apple){
        var x= Math.round(apple.x);
        var y = Math.round(apple.y);
        if(x==n&&y==i){
          console.log("if1");
          if(Math.abs(apple.y-18)<1&&(x-2==position||x-1==position)){
            console.log("if2");
            score++
          }
          pic="🍎"
        }
      })
      result+=pic;
    }
  } 
  result+="\n得分："+score;
  return result;
}
window.onkeydown = function(e){
  if(e.keyCode==37){
    position-=1;
    if(position<0) 
      {
        position=0;
      }
  }else if(e.keyCode==39){
    position+=1
    if(position>38) {
      position=38;
    }
  }
}
var gameOver = function(){
  clearInterval(creatApples);
  clearInterval(fallDown);
  setTimeout(function(){
    console.log("游戏结束 得分："+score)
  },100)

}
window.start = function(){
  appearP=1.1;
  starts=[];
  score=0;
  position=18;
  begin();
}
window.quit = function(){
  clearTimeout(timer);
  console.clear();
  console.log("%c游戏结束","font-size:16px;")
}

var begin = function(){
  creatApples = setInterval(function(){
    var createCount=Math.floor(Math.random()*7);
    for(var i=0;i<createCount;i++){
      var apple = new Apple();
      apple.x = Math.floor(Math.random()*40);
      apple.y = 0;
      apples.push(apple)
    }
  },1000);
  fallDown = setInterval(function(){
    apples.forEach(function(apple){
      apple.y+=apple.speed;
    });
    console.log(rander());
  },100);
};

})();
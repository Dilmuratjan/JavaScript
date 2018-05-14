//startMove(iObject,{iAttribute1:iTarget1,iAttribute2:iTarget2},iFunction)
function startMove2(iObject, json, iFunction) {
  clearInterval(iObject.timer);
  iObject.timer = setInterval(function () {
    var flag=true;  //assuming all iTargets accoumplished
    for(var iAttribute in json){
      //1.取当前值
      var iCurrent = 0;
      if (iAttribute == 'opacity') {
        iCurrent = Math.round(parseFloat(getStyle(iObject, iAttribute)) * 100);
      } else {
        iCurrent = parseInt(getStyle(iObject, iAttribute));
      } //2.计算速度
      var iSpeed = (json[iAttribute] - iCurrent)/5;
      iSpeed = iSpeed > 0 ? Math.ceil(iSpeed)  : Math.floor(iSpeed);
      //3.检测停止
      if (json[iAttribute] != iCurrent) {
        flag = false;
      }
      if (iAttribute == 'opacity') {
          iObject.style.filter = 'alpha(opacity' + iCurrent + iSpeed + ')';
          iObject.style.opacity = (iCurrent + iSpeed) / 100;
        } 
      else {
          iObject.style[iAttribute] = iCurrent + iSpeed + 'px';
        }
      }
      if(flag){
          clearInterval(iObject.timer);
        if(iFunction){
          iFunction();
        }
      }
  }, 25)
} 
//获取样式
function getStyle(iObject, iAttribute) {
  if (iObject.currentStyle) {
    return iObject.currentStyle[iAttribute]; //IE
  } else {
    return getComputedStyle(iObject, false) [iAttribute]; //Firefox
  }
}

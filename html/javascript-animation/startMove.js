function startMove(iObject, iAttribute, iTarget, iFunction) {
  clearInterval(iObject.timer);
  iObject.timer = setInterval(function () {
    //1.取当前值
    var iCurrent = 0;
    if (iAttribute == 'opacity') {
      iCurrent = Math.round(parseFloat(getStyle(iObject, iAttribute)) * 100);
    } else {
      iCurrent = parseInt(getStyle(iObject, iAttribute));
    } //2.计算速度
    var iSpeed = (iTarget - iCurrent) / 20;
    iSpeed = iSpeed > 0 ? Math.ceil(iSpeed)  : Math.floor(iSpeed);
    //3.检测停止
    if (iTarget == iCurrent) {
      clearInterval(iObject.timer);
      if (iFunction) {
        iFunction();
      }
    } 
    else {
      if (iAttribute == 'opacity') {
        iObject.style.filter = 'alpha(opacity' + iCurrent + iSpeed + ')';
        iObject.style.opacity = (iCurrent + iSpeed) / 100;
      } 
      else {
        iObject.style[iAttribute] = iCurrent + iSpeed + 'px';
      }
    }
  }, 30)
} 
//获取样式
function getStyle(iObject, iAttribute) {
  if (iObject.currentStyle) {
    return iObject.currentStyle[iAttribute]; //IE
  } else {
    return getComputedStyle(iObject, false) [iAttribute]; //Firefox
  }
}

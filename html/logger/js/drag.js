window.onload=drag;
Width=390;
Height=270;
function drag(){
   var oTitle=getByClass('login_logo','loginPanel')[0];
   // drag
   oTitle.onmousedown=fnDown;
   // close
	var oClose=document.getElementById('statePanelClose');
	oClose.onclick=function(){
		document.getElementById('loginPanel').style.display='none';
	}
   // change state
   var loginState=document.getElementById('loginState'),
       stateList=document.getElementById('loginStatePanel'),
       lis=stateList.getElementsByTagName('li'),
       stateTxt=document.getElementById('login_state_txt'),
       loginStateShow=document.getElementById('loginStateShow'),
       flag=0;

   loginState.onclick=function(e){
	   	 e = e || window.event;
	     if(e.stopPropagation){
	          e.stopPropagation();
	     }else{
	          e.cancelBubble=true;
	     }
	     if(0 == flag){
	   		stateList.style.display='block';
	   		flag=1;
			}else{
				stateList.style.display='none';
	   		flag=0;
			}
	}
   // mouse.over,mouse.out,mouse.click
   for(var i=0,l=lis.length;i<l;i++){
	    	lis[i].onmouseover=function(){
	    			this.style.background='#789';
	    		}
	    	lis[i].onmouseout=function(){
	    			this.style.background='#FFF';
	    		}
	    	lis[i].onclick=function(e){
		    		e = e || window.event;
		    		if(e.stopPropagation){
		    			e.stopPropagation();
		      		}else{
		    			e.cancelBubble=true;
		      		}
			    	var id=this.id;
			      	stateList.style.display='none';
			        stateTxt.innerHTML=getByClass('stateSelect_text',id)[0].innerHTML;
			        loginStateShow.className='';
			        loginStateShow.className='login-state-show '+id;
			        flag=0;
				}
		}
	document.onclick=function(){
		stateList.style.display='none';
		flag=0;
   }
}
function fnDown(event){
	
	event = event || window.event;
	var oDrag=document.getElementById('loginPanel'),
	// distance between mouse and panel
	disX=event.clientX-oDrag.offsetLeft-0.5*Width,
	disY=event.clientY-oDrag.offsetTop-0.5*Height;
	// move
	document.onmousemove=function(event){
		event = event || window.event;
		fnMove(event,disX,disY);
	}
	// release mouse
	document.onmouseup=function(){
	document.onmousemove=null;
	document.onmouseup=null;
	}
}
function fnMove(e,posX,posY){
	var oDrag = document.getElementById('loginPanel'),
	left = e.clientX-posX,
	top = e.clientY-posY,
	winWidth = document.documentElement.clientWidth || document.body.clientWidth,
	winHeight = document.documentElement.clientHeight || document.body.clientHeight,
	maxWidth = winWidth-oDrag.offsetWidth+Width,
	maxHeight = winHeight-oDrag.offsetHeight+Height;
	if(left<(10+0.5*Width)){
		left = (10+0.5*Width);
	}else if(left>maxWidth-(10+0.5*Width)){
		left=maxWidth-(10+0.5*Width);
	}
	if(top<(10+0.5*Height)){
		top = (10+0.5*Height);
	}else if(top>maxHeight-(10+0.5*Height)){
		top = maxHeight-(10+0.5*Height);
	}
	oDrag.style.left = left+'px';
	oDrag.style.top = top+'px';
}
function getByClass(className,parent){
  var oParent=parent?document.getElementById(parent):document,
      eles=[],
      elements=oParent.getElementsByTagName('*');

  for(var i=0,l=elements.length;i<l;i++){
    if(elements[i].className==className){
      eles.push(elements[i]);
    }
  }
  return eles;
}

//添加页面加载完成后需要执行的函数
function addLoadEvent(func){
	var oldonload = window.onload;
	if (typeof window.onload != 'function'){
		window.onload = func;
	}
	else{
		window.onload = function(){
			oldonload();
			func();
		}
	}
}

//相对于insertBefore  实现在节点后插入节点
function insertAfter(newElement,targetElement){
	var parent = targetElement.parentNode;
	if(parent.lastChild == targetElement){
		parent.appendChild(newElement);
	}
	else{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}
//生成随机整数，方便从数组中取任意项
//值 = Math.floor(Math.random() * 可能值的总数 + 第一个可能的值)
function selectFrom(min,max){
	var choices = max-min+1;
	return Math.floor(Math.random()*choices+min);
}

// 添加类
function addClass(id,className){
	var element = document.getElementById(id);
	if(element.className == ""){
		element.className = className;
	}
	else{
		element.className += " "+className;
	}
}
// 插入body中可自适应高分屏分辨率
var screenHeight = window.screen.width
if(window.screen.width > 1400) {
    document.body.style.zoom = (screenHeight * 0.874) / 1200;
}

// 倒计时
var wait = 30;
function countDown(button) {
    if (button.html() == '0s后重新发送') {
        button.prop("disabled", false);
        button.html("发送验证码");
        wait = 30;
    } else {
        button.prop("disabled", true);
        button.html(wait + 's后重新发送');
        wait--;
        setTimeout(function() {
            countDown(button);
        },
        1000);
    }
}
// 获取url中参数值
function GetQueryString(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null){
		return  decodeURI(r[2])
	}
	return null;
}

var scrollFunc = function (e) {
	var direct = 0;
    e = e || window.event;
    if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件             
        if (e.wheelDelta > 0) { //当滑轮向上滚
        }
        if (e.wheelDelta < 0) { //当滑轮向下滚动
        }
    } else if (e.detail) {  //Firefox滑轮事件
        if (e.detail> 0) { //当滑轮向上滚
        }
        if (e.detail< 0) { //当滑轮向下滚动时
        }
    }
}
//给页面绑定滑轮滚动事件
if (document.addEventListener) {
    document.addEventListener('DOMMouseScroll', function(){
	setTimeout("scrollFunc()",5000);
}, false);
}
//滚动滑轮触发scrollFunc方法
window.onmousewheel = document.onmousewheel = scrollFunc;  
  //滚动滑轮触发scrollFunc方法
if(window.onmousewheel){
    window.onmousewheel = scrollFunc;
}else{
    document.onmousewheel = scrollFunc;
}


// underscore节流函数
var throttle = function(func, wait, options) {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};
  var later = function() {
    previous = options.leading === false ? 0 : _.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function() {
    var now = _.now();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}; 
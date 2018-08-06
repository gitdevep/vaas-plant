import $ from 'jquery';

// 消息提示
function showTips(type, content) {
    //窗口的宽度  
    var windowWidth = $(window).width();
    var tipsDiv = '<div class="tipsClass"><span style="display: inline-block; margin-left:10px; margin-right:10px; font-size:24px; float: left;">✔</span><span>' + content + '</sapn></div>';
    let background = '#8FBC8F';
    if (type==='error') {
        background = '#f00';
        tipsDiv = '<div class="tipsClass"><span style="display: inline-block; margin-left:10px; margin-right:10px; font-size:30px; float: left;">×</span><span>' + content + '</sapn></div>';
    }else if(type==='warn'){
        background = '#67c23a'
        tipsDiv = '<div class="tipsClass"><span style="display: inline-block; margin-left:10px; margin-right:10px; font-size:24px; float: left;">!</span><span>' + content + '</sapn></div>';
    }else{
        background = '#8FBC8F'
    }
    $('body').append(tipsDiv);
    $('div.tipsClass').css({
        'top': '70px',
        'right': '50px',
        'position': 'absolute',
        'padding': '3px 5px',
        'background': background,
        'font-size': 14 + 'px',
        'margin': '0 auto',
        'text-align': 'left',
        'width': '350px',
        'height': 'auto',
        'color': '#fff',
        'border-radius': '4px',
        'line-height': '24px',
    }).show();
    setTimeout( function(){$( 'div.tipsClass' ).fadeOut();}, ( 3000 ) );  
};

// 图片放大缩小
function bigimg(){
    var myimage = document.getElementById("myimage");
    var rX,
      rY,
      bgX = 0,
      bgY = 0,
      $b = document.getElementById("box"),
      i = $b.getElementsByTagName("img")[0],
      ww = parseInt($b.style.width),
      wh = parseInt($b.style.height),
      imgw = parseInt(myimage.style.width),
      imgh = parseInt(myimage.style.height),
      scaleSize = 1;
    if (myimage.addEventListener) {
      // IE9, Chrome, Safari, Opera
      myimage.addEventListener("mousewheel", MouseWheelHandler, false);
      // Firefox
      myimage.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
    } else myimage.attachEvent("onmousewheel", MouseWheelHandler);
    //为了让不同浏览器都能支持的处理做法,我们将对Firefox的detail值取反然后返回1或者-1的其中一个
    function MouseWheelHandler(e) {
      //以鼠标为中心缩放，同时进行位置调整
      var deltaY = 0;
      var x = e.pageX;
      var y = e.pageY;

      e.preventDefault();

      if (e.target && e.target === i) {
        var l = getOffset($b);
        x = x - l.left;
        y = y - l.top;

        var p = e.wheelDelta / 1200;
        var ns = scaleSize;
        ns += p;
        ns = ns < 0.1 ? 0.1 : ns > 5 ? 5 : ns; //可以缩小到0.1,放大到5倍

        //计算位置，以鼠标所在位置为中心
        //以每个点的x、y位置，计算其相对于图片的位置，再计算其相对放大后的图片的位置
        bgX = bgX - (x - bgX) * (ns - scaleSize) / scaleSize;
        bgY = bgY - (y - bgY) * (ns - scaleSize) / scaleSize;
        scaleSize = ns; //更新倍率

        myimage.style.width = imgw * ns + "px";
        myimage.style.height = imgh * ns + "px";
        myimage.style.top = bgY + "px";
        myimage.style.left = bgX + "px";
      }
    }
    function getOffset(o) {
      var left = 0,
        top = 0;
      while (o != null && o != document.body) {
        top += o.offsetTop;
        left += o.offsetLeft;
        o = o.offsetParent;
      }
      return {
        left: left,
        top: top
      };
    }
}

// 图片下载
function download(src) {
  $('#myimage').attr('src', src);
  var img = $('#myimage').attr("src");
  var alink = document.createElement("a");
  alink.href = img;
  alink.download = "";
  alink.click();
}

export default {
    showTips, bigimg, download
}
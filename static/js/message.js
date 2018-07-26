import $ from 'jquery';

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
}

export default {
    showTips
}
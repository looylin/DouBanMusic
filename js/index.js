// 总结：
// jsonp 请求数据接口
// 动态生成标签


var $btn = $('.nav-btn'),
    oUl = $('#ajaxdata'),
    $input = $('.input');
// 防抖  防抖函数，时间
function debounce(handler,delay){
    var timer = null;
    return function (){
        var _self = this;
        var _arg = arguments;
        clearTimeout(timer);
        timer = setTimeout(function(){
            handler.apply(_self,_arg);
        },delay)
    }
}
// 节流   需要节流函数，时间
function throttle(handler,wait){
    var lastTime = 0;
    return function(e){
        var nowTime = new Date().getTime();
        if(nowTime - lastTime > wait){
            handler.apply(this,arguments);
            lastTime = nowTime;
        }
    }
}


$input.on('input', debounce(function(e) {
    e.preventDefault();
    var value = $(this).val();
    if (value == '') {
        oUl.empty();
    } else {
        ajaxData(value);

    }
},500))

function ajaxData(value) {
    $.ajax({
        type: 'GET',
        url: 'https://api.douban.com/v2/music/search',
        data: 'q=' + value + '&count=7',
        dataType: 'jsonp',
        success: addItem
    })
}

function addItem(data) {
    console.log(data);
    var dataList = data.musics;
    var str = '';
    if (dataList.length > 0) {
        dataList.forEach(function(ele, index) {
            var src = getImage(ele.image);
            str += '<li>\
                            <img src = "' + src + '">\
                            <a href = "https://music.douban.com/subject/' + ele.id + '">\
                            <div class="lin">\
                                <em>' + ele.title + '</em>\
                                <p>' + ele.author[0].name + '</p>\
                            </div>\
                            </a>\
                        </li>';
        })
        oUl.html($(str));

    }

}
// <p>' + ele.author[0].name + '</p>\

function getImage(url) {
    if (url) {
        var reg = /https:\/\//g;
        return url.replace(reg, 'https://images.weserv.nl/?url=')
    }
}
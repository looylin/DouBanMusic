// 入口函数   
// 自动轮播
// 点击轮播
// 索引轮播
(function() {
    var nowIndex = 0,
        len = 6,
        itemWidth = 675,
        trmer,
        flag = true;
    // 入口函数，调用
    init();
    // 点击事件函数
    // 自动轮播函数
    function init() {
        bindEvent();
        sliderAuto();
    }
    // 获得左btn 和 右btn 和 小圆点li on 点击事件函数
    // 判断点击事件class 是左还是右 add 小圆点
    // move函数（left，right，index）
    // 获得.wrapper .鼠标移入 左右btn显示 清空定时器
    // 鼠标移出，左右btn消失 执行定时器函数
    function bindEvent() {
        $('.leftbox').add('.rightbox').add('.dotbox li').on('click', function() {
            if ($(this).attr('class') == 'leftbox') {
                move('left');
            } else if ($(this).attr('class') == 'rightbox') {
                move('right');
            } else {
                var index = $(this).index();
                move(index);
            }
            changeStyle();
        });
        $('.shuffling').on('mouseenter', function() {
            $('.btnbox').show();
            clearTimeout(trmer);
        }).on('mouseleave', function() {
            $('.btnbox').hide();
            sliderAuto();
        })
    }
    // 功能函数，接收参数判断左右还是小圆点
    // 锁
    // 判断dir 是左 还是右  ，都不是：小圆点--nowIndex = dir;
    // 左：nowIndex == 0 吗？left = -len*图片宽度 ：nowIndex --；
    // 右：nowIndex == 5 吗？left = -len*图片宽度，回调函数 当前的.css：left = 0 ：nowIndex ++；
    function move(dir) {
        if (flag) {
            flag = false;
            if (dir == 'left' || dir == 'right') {
                if (dir == 'left') {
                    if (nowIndex == 0) {
                        $('.imgreven').css('left', -(len * itemWidth));
                        nowIndex = len - 1;
                    } else {
                        nowIndex--;
                    }
                } else {
                    if (nowIndex == 5) {
                        $('.imgreven').animate({ 'left': -(len * itemWidth) }, function() {
                            $(this).css('left', '0');
                        });
                        nowIndex = 0;
                    } else {
                        nowIndex++;
                    }
                }
            } else {
                nowIndex = dir;
            }
            slider();
        }


    }
    // 功能函数，判断了左右后，移动left
    // left: - 图片的宽度 * 索引值
    // 函数回调，执行自动轮播函数
    // 锁
    function slider() {
        $('.imgreven').animate({
            'left': -(itemWidth * nowIndex)
        }, function() {
            sliderAuto();
            flag = true;
        })
    }
    // 小圆点函数
    function changeStyle() {
        $('.active').removeClass('active');
        $('.dotbox li').eq(nowIndex).addClass('active');
    }
    // 自动轮播函数
    function sliderAuto() {
        clearTimeout(trmer);
        trmer = setTimeout(function() {
            move('right');
        }, 2000);
        changeStyle();
    }
})()
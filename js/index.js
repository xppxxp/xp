/**
 * Created by zzp929 on 2016/8/10.
 */
$(function () {
    //头部引入
    $(".header").load("header.html");

    //banner轮播 避免命名冲突（自调用函数）
    (function () {
        var i = 0;
        var timer = setInterval(ddd, 6000);
        function ddd() {
            i--;
            $(".banner").css("transform", "rotateX(" + i * 90 + "deg)");
        }
        $(".banner-next").click(function () {
            clearInterval(timer);
            ddd();
            timer = setInterval(ddd, 6000)
        });
        $(".banner-prev").click(function () {
            clearInterval(timer);
            i++;
            $(".banner").css("transform", "rotateX(" + i * (90) + "deg)");
            timer = setInterval(ddd, 6000)
        });
    })();

    //跳转
    $(".xiala").click(function () {
        $("html,body").animate({scrollTop: "1000px"}, 500)
    });

    //景观工程选项卡
    (function () {
        $(".jggc-btn1").click(function () {
            $(this).addClass("jggc-btn1-now").siblings(".jggc-btn1").removeClass("jggc-btn1-now");
            var index = $(this).index();
            $(".jggc-btn-pic").eq(index).show().siblings(".jggc-btn-pic").hide()
        })
    })();
    //新闻动态轮播
    (function () {
        var index = 0;
        var prev2 = $("div.prev2");
        var next2 = $("div.next2");
        var content = $(".zhangxue1");
        var oLi = $(".main-xwdt-content-nav li");
        var span = $(".li-span");
        next2.click(function () {
            index++;
            index = index > oLi.length - 1 ? 0 : index;
            enter("fadeInLeft");
        });
        prev2.click(function () {
            index--;
            index = index < 0 ? oLi.length - 1 : index;
            enter("fadeInRight")
        });
        function enter(dirction) {
            content.fadeOut(0).eq(index).fadeIn(200);
            span.eq(index).show().parents().siblings(".main-xwdt-content-nav li").find(".li-span").hide();
            content.eq(index).find("img,p").removeClass("fadeInRight fadeInLeft").addClass("animated " + dirction);
            
        }

        oLi.click(function () {
            if (index > $(this).index()) {
                index = $(this).index();
                enter("fadeInLeft")
            }
            if (index < $(this).index()) {
                index = $(this).index();
                enter("fadeInRight")
            }
        })
    })();

    //景观前沿
    //parent找的是元素的唯一父亲，parents（）可以找爷爷，指定类名，越级找爸爸。
    (function () {
        $(".main-content1-one5").hover(function () {
            $(this).addClass("animated tada")
        }, function () {
            $(this).removeClass("animated tada")
        });

        //toggleClass直接切换类名
        $(".main-content1-one5").click(function () {
            $(this).parents().siblings(".main-content1-two").slideToggle(200);
            $(this).parents(".main-content1").siblings(".main-content1").find(".main-content1-two").slideUp(0);
            $(this).toggleClass("main-content1-one5-current").removeClass("animated tada");
            $(this).parents(".main-content1").siblings().find(".main-content1-one .main-content1-one5").removeClass("main-content1-one5-current")
        });

        $(".main-content1-one4").faceCursor();
    })();

    //团队合作
    (function () {
        var oDiv = $('.main-tdhz-content');
        var oPrev = $("div.prev3");
        var oNext = $("div.next3");
        var dhz = $(".main-tdhz-content1-wrap");
        var lis = $(".middle li");
        var timer = null;
        var nextTimer = null;
        var prevTimer = null;
        var index = 0;
        oPrev.click(function () {
            clearInterval(prevTimer);
            prevTimer = setTimeout(function () {
                doPrev();
            }, 200)
        });
        oNext.click(function () {
            clearInterval(nextTimer);
            nextTimer = setTimeout(function () {
                doNext();
            }, 200)
        });
//li版，小点点击
        lis.click(function () {
            if ($(this).index() < index) {
                for (var i = index; i - 1 > $(this).index(); i--) {
                    dhz.find(".main-tdhz-content1:last").insertBefore(dhz.find(".main-tdhz-content1:first"));
                }
                doPrev();
            } else if ($(this).index() > index) {
                for (var i = index; i + 1 < $(this).index(); i++) {
                    dhz.find(".main-tdhz-content1:first").appendTo(dhz);
                }
                doNext();
            }
            index = $(this).index();
            lis.removeClass("middle-li-now").eq(index).addClass("middle-li-now");
        });
        oDiv.hover(function () {
            clearInterval(timer);
        }, autoMove);
        function autoMove() {
            clearInterval(timer);
            timer = setInterval(function () {
                doNext();
            }, 5500)
        }

        autoMove();
        function doPrev() {
            dhz.find(".main-tdhz-content1:last").insertBefore(dhz.find(".main-tdhz-content1:first"));
            dhz.animate({"left": "-1100px"}, 0);
            dhz.stop(true, true).animate({"left": "0px"}, 1000, 'backOut');
            index--;
            index = index < 0 ? lis.length - 1 : index;
            lis.removeClass("middle-li-now").eq(index).addClass("middle-li-now");
        }

        function doNext() {
            dhz.stop(true, true).animate({"left": "-1100px"}, 1000, 'backIn', function () {
                $(".main-tdhz-content1-wrap .main-tdhz-content1:first").appendTo(dhz);
                dhz.animate({"left": "0px"}, 0);
            });
            index++;
            index = index > lis.length - 1 ? 0 : index;
            lis.removeClass("middle-li-now").eq(index).addClass("middle-li-now");
        }
    })();
//    返回顶部
    $(window).scroll(function () {
        if ($(window).scrollTop() >= innerHeight) {
            $(".fhdb-wrap").fadeIn(500);
            $(".left-nav-wrap").fadeIn(500);
        } else {
            $(".fhdb-wrap").fadeOut(0);
            $(".left-nav-wrap").fadeOut(500);
        }
    });
  
    $(".fanhuidingbu").click(function () {
        $("html,body").animate({scrollTop: 0}, 600);
        $(".fhdb-wrap").animate({bottom: 1000, opacity: 0}, 600, function () {
            $(".fhdb-wrap").fadeOut().css({bottom: 180, opacity: 1}, 600)
        });
    });
    //底部引入
    $(".footer-wrap").load("footer.html");

    //左侧导航
    $(".left-nav-wrap").hover(function () {
        $(this).find(".left-nav").fadeIn(300)
    }, function () {
        $(this).find(".left-nav").fadeOut(300)
    })
});
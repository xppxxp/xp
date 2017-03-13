/**
 * Created by zzp929 on 2016/8/10.
 */
var GLOBLE = GLOBLE || {};
$(function () {
    //鼠标滚轮滚动
    GLOBLE = false;
    (function () {
        $(".main-wrap,.banner1").css({height: ($(window).height() - 50) + "px"});
        $(".banner1").css({width: $(window).width() + "px"});
        $(window).resize(function () {
            $(".main-wrap,.banner1").css({height: ($(window).height() - 50) + "px"});
            $(".banner1").css({width: $(window).width() + "px"});
        });
        var scrollFunc = function (ev) {
            var Oevent = ev || window.event;
            if (Oevent.wheelDelta) {
                if (Oevent.wheelDelta > 0) {
                    slideUp();
                } else if (Oevent.wheelDelta < 0) {
                    if (GLOBLE == true) {
                        slideDown();
                    }
                }
            } else if (Oevent.detail) {
                if (Oevent.detail > 0) {
                    if (GLOBLE == true) {
                        slideDown();
                    }
                } else if (Oevent.detail < 0) {
                    slideUp();
                }
            }
        };
        var aNub = 0;
        var bbb = false;
        var atimer = null;
        var index = 0;

        function slideUp() {
            if (aNub < 1) {
                clearTimeout(atimer);
                atimer = setTimeout(function () {
                    aNub++;
                }, 20)
            } else if (!bbb) {
                index--;
                bbb = true;
                if (index <= 0) {
                    index = 0;
                }
                goTo();
            }
        }

        function slideDown() {
            if (aNub < 1) {
                clearTimeout(atimer);
                atimer = setTimeout(function () {
                    aNub++;
                }, 20)
            } else if (!bbb) {
                index++;
                bbb = true;
                if (index >= $(".banner1").length - 2) {
                    index = $(".banner1").length - 2;
                }
                goTo();
            }
        }

        function goTo() {
            $(".main-content").animate({top: "-" + $(".banner1").height() * index + "px"}, 600, 'easeBothStrong', function () {
                bbb = false;
                aNub = 0;
                if (index == 0) {
                    $(".header-nav h1").removeClass("now").eq(index).addClass("now");
                } else if (index == 4 || index == 5) {
                    $(".header-nav h1").removeClass("now").eq(3).addClass("now").end().eq(4).addClass("now");
                } else {
                    $(".header-nav h1").removeClass("now").eq(index - 1).addClass("now");
                }
            });
        }

        if (document.addEventListener) {
            document.addEventListener("DOMMouseScroll", scrollFunc, false);
        }
        window.onmousewheel = document.onmousewheel = scrollFunc;

        //导航条点击
        $(".header-nav h1").click(function () {
            $(this).addClass("now").siblings().removeClass("now");
            index = $(this).index();
            if (index == 3 || index == 4) {
                $(".main-content")
                    .animate({top: "-" + $(".banner1").height() * 4 + "px"}, 600, 'easeBothStrong');
                $(".header-nav h1").removeClass("now").eq(3).addClass("now").end().eq(4).addClass("now");
                index = 4;
            } else if (index == 5) {
                javascript:window.open("index.html", target = "_blank");
            } else {
                $(".main-content")
                    .animate({top: "-" + $(".banner1").height() * (index + 1) + "px"}, 600, 'easeBothStrong');
                $(this).addClass("now").siblings().removeClass("now");
                index = index + 1
            }
        });

        //hash跳转到相应页面执行下面代码
        var hashindex = window.location.hash.substring(1);
        if (hashindex == 1 || hashindex == 2 || hashindex == 3 || hashindex == 4) {
            $(".shouye").slideUp(0, function () {
                GLOBLE = true;
            });
            index = hashindex;
            goTo();
        }
    })();

    //进来首页出现定时器
    (function () {
        var enter = false;
        $(".shouye").click(function () {
            if (enter == true) {
                $(".shouye").slideUp(600, function () {
                    GLOBLE = true;
                })
            } else {
                enter = true;
            }
        });
        gg();
        function gg() {
            setTimeout(function () {
                $(".shouye-pic-gif-wrap .animate-up").each(function (i) {
                    var $this = $(this);
                    setTimeout(function () {
                        $this.show().addClass("animated fadeInUp");
                    }, 400 * (i + 1));
                });
                setTimeout(function () {
                    $(".shouye").slideUp(600, function () {
                        GLOBLE = true;
                    })
                }, 4000);
            }, 500);
        }
    })();
    //首页4项飞入
    (function () {
        chuxian();
        $(".pic-gif").click(function () {
            $(".shu1").animate({left: "-439px"}, 0);
            $(".shu2").animate({left: "1100px"}, 0);
            $(".shu3").animate({left: "-439px"}, 0);
            $(".shu4").animate({left: "1100px"}, 0);
            chuxian();
        });
        function chuxian() {
            setTimeout(function () {
                $(".shu1").animate({left: 0}, 500, function () {
                    $(".shu2").animate({left: "700px"}, 500, function () {
                        $(".shu3").animate({left: 0}, 500, function () {
                            $(".shu4").animate({left: "700px"}, 500)
                        })
                    })
                });
            }, 500);
        }
    })();

    //第一屏下拉点击
    $(".xiala").click(function () {
        $(".main-content").animate({top: "-" + $(".banner1").height() + "px"}, 1000, 'easeOutStrong')
    });

    //设计理念轮播
    (function () {
        var content = $(".banner1-gaishu");
        var index = 0;
        $(".banner1-btnright").click(function () {
            index++;
            if (index <= content.length - 1) {
                enter("fadeInRight");
            } else {
                index = content.length - 1;
            }
        });
        $(".banner1-btnleft").click(function () {
            index--;
            if (index >= 0) {
                enter("fadeInLeft")
            } else {
                index = 0
            }
        });
        function enter(dirction) {
            content.fadeOut(0).eq(index).fadeIn(100);
            content.eq(index).removeClass("fadeInRight fadeInLeft").addClass("animated " + dirction)
        }

        //百叶窗
        $(function () {
            var imgs = $(".gaishu-3pic img").length;
            for (var i = 0; i < imgs; i++) {
                $(".gaishu-3pic img").eq(i).css({"left": i * 100 + "px", "z-index": i})
            }
            $(".gaishu-3pic img").hover(function () {
                var n = $(this).index();
                for (var j = 0; j <= n; j++) {
                    $(".gaishu-3pic img").eq(j).stop().animate({"left": j * 80 + "px", "z-index": j})
                }
                for (; j < imgs; j++) {
                    $(".gaishu-3pic img").eq(j).stop().animate({"left": j * 80 + 200 + "px", "z-index": j})
                }
            }, function () {
                for (var i = 0; i < imgs; i++) {
                    $(".gaishu-3pic img").eq(i).stop().animate({"left": i * 100 + "px", "z-index": i})
                }
            })
        })


    })();

    //价值发光边框
    setInterval(function () {
        $(".qiyejz-biankuang-top,.qiyejz-biankuang-bottom").find(".faguangde").animate({opacity: 1}, 700, function () {
            $(".qiyejz-biankuang-top,.qiyejz-biankuang-bottom").find(".faguangde").animate({opacity: 0}, 700)
        });
    }, 1400);
    //工作流程
    (function () {
        $(".xnzy-btn1").click(function () {
            $(".xnzy-content:last").removeClass("animated fadeInRight").hide();
            $(this).siblings().find("span").stop().animate({left: "-78px"}, 400, function () {
                $(".xnzy-btn1").find("span").stop().animate({left: "0"}, 400);
            });
            $(".xnzy-content:first").show().addClass("animated fadeInLeft");
        });
        $(".xnzy-btn2").click(function () {
            $(".xnzy-content:first").removeClass("animated fadeInLeft").hide();
            $(this).siblings().find("span").stop().animate({left: "78px"}, 400, function () {
                $(".xnzy-btn2").find("span").stop().animate({left: 0}, 400);
            });
            $(".xnzy-content:last").show().addClass("animated fadeInRight");
        })
    })();
    //园林独家设计鼠标移入放大
    (function () {
        $(".number a").hover(function () {
            var tooltip = '<div id="tooltip"><img src="' + this.name + '"></div>';
            $(".qiyejz").append(tooltip);
            $("#tooltip").show("fast")
        }, function () {
            $("#tooltip").remove()
        }).mousemove(function (event) {
            $("#tooltip").css({"left": event.pageX + 10 + "px", "top": event.pageY - 300 + "px"})
        })
    })();


});
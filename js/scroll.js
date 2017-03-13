/**
 * Created by Administrator on 2016/8/23.
 */
    //    返回顶部
$(function(){
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
});

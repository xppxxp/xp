/**
 * Created by zzp929 on 2016/8/10.
 */
$(function(){
    //头部导航
    $(".header-content-nav div").hover(function(){
        $(this).find("ul").stop().slideDown(600,"bounceOut")
    },function(){
        $(this).find("ul").stop().slideUp(100)
    }).click(function(){
        $(this).find("h1").addClass("now").end().siblings().find("h1").removeClass("now")
    })
});
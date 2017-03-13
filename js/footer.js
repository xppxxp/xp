/**
 * Created by zzp929 on 2016/8/16.
 */
//    音乐播放
$(function(){
    (function () {
        $(".map-yinyue-fu div").click(function () {
            index = $(this).index();
            if (navigator.userAgent.indexOf("Chrome") >= 0) {
                //谷歌
                $("body").append(
                    '<embed class="music" src="music/sound0' + index + '.mp3" autostart="" loop="false" width="0" height="0">')
                $("embed").css("display","none");
            } else if (navigator.userAgent.indexOf("Firefox") >= 0) {
                //$("body").append('<embed src="music/sound0'+index+'.mp3" type="audio/mp3" hidden="true" loop="false" mastersound></embed>');这种也可以！
                //火狐
                $("body").append(
                    '<object class="music" data="music/sound0' + index + '.mp3" type="application/x-mplayer2" hidden="true">' +
                    '<param name="src" value="music/sound0' + index + '.mp3">' +
                    '<param name="autostart" value="1">' +
                    '<param name="playcount" value="infinite">' +
                    '</object>');
                $("object").css("display","none");
            } else {
                //IE
                $("body").append(
                    '<bgsound class="music" src="music/sound0' + index + '.mp3" autostart="true" loop="false"></bgsound>');
                $("bgsound").css("display","none");
            }
            setTimeout(function(){
                $("body").find(".music").eq(0).remove()
            },3000)
        })
    })();
});

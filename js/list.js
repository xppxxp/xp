/**
 * Created by zzp929 on 2016/8/10.
 */
var GLOBAL = GLOBAL || {};
$(function () {
    (function () {
        $("#header").load("header.html");
        $("#footer").load("footer.html");

        $(".title_list .pen").click(function () {
            $(".title_list").animate({"width": "100px", backgroundPositionX: "-1000px"}, 0, function () {
                $(".title_list").animate({"width": "1100px", backgroundPositionX: "0px"}, 1300, "easeOutStrong");
            });
        });
        
        $("#listMore").click(function () {
            if (GLOBAL.pageStart < GLOBAL.pageCount) {
                loadGo();
            }
        });
        loadGo();
        //加载列表数据方法
        function loadGo() {
            /*先判断首页是否加载完成了 */
            if (!GLOBAL.pageStart) {
                $("#articleList").html("");
                GLOBAL.pageStart = 0;
            }
            // GLOBAL.pageStart = 0;

            var list = listData["listData0" + GLOBAL.pageStart];
            var shuju = list.data.list;
            if (!shuju || !shuju.length) {
                $("#articleList").html("暂缓更新，敬请期待")
            } else {
                for (var i = 0; i < shuju.length; i++) {
                    var itemHtml = $("#itemHtml").html().replace("articleId", shuju[i].sysId)
                        .replace("$articleCover$", shuju[i].coverImg)
                        .replace("$articleTitle$", shuju[i].title)
                        .replace("$updateTime$", shuju[i].creatAt)
                        .replace("$describe$", shuju[i].describe);
                    $("#articleList").append(itemHtml);
                }
                GLOBAL.pageStart++;
                GLOBAL.pageCount = Math.ceil(list.data.count / list.data.pageSize);
                if (GLOBAL.pageStart >= GLOBAL.pageCount) {
                    $(".list_more").css({opacity: 0.3});
                    $(".content_wrap").find(".logoImg").attr("src", "images/list_gomore_bg_nomore.jpg")
                }
            }
        }
    })();

    (function () {
        var oDiv = document.getElementsByClassName("banner-one");
        var oBan = document.getElementById("banner-bbb");
        var imgWidth = oDiv[0].offsetWidth;
        var spanDiv = document.getElementsByClassName("square")[0];
        var spans = spanDiv.children;
        var oOOO = document.getElementById("banner");
        //移入移出显示隐藏
        oOOO.onmouseover = function () {
            clearInterval(timer);
        }
        oOOO.onmouseout = function () {
            timer = setInterval(auto, 3000);
        }
        var pic = 0;
        var spa = 0;
        //导航条切换
        for (var i = 0; i < spans.length; i++) {
            spans[i].index = i;
            spans[i].onclick = function () {
                clearInterval(timer);
                for (var k = 0; k < spans.length; k++) {
                    spans[k].className = "";
                }
                this.className = "current";
                var target = -imgWidth * this.index;
                biansu(oBan, target);
                pic = this.index;
                spa = this.index;
                timer = setInterval(auto, 3000);
            }
        }
        //自动切换定时器
        var timer = setInterval(auto, 3000);
        function auto() {
            pic++;
            if (pic > oDiv.length - 1) {
                pic = 1;
                oBan.style.left = 0
            }
            var target = -pic * imgWidth;
            biansu(oBan, target);
            spa++;
            if (spa > spans.length - 1) {
                spa = 0;
            }
            for (var j = 0; j < spans.length; j++) {
                spans[j].className = "";
            }
            spans[spa].className = "current";
        }
        //变速移动函数
        function biansu(obj, target) {
            clearInterval(obj.timer);
            obj.timer = setInterval(function () {
                var left = obj.offsetLeft;
                var step = (target - left) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                obj.style.left = left + step + "px";
                if (left == target) {
                    clearInterval(obj.timer)
                }
            }, 20);
        }
    })();

    $("#articleList").delegate(".content_one", "click", function(){
        window.open("article.html?type=xiaoniaoNews&articleId=" + $(this).attr("articleid"), "_blank");
    });
    
});

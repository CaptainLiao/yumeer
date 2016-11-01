/**
 * Created by yumeer on 2016/9/11.
 */

var YMRoute = function () {

};

YMRoute.prototype.hover = function () {

    var smallScreen = 640;
    $(window).on("resize load", function () {
        var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
        if (clientWidth > smallScreen) {
            $("#ym-route").on("mouseenter", ".ym-route-item", function () {
                //$(this).find(".ym-route-item-pic").stop().fadeOut(300);
                $(this).css("cursor","pointer").find(".ym-route-item-title").css("color","#f5bb22");
            });
            $("#ym-route").on("mouseleave", ".ym-route-item", function () {
                //$(this).find(".ym-route-item-pic").stop().fadeIn(300);
                $(this).find(".ym-route-item-title").css("color","#fff");
            });
        } else {
            return false;
        }
    });

};

YMRoute.prototype.loadRoute = function () {
    var options = {
        count: 6/*,
        tag: '老数据'*/
    };

    function resDate(json) {
        var route = $("#ym-routeId").html();
        var template = Handlebars.compile(route);
        var data = {json: json.data};
        var html = template(data);
        $("#ym-route-container").html(html);
        var routeItem  = $(".ym-route-item");
        console.log(json);
        for(var i=0,len=routeItem.length;i<len;i++) {
            routeItem.eq(i).click(function () {
                var routeId = $(this).attr("data-teamId");
                window.location.href = config.html.detail+ "?rid="+routeId;
            });

        }
        /*routeItem.eq(0).click(function () {

            window.location.href = config.html.routeList+ 16;
        });
        routeItem.eq(1).click(function () {

            window.location.href = config.html.routeList+ 17;
        });
        routeItem.eq(2).click(function () {

            window.location.href = config.html.routeList+ 6;
        });
        routeItem.eq(3).click(function () {

            window.location.href = config.html.routeList+ 7;
        });
        routeItem.eq(4).click(function () {

            window.location.href = config.html.routeList+ 9;
        });
        routeItem.eq(5).click(function () {

            window.location.href = config.html.routeList+ 11;
        });*/

        var oTitle = $('.ym-route-item-title').find('h3').text();
        if(oTitle.length>14) {
            $('.ym-route-item-title').find('h3').text(oTitle.substring(0,14)+'...');
        };
    };

    config.reqAPI("GET", config.api.tour, options, resDate);
};

YMRoute.prototype.click = function () {

};

YMRoute.prototype.render = function () {
    this.loadRoute();
    this.hover();
    this.click();
};
/**
 * Created by yumeer on 2016/9/22.
 */


var YMDetail = function () {
    var params = config.getUrlParam();
    this.skuId = params.skuId;
    this.oNum = params.oNum;
    this.routeId = params.rid;
};

YMDetail.prototype.reqHtml = function () {
    var _this = this;
    var options = {
        id: this.routeId
    };
    console.log("线路ID是："+options.id);
    function resDate (json) {
        /*get json date*/
        var oDate =json.data[0].mat_detail.replace(/\\n/g,"\<br \/\>");

        var resJson = JSON.parse(oDate);
        var design = resJson.sjsl;
        var parents = resJson.jzhy;
        var feature = resJson.xcts;
        var trips = resJson.xxxc;
        var students = resJson.yxzxs;
        var remark = resJson.xzzh;
        for (var i=0;i<feature.length;i++){
            feature[i].num = i+1;
        }
        console.log(json.data[0]);
        /*lade tour html element from backstage*/
        config.handlebars(json,"ym-detail-banner","ym-detail-adContainer",{resDate:json.data});
        // 当线路加载完毕后，立即调用YMSku,防止sku偶尔加载不出来
        var sku = new YMSku();
        sku.loadSku();

        config.handlebars(json,"ym-detail-designId","ym-detail-designContainer",design);
        config.handlebars(json,"ym-detail-parentsId","ym-detail-parentsContainer",parents);
        config.handlebars(json,"ym-detail-feature-listId","ym-detail-feature-list",{feature:feature});
        config.handlebars(json,"ym-detail-trips-listId","ym-detail-trips-list",{trips:trips});
        config.handlebars(json,"ym-detail-students-listId","ym-detail-students-slick",{students:students});
        config.handlebars(json,"ym-detail-remark-containerId","ym-detail-remarkContainer",remark);

        /*计算详细行程的天数*/
        var tripsLen = trips.length;
        var tripsDay = [];
        for (var i=0;i<tripsLen;i++){
            tripsDay[i] = {
                num: i+1
            };
        }
        config.handlebars("","ym-detail-trips-dayNum","ym-detail-trips-timeLine",{day:tripsDay});
        $("#ym-detail-trips-timeLine").find("li").eq(0).addClass("ym-detail-active");

        /*游学者心声切换*/
       _this.students();


        /*详细行程事件说明*/
        var tripsList = $(".ym-detail-trips-list");
        var tripsItem = $(".ym-detail-trips-item");
        var timeLine = $(".ym-detail-trips-timeLine");
        var timeLineHeight = timeLine.height()+200;
        $(".ym-detail-active").find(".ym-detail-trips-circle").css("display","inline-block");
        timeLine.css({
            height: timeLineHeight,
            'border-right':'1px solid #ddd'
        });

        /*Reset trips-list ele style*/
        tripsList.addClass("ym-detail-trips-mask").find(".ym-detail-trips-item:eq(0)").nextAll().hide();

        $(".ym-detail-trips-mask").click(function () {
            /*Show/hide trips-list event*/
            $(this).find(".ym-detail-trips-item:eq(0)").nextAll().slideToggle();
            timeLine.find("li:eq(0)").addClass("ym-detail-active")
                .nextAll().removeClass("ym-detail-active").find(".ym-detail-trips-circle").css("display","none");
            $(".ym-detail-active").find(".ym-detail-trips-circle").css("display","inline-block");

            /*滚动条滚动，改变时间轴的定位方式--relative → fixed*/
            _this.timeLinePos();

            /*Change trips-list-item's position via timeLine click event*/
            timeLine.find("li").click(function () {
                if(tripsItem.eq(1).css("display") != "none"){
                    var index = $(this).index();
                    var itemTop = tripsList.find(".ym-detail-trips-item:eq("+index+")").offset().top - 120;
                    $(window).scrollTop(itemTop);

                    $(this).addClass("ym-detail-active")
                        .siblings().removeClass("ym-detail-active").find(".ym-detail-trips-circle").css("display","none");
                    $(".ym-detail-active").find(".ym-detail-trips-circle").css("display","inline-block");
                    console.log(tripsItem.css("display"));
                }
            });
            /*滚动条发生变化，时间轴切换到相应位置*/
            $(window).scroll(function () {
                var tripsItem = $(".ym-detail-trips-item");
                var offset = 260;
                var scrollTop = document.documentElement.scrollTop|| document.body.scrollTop;
                var _thisTop = 0;

                tripsItem.each(function () {
                    var index = $(this).index();
                    _thisTop = $(this).offset().top - offset;
                    if(scrollTop > _thisTop){
                        timeLine.find("li:eq("+index+")").addClass("ym-detail-active")
                            .siblings().removeClass("ym-detail-active").find(".ym-detail-trips-circle").css("display","none");
                        $(".ym-detail-active").find(".ym-detail-trips-circle").css("display","inline-block");
                    }
                });
            })


            /*click mast to reset trips-list's position via scroll*/
            var itemTop = tripsList.offset().top - 140;
            $(window).scrollTop(itemTop);

        });

    };
    config.reqAPI("GET",config.api.tour,options,resDate);
};

/*滚动条滚动，改变时间轴的定位方式--relative → fixed*/
YMDetail.prototype.timeLinePos = function () {
    var timeLine = $(".ym-detail-trips-timeLine");
    $(window).on("scroll",function () {
        var scrollTop = document.documentElement.scrollTop|| document.body.scrollTop;
        var trips = $(".ym-detail-trips").offset().top;
        var students = $(".ym-detail-students").offset().top - 360;
        if(scrollTop > trips && scrollTop < students) {
            timeLine.css({
                position: 'fixed',
                top: '9vw',
                left: '20%'
            });
            $(".ym-detail-trips-activities").css("margin-left","7.5vw");
        }else {
            timeLine.css({
                position: 'relative',
                top: '0',
                left: '0'
            });
            $(".ym-detail-trips-activities").css("margin-left","0");
        }
    });
};

/*游学者心声切换*/
YMDetail.prototype.students = function () {
    $('.ym-detail-students-list').slick({
        arrows: true,
        mobileFirst: true,
        pauseOnHover: true,
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000
    });
    $(".slick-arrow").addClass("iconfont");
    $(".slick-arrow").mouseover(function () {
        $(this).css("color","#555").siblings().css("color","#ddd");
    });
};

YMDetail.prototype.render = function () {
    this.reqHtml();
};
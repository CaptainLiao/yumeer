/**
 * Created by yumeer on 2016/10/18.
 */

var YMList = function () {

};

YMList.prototype.jumpPages = function (id) {
    // 点击每条线路，当前页面跳转到详情页
    var _this = id;
    _this.each(function () {
        $(this).on("click",function () {
            console.log("hhh");
            var rid = $(this).parents().attr("data-tourId");
            window.location.href = config.html.detail + "?rid=" + rid;
        })
    });

};

YMList.prototype.loadHtml = function () {
    var options = {

    };

    function resDate(json) {
        console.log(json);
        config.handlebars2(json,"ym-li-content","ym-list-items",{resDate:json.data},true);

        // 点击每条线路，当前页面跳转到详情页
        function itemJump(id) {
            var _this = id;
            _this.each(function () {
                $(this).on("click",function () {
                    console.log("hhh");
                    var rid = $(this).parents().attr("data-tourId");
                    window.location.href = config.html.detail + "?rid=" + rid;
                })
            })
        }
        itemJump($(".ym-li-banner"));
        itemJump($(".ym-li-text"));
    };

    config.reqAPI("GET",config.api.tour,options,resDate);
};

// 过滤显示
/*YMList.prototype.filterTour = function (){
    // 用户点击特色或目的地，显示相应线路
    function filterList(id,activeClass,sort){
        id.each(function () {
            $(this).on("click",function () {
                $(this).addClass(activeClass).siblings().removeClass(activeClass);
                var text = $(this).text();
                var options = {};
                switch (sort){
                    case "mat_st":
                        options = {
                            order: sort
                        };
                        break;
                    case "mat_dur":
                        options = {
                            order: sort
                        };
                        break;
                    case "all":
                        options = {

                        };
                        break;
                    default:
                        options = {
                            tag: text
                        };
                }

                function resDate(json) {
                    console.log(json);
                    config.handlebars2(json,"ym-li-content","ym-list-items",{resDate:json.data},true);

                    // 点击每条线路，当前页面跳转到详情页
                    function itemJump(id) {
                        var _this = id;
                        _this.each(function () {
                            $(this).on("click",function () {
                                console.log("hhh");
                                var rid = $(this).parents().attr("data-tourId");
                                window.location.href = config.html.detail + "?rid=" + rid;
                            })
                        })
                    }
                    itemJump($(".ym-li-banner"));
                    itemJump($(".ym-li-text"));
                };

                config.reqAPI("GET",config.api.tour,options,resDate);
            });
        });
    }
    var aList = $(".ym-lo-feature").find("a");
    var desList = $(".ym-lo-des").find("a");
    var sortList = $(".ym-lh-sort").find("a");

    filterList($(".ym-lo-feature-all"),"ym-lo-feature-active",'all');
    filterList(aList.not(".ym-lo-feature-all"),"ym-lo-feature-active",'');
    filterList($(".ym-lo-des-all"),"ym-lo-feature-active",'all');
    filterList(desList.not(".ym-lo-des-all"),"ym-lo-feature-active",'');



    // 点击出发时间，项目天数进行排序
    function sortTour(id,order,asc) {
        id.addClass("ym-lh-active").siblings().removeClass("ym-lh-active");
        var options = {
            order: order,
            asc: asc
        };
        function resDate(json) {
            console.log(json);
            config.handlebars2(json,"ym-li-content","ym-list-items",{resDate:json.data},true);
            // 点击每条线路，当前页面跳转到详情页
            function itemJump(id) {
                var _this = id;
                _this.each(function () {
                    $(this).on("click",function () {
                        console.log("hhh");
                        var rid = $(this).parents().attr("data-tourId");
                        window.location.href = config.html.detail + "?rid=" + rid;
                    })
                })
            }
            itemJump($(".ym-li-banner"));
            itemJump($(".ym-li-text"));
        };
        config.reqAPI("GET",config.api.tour,options,resDate);
    }
    sortList.eq(0).on("click",function () {
        sortList.eq(1).removeClass("ym-lh-upArrow ym-lh-downArrow").addClass("ym-lh-upArrow");
        sortList.eq(2).removeClass("ym-lh-upArrow ym-lh-downArrow").addClass("ym-lh-upArrow");
        sortTour($(this),"mat_est","desc");

    });

    sortList.eq(1).on("click",function () {
        if($(this).hasClass("ym-lh-upArrow")){
            $(this).removeClass("ym-lh-upArrow").addClass("ym-lh-downArrow");
            sortTour($(this),"mat_st","asc");

        }else {
            $(this).removeClass("ym-lh-downArrow").addClass("ym-lh-upArrow");
            sortTour($(this),"mat_st","desc");
        }
    });
    sortList.eq(2).on("click",function () {
        if($(this).hasClass("ym-lh-upArrow")){
            $(this).removeClass("ym-lh-upArrow").addClass("ym-lh-downArrow");
            sortTour($(this),"mat_st","asc");

        }else {
            $(this).removeClass("ym-lh-downArrow").addClass("ym-lh-upArrow");
            sortTour($(this),"mat_st","desc");
        }
    });

};*/

YMList.prototype.filterTour = function () {
    var featureList = $(".ym-lo-feature").find("a");
    var desList = $(".ym-lo-des").find("a");
    var sortList = $(".ym-lh-sort").find("a");

    featureList.each(function () {
        $(this).on("click",function () {
            $(this).addClass("ym-lo-feature-active").siblings().removeClass("ym-lo-feature-active");
            var text = $(this).text();
            var desAct = $(".ym-lo-des").find(".ym-lo-feature-active");  // 选中的目的地
            var sortAct = $(".ym-lh-sort").find(".ym-lh-active");  // 选中的排序方式
            var desText = "";
            var ascText = "";
            var orderText = "";

            if($(this).text()== "全部" || $(this).text()== "综合"){
                text = "";
            }else {
                text = $(this).text();
            }

            if(desAct.text()== "全部"){
                desText = "";
            }else {
                desText = desAct.text();
            }

            if(desAct.text()== "全部"){
                desText = "";
            }else {
                desText = desAct.text();
            }

            if(sortAct.text() == "出发时间"){
                orderText = "mat_st";
            }else if(sortAct.text() == "项目天数 ") {
                orderText = "mat_dur";
            }else {
                orderText = "";
            }

            if(sortAct.hasClass("ym-lh-downArrow")){
                ascText = "desc";
            }else if(sortAct.hasClass("ym-lh-upArrow")){
                ascText = "asc";
            }else {
                ascText = "";
            }
            console.log(desAct.text());


            var options = {
                tag: text,
                des: desText,
                order: orderText,
                asc: ascText
            };

            console.log(options);

            function resDate(json) {
                console.log(json);
                config.handlebars2(json,"ym-li-content","ym-list-items",{resDate:json.data},true);

                // 点击每条线路，当前页面跳转到详情页
                function itemJump(id) {
                    var _this = id;
                    _this.each(function () {
                        $(this).on("click",function () {
                            console.log("hhh");
                            var rid = $(this).parents().attr("data-tourId");
                            window.location.href = config.html.detail + "?rid=" + rid;
                        })
                    })
                }
                itemJump($(".ym-li-banner"));
                itemJump($(".ym-li-text"));
            };
            config.reqAPI("GET",config.api.tour,options,resDate);
        });
    });

    desList.each(function () {
        $(this).on("click",function () {
            $(this).addClass("ym-lo-feature-active").siblings().removeClass("ym-lo-feature-active");
            var text = $(this).text();
            var desAct = $(".ym-lo-feature").find(".ym-lo-feature-active");  // 选中的目的地
            var sortAct = $(".ym-lh-sort").find(".ym-lh-active");  // 选中的排序方式
            var desText = "";
            var ascText = "";
            var orderText = "";

            if($(this).text()== "全部" || $(this).text()== "综合"){
                text = "";
            }else {
                text = $(this).text();
            }

            if(desAct.text()== "全部"){
                desText = "";
            }else {
                desText = desAct.text();
            }

            if(desAct.text()== "全部"){
                desText = "";
            }else {
                desText = desAct.text();
            }

            if(sortAct.text() == "出发时间"){
                orderText = "mat_st";
            }else if(sortAct.text() == "项目天数 ") {
                orderText = "mat_dur";
            }else {
                orderText = "";
            }

            if(sortAct.hasClass("ym-lh-downArrow")){
                ascText = "desc";
            }else if(sortAct.hasClass("ym-lh-upArrow")){
                ascText = "asc";
            }else {
                ascText = "";
            }
            console.log(desAct.text());


            var options = {
                tag: desText,
                des: text,
                order: orderText,
                asc: ascText
            };

            console.log(options);

            function resDate(json) {
                console.log(json);
                config.handlebars2(json,"ym-li-content","ym-list-items",{resDate:json.data},true);

                // 点击每条线路，当前页面跳转到详情页
                function itemJump(id) {
                    var _this = id;
                    _this.each(function () {
                        $(this).on("click",function () {
                            console.log("hhh");
                            var rid = $(this).parents().attr("data-tourId");
                            window.location.href = config.html.detail + "?rid=" + rid;
                        })
                    })
                }
                itemJump($(".ym-li-banner"));
                itemJump($(".ym-li-text"));
            };
            config.reqAPI("GET",config.api.tour,options,resDate);
        });
    });

};

YMList.prototype.render = function () {
    this.loadHtml();
    this.filterTour();
};
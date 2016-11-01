/**
 * Created by yumeer on 2016/10/26.
 */

var YMGoods = function () {
    var params = config.getUrlParam();
    this.routeId = params.rid;    /*获取线路id*/
};

YMGoods.prototype.loadHtml = function () {
    var options = {
        id: 1124//this.routeId
    };

    console.log("线路ID是："+options.id);
    function resDate (json) {
        /*lade tour html element from backstage*/
        config.handlebars(json, "ym-detail-banner", "ym-detail-adContainer", {resDate: json.data});
    }

    config.reqAPI("GET",config.api.tour,options,resDate);
};

YMGoods.prototype.loadSku = function () {
    var options = {
        id: 1124//this.routeId
    };
    console.log(options.id);
    function resDateCallback (json) {
        config.handlebars(json,"ym-detail-skuId","ym-detail-sku",{resDate:json.data[0].mat_sku});
        $(".ym-detail-adBuy-typeItem:eq(0)").addClass("ym-detail-price-active").css("background","#f5bb22");
    };

    var sku = $("#ym-detail-adContainer");
    $(document).ready(function () {
        config.reqAPI("GET", config.api.tour, options, resDateCallback);
    });
};

YMGoods.prototype.chooseType = function () {
    $(document).on("click",".ym-detail-adBuy-typeItem",function(){
        $(this).addClass("ym-detail-price-active").css("background","#f5bb22")
            .find(".ym-detail-adBuy-price").show();
        $(this).siblings().removeClass("ym-detail-price-active").css("background-color","#eee")
            .find(".ym-detail-adBuy-price").hide();
        /*reset input style and value*/
        $(".ym-detail-input").val("1");
        $(".ym-detail-reduce").css({
            "cursor":"not-allowed",
            "backgroundColor": "#ccc"
        }).attr("disabled",true);
    });
};

YMGoods.prototype.countNum = function () {
    $(document).on("keyup",".ym-detail-input",function () {
        var oNum = $(this).val();
        var reg = /^\+?[1-9][0-9]*$/; /*非0整数*/
        if(oNum == ""){
            $(".ym-errorMsg").show();
        } else if(!reg.test(oNum)){
            $(this).val("1");
            $(".ym-errorMsg").hide();
        } else if(oNum > 6){
            $(this).val("6");
            $(".ym-errorMsg").hide();
        } else {
            $(".ym-errorMsg").hide();
            $(".ym-detail-reduce,.ym-detail-plus").removeAttr("disabled")
                .css({
                    "cursor":"pointer",
                    "backgroundColor": "#fff"
                });
        }
    });

    $(document).on("click",".ym-detail-plus",function () {
        var inputSku = $(".ym-detail-input");
        var oNum = inputSku.val();
        if(oNum<6) {
            oNum++;
            inputSku.val(oNum);
            $(".ym-detail-reduce,.ym-detail-plus").removeAttr("disabled")
                .css({
                    "cursor":"pointer",
                    "backgroundColor": "#fff"
                });
        }else {
            $(this).css({
                "cursor":"not-allowed",
                "backgroundColor": "#ccc"
            }).attr("disabled",true);
        }
    });

    $(document).on("click",".ym-detail-reduce",function () {
        var inputSku = $(".ym-detail-input");
        var oNum = inputSku.val();
        if(oNum>2) {
            oNum--;
            inputSku.val(oNum);
            $(".ym-detail-reduce,.ym-detail-plus").removeAttr("disabled")
                .css({
                    "cursor":"pointer",
                    "backgroundColor": "#fff"
                });
        }else {
            inputSku.val("1");
            $(this).css({
                "cursor":"not-allowed",
                "backgroundColor": "#ccc"
            }).attr("disabled",true);
        }
    });
};

/*购买*/
YMGoods.prototype.submit = function () {
    var routeId = 1124;//this.routeId;
    $(document).on("click",".ym-detail-submit",function () {
        // 判断是否登陆
        if($.cookie("isLogin")) {
            var oNum = $(".ym-detail-input").val();
            var _this = $(".ym-detail-price-active");
            var skuId = _this.find(".ym-detail-adBuy-type").attr("data-skuId");
            var options = {
                sku: skuId,
                num: oNum,
                contact: ""
            };
            function switchPage(json) {
                if (json.ret == true) {
                    // 跳转到商品购买页面
                    location.href = config.html.goodsPay + "?rid="+ routeId +"&orderNum="+json.data.mao_id;
                }else {
                    console.log(json);
                }
            };
            config.reqAPI("POST",config.api.createOrder,options,switchPage);
        }else {
            var href = location.href;
            var url = JSON.stringify(href);
            $.cookie("urlRedirect",url,{expires:1,path:"/"});
            location.href = config.html.login;
        }
    });
};


YMGoods.prototype.render = function () {
    this.loadHtml();
    this.loadSku();
    this.chooseType();
    this.countNum();
    this.submit();

    var sku = new YMSku();
    sku.showBtn();
    sku.closeBtn();

};
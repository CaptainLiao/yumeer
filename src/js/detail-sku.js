
/*Request goods sku from backstage*/
var YMSku = function () {
    var params = config.getUrlParam();
    this.routeId = params.rid;    /*获取线路id*/
};

YMSku.prototype.loadSku = function () {
    var options = {
        id: this.routeId
    };
    console.log(options.id);
    function resDateCallback (json) {
        config.handlebars(json,"ym-detail-skuId","ym-detail-sku",{resSkuDate:json.data[0].mat_sku});
        $(".ym-detail-adBuy-typeItem:eq(0)").addClass("ym-detail-price-active").css("background","#f5bb22");
    };

    var sku = $("#ym-detail-adContainer");
    $(document).ready(function () {
        config.reqAPI("GET", config.api.tour, options, resDateCallback);
    });
};


YMSku.prototype.chooseType = function () {
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

YMSku.prototype.countNum = function () {
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

YMSku.prototype.showBtn = function () {
    $(document).on("click",".ym-detail-submit-smallBtn",function () {
        $(".ym-detail-submit-bottomBtn").hide();
        $(".ym-detail-adBuy-table,.ym-detail-submit,.ym-close").show();
    });
};

/*预定线路*/
YMSku.prototype.submit = function () {
    var routeId = this.routeId;
    $(document).on("click",".ym-detail-submit",function () {

        // 判断是否登陆
        if($.cookie("isLogin")) {
            // 发起一个空的请求，判断用户登陆信息(token的有效性)
            function switchPage(json) {
                if(json.ret == true){
                    var oNum = $(".ym-detail-input").val();
                    var _this = $(".ym-detail-price-active");
                    var skuId = _this.find(".ym-detail-adBuy-type").attr("data-skuId");
                    location.href = config.html.order + "?rid="+ routeId + "&skuId="+skuId+"&oNum="+oNum;
                }else {
                    // 登陆超时，自动跳转到登录页
                    var href = location.href;
                    var url = JSON.stringify(href);
                    $.cookie("urlRedirect",url,{expires:1,path:"/"});
                    location.href = config.html.login;
                    console.log($.cookie("urlRedirect"));
                    console.log(json);
                }
            }
            config.reqAPI("GET",config.api.createOrder,"",switchPage);
        }else {
            var href = location.href;
            var url = JSON.stringify(href);
            $.cookie("urlRedirect",url,{expires:1,path:"/"});
            location.href = config.html.login;
        }

    });
};

YMSku.prototype.closeBtn = function () {
    $(document).on("click",".ym-close",function () {
        $(".ym-detail-submit-bottomBtn").show();
        $(".ym-detail-adBuy-table,.ym-detail-submit,.ym-close").hide();
    });
};

YMSku.prototype.render = function () {
    //this.loadSku();
    this.chooseType();
    this.countNum();
    this.showBtn();
    this.submit();
    this.closeBtn();
};
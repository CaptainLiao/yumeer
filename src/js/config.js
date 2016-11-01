/**
 * Created by yumeer on 2016/8/30.
 */

var YMConfig = function (){
    /*var url = "http://localhost:10240/mast/dist";*/
    // 正式环境
    var url = "http://ma.yumeer.com";
   /* var url = "http://mast.yumeer.com:20002/dist";*/
  this.html = {
      "alipay": url+"/alipay", // 支付宝支付跳转页
      "register": url+"/register",
      "login": url+"/login",
      "pwd": url+"/pwd",  // 修改密码
      '404': url+"/404",

      "index": url+"/index",
      "detail": url+"/detail",  // 详情页
      "order": url+"/order",  // 订单页
      "oDeposit": url+"/oDeposit",  // 订金
      "oVisa": url+"/oVisa",  // 签证
      "oSettle": url+"/oSettlement",  // 尾款
      "oComplete": url+"/oComplete" , // 支付完成
      "uCenter": url+"/user-center" , // 用户中心
       "goods": url + "/goods", // 商品详情
      "goodsPay": url+"/goods-pay" , // 商品支付
      "about": url+"/about" , // 关于我们
      "review": url+"/review" , // 游学回顾


      /*"alipay": url+"/alipay.html", // 支付宝支付跳转页
      "register": url+"/register.html",
      "login": url+"/login.html",
      "pwd": url+"/pwd.html",  // 修改密码
       '404': url+"/404.html",

      "index": url+"/index.html",
      "detail": url+"/detail.html",  // 详情页
      "order": url+"/order.html",  // 订单页
      "oDeposit": url+"/oDeposit.html",  // 订金
      "oVisa": url+"/oVisa.html",  // 签证
      "oSettle": url+"/oSettlement.html",  // 尾款
      "oComplete": url+"/oComplete.html" , // 支付完成
      "uCenter": url + "/user-center.html", // 用户中心
      "goods": url + "/goods.html", // 商品详情
      "goodsPay": url+"/goods-pay.html" , // 商品支付
       "about": url+"/about.html" , // 关于我们
       "review": url+"/review.html" , // 游学回顾*/


      "routeList": "http://www.yumeer.com/home/detail/",
      "helpPay": "http://www.yumeer.com/home/help/pay"
  };

  this.api = {
      "alipayAPI": "http://test4api.yumeer.com:10240/ma/pay/alipay",
      "wxpayAPI": "http://test4api.yumeer.com:10240/ma/pay/wxpay",
      "createOrder": "http://test4api.yumeer.com:10240/ma/order",
      "createContact": "http://test4api.yumeer.com:10240/ma/order/contact",
      "registMobile": "http://test4api.yumeer.com:10240/ma/user/register_by_mobile",
      "mobileCode": "http://test4api.yumeer.com:10240/ma/user/send_sms",  // 手机验证码
      "checkRegister": "http://test4api.yumeer.com:10240/ma/user/check_register",
      "login": "http://test4api.yumeer.com:10240/ma/user/login",
      "pwd": "http://test4api.yumeer.com:10240/ma/user/find_password",
      "checkCode": "http://test4api.yumeer.com:10240/ma/user/check_sms_code",
      "wxLogin": "http://test4api.yumeer.com:10240/ma/user/welogin",    // 微信登录、注册

      "homeBanner": "http://test4api.yumeer.com:10240/ma/home/banner",
      "camp": "http://test4api.yumeer.com:10240/ma/home/reserve_camp",
      "sku":"http://test4api.yumeer.com:10240/ma/sku",
      "tour": "http://test4api.yumeer.com:10240/ma/tour"
  };
};

// ajax请求
YMConfig.prototype.reqAPI = function (reqMethod,reqUrl,options,callback){
    var uu_id = new Fingerprint().get();
    console.log(uu_id);
    if($.cookie("isLogin")) {
        var loginInfo = JSON.parse($.cookie("isLogin")),
            token = loginInfo.mau_token;
    }else {
        token = "";
    }
    $.ajax({
        type: reqMethod,
        url: reqUrl,
        dataType: "json",
        data: options,
        /*beforeSend: function (xhr) {
          xhr.setRequestHeader("token",token);
        },*/
        headers: {
            'X-API-TOKEN': token,
            'X-API-UUID': uu_id
        },
        success: callback,
        complete: function (xhr,state){
            console.log(state+"1111");
        },
        error: function(status){
            console.log("出现错误啦"+status);
        }
    })
};

YMConfig.prototype.getUrlParam = function () {
    var href = window.location.href;
    var oParam = {};
    if(href.indexOf("?") == -1){
        location.href = this.html[404];
    }else {
        var paramArray = href.split("?")[1].split("&");
        for(var i=0,len=paramArray.length;i<len;i++){
            var oData = paramArray[i].split("=");
            switch(oData[0]) {
                case "uid":
                    oParam.uid = oData[1];   // 用户id
                    break;
                case "rid":
                    oParam.rid = oData[1];  // 线路id
                    break;
                case "skuId":
                    oParam.skuId = oData[1];
                    break;
                case "oNum":
                    oParam.oNum = oData[1];   // 订单数量
                    break;
                case "orderNum":
                    oParam.orderNum = oData[1];  // 主订单编号
                    break;
                case "skuNum":
                    oParam.skuNum = oData[1];   // 子订单编号
                    break;
                default:
                    location.href = this.html[404];
            }
        }
    }
    return oParam;
};

/*Load data form backstage and compile tpl to frontend*/
YMConfig.prototype.handlebars = function (json,tplId, targetId,resDate) {
    var detailBanner = $("#"+tplId).html();
    var template = Handlebars.compile(detailBanner);
    var data = resDate;/*{resDate:resDate};*/
    var html = template(data);
    $("#"+targetId).html(html);
};


YMConfig.prototype.handlebars2 = function (json,tplId, targetId,resDate, keepTpl) {
    var detailBanner = $("#"+tplId).html();
    var template = Handlebars.compile(detailBanner);
    var data = resDate;/*{resDate:resDate};*/
    var html = template(data);
    // 判断是否保留模板
    if(keepTpl){
        var tpl = $("#"+targetId).children().first();
        tpl.siblings().remove();
        $("#"+targetId).append(html);
    }else{
        $("#"+targetId).html(html);
    }

};

YMConfig.prototype.keyEvent = function (id) {
    $(document).keyup(function(event){
        if(event.keyCode ==13){
            $(id).trigger("click");
        }
    });
};

/*
YMConfig.prototype.resize = function (callback1,callback2){
    var smallScreen = 640;
    $(window).on("resize load",function(){
        var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
        if (clientWidth < smallScreen) {
           callback1;
        }else {
            callback2;
        }
    });
};*/

/**
 * Created by yumeer on 2016/10/26.
 */

var YMGoodsPay = function () {
    var params = config.getUrlParam();
    this.orderNum = params.orderNum;    /*请求数据加载页面所需：主订单号和线路id*/
    this.routeId = params.rid;
};

YMGoodsPay.prototype.choosePayment = function () {
    var oinput = $(".ym-payMethod-item").children("input"),
        orderNum = this.orderNum,   //获得商品订单号
        payBtn = $(".ym-payMethod-btn"),
        paySubmit = $(".ym-payMethod-submit"),
        search = location.href.split("?")[1],  //url 参数
        aliPay = $(".ym-payMethod-alipay"),
        onBank = $(".ym-payMethod-bank"),
        transfers = $(".ym-payMethod-transfers"),
        wxInput = $(".ym-payMethod-wxInput"),
        aliInput = $(".ym-payMethod-aliInput"),
        onBankInput = $(".ym-payMethod-onBank");
    //选择支付方式（与支付尾款一致）
    oinput.each(function(){
        var $that = $(this);
        $that.click(function(){
            $that.addClass("ym-payMethod-active").nextAll().fadeIn().find(".ym-payment").fadeOut();
            $that.parent().siblings().find(".ym-payment").fadeOut("500");
            $that.parent().siblings().find("input").removeClass("ym-payMethod-active");
            //  隐藏、显示提交按钮
            if(wxInput.hasClass("ym-payMethod-active")){
                paySubmit.hide();
            }else if(transfers.find("input").hasClass("ym-payMethod-active")) {
                payBtn.hide();
            }else {
                payBtn.show();
                paySubmit.show();
            }
        })
    });

    //获得微信支付二维码
    wxInput.click(function(){
        var options = {
            order: orderNum,
            type: "NATIVE"
        };
        function getWXCode (json) {
            $("#ym-wxpay").attr("src",json.data);
            console.log(json.msg+"/n"+orderNum);
        };
        config.reqAPI("POST",config.api.wxpayAPI,options,getWXCode);
    });
    //微信支付成功跳转页面
    if (!this.ymmessage) {
        this.ymmessage = new YMMessage();
        this.ymmessage.init();
        this.ymmessage.subscribe(orderNum, function(data){
            if (data.topic == orderNum && data.msg == "PayFinish") {
                top.location.href = config.html.uCenter+"?"+search;
            }
        });
    }
    //支付宝、网银支付
    paySubmit.on("click",function () {
        if(aliInput.hasClass("ym-payMethod-active")) {
            //  支付宝支付
            window.open(config.html.alipay+"?"+search);
        }else if(onBankInput.hasClass("ym-payMethod-active")) {
            //  网银支付
            /*window.open(config.html.alipay+"?"+search);*/
        }else {
            return false;
        }
    });
};

YMGoodsPay.prototype.render = function () {
//  商品支付页面的支付系统、订单信息都与订金页面相似，故直接使用...同样需要线路id和主订单编号
    var deposit = new YMoDeposit();
    deposit.loadOrderInfo();
    deposit.loadRoute();
    deposit.moreDetail();

    this.choosePayment();
};
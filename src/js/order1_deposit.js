/**
 * Created by yumeer on 2016/9/7.
 */
var YMOrderDeposit = function(){

};

YMOrderDeposit.prototype.render = function(){
    //隐藏/显示支付详情（与支付尾款一致）
    var oinput = $(".ym-payMethod-item").children("input");
    oinput.each(function(){
        var $that = $(this);
        $that.click(function(){
            $that.nextAll().fadeIn().find(".ym-payment").fadeOut();
            $that.parent().siblings().find(".ym-payment").fadeOut("500");
        })
    });

    //获得商品订单号
    var orderNum = location.href.split("?")[1].split("=")[1];
    //微信支付
    $(".ym-payMethod-wxInput").click(function(){
        $.ajax({
            type: "POST",
            url: config.API.wxpayAPI,
            dataType: "json",
            data: {
                order: orderNum,
                type: "NATIVE",
                process: "dj"
            },
            success: function(json){
                $("#ym-wxpay").attr("src",json.data);
                console.log(json.msg+"/n"+orderNum);
            },
            error: function(status){
                console.log("出现错误啦"+status);
            }
        });
    });
    //微信支付成功跳转页面
    var search = location.href.split("?")[1];
    if (!this.ymmessage) {
        this.ymmessage = new YMMessage();
        this.ymmessage.init();
        this.ymmessage.subscribe(orderNum, function(data){
            if (data.topic == orderNum && data.msg == "PayFinish") {
                top.location.href = config.html["order-visa"]+"?"+search;
            }
        });
    }
    //支付宝支付
    $(".ym-payMethod-aliInput").click(function() {
        window.open(config.html.alipay+"?"+search);
    });
};

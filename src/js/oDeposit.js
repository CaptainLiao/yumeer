/**
 * Created by yumeer on 2016/10/9.
 */

var YMoDeposit = function () {
    var params = config.getUrlParam();
    this.orderNum = params.orderNum;    /*请求数据加载页面所需：主订单号和线路id*/
    this.routeId = params.rid;
};



YMoDeposit.prototype.loadOrderInfo = function () {
    var options = {
        id: this.orderNum
    };

    function getContactData (json) {
        console.log(json.data[0]);
        var data = json.data[0],
            map_price = data.map_price,
            map_earnest = data.map_earnest,
            mao_id = data.mao_id,
            type = data.mas_detail,
            item_num = data.maoe_item_num;
        if(data.mao_contact){
            var contact = JSON.parse(data.mao_contact), //  联系人信息
                parentsNum = contact.parents.length,
                studentsNum = contact.students.length,
                parents = contact.parents,
                students = contact.students;
        }


        // 填充sku数据
        $(".ym-deposit-price").text(map_earnest);
        $(".ym-payMethod-price").text("￥"+map_earnest);
        $(".ym-orderInfo-orderNum").text(mao_id);
        $(".ym-orderInfo-type").text(type);
        $(".ym-orderInfo-num").text(item_num);

        // 填充尾款
        var settleMoney = (map_price*item_num - map_earnest).toFixed(2);
        $(".ym-settle-money").text(settleMoney+"元");
        $(".ym-pay-bills-actually").text(settleMoney+"元");

        // 通过 handlebars 渲染联系人信息
        for(var i=0;i<parentsNum;i++){
            parents[i].num=i+1;
        }
        var oParents = {"parents":parents};
        for(i=0;i<studentsNum;i++){
            students[i].num = (i+1);
        }
        var oStudents = {"students":students};
        config.handlebars("","ym-orderInfo-form-parentsId", "ym-orderInfo-form-parents",oParents);
        config.handlebars("","ym-orderInfo-form-studentsId", "ym-orderInfo-form-students",oStudents);

    };
    config.reqAPI("GET",config.api.createOrder,options,getContactData);
};

YMoDeposit.prototype.loadRoute = function () {
    var options = {
        id: this.routeId  /*线路id*/
    };
    function renderAd(json) {
        var data = json.data[0],
            routeName = data.mat_title,
            starTime = data.mat_st,
            endTime = data.mat_et,
            day = data.mat_dur;
        $(".ym-orderInfo-route").text(routeName);
        $(".ym-orderInfo-starTime").text(starTime);
        $(".ym-orderInfo-endTime").text(endTime);
        $(".ym-orderInfo-day").text(day+"天");
    };
    config.reqAPI("GET",config.api.tour,options,renderAd);
};

YMoDeposit.prototype.h5wxPay = function () {

};

YMoDeposit.prototype.choosePayment = function () {
    var oinput = $(".ym-payMethod-item").children("input"),
        orderNum = this.orderNum,   //获得商品订单号
        payBtn = $(".ym-payMethod-btn"),
        paySubmit = $(".ym-payMethod-submit"),
        search = location.href.split("?")[1],  //订单编号、线路id等信息 参数
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
                top.location.href = config.html.oVisa+"?"+search;
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


    // h5微信支付、支付宝支付
    var _userAgent = navigator.userAgent;
    if(_userAgent.indexOf("iPad")>-1 || _userAgent.indexOf("iPhone")>-1 ||
        _userAgent.indexOf("Android ")>-1){
        $(".ym-payMethod-wx").on("click",function () {
            var options = {
                order: orderNum,
                type: "JSAPI"
            };

            function getWXCode(json) {
                console.log(json);

            }
            config.reqAPI("POST",config.api.wxpayAPI,options,getWXCode);
        });
        $(".ym-payMethod-alipay").on("click",function () {
            console.log($(this));
            window.location.replace(config.html.alipay+"?"+search);
        });
    }

};


YMoDeposit.prototype.moreDetail = function () {
    // 查看产品详情
    $(".ym-orderInfo-details").attr("href",config.html.detail+"?rid="+this.routeId);
    // 不知道如何支付
    $(".ym-how-to-pay").attr("href",config.html.helpPay);
};

YMoDeposit.prototype.render = function () {
    var cUserAgent = new checkUserAgent();
    cUserAgent.init();

    this.loadOrderInfo();
    this.loadRoute();
    this.moreDetail();
    this.choosePayment();
};
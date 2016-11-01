/**
 * Created by yumeer on 2016/10/24.
 */

var YMUserCenter = function (){

};

YMUserCenter.prototype.renderUserOrder = function () {

    // 订单数量显示

    var options = {

    };

    function renderHtml (json){
        var jsonData = json.data;
        for(var i=0,len=jsonData.length;i<len;i++){
            var times=jsonData[i].mao_at.split(" ")[0];
            jsonData[i].mao_at = times;
        }
        console.log(jsonData);
        config.handlebars(json,"ym-myOrder-itemId","ym-myOrder-item",{orderItems:json.data});

        // 显示购买订单数量
        var len = $(".ym-myOrder-detail-number").length;
        $(".ym-uc-nav-orderQuantity").text(len);
        if(len <= 0) {
            $(".ym-myOrder-table").append("<b style='margin: 30px;display: block'>您还没有购买任何一个商品呢......</b>")
        }

        //  查看线路详情
        $(".ym-myOrder-detail-des").on("click",function () {
            var tourId = $(this).attr("data-tourId");
            window.location.href = config.html.detail + "?rid=" + tourId;
        });
        console.log(json);

        // 根据状态显示支付进度
        var statusBtn = $(".ym-myOrder-payMoney-btn");
        function jumpPages(id,url) {
            id.on("click",function () {
                var mao_id = id.attr("data-maoid");
                var tour_id = id.parent().attr("data-tourId");
                id.attr("href", url +"?rid="+tour_id+ "&orderNum=" + mao_id);
            });
        }

        statusBtn.each(function () {
            var status = $(this).attr("data-ostatus");
            var index = "";
            var data = "";
            switch(status){
                case "1":
                    $(this).text("支付订金");
                    jumpPages($(this),config.html.oDeposit);
                    jumpPages($(".ym-myOrder-moreDetail"),config.html.detail);
                    index = $(this).parent().parent().index()-1;
                    data = json.data[index];
                    $(this).parent().prev().text("￥"+data.map_earnest);
                    break;
                case "2":
                    $(this).text("代办签证");
                    jumpPages($(this),config.html.oVisa);
                    jumpPages($(".ym-myOrder-moreDetail"),config.html.detail);
                    index = $(this).parent().parent().index()-1;
                    data = json.data[index];
                    $(this).parent().prev().text("￥"+(data.map_price*data.maoe_item_num - data.map_earnest));
                    break;
                case "3":
                    $(this).text("支付尾款");
                    jumpPages($(this),config.html.oSettle);
                    jumpPages($(".ym-myOrder-moreDetail"),config.html.detail);
                    index = $(this).parent().parent().index()-1;
                    data = json.data[index];
                    $(this).parent().prev().text("￥"+(data.map_price*data.maoe_item_num - data.map_earnest));
                    console.log($(this).parent().parent().index());
                    break;
                case "4":
                    $(this).text("等待出行");
                    jumpPages($(this),config.html.oComplete);
                    jumpPages($(".ym-myOrder-moreDetail"),config.html.detail);
                    $(this).parent().prev().text("");
                    break;
                default:
                    $(this).text("已结束").attr("disabled","disabled");
                    $(".ym-myOrder-moreDetail").attr("disabled","disabled");
                    $(this).parent().prev().text("");
            }

        });

    };
    config.reqAPI("GET",config.api.createOrder,options,renderHtml);
};

YMUserCenter.prototype.back = function () {
    $(".ym-back-iconfont").on("click",function () {
        history.back(-1);
    });
};

YMUserCenter.prototype.render = function () {
    var cUserAgent = new checkUserAgent();
    cUserAgent.keepHeadNav();

    this.renderUserOrder();
    this.back();
};


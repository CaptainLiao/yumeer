/**
 * Created by yumeer on 2016/10/10.
 */
var YMoVisa = function () {
    var params = config.getUrlParam();
    this.orderNum = params.orderNum;    /*请求数据加载页面所需：主订单号和线路id*/
    this.routeId = params.rid;
};

YMoVisa.prototype.render = function () {
    /*签证页面的订单信息部分与订金页面相同，这里直接应用订金页面的代码
    * 加载页面需要rid orderNum*/
    var cUserAgent = new checkUserAgent();
    cUserAgent.init();

    var deposit = new YMoDeposit();
    deposit.loadOrderInfo();
    deposit.loadRoute();
    deposit.moreDetail();
};
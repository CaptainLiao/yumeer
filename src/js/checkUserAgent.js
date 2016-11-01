/**
 * Created by yumeer on 2016/10/26.
 */
var checkUserAgent = function () {

};

checkUserAgent.prototype.keepFooter = function () {
    var _userAgent = navigator.userAgent;
    if(_userAgent.indexOf("iPad")>-1 || _userAgent.indexOf("iPhone")>-1 ||
        _userAgent.indexOf("Android ")>-1){
        $("#ym-footer").css({
            "display":"none"
        });
        console.log(navigator.userAgent);
    }else {
        $("#ym-footer").css({
            "display":"block"
        });
    }
};

checkUserAgent.prototype.keepExtra = function () {
    var _userAgent = navigator.userAgent;
    if(_userAgent.indexOf("iPad")>-1 || _userAgent.indexOf("iPhone")>-1 ||
        _userAgent.indexOf("Android ")>-1){
        $(".ym-detail-extra").css({
            "display":"none"
        });
        console.log(navigator.userAgent);
    }else {
        $(".ym-detail-extra").css({
            "display":"block"
        });
    }
};

checkUserAgent.prototype.keepHeadNav = function () {
    var _userAgent = navigator.userAgent;
    if(_userAgent.indexOf("iPad")>-1 || _userAgent.indexOf("iPhone")>-1 ||
        _userAgent.indexOf("Android ")>-1){
        $(".ym-header-container").css({
            "display":"none"
        });
        $(".ym-oa-head").css({
            "display":"block"
        });
    }else {
        $(".ym-header-container").css({
            "display":"block"
        });
        $(".ym-oa-head").css({
            "display":"none"
        });
    }
    $(".ym-back-iconfont").on("click",function () {
        window.history.back(-1);
    });

    $(".ym-back-home").on("click",function () {
        location.href = config.html.index;
    });
};

checkUserAgent.prototype.init = function () {
    this.keepExtra();
    this.keepFooter();
    this.keepHeadNav();
};
/**
 * Created by yumeer on 2016/9/7.
 */
var YMNav = function(id){
    this.id = id;
};
// 点击登录icon，跳转到登录页面
YMNav.prototype.login = function () {
    $(".ym-header-login").on("click",function () {
        var href = location.href;
        var url = JSON.stringify(href);
        $.cookie("urlRedirect",url,{expires:1,path:"/"});  // 当前页面的url地址存入cookie
        location.href = config.html.login;  // 跳转到登陆页面
    });
};

// 点击微信icon，下方显示服务号二维码
YMNav.prototype.wechatCode = function () {
    $(".ym-header-wechat").click(function () {
        $('.ym-header-extra-wechat').toggle();
    })
};

// 登录后用户信息展示
YMNav.prototype.isLogin = function () {
    if($.cookie("isLogin")) {
        var loginInfo = JSON.parse($.cookie("isLogin")),
            avatar = loginInfo.mau_headurl,  //头像
            uName = loginInfo.mau_name,
            u_id = loginInfo.u_id;
        console.log("user cookie:"+loginInfo);
        if(loginInfo == null) {
            $(".ym-nav-userAvatar").hide();
            $(".ym-header-info").show();

            console.log("没有登录");
        }else {
            $(".ym-header-info").hide();
            $(".ym-nav-userAvatar").show().attr("data-uid",u_id);
            console.log("登陆啦");
            // 加载用户个人信息
            $(".ym-userAvatar-link").find("img").attr("src",avatar);
            $(".ym-userAvatar-name").text(uName);
        }
    }else {
        console.log("没有登录信息");
    }
};
//  鼠标滑过用户头像位，展示下拉信息
YMNav.prototype.show = function(){
    $(".ym-nav-userInfo").on("mouseover,click",function (){
        var _this = $(".ym-header-nav");
        var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
        if(clientWidth>640){
            $(".ym-user-menu").stop().show();
        }

        // 头部导航栏隐藏（针对H5）
        if (clientWidth < 640 && _this.css("display") == "block"){
            $(".ym-iconfont-static").show();
            $(".ym-iconfont-active").hide();
            _this.hide().next().hide();
        }
    });
};
YMNav.prototype.hide = function(){
    $(".ym-nav-userInfo").on("mouseout,click",function (){
        var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
        if(clientWidth>640){
            $(".ym-user-menu").stop().hide();
        }
    });
};


// 用户信息点击事件
YMNav.prototype.userInfoEvent = function () {
    // 点击头像，跳转到用户中心并渲染用户订单列表
    $(".ym-userAvatar-name,.ym-user-myOrder").on("click",function () {
        var params = config.getUrlParam();
        this.uid = params.uid;
        var u_id = $(".ym-nav-userAvatar").attr("data-uid");
        window.location.href = config.html.uCenter + "?uid=" + u_id;

    });

    // 退出账户，清除cookies
    $(".ym-user-quit").on("click",function () {
        $.cookie("isLogin",null, {expires:0, path: "/" });

        $.cookie("WXID", 'false', { path: '/' ,domain:location.host});
        $.cookie("WXName", 'false', { path: '/' ,domain:location.host});
        $.cookie("WXAvatar", 'false', { path: '/' ,domain:location.host});
        $.cookie("WXOpenID", 'false', { path: '/' ,domain:location.host});
        console.log($.cookie("isLogin"));
        location.href = config.html.index;
    });
};

// 导航菜单隐藏/显示  （H5）
YMNav.prototype.menuClick = function () {
    $(".ym-header-menu").on("click",function(){
        var _this = $(".ym-header-nav");
        if (_this.css("display") == "none"){
            $(".ym-iconfont-static").hide();
            $(".ym-iconfont-active").show();
            _this.slideDown();
            _this.next().slideDown().find('.ym-header-infoItem').slideDown();
            $(".ym-header-extra-wechat").hide();
        }else {
            $(".ym-iconfont-static").show();
            $(".ym-iconfont-active").hide();
            _this.slideUp().next().slideUp();
        }
    });
};

// header滚动特效
YMNav.prototype.navPos = function() {
    var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
    if (clientWidth > 640){
        var navHeight = $("#ym-header").height();
        $(window).scroll(function(){
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if(scrollTop == navHeight){
                $(".ym-header").slideUp();
            }else if (scrollTop > navHeight){
                $(".ym-header").show().addClass("ym-nav-transform");
            }else if(scrollTop < navHeight) {
                $(".ym-header").slideDown().removeClass("ym-nav-transform");
            }
        });
    }else {
        return false;
    }
};

YMNav.prototype.render = function(){
    this.show();
    this.hide();
    this.menuClick();
    this.navPos();
    this.login();
    this.isLogin();
    this.userInfoEvent();
    this.wechatCode();
};
YMNav.prototype.render2 = function () {
    this.show();
    this.hide();
    this.login();
    this.isLogin();
    this.menuClick();
    this.userInfoEvent();
    this.wechatCode();

    var _userAgent = navigator.userAgent;
    if(_userAgent.indexOf("iPad")>-1 || _userAgent.indexOf("iPhone")>-1 ||
        _userAgent.indexOf("Android ")>-1){
        return false;
    }else {
        $("#ym-header").css({
            "background": "#fff",
            "border-bottom": "1px solid #ccc"
        });
        $(".ym-navItem,.ym-navLogo,.ym-header-infoItem,.ym-header-infoList").find("a").css("color","#333");
    }

};

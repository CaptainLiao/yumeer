/**
 * Created by yumeer on 2016/10/12.
 */

var YMLogin = function () {
    config.keyEvent(".ym-login-submitBtn");
};

YMLogin.prototype.init = function () {
    //  微信登陆
    var options = {},
        WXID=$.cookie("WXID"),
        WXName=$.cookie("WXName"),
        WXAvatar = $.cookie("WXAvatar"),
        WXOpenID = $.cookie("WXOpenID");
    if($.cookie("isLogin")) {
        $.cookie("isLogin",null, {expires:0, path: "/" });
        window.location.reload(true);
    }else if(WXID !="false" && WXName !="false" && WXAvatar !="false" && WXOpenID !="false") {
        options = {
            oid: WXOpenID,
            id: WXID,
            name: WXName,
            headurl: WXAvatar
        };
        function resDate(json) {
            var data = json.data[0];
            if(json.ret == true) {
                var param = {
                    'u_id': data.u_id,
                    'mau_name':data.mau_name,
                    'mau_headurl': data.mau_headurl,
                    'mau_token': data.mau_token
                };
                var cookies = JSON.stringify(param);
                $.cookie("isLogin",cookies,{expires:3,path:"/"});
                console.log("登录的cookie"+$.cookie("urlRedirect"));
                if($.cookie("urlRedirect")) {
                    var urlRedirect = JSON.parse($.cookie("urlRedirect"));
                    //location.href = urlRedirect;
                    location.href = config.html.uCenter;
                }else {
                    location.href = config.html.uCenter;
                }
            }else {
                console.log(json);
            }
        };
        config.reqAPI("GET",config.api.wxLogin,options,resDate);
    }

};

YMLogin.prototype.switchLogin = function () {
    var oStatic = $(".ym-static-icon"),
        oQuick = $(".ym-quick-icon"),
        staticTip = $(".ym-popTip-accountLogin"),
        quickTip = $(".ym-popTip-wxLogin"),
        staticForm = $(".ym-login-form"),
        quickForm = $(".ym-quick-from");
    $(".ym-login-switch-icon").on("click",function () {
        if(oStatic.css("display") == "none"){
            oStatic.show().siblings().hide();  //图标切换
            staticTip.show().siblings().hide();  // 提示文字切换
            staticForm.hide();  // 表单切换
            quickForm.show();
        }else if (oQuick.css("display") == "none") {
            oQuick.show().siblings().hide();
            quickTip.show().siblings().hide();
            quickForm.hide();
            staticForm.show();
        }
    });
};

YMLogin.prototype.validateAccount = function () {
    $("#ym-login-form").validate({
        rules: {
            phone: {
                required: true,
                checkPhone: true
            },
            password: {
                required: true
            }
        },
        messages: {
            phone: {
                required: "用户名不能为空"
            },
            password: {
                required: "密码不能为空"
            }
        }
    });
    //检查手机号码是否正确
    $.validator.addMethod("checkPhone",function(value,element,params){
        var myreg = /^1[34578]\d{9}$/;
        $(".phoneNum").next().remove();
        return (myreg.test(value));
    },"请输入正确的手机号码");

    $(".phoneNum").keyup(function(){
        if($(this).val().length==11){
            $(".phoneNum").nextAll().remove();
        }else {
            $(".phoneNum").nextAll().remove();
        }
    });
};

YMLogin.prototype.submit = function () {
    $(".ym-login-submitBtn").on("click",function () {
        var phoneInput = $(".phoneNum");
        var oAccount = phoneInput.val();
        var pwd = $(".ym-password").val();

        if(oAccount && pwd) {
            var options = {
                account: oAccount,
                password: pwd
            };
            function resDate(json) {
                console.log(json);
                var data = json.data[0];
                if(json.ret == false) {
                    phoneInput.nextAll().remove();
                    phoneInput.parent().append('<label id="phoneCode-error" class="error">'+json.msg+'</label>');
                }else {
                    var param = {
                        'u_id': data.u_id,
                        'mau_name':data.mau_name,
                        'mau_headurl': data.mau_headurl,
                        'mau_token': data.mau_token
                    };
                    var cookies = JSON.stringify(param);
                    $.cookie("isLogin",cookies,{expires:3,path:"/"});
                    console.log("登录的cookie"+$.cookie("urlRedirect"));
                    if($.cookie("urlRedirect")) {
                        var urlRedirect = JSON.parse($.cookie("urlRedirect"));
                        //location.href = urlRedirect;
                        location.href = config.html.uCenter;
                    }else {
                        location.href = config.html.uCenter;
                    }
                }
            };
            config.reqAPI("GET",config.api.login,options,resDate);
        }else {
            return false;
        }
    });
/*    $(".ym-login-submitBtn").on("click",function () {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://test4api.yumeer.com:10240/ma/order?eid=00141891001024286",
            "method": "GET",
            "headers": {
                "x-api-uuid": "123456789",
                "x-api-token": "5ed468849e13f9b887243574e67d6139",
                "cache-control": "no-cache",
                "postman-token": "277f8647-557f-39a7-d629-53d68fa22d3e"
            }
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
        });
    });*/
    // 注册新用户链接
    $(".ym-register-newaccount").attr("href",config.html.register);
    // 忘记密码
    $(".ym-forget-pwd").attr("href",config.html.pwd);
};

YMLogin.prototype.clearAccount = function () {
    // 用户输入时，输入框出现关闭按钮
    var accountInput = $(".phoneNum"),
        closeBtn = $(".ym-phoneNum-closeBtn");
    accountInput.on("keyup",function () {
        closeBtn.show();
    });
    // 点击关闭按钮，清空账户信息
    closeBtn.on("click",function () {
        $(".phoneNum").val("").focus();
        $(this).hide();
    });
};

YMLogin.prototype.wxLogin = function () {
    $(document).ready(function () {

    })
};

YMLogin.prototype.render = function () {

    var cUserAgent = new checkUserAgent();
    cUserAgent.keepFooter();

    this.init();
    this.switchLogin();
    this.validateAccount();
    this.submit();
    this.clearAccount();

    var obj = new WxLogin({
        id: "ym-login-quick-code",
        appid: "wxcc98f0dcd5149a9b",//wxf8a48d5e5ac46b12
        scope: "snsapi_login",
        redirect_uri: encodeURIComponent('http://ma.yumeer.com/check_wxlogin?returnurl=' + location.href),
        state: ~~(Math.random() * 1000000),
        style: "",
        href: "https://new-yumeer-mainsite.oss-cn-shenzhen.aliyuncs.com/css/wx.css"
    });
};
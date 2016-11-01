/**
 * Created by yumeer on 2016/10/13.
 */
// 修改密码页面

var YMPwd = function () {

};


YMPwd.prototype.validater = function () {
    $("#ym-pwd-forget").validate({
        rules: {
            phone: {
                required: true,
                checkPhone: true
            },
            "ym-phoneCode": {
                required: true
            }
        },
        messages: {
            phone: {
                required: "用户名不能为空"
            },
            "ym-phoneCode": {
                required: "验证码不能为空"
            }
        }
    });
    $("#ym-pwd-modify").validate({
        rules: {
            password: {
                required: true,
                rangelength: [6,18]
            },
            "password-confirm": {
                required: true,
                equalTo: ".ym-password"
            }
        },
        messages: {
            password: {
                required: "密码不能为空",
                rangelength: "请输入6-18位数密码"
            },
            "password-confirm": {
                required: "确认密码不能为空",
                equalTo: "密码输入不一致，请重新输入"
            }
        }
    });
    //检查手机号码是否正确
    $.validator.addMethod("checkPhone",function(value,element,params){
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        $(".phoneNum").next().remove();
        return (myreg.test(value));
    },"请输入正确的手机号码");

    $(".phoneNum").keyup(function(){
        if($(this).val().length==11){
            $(".phoneNum").next().remove();
            $(".ym-getPhoneCode").removeAttr("disabled");
        }else {
            $(".phoneNum").next().remove();
            $(".ym-getPhoneCode").attr("disabled","disabled");
        }
    });

    //获取手机验证码
    var wait = 9;
    var intervalObj;
    var phone = $(".phoneNum");
    var phoneCode = $(".ym-phoneCode-check");

    $(".ym-getPhoneCode").click(getPhoneCode);
    function getPhoneCode(){
        var phoneNum = phone.val();
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        $(".ym-phoneCode-check").val("");
        if(!phoneNum || !myreg.test(phoneNum)){
            phone.focus();
            $(".ym-getPhoneCode").parent().find(".ym-errorMsg").remove();
        }else {
            phone.next().remove();
            $(".ym-getPhoneCode")
                .html(wait + " 秒后重新发送")
                .attr("disabled","disabled");
            intervalObj = window.setInterval(setWaitTime,1000);
            //向后台提交手机号码
            getMobileCode();
        }
    };
    //设置验证等待时间
    function setWaitTime(){
        if(wait==0){
            window.clearInterval(intervalObj);
            $(".ym-getPhoneCode")
                .removeAttr("disabled")
                .html("重新获取验证码");
            wait = 9;
        }else {
            wait--;
            $(".ym-getPhoneCode").html(wait + " 秒后重新发送");
            console.log(wait);
        }
    };
    /*Send Register code*/
    function getMobileCode(){
        var options = {
            mobile: $(".phoneNum").val(),
            type: "password"
        };
        function  resDate(json) {
            console.log(json);
        }
        config.reqAPI("GET",config.api.mobileCode,options,resDate);
    }
    // 前端判断验证码是否为6位数字
    $(".ym-phoneCode-check").keyup(checkPhoneCode);
    function checkPhoneCode(){
        var phoneInput = $(".phoneNum"),
            phoneCodeNum = phoneCode.val();
        $(".ym-getPhoneCode").parent().find(".ym-errorMsg").remove();
        if(phoneCodeNum.length==6){
            phoneInput.next().remove();
        }else if(phoneCodeNum.length!="") {
            phoneInput.next().remove();
            phoneInput.parent().append('<label id="phoneCode-error" class="error">请输入6位验证码 </label>');
        }
    };
};
// 根据验证码的对错决定是否跳转到修改密码
YMPwd.prototype.forget = function () {
    $(".ym-pwd-forgetBtn").on("click",function () {
        var phoneInput = $(".phoneNum"),
            phoneNum = phoneInput.val(),
            phoneCode = $(".ym-phoneCode-check").val();
        if(phoneNum && phoneCode) {
            var options = {
                mobile: phoneNum,
                code: phoneCode
            };
            function switchModify(json) {
                if(json.ret){
                    $("#ym-pwd-forget").hide();
                    $("#ym-pwd-modify").show();
                    console.log(json);
                }else {
                    phoneInput.nextAll().remove();
                    phoneInput.parent().append('<label id="phoneCode-error" class="error">用户名和验证码不匹配</label>');
                }
            }
            config.reqAPI("GET",config.api.checkCode,options,switchModify);
        }
    });
};
YMPwd.prototype.modify = function () {
    var modifyBtn = $(".ym-pwd-modifyBtn");

    modifyBtn.on("click",function () {
        var password = $(".ym-password").val(),
            pwdConfirm = $(".ym-passwordConfirm").val(),
            account = $(".phoneNum").val(),
            mobileCode = $(".ym-phoneCode-check").val();
        if (account && mobileCode && password==pwdConfirm) {
            var options = {
                account: account,
                code: mobileCode,
                new_password: password
            };
            console.log(options);
            function urlRedirect(json) {
                // 修改成功返回登陆之前的页面
                if (json.ret) {
                    console.log(json);
                    $(".ym-passwordConfirm").nextAll().remove();
                    $(".ym-passwordConfirm").parent().append('<label id="phoneCode-error" class="error">修改成功，4s后自动跳转到登录页面</label>');
                    function goLogin() {
                        location.href = config.html.login;
                    }
                    setTimeout(goLogin,4000);

                } else {
                    console.log("密码修改错误提示：" + json);
                }
            }
            config.reqAPI("GET", config.api.pwd, options, urlRedirect);
        }

    });
};
YMPwd.prototype.back = function () {
    $(".ym-pwd-back").attr("href",config.html.login);
};


YMPwd.prototype.render = function () {
    this.validater();
    this.forget();
    this.modify();
    this.back();
    var clearInfo = new YMLogin();
    clearInfo.clearAccount();
};
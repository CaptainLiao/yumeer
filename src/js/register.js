/**
 * Created by yumeer on 2016/10/11.
 */

var YMRegister = function () {

};

YMRegister.prototype.init = function () {
    if($.cookie("isLogin")) {
        $.cookie("isLogin",null, {expires:0, path: "/" });
        window.location.reload(true);
    }else {
        return false;
    }
};

YMRegister.prototype.validater = function () {
    $("#ym-register-form").validate({
        rules: {
            phone: {
                checkPhone: true
            },
            "ym-phoneCode": {
                required: true
            },
            password: {
                required: true,
                rangelength: [6, 18]
            },
            "password-confirm": {
                required: true,
                equalTo: ".ym-password"
            }
        },
        messages: {
            phone: {
                required: "用户名不能为空"
            },
            "ym-phoneCode": {
                required: "验证码不能为空"
            },
            password: {
                required: "密码不能为空",
                rangelength: '请输入6-18位密码'
            },
            "password-confirm": {
                required: "确认密码不能为空",
                equalTo: "密码不一致，请重新输入"
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
            checkRegister();
        }else {
            $(".phoneNum").next().remove();
            $(".ym-getPhoneCode").attr("disabled","disabled");
        }
    });
    /*check account information*/
    function showAccountMsg(json) {
        if(json.ret == true){
            $(".phoneNum").parent().append('<label id="phone-error" class="error" for="phone">手机已被注册</label>');
            $(".ym-getPhoneCode").attr("disabled","disabled");
            $(".ym-phoneCode-check").attr("disabled","disabled").val("");
        }else{
            $(".ym-getPhoneCode").removeAttr("disabled");
            $(".ym-phoneCode-check").removeAttr("disabled");
        };
        console.log(json);
    }
    function checkRegister(){
        var options = {
            account: $(".phoneNum").val()
        };
        config.reqAPI("GET",config.api.checkRegister,options,showAccountMsg);
    }
    //获取手机验证码
    var wait = 9;
    var intervalObj;
    $(".ym-getPhoneCode").click(getPhoneCode);

    //判断验证码是否正确
    $(".ym-phoneCode-check").keyup(checkPhoneCode);
    var phoneCode = $(".ym-phoneCode-check");
    function checkPhoneCode(){
        var phoneCodeNum = phoneCode.val();
        $(".ym-getPhoneCode").parent().find(".ym-errorMsg").remove();
        if(phoneCodeNum.length==6){
            phoneCode.next().remove();
        }else if(phoneCodeNum.length!="") {
            phoneCode.next().remove();
            $(".ym-getPhoneCode").parent().append("<i class='ym-errorMsg'>*验证码输入有误</i>");
        }
    };
    var phone = $(".phoneNum");
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
            getRegistCode();
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
    function getRegistCode(){
        var options = {
            mobile: $(".phoneNum").val(),
            type: "register"
        };
        function resDate(json) {
            console.log(json);
        }
        config.reqAPI("GET",config.api.mobileCode,options,resDate);

    }

    /*Register By Mobile*/
    $(".ym-register-submitBtn").on("click",function(){
        var mobile = $(".phoneNum").val(),
            password = $(".ym-password").val(),
            code = $(".ym-phoneCode-check").val(),
            phoneCode = $(".ym-phoneCode-check");
            phoneCode.next().remove();

        if(mobile && password && code) {
            var options = {
                mobile: mobile,
                password: password,
                code: code
            };
            function resDate(json) {
                console.log(json);
                if(!$(".ym-phoneCode-check").val()){
                    phone.next().remove();
                    phone.parent().append('<label id="phoneCode-error" class="error">'+json.msg+'</label>');
                }else if(json.ret == false){
                    phone.next().remove();
                    $(".ym-phoneCode-check").parent().append('<label id="phoneCode-error" class="error">'+json.msg+'</label>');
                }else {
                    var param = {
                        'u_id': json.data[0].u_id,
                        'mau_name':json.data[0].mau_name,
                        'mau_headurl': json.data[0].mau_headurl,
                        'mau_token': json.data[0].mau_token,
                        'u_mobile': json.data[0].u_mobile
                    };
                    var cookies = JSON.stringify(param);
                    $.cookie("isLogin",cookies,{expires:7,path:"/"});
                    window.location.href = config.html.index;
                }
            };
            config.reqAPI("POST",config.api.registMobile,options,resDate);

        }

    });
};

YMRegister.prototype.clearMobile = function () {
    $(".ym-phoneNum-closeBtn").on("click",function () {
        $(".phoneNum").val("").focus();
    });
};

YMRegister.prototype.render = function () {
    this.init();
    this.validater();
    //this.clearMobile();
    var clearInfo = new YMLogin();
     clearInfo.clearAccount();
};


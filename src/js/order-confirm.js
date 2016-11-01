/**
 * Created by yumeer on 2016/9/7.
 */
var YMOrderConfirm = function(){

};

YMOrderConfirm.prototype.validater = function () {
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
};
YMOrderConfirm.prototype.render = function(){
    //确定订单，跳转到支付定金页面
    $(".ym-order-commit").click(function () {
        var search = location.href.split("?")[1];
        console.log(search);
        location.href = config.html["order-deposit"]+"?"+search;
    });
};
/**
 * Created by yumeer on 2016/9/28.
 */

var YMCamp = function () {

};

YMCamp.prototype.submit = function () {
    $(".ym-camp-submit").click(function () {
        var name = $(".ym-camp-name").val(),
            address = $(".ym-camp-address").val(),
            mobile = $(".ym-camp-mobile").val();
        if(name&&name!="" && address&&address!="" && mobile&&mobile!=""){
            var options = {
                name: $(".ym-camp-name").val(),
                city: $(".ym-camp-address").val(),
                mobile: $(".ym-camp-mobile").val()
            };
            function successMsg (json) {
                if(json.ret == true) {
                    alert("恭喜您报名成功");
                }
            };
            config.reqAPI("POST",config.api.camp,options,successMsg);
        }else {
            alert("请填写完整的信息");
        }
    });
};

YMCamp.prototype.render = function () {
    this.submit();
};
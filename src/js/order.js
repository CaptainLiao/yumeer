/**
 * Created by yumeer on 2016/9/25.
 */
var YMOrder = function () {
    var params = config.getUrlParam();
    this.skuId = params.skuId;
    this.oNum = params.oNum;
    this.routeId = params.rid;
};



YMOrder.prototype.loadAd = function () {
    var options = {
        id: this.routeId  /*线路id*/
    };
    var _this = this;
    function renderAd(json) {
        console.log(json.data);
        config.handlebars(json,"ym-order-banner","ym-order-adContainer",{resDate:json.data});
        _this.loadSku();
    };
    config.reqAPI("GET",config.api.tour,options,renderAd);
};


YMOrder.prototype.loadSku = function () {
    var options = {
        id: this.skuId
    };
    var oNum = this.oNum;
    function renderHtml(json) {
        var data = json.data[0],
            totalPrice = data.mas_price*oNum,
            deposit = data.mas_earnest*oNum,
            skuType = data.mas_detail,
            skuType_num = skuType.split("+"),
            parentsNum = skuType_num[0].charAt(0)*oNum,
            studentsNum = skuType_num[1].charAt(0)*oNum,
            parents = [],
            students = [];
        console.log(data);
        // load sku information

        $(document).ready(function () {

            $(".ym-order-adBuy").find(".ym-order-type").text(skuType);

        });

        $(".ym-order-skuNum").find("span").text(oNum);
        $(".ym-order-skuFee").find("span").text(totalPrice);
        $(".ym-order-skuDeposit").find("span").text(deposit);

        // render form via handlebars
        for(var i=0;i<parentsNum;i++){
            parents.push(i+1);
        }
        var oParents = {"parents":parents};

        for(i=0;i<studentsNum;i++){
            students.push(i+1);
        }
        var oStudents = {"students":students};
        config.handlebars("","ym-order-form-parentsId", "ym-order-form-parents",oParents);
        config.handlebars("","ym-order-form-studentsId", "ym-order-form-students",oStudents);

        // 大人、小孩的数量加载
        $(".ym-order-parentsNum").text(parentsNum);
        $(".ym-order-studentsNum").text(studentsNum);

    };
    config.reqAPI("GET",config.api.sku,options,renderHtml);
};

YMOrder.prototype.checkForm = function () {
    $(document).ready(function () {
        var names = $(".ym-order-name");
        console.log("name"+names.length);
        for(var i = 0,len=names.length;i<len;i++){
            names[i].on("keyup",function () {
                var reg = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/;
                if(reg.test(this.value())) {
                    console.log("用户名正确");
                }else {
                    console.log("请填写正确的用户名");
                    return false;
                }
            })
        }
    });

};

YMOrder.prototype.submit = function () {
    var skuId = this.skuId,
        oNum = this.oNum,
        routeId = this.routeId;
    $(".ym-order-submit-btn").on("click",function () {
        //    json封装表单信息
        var data = {
                parents:[],
                students:[]
            };
        //    获取大人、小孩的表单信息
        function getContactInfo (id,type) {
            var item = $(id),
                len = item.length;
            for(var i= 0;i<len;i++){
                var _this = item.eq(i);
                var obj = {
                    flag: '',
                    name: _this.find(".ym-order-name").val(),
                    cellPhone: _this.find(".ym-order-cellPhone").val(),
                    email: _this.find(".ym-order-email").val(),
                    size: _this.find(".ym-order-size").val()
                };
                type[i] = obj;  // 将表单信息对象存入一个数组
            }
        };
        getContactInfo(".ym-order-form-parents-item",data.parents);
        getContactInfo(".ym-order-form-students-item",data.students);

        //    Ajax提交
        var options = {
            contact: JSON.stringify(data),
            sku: skuId,
            num: oNum
        };
        console.log(options.contact);
        function switchPage(json) {
            if (json.ret == true) {
                location.href = config.html.oDeposit + "?rid="+ routeId +"&orderNum="+json.data.mao_id;
                console.log(json);
            }else {
                // 出错，跳转到404
                alert(json.msg);
                location.href = config.html[404];
            }
        };
        config.reqAPI("POST",config.api.createOrder,options,switchPage);
    });
};

YMOrder.prototype.render = function () {
    var cUserAgent = new checkUserAgent();
    cUserAgent.init();

    this.loadAd();
    //this.loadSku();
    this.checkForm();
    this.submit();
};
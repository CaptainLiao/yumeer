/**
 * Created by yumeer on 2016/9/10.
 */

var YMIndexBanner = function(){

};

YMIndexBanner.prototype.loadBanner = function (){
    var options = {};
    function resDate(json){
        var screenWidth = document.documentElement.clientWidth || document.body.clientWidth;
        var h5Width = 640;
        var banner   = $("#ym-bannerId").html();
        var template = Handlebars.compile(banner);
        if(screenWidth < h5Width) {
            var data = {json:json.data,ret:false};
            console.log(screenWidth);
        }else {
            data = {json:json.data,ret:true};
            console.log(data.ret);
        }
        var html = template(data);
        $("#ym-banner").html(html);


        $('.ym-banner-list').slick({
            arrows: false,
            mobileFirst: true,
            pauseOnHover: true,
            dots: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 2000
        });

    };
    config.reqAPI("GET",config.api.homeBanner,options,resDate);
};

YMIndexBanner.prototype.hoverBanner = function () {
    $(document).on("mouseover",".ym-banner-item",function () {
        $(this).find('.iconfont').css("color","#f5bb22");
    });
    $(document).on("mouseout",".ym-banner-item",function () {
        $(this).find('.iconfont').css("color","#fff");
    });
};


YMIndexBanner.prototype.render = function(){
    this.loadBanner();
    this.hoverBanner();
};


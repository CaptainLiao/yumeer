/**
 * Created by yumeer on 2016/9/18.
 */

var YMFooter = function (){

};

YMFooter.prototype.toggle = function(){
    $(window).resize(function(){

    });
    var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
    if (clientWidth < 640){
        var title = $(".ym-footer-item").not(".ym-footer-review").find("h3");
        title.on("click",function () {
            $(this).next().slideToggle();
        });
        $(".ym-footer-review").click(function () {
            window.location.href = config.html.review;
        })
    }
};

// 初始化关于我们的选项，定位到关于我们页面相应的地方并显示
YMFooter.prototype.aboutEvent = function () {

    $(".ym-footer-about-qualification").href = config.html.about + "?about=qualification";
    $(".ym-footer-about-joinus").href = config.html.about + "?about=joinus";

};

YMFooter.prototype.render = function () {
    this.toggle();
    this.aboutEvent();
};
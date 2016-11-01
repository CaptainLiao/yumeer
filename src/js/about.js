/**
 * Created by yumeer on 2016/10/27.
 */

var YMAbout = function () {

};


YMAbout.prototype.tabSwitch = function () {
    var aboutNav = $(".ym-an-content").find("dd"),
        index = "";
    aboutNav.each(function () {
        $(this).click(function () {
            index = $(this).index()-1;
            $(this).find("a").addClass("ym-an-active").parent().siblings().find("a").removeClass("ym-an-active");
            $(".ym-about-common").eq(index).show().siblings().not(".ym-about-nav").hide();
        })
    });

};

YMAbout.prototype.render = function () {
    this.tabSwitch();
};
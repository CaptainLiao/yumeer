/**
 * Created by yumeer on 2016/9/10.
 */


var YMChoose = function (){

};

YMChoose.prototype.init = function () {
   var sayList = $(".ym-choose-sayImg").find("li");
   sayList.find(".ym-choose-sayImg-text").hide().find(".ym-choose-sayImg-words").hide();
   $(".ym-choose-active").find(".ym-choose-sayImg-text").show().find(".ym-choose-sayImg-words").show();
};

YMChoose.prototype.iconHover = function () {
   $(".ym-choose-item").on("mouseover",function () {
      $(this).find(".iconfont").css("color","#f5bb22");
   });
   $(".ym-choose-item").on("mouseout",function () {
      $(this).find(".iconfont").css("color","#fff");
      $(".ym-choose-safetyDescribe").find(".iconfont").css("color","#f5bb22");
   });
};


YMChoose.prototype.sayHover = function (){
   var sayList = $(".ym-choose-sayImg").find("li");
   var smallScreen = 640;
   $(window).on("resize load",function(){
      var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
      if (clientWidth < smallScreen) {
         $(".ym-choose-active").find(".ym-choose-sayImg-text").find(".ym-choose-sayImg-title").hide();
         sayList.on("mouseover",function(){
            $(this).addClass("ym-choose-active")
                .find(".ym-choose-sayImg-text").show().find(".ym-choose-sayImg-title").hide();
            $(this).siblings().removeClass("ym-choose-active")
                .find(".ym-choose-sayImg-text").hide();
         });
         // 安全保障左右滑动
         $(".ym-choose-safetyDescribe-list").slick({
            arrows: false,
            mobileFirst: true,
            pauseOnHover: true,
            dots: false,
            slidesToShow: 2,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 2000
         });

      }else {
         sayList.on("mouseover",function(){
            $(this).addClass("ym-choose-active")
                .find(".ym-choose-sayImg-text").stop(true,false).slideDown(300);
            $(this).siblings().removeClass("ym-choose-active")
                .find(".ym-choose-sayImg-text").stop(true,false).slideUp(300);
            /*$(this).find('.ym-choose-sayImg-text').slideToggle();*/
         });
         $(".ym-choose-safetyDescribe-list").unbind();
      }
   });
};

YMChoose.prototype.render = function () {
   this.init();
   this.sayHover();
   this.iconHover();
};





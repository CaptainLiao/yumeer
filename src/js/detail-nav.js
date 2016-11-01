/**
 * Created by yumeer on 2016/9/23.
 */
var YMDetailNav = function () {

};

YMDetailNav.prototype.show = function () {
    $(window).on("scroll",function () {
        var scrollTop = document.documentElement.scrollTop|| document.body.scrollTop;
        var design = $(".ym-detail-design").offset().top-160;
        if(scrollTop > design) {
            $(".ym-detail-nav").show();
            $("#ym-header").hide();
        }else {
            $(".ym-detail-nav").hide();
            $("#ym-header").show();
        }

        /*滚动条发生变化，nav切换到相应位置*/
        function scrollEvents (id,navId) {
            var offset = 160;
            var idTop = $(id).offset().top - offset;
            var scrollTop = document.documentElement.scrollTop|| document.body.scrollTop;
            if(scrollTop > idTop){
                $(navId).css("background","#f5bb22").siblings().css("background","#fff");
            }else {
                $(navId).css("background","#fff");
            }
        }

        scrollEvents(".ym-detail-design",".ym-detail-navDesign");
        scrollEvents(".ym-detail-parents",".ym-detail-navParents");
        scrollEvents(".ym-detail-feature",".ym-detail-navFeature");
        scrollEvents(".ym-detail-trips",".ym-detail-navTrips");
        scrollEvents(".ym-detail-students",".ym-detail-navStudents");
        scrollEvents(".ym-detail-serve",".ym-detail-navServe");
        scrollEvents(".ym-detail-remark",".ym-detail-navRemark");
    })
};

YMDetailNav.prototype.navClick = function () {
    $(".ym-detail-navItem").click(function () {
        $(this).css("background","#f5bb22").siblings().css("background","#fff");

        var index = $(this).index();
        var itemTop = $(".ym-detail-item:eq("+index+")").offset().top-100;
        $(window).scrollTop(itemTop);
        console.log("导航位置"+$(".ym-detail-item"+index));
    });
};

YMDetailNav.prototype.submit = function () {
    $(".ym-detail-navSubmit").on("click",function () {
        $(window).scrollTop(0);
        console.log($(this));
    });
};

YMDetailNav.prototype.render = function () {
    this.show();
    this.navClick();
    this.submit();
};

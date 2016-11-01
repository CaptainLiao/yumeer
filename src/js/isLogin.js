/**
 * Created by yumeer on 2016/9/5.
 */
$(function(){
   if($.cookie().isLogin){

       var oX = JSON.parse($.cookie().isLogin);

       $('.ym-nav-login').css("display","none");
       $('.ym-nav-userInfo').css("display","block");

       $(".ym-user-telephone").html('<em>+86 </em>'+oX.u_mobile);
       console.log(oX.mau_headurl);
   }else {
       $('.ym-nav-login').css("display","block");
       $('.ym-nav-userInfo').css("display","none");
       console.log("aaa");
   }
});
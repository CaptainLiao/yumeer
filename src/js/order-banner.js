/**
 * Created by yumeer on 2016/9/7.
 */
var YMOrderBanner = function(){

};
YMOrderBanner.prototype.render = function(){
    var data = {
        order_banner_auction_img_src: '/dist/img/ordersys/myson.jpg',
        order_banner_auction_img_alt: '韩国亲子游',
        abc:'abc'
    };

    new Vue({
        el: '#ym-order-banner-id',
        data:data
    })
};

/**
 * Created by yumeer on 2016/10/28.
 */

var YMReview = function () {

};

YMReview.prototype.loadLink = function () {
    var _userAgent = navigator.userAgent;
    if(_userAgent.indexOf("iPad")>-1 || _userAgent.indexOf("iPhone")>-1 ||
        _userAgent.indexOf("Android ")>-1){
        return false;
    }else {
        var cssURL = 'http://cdn.yumeer.com/assan/css/style.css';
        function addCssByLink(url){
            var doc=document;
            var link=doc.createElement("link");
            link.setAttribute("rel", "stylesheet");
            link.setAttribute("type", "text/css");
            link.setAttribute("href", url);

            var heads = doc.getElementsByTagName("head");
            if(heads.length)
                heads[0].appendChild(link);
            else
                doc.documentElement.appendChild(link);
        }
        addCssByLink(cssURL);
    }
};

YMReview.prototype.render = function () {
    this.loadLink();
};
var YMMessage = function() {

};


YMMessage.prototype.init = function() {

    var that = this;

    that.yunba = new Yunba({
        server: 'sock.yunba.io', port: 3000, appkey: '571894f9ddba081447ca361f'
    });
};



YMMessage.prototype.connect = function(callback) {
    var that = this;
    var customid = 'yunba_push_demo_1' + Math.floor(Math.random() * 100000);
    that.yunba.connect_by_customid(customid, function (success, msg) {

        if (callback){
            callback(success);
        }
    });
};


YMMessage.prototype.subscribe = function(topic, subCallback) {
    var that = this;

    that.yunba.init(function (success) {
        if (success) {
            that.connect(function(suc){
                that.yunba.subscribe({'topic': topic}, function(success, msg){
                    if (success)
                        console.log('你已成功订阅频道'+topic);
                    else
                        console.log(msg);
                });
                that.yunba.set_message_cb(subCallback);
            });
        }
    }, function(){});


};
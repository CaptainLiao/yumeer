var yunba = new Yunba({
    server: 'sock.yunba.io', port: 3000, appkey: '571894f9ddba081447ca361f'
});

// 设置 Topic
var topic = ($('#ybtopic').val())?($('#ybtopic').val()):'test';


// 初始化并连接服务器
yunba.init(function (success) {
    if (success) {
        connect();
    } else {
        console.log('初始化失败或服务断线，若长时间无响应请尝试刷新页面');
    }
}, function () {
    connect();
});

// 设置消息回调
function setMsgCb() {
    yunba.set_message_cb(function (data) {
        console.log('Topic:' + data.topic + ' Msg:' + data.msg);
    });
}

// 连接服务器
function connect() {
    var customid = 'yunba_push_demo_1' + Math.floor(Math.random() * 100000);
    yunba.connect_by_customid(customid, function (success, msg) {
        if (success) {
            console.log('连接成功！');
            setMsgCb();
            subscribe(topic);
        } else {
            console.log(msg);
        }
    });
}

// 订阅频道
function subscribe(topic) {
    yunba.subscribe({'topic': topic}, function (success, msg) {
        if (success) {
            console.log('已成功订阅频道：' + topic);
            setMsgCb();
        } else {
            console.log(msg);
        }
    });
}

// 取消订阅频道
function unsubscribe(topic) {
    yunba.unsubscribe({'topic': topic}, function (success, msg) {
        if (success) {
            console.log(msg);
        }
    });
}

// 发布消息
function publish(topic, message) {
    yunba.publish({'topic': topic, 'msg': message}, function (success, msg) {
        if (success) {
            console.log('消息发布成功');
            console.log('{ topic: ' + topic + ', msg:' + message + ' }');
        } else {
            console.log(msg);
        }
    });
}
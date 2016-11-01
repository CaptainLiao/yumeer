<section class="ym-login">
    <div class="ym-login-box">
        <!--点击icon切换登陆方式-->
        <div class="ym-login-switch">
            <div class="ym-login-switch-icon">
                <i class="iconfont ym-static-icon" style="display: none">&#xe641;</i>
                <i class="iconfont ym-quick-icon">&#xe621;</i>
            </div>
            <div class="ym-login-switch-tips">
                <p class="ym-popTip-accountLogin" style="display: none">账号登陆在这里</p>
                <p class="ym-popTip-wxLogin">微信登陆在这里</p>
            </div>
        </div>
        <!--标准登陆框-->
        <form action="#" class="ym-login-form" id="ym-login-form" autocomplete="off">
            <h3 class="ym-login-title">账户登录</h3>
            <ul class="ym-login-formList">
                <li>
                    <span class="ym-phoneNum-closeBtn iconfont">&#xe63d;</span>
                    <input type="text" name="phone" required class="phoneNum" placeholder="请输入手机号">
                </li>
                <li>
                    <input type="password" name="password" class="ym-password" placeholder="请输入密码">
                </li>

                <li>
                    <button class="ym-login-submitBtn" type="button">登录</button>
                    <button class="ym-login-wxBtn" type="button"><span class="iconfont">&#xe601;</span>微信登录</button>
                </li>
            </ul>
            <div class="ym-login-links">
                <a href="#" class="ym-forget-pwd" target="_blank">忘记密码？</a>
                <a href="#" class="ym-register-newaccount" target="_blank">注册新用户</a>
            </div>
        </form>
        <!--扫码快速登陆-->
        <div class="ym-quick-from" style="display: none">
            <h3 class="ym-login-title">微信扫码登陆</h3>
            <div class="ym-quick-main">
                <div id="ym-login-quick-code" class="ym-login-quick-code">
                    <img src="" alt="">
                </div>
                <div class="ym-login-quick-desc">
                    <i class="iconfont">&#xe645;</i>
                    <p>打开微信，扫一扫登录</p>
                </div>
            </div>
            <div class="ym-login-links">
                <a href="#" class="ym-register-newaccount" target="_blank">注册新用户</a>
            </div>
        </div>

    </div>
</section>
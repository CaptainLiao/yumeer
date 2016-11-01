<section class="ym-pwd">
    <div class="ym-pwd-box">
        <!--忘记密码-->
        <form action="#" class="ym-pwd-forget" id="ym-pwd-forget" autocomplete="off">
            <h3 class="ym-pwd-title">忘记密码</h3>
            <ul class="ym-pwd-forgetList">
                <li>
                    <span class="ym-phoneNum-closeBtn iconfont">&#xe63d;</span>
                    <input type="text" name="phone" required class="phoneNum" placeholder="请输入手机号">
                </li>
                <li>
                    <button class="ym-getPhoneCode" disabled="disabled">获取验证码</button>
                    <input type="text" name="ym-phoneCode" class="ym-phoneCode-check" placeholder="请输入验证码">
                </li>

                <li>
                    <button class="ym-pwd-forgetBtn" type="button">确定</button>
                </li>
            </ul>
            <div class="ym-pwd-links">
                <a href="#" class="ym-pwd-back" target="_blank">返回</a>
            </div>
        </form>
        <!--修改密码-->
        <form action="#" class="ym-pwd-modify" id="ym-pwd-modify" autocomplete="off" style="display:none;">
            <h3 class="ym-pwd-title">修改密码</h3>
            <ul class="ym-pwd-modifyList">
                <li>
                    <input type="password" name="password" class="ym-password" placeholder="请输入密码">
                </li>
                <li>
                    <input type="password" name="password-confirm" class="ym-passwordConfirm" placeholder="请再次输入密码">
                </li>

                <li>
                    <button class="ym-pwd-modifyBtn" type="button">立即修改</button>
                </li>
            </ul>
            <div class="ym-pwd-links">
                <a href="#" class="ym-pwd-back" target="_blank">返回</a>
            </div>
        </form>
    </div>
</section>
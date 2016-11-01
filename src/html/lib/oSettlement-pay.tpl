<section class="ym-settle-payMethod">
    <form class="ym-payMethod">
        <h3 class="ym-payMethod-title">
            请选择支付方式
            <span><a class="ym-how-to-pay" href="">不知道如何支付？</a></span>
        </h3>

        <ul class="ym-payMethod-list">
            <li class="ym-payMethod-item ym-payMethod-bank">
                <input type="radio" name="payment" />
                <p class="pay-bank">网银支付</p>
                <span class="ym-payMethod-commend">推荐，送优惠券</span>
            </li>
            <li class="ym-payMethod-item ym-payMethod-transfers">
                <input type="radio" name="payment" />
                <p class="pay-transfers">转账汇款</p>
                <span class="ym-more-safe">支持网上银行转账、银行柜台汇款</span>
                <!--银行柜台转账说明-->
                <ul class="transfers-txt ym-payment" style="display: none">
                    <li>
                        <h4 class="transfers-title">支付宝转账</h4>
                        <p>芋米账号：<span class="transfers-email">money@yumeer.com</span></p>
                        <p>转账金额：<span class="transfers-money ym-settle-money"></span></p>
                    </li>
                    <li>
                        <h4 class="transfers-title">网上银行转账/银行柜台转账</h4>
                        <p>账户信息: 深圳市英杰恩教育科技有限公司</p>
                        <p>开户银行: 招商银行高新园支行</p>
                        <p>银行帐号: <span class="transfers-bankcard">7559 2834 9010 201</span></p>
                        <p>转账金额：<span class="transfers-money ym-settle-money"></span></p>
                    </li>
                    <li>
                        <h4 class="transfers-title">注意事项</h4>
                        <ul class="transfers-caution-list">
                            <li>
                                汇款转账时，请务必在备注栏中注明您的订单编号：<span class="order-number">000162</span>，以便我们核对订单信息。
                            </li>
                            <li>
                                汇款后请保留汇款凭证，并通过微信公众号留言或发送截图，客服审核后，订单完成。
                            </li>
                            <li>为了确保您的订单有效，请在3个工作日内完成转账汇款。
                            </li>
                            <li>若您在支付过程中如有疑问，可及时拨打我们的客服电话：<a href="tel:0755-82552588" class="consumer-hotLine">0755-82552588</a>，我们会协助您解决问题。</li>
                        </ul>
                    </li>
                </ul>
            </li>
            <!--其他支付方式-->
            <li class="ym-payMethod-item ym-payMethod-other">
                <input type="radio" name="payment" />
                <p class="pay-other">其他支付方式</p>
                <ul class="ym-payMethod-other-list ym-payment" style="display:none;">
                    <li class="ym-payMethod-item ym-payMethod-wx">
                        <input type="radio" class="ym-payMethod-wxInput" name="payment" value="wx" />
                        <p class="pay-wx">微信支付</p>
                        <span class="ym-more-safe">更快更安全</span>
                        <!--微信支付跳转-->
                        <ul class="ym-payMethod-wxList ym-payment" style="display:none">
                            <li class="ym-payMethod-wxcode">
                                <div class="ym-wxcode-pic">
                                    <img src="images/ordersys/wxcode.jpg" alt="芋米微信二维码" id="ym-wxpay">
                                </div>
                                <div class="wxcode-txt">
                                    <p>请使用微信扫一扫</p>
                                    <p>扫描二维码支付</p>
                                </div>
                            </li>
                            <li class="ym-wxpay-printscreen">
                                <!--<img src="images/ordersys/wx-printscreen.jpg" alt="微信使用截图" class="wx-printscreen">-->
                            </li>
                        </ul>
                    </li>
                    <li class="ym-payMethod-item ym-payMethod-alipay">
                        <input type="radio" name="payment" class="ym-payMethod-aliInput" />
                        <p class="pay-alipay">支付宝</p>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="ym-payMethod-btn">
            <p>尾款：<span class="ym-pay-bills-actually actually-payment ym-english"></span></p>
            <button class="ym-payMethod-submit" type="button">支付尾款</button>
        </div>
    </form>
</section>
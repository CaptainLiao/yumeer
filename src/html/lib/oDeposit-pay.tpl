<!--支付方式-->
<section class="ym-deposit-payMethod">
    <div class="ym-payMethod-container">
        <h3 class="ym-payMethod-title">
            请选择支付方式
            <span><a class="ym-how-to-pay" href="" target="_blank">不知道如何支付？</a></span>
        </h3>
        <ul class="ym-payMethod-list">
            <li class="ym-payMethod-item ym-payMethod-wx">
                <input type="radio" class="ym-payMethod-wxInput" name="payment" value="wx" />
                <p class="pay-wx">微信支付</p>
                <span class="ym-more-safe">更快，更安全</span>
                <!--微信支付跳转-->
                <ul class="ym-payMethod-wxList ym-payment" style="display:none">
                    <li class="ym-payMethod-wxcode">
                        <div class="ym-wxcode-pic">
                            <img src="" id="ym-wxpay">
                        </div>
                        <div class="wxcode-txt">
                            <p>请使用微信扫一扫</p>
                            <p>扫描二维码支付</p>
                        </div>
                    </li>
                    <li class="ym-wxpay-printscreen">
                        <!--<img class="ym-wxpay-printscreen" src="" alt="微信使用截图">-->
                    </li>
                </ul>
            </li>
            <li class="ym-payMethod-item ym-payMethod-alipay">
                <input type="radio" name="payment" class="ym-payMethod-aliInput" />
                <p class="pay-alipay">支付宝支付</p>
            </li>
            <!--<li class="ym-payMethod-item ym-payMethod-bank">
                <input type="radio" name="payment" class="ym-payMethod-onBank"/>
                <p class="pay-bank">网银支付</p>
            </li>-->
            <!--<li class="ym-payMethod-item ym-payMethod-transfers">
                <input type="radio" name="payment" value="" />
                <p class="pay-transfers">转账汇款</p>
                <span class="ym-more-safe">支持网上银行转账、银行柜台汇款</span>
                &lt;!&ndash;银行柜台转账说明&ndash;&gt;
                <ul class="transfers-txt ym-payment" style="display: none">
                    <li>
                        <h4 class="transfers-title pay-alipay">支付宝转账</h4>
                        <p>芋米账号：<span class="transfers-email">money@yumeer.com</span></p>
                        <p>转账金额：<span class="transfers-money">35000</span>元</p>
                    </li>
                    <li>
                        <h4 class="transfers-title">网上银行转账/银行柜台转账</h4>
                        <p>账户信息: 深圳市英杰恩教育科技有限公司</p>
                        <p>开户银行: 招商银行高新园支行</p>
                        <p>银行帐号: <span class="transfers-bankcard">7559 2834 9010 201</span></p>
                        <p>转账金额：<span class="transfers-money">35000</span>元</p>
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
                            <li>若您在支付过程中如有疑问，可及时拨打我们的客服电话：<span class="consumer-hotLine">0755-82552588</span>，我们会协助您解决问题。</li>
                        </ul>
                    </li>
                </ul>
            </li>-->
        </ul>
        <div class="ym-payMethod-btn">
            <p>定金：<span class="ym-payMethod-price"></span></p>
            <button class="ym-payMethod-submit" type="button" value="确定" >支付定金</button>
        </div>
    </div>
</section>
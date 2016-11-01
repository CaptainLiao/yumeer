<section id="ym-order-ad" class="ym-order-ad">
    <header class="ym-myOrder-head ym-oa-head">
        <h3 class="ym-user-center-title"><a href="#" class="ym-back-iconfont iconfont">&#xe643;</a>提交订单</h3>
    </header>
    <div class="ym-order-adWrap">
        <div id="ym-order-adContainer" class="ym-order-adContainer">
            <script id="ym-order-banner" type="text/x-handlebars-template">
                {{#each resDate}}
                <div class="ym-order-adImg">
                    <img src={{mat_image}}!5_4
                         srcset='{{mat_image}}!5_4 1920w,{{mat_image}}!3_2 750w'
                         sizes="(max-width:640px) 750px,1920px"

                         alt={{mat_title}}>
                    <button class="ym-order-adImg-button" type="button">{{mat_tag}}</button>
                </div>
                <div class="ym-order-adBuy">
                    <h3 class="ym-order-adBuy-title">
                        {{mat_title}}
                    </h3>
                    <p class="ym-order-adBuy-slogan">{{mat_slogan}}</p>
                    <p class="ym-order-type"></p>
                    <p class="ym-order-leaveTime ym-english"><span>{{mat_st}}</span><span class="ym-order-leaveDate">{{mat_dur}}天</span></p>
                </div>
                {{/each}}
            </script>

        </div>
        <ul class="ym-order-skuList">
            <li>
                <p class="ym-order-skuNum ym-english">x <span></span></p>
                <p>数量</p>
            </li>
            <li>
                <p class="ym-order-skuFee ym-english">￥ <span></span></p>
                <p>总费用</p>
            </li>
            <li>
                <p class="ym-order-skuDeposit ym-english">￥ <span></span></p>
                <p>订金</p>
            </li>
        </ul>
    </div>
</section>
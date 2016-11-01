<section id="ym-detail-ad" class="ym-detail-ad">
    <div id="ym-detail-adContainer" class="ym-detail-adContainer">
        <script id="ym-detail-banner" type="text/x-handlebars-template">
            {{#each resDate}}
            <div class="ym-detail-adImg">
                <img src={{mat_image}}!5_4 alt={{mat_title}}>
            </div>
            <div class="ym-detail-adBuy">
                <h3 class="ym-detail-adBuy-title">
                    {{mat_title}}
                </h3>
                <p class="ym-detail-adBuy-slogan">{{mat_slogan}}</p>
                <div id="ym-detail-sku">

                </div>
            </div>
            {{/each}}
        </script>
    </div>
</section>

<script id="ym-detail-skuId" type="text/x-handlebars-template">
    <!--<p class="ym-detail-adBuy-price">￥{{mas_earnest}}</p>-->
    <div class="ym-detail-adBuy-table">
        <dl>
            <dt>类型</dt>
            <dd class="ym-detail-adBuy-dd">
                <ul class="ym-detail-adBuy-list">
                    {{#each resDate}}
                    <li class="ym-detail-adBuy-typeItem">
                        <p class="ym-detail-adBuy-type" data-skuId={{mas_id}}>{{mas_detail}}</p>
                        <p class="ym-detail-adBuy-price">￥
                            <span class="ym-detail-unitPrice">{{mas_price}}</span>
                        </p>
                    </li>
                    {{/each}}
                </ul>
            </dd>
        </dl>
        <dl>
            <dt>数量</dt>
            <dd>
                <a href="javascript:void(0)" class="ym-detail-reduce iconfont" disabled="true">&#xe639;</a>
                <input class="ym-detail-input" type="text" value="1">
                <a href="javascript:void(0)" class="ym-detail-plus iconfont">&#xe638;</a>
            </dd>
            <dd>
                <p class="ym-errorMsg">*请填写正确的宝贝数量</p>
            </dd>
        </dl>
    </div>
    <button class="ym-detail-submit" type="button">立即预定</button>

    <div class="ym-detail-submit-bottomBtn">
        <i class="iconfont">&#xe610;</i>
        <i class="iconfont">&#xe64c;</i>
        <button class="ym-detail-submit-smallBtn">立即预定</button>
    </div>
    <p class="ym-close iconfont">
        &#xe63d;
    </p>
</script>
<section id="ym-myOrder" class="ym-myOrder">
    <!--个人中心用户信息导航-->
    <nav class="ym-uc-nav">
        <div class="ym-uc-nav-container">
            <div class="ym-uc-nav-userAvatar">
                <a href="#" class="ym-userAvatar-link">
                    <img src="http://tkimg.yumeer.com/i/24a9da99-17f4-49aa-8eb1-f7e3f9eb19b6.jpg!1.1.wm" alt="">
                </a>
            </div>
            <ul class="ym-uc-nav-list">
                <li><a rel="nofollow" href="#">我的订单</a><span class="ym-uc-nav-orderQuantity">6</span></li>
                <li><a rel="nofollow" href="#">我的优惠</a></li>
                <li><a rel="nofollow" href="#">账户信息</a></li>
            </ul>
        </div>
    </nav>

    <div class="ym-myOrder-container">
        <header class="ym-myOrder-head">
            <h3 class="ym-user-center-title">
                <a href="#" class="ym-back-iconfont iconfont">&#xe643;</a>
                我的订单
                <a href="#" class="ym-back-home iconfont">&#xe606;</a>
            </h3>
        </header>
        <table class="ym-myOrder-table" id="ym-myOrder-item">
            <script id="ym-myOrder-itemId" type="text/x-handlebars-template">
                <tr class="ym-myOrder-tHead">
                    <th>订单详情</th>
                    <th>数量</th>
                    <th>价格</th>
                    <th>订金</th>
                    <th>应付金额</th>
                    <th>状态</th>
                </tr>
                {{#each orderItems}}
                <tr>
                    <td>
                        <div class="ym-myOrder-detail-number">
                            <p class="ym-myOrder-detail-date">{{mao_at}}</p>
                            <p>订单号：<span class="ym-myOrder-number">{{mao_id}}</span></p>
                        </div>
                        <div class="ym-myOrder-detail-des" data-tourId={{mat_id}}>
                            <a href="#">
                                <img class="ym-myOrder-detail-desImg" src={{mat_img}} alt="">
                            </a>
                            <div>
                                <a href="#" class="ym-myOrder-detail-desTtx">{{mat_title}}</a>
                                <p class="ym-myOrder-detail-desType">{{mas_detail}}</p>
                            </div>
                        </div>
                    </td>
                    <td class="ym-myOrder-detail-quantity"> x{{maoe_item_num}}</td>
                    <td class="ym-myOrder-totalPrice">￥{{map_price}}</td>
                    <td class="ym-myOrder-deposit">￥{{map_earnest}}</td>
                    <td class="ym-myOrder-payMoney"></td>
                    <td data-tourId={{mat_id}}>
                        <a class="ym-myOrder-payMoney-btn" href="#" rel="nofollow" data-ostatus={{mao_status}} data-maoid={{mao_id}} target="_blank"></a>
                        <a class="ym-myOrder-moreDetail" href="#" rel="nofollow" target="_blank">查看详情</a>
                    </td>
                </tr>
                {{/each}}
            </script>

        </table>
    </div>
</section>
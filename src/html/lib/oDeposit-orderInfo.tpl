<section class="ym-deposit-orderInfo">
    <div class="ym-deposit-orderInfo-container">
        <h3>订单信息</h3>
        <ul class="ym-orderInfo-list" id="ym-orderInfo-list">
            <li><p>订单编号：</p><span class="ym-orderInfo-orderNum"></span></li>
            <li><p>线路名称：</p><span class="ym-orderInfo-route"></span><a class="ym-orderInfo-details" href="#" target="_blank">查看产品详情</a></li>
            <li><p>出行时间：</p><span class="ym-orderInfo-starTime"></span>至<span class="ym-orderInfo-endTime" style="margin: 0"></span></li>
            <li><p>出行天数：</p><span class="ym-orderInfo-day"></span></li>
            <li><p>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</p><span class="ym-orderInfo-type"></span></li>
            <li><p>数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量：</p><span class="ym-orderInfo-num"></span></li>
        </ul>
        <form action="" class="ym-orderInfo-form">
            <ul class="ym-orderInfo-form-list">
                <li class="ym-orderInfo-form-item">
                    <h3 class="ym-orderInfo-form-title">大人</h3>
                    <ul id="ym-orderInfo-form-parents">
                        <script id="ym-orderInfo-form-parentsId" type="text/x-handlebars-template">
                            {{#each parents}}
                            <li class="ym-orderInfo-form-parents-item">
                                <dl>
                                    <dt class="ym-orderInfo-nameNum">{{num}}</dt>

                                    <dd>
                                        <label>出行人姓名：</label>
                                        <span type="text" class="ym-orderInfo-name">{{name}}</span>
                                        <button type="button" class="ym-orderInfo-flag" style="display:none">{{flag}}</button>
                                    </dd>
                                    <dd>
                                        <label>手机：</label>
                                        <span type="text" class="ym-orderInfo-cellPhone" >{{cellPhone}}</span>
                                    </dd>
                                    <dd>
                                        <label>邮箱：</label>
                                        <span type="text" class="ym-orderInfo-email">{{email}}</span>
                                    </dd>
                                    <dd>
                                        <label>团服尺寸：</label>
                                        <span type="text" class="ym-orderInfo-size">{{size}} </span>
                                    </dd>
                                </dl>
                            </li>
                            {{/each}}
                        </script>

                    </ul>
                </li>

                <li class="ym-orderInfo-form-item">
                    <h3 class="ym-orderInfo-form-title">小孩</h3>
                    <ul id="ym-orderInfo-form-students">
                        <script id="ym-orderInfo-form-studentsId" type="text/x-handlebars-template">
                            {{#each students}}
                            <li class="ym-orderInfo-form-students-item">
                                <dl>
                                    <dt class="ym-orderInfo-nameNum">{{num}}</dt>
                                    <dd>
                                        <label>出行人姓名：</label>
                                        <span type="text" class="ym-orderInfo-name">{{name}}</span>
                                        <button type="button" class="ym-orderInfo-flag" style="display:none">{{flag}}</button>
                                    </dd>
                                    <dd>
                                        <label>手机：</label>
                                        <span type="text" class="ym-orderInfo-cellPhone">{{cellPhone}}</span>
                                    </dd>
                                    <dd>
                                        <label>邮箱：</label>
                                        <span type="text" class="ym-orderInfo-email">{{email}}</span>
                                    </dd>
                                    <dd>
                                        <label>团服尺寸：</label>
                                        <span type="text" class="ym-orderInfo-size">{{size}}</span>
                                    </dd>
                                </dl>
                            </li>
                            {{/each}}
                        </script>
                    </ul>
                </li>
            </ul>
        </form>
    </div>

</section>
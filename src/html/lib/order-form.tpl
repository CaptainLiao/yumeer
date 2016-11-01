<form action="" class="ym-order-form">
    <ul class="ym-order-form-list">
        <li class="ym-order-form-item">
            <h3 class="ym-order-form-title">大人X <span class="ym-order-parentsNum"></span></h3>
            <ul id="ym-order-form-parents">
                <script id="ym-order-form-parentsId" type="text/x-handlebars-template">
                    {{#each parents}}
                    <li class="ym-order-form-parents-item">
                        <dl>
                            <dt class="ym-order-nameNum">{{this}}</dt>

                            <dd>
                                <label>出行人姓名</label>
                                <input type="text" class="ym-order-name" name="name" required placeholder="请输入姓名">
                                <span class="ym-order-flag"></span>
                            </dd>
                            <dd>
                                <label>手机</label>
                                <input type="text" class="ym-order-cellPhone" name="phone" required placeholder="请输入正确的手机号码">
                            </dd>
                            <dd>
                                <label>邮箱</label>
                                <input type="text" class="ym-order-email" name="email" required placeholder="请输入正确的邮箱">
                            </dd>
                            <dd>
                                <label>团服尺寸</label>
                                <input type="text" class="ym-order-size" name="size" required placeholder="请输入团服尺寸：S,M,L...">
                            </dd>
                        </dl>
                    </li>
                    {{/each}}
                </script>
            </ul>
        </li>

        <li class="ym-order-form-item">
            <h3 class="ym-order-form-title">小孩X <span class="ym-order-studentsNum"></span></h3>
            <ul id="ym-order-form-students">
                <script id="ym-order-form-studentsId" type="text/x-handlebars-template">
                    {{#each students}}
                    <li class="ym-order-form-students-item">
                        <dl>
                            <dt class="ym-order-nameNum">{{this}}</dt>
                            <dd>
                                <label>出行人姓名</label>
                                <input type="text" class="ym-order-name" required placeholder="请输入姓名">
                                <span class="ym-order-flag"></span>
                            </dd>
                            <dd>
                                <label>手机</label>
                                <input type="text" class="ym-order-cellPhone" required placeholder="请输入正确的手机号码">
                            </dd>
                            <dd>
                                <label>邮箱</label>
                                <input type="text" class="ym-order-email" required placeholder="请输入正确的邮箱">
                            </dd>
                            <dd>
                                <label>团服尺寸</label>
                                <input type="text" class="ym-order-size" required placeholder="请输入团服尺寸：S,M,L...">
                            </dd>
                        </dl>
                    </li>
                    {{/each}}
                </script>
            </ul>
        </li>
        <li class="ym-order-submit">
            <button type="button" class="ym-order-submit-btn">确认订单</button>
            <p class="ym-order-submit-explain">
                <input type="radio" checked>我同意 <a href="#">《英杰恩出境游学合同》</a>
            </p>
        </li>
    </ul>

</form>




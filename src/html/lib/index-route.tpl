<section id="ym-route" class="ym-route">
    <header class="ym-route-header">
        <h2 class="ym-route-header-title ym-english">Travel routes</h2>
        <p>寓学于乐，快乐成长的游学线路</p>
    </header>
    <!--route detail-->
    <div class="ym-route-container" id="ym-route-container">
        <script id="ym-routeId" type="text/x-handlebars-template">
        <ul class="ym-route-list">
            {{#if json}}
            {{#each json}}
            <li class="ym-route-item" data-teamId={{mat_id}}>
                <div class="ym-route-item-pic" style="background-image:url('{{mat_image}}')">
                    <!--<img src='' alt={{mat_title}}>-->
                    <div class="ym-route-item-title">
                        <h4>{{mat_title}}</h4>
                        <p class="ym-route-item-picTime ym-english">{{mat_st}} <span>{{mat_dur}} Days</span></p>
                    </div>

                </div>
                <div class="ym-route-item-text">
                    <!--<span class="ym-route-leaveLocation-mark">
                        <img src={{mat_des_img}} alt="">
                    </span>-->
                    <h3 class="ym-route-item-text-title">{{mat_title}}</h3>
                    <p class="ym-route-item-text-detail">
                        {{mat_slogan}}
                    </p>
                    <p class="ym-route-item-text-leave">出发时间：<span class="ym-route-leaveTime">{{mat_st}}</span><span class="ym-route-leaveLocation">深圳</span>出发</p>
                    <a href="#" class="iconfont">&#xe63e;</a>
                </div>
            </li>
            {{/each}}
            {{/if}}
        </ul>
        </script>
    </div>
</section>

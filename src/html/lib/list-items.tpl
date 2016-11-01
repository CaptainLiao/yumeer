<section id="ym-list-items" class="ym-list-items">
    <script id="ym-li-content" type="text/x-handlebars-template">
        {{#each resDate}}
        <div id="ym-list-item" class="ym-list-item" data-tourId={{mat_id}}>
            <div class="ym-li-banner">
                <a href="#"><img src={{mat_image}}!3_2 alt={{mat_title}}></a>
                <button class="ym-li-banner-button" type="button">{{mat_tag}}</button>
            </div>
            <div class="ym-li-text">
                <h3>
                    <a href="#" class="ym-li-text-title">{{mat_title}}</a>
                </h3>
                <p class="ym-li-text-slogan">{{mat_slogan}}</p>
                <p class="ym-li-text-day"><span class="iconfont">&#xe629;</span> 项目天数: <span>{{mat_dur}}天</span></p>
                <p class="ym-li-text-des"><span class="iconfont">&#xe658;</span> 游学地点: <span>{{mat_des}}</span></p>
                <div class="ym-li-text-btn">
                    <p class="ym-li-text-time">出发时间：<span>{{mat_st}}</span></p>
                    <p class="ym-li-text-location">出发地点：<span>{{mat_dep}}</span></p>
                    <a href="#" class="ym-li-text-submit">立即加入</a>
                </div>
            </div>
        </div>
        {{/each}}
    </script>
</section>
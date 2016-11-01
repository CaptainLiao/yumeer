<script id="ym-bannerId" type="text/x-handlebars-template">
    <ul class="ym-banner-list">
        {{#if json}}
        {{#each json}}
        <li class="ym-banner-item">
            <a href="#">
                <img src={{maa_img}}
                     srcset='{{maa_img}} 1920w,{{maa_img_h5}} 750w'
                     sizes="(max-width:640px) 750px,1920px"
                     alt={{maa_title}}>
            </a>
            <div class="ym-banner-text">
                <p class="ym-english">{{maa_subtitle}}</p>
                <h3>{{maa_title}}</h3>
                <p>
                    {{maa_detail}}
                </p>
                <a class="iconfont" href="#">&#xe63e;</a>
            </div>
            <div class="ym-banner-mask"></div>
        </li>
        {{/each}}
        {{/if}}
    </ul>
</script>
<section id="ym-detail-feature" class="ym-detail-item ym-detail-feature">
    <div class="ym-detail-featureContainer">
        <h3 class="ym-detail-feature-title">行程特色</h3>
        <p class="ym-detail-feature-slogan">只有芋米游学，才提供的深度体验和成长教育</p>
        <ul id="ym-detail-feature-list" class="ym-detail-feature-list">
            <script id="ym-detail-feature-listId" type="text/x-handlebars-template">
                {{#each feature}}
                <li>
                    <div class="ym-detail-feature-pic">
                        <img src={{image}}!4_3 alt="">
                        <h4 class="ym-detail-feature-picTitle">{{title}}</h4>
                    </div>
                    <p class="ym-detail-feature-itemText">
                       {{{detail}}}
                    </p>
                    <p id="ym-detail-feature-itemNum" class="ym-detail-feature-itemNum"><span>{{num}}</span>/特色</p>
                </li>
                {{/each}}
            </script>
        </ul>
        <p class="ym-detail-englishTitle ym-english">
            Features of trips
        </p>
    </div>
</section>

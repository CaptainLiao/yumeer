<section id="ym-detail-trips" class="ym-detail-item ym-detail-trips">
    <div class="ym-detail-tripsContainer">
        <h3 class="ym-detail-trips-title">详细行程</h3>
        <div class="ym-detail-trips-content">
            <ul class="ym-detail-trips-timeLine" id="ym-detail-trips-timeLine">

            </ul>
            <div class="ym-detail-trips-activities">
                <ul id="ym-detail-trips-list" class="ym-detail-trips-list">
                    <script id="ym-detail-trips-listId" type="text/x-handlebars-template">
                        {{#each trips}}
                        <li class="ym-detail-trips-item">
                            <h4 class="ym-detail-trips-itemTitle">{{title}}</h4>
                            <p>{{{detail}}}</p>
                            <div class="ym-detail-trips-itemImg">
                                <img src={{image}}!3_2 alt="">
                            </div>
                        </li>
                        {{/each}}
                    </script>
                </ul>
            </div>
        </div>
        <p class="ym-detail-englishTitle ym-english">
            Details of trips
        </p>
    </div>
</section>

<script id="ym-detail-trips-dayNum" type="text/x-handlebars-template">
    {{#each day}}
    <li class="">Day{{num}}<span class="ym-detail-trips-circle"></span></li>
    {{/each}}
</script>

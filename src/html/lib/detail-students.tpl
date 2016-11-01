
<section id="ym-detail-students" class="ym-detail-item ym-detail-students">
    <div class="ym-detail-studentsContainer">
        <h3 class="ym-detail-students-title">游学者心声</h3>
        <p class="ym-detail-students-slogan">我们在“游学君”为你摘取了这些出行人的动态，看看游学过的人怎么说</p>
        <div id="ym-detail-students-slick">
            <script id="ym-detail-students-listId" type="text/x-handlebars-template">
                <ul class="ym-detail-students-list">
                    {{#each students}}
                    <li class="ym-detail-students-explain">
                        <p>{{detail}}</p>
                        <p class="ym-detail-students-location">{{location}}，{{time}}</p>
                        <div class="ym-detail-students-item">
                            <div class="ym-detail-students-picture">
                                <img src={{photo}} alt="">
                            </div>
                            <p class="ym-detail-students-name">{{name}}</p>
                        </div>
                    </li>
                    {{/each}}

                </ul>
            </script>
        </div>
        <p class="ym-detail-englishTitle ym-english">
            Feedback from students
        </p>
    </div>
</section>


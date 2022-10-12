"use strict";
let container = $('#article-previews');
$.get('resources/scripts/php/raw_article?meta-only', (articleList) => {
    for (let i = 0; i < articleList.length; i++) {
        let article = articleList[i];
        let date = getDateString(article.date);
        let dateString = (date) ? date : '-1st of January, 1970';
        container.append(`<li>
        <a href="view-article?q=${article.id}">
            <h2 class="title">${article.title}</h2>
            <span class="date">
              ${(article.session) ? getSessionString(article.session) : ''}
              ${dateString}
            </span>
        </a>
      </li>`);
    }
    $('#article-previews-loading').hide();
});

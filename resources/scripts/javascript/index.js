"use strict";
marked.options({
    headerIds: true,
    highlight: function (code, lang) {
        return hljs.highlight(lang, code).value;
    }
});
let container = $('#article-previews');
$.get('resources/scripts/php/raw_article', (data) => {
    let articleList = JSON.parse(data);
    for (let i = 0; i < articleList.length; i++) {
        let article = articleList[i];
        let date = getDateString(article.date);
        let dateString = (date) ? date : '-1st of January, 1970';
        container.append(`<li>
        <a href="article/${article.id}">
          <div class="metadata">
            <h2 class="title">${article.title}</h2>
            <span class="date">${dateString}</span>
          </div>
          <hr>
          <div class="content">
            ${marked.parse(article.content)}
          </div>
        </a>
      </li>`);
    }
    $('#article-previews-loading').hide();
});

marked.options({
  headerIds: true,
  highlight: function(code: string, lang: string) {
    return hljs.highlight(lang, code).value;
  }
});

let query = urlParams('q');

$.get('resources/scripts/php/raw_article?q=' + query, (article: Article) => {
  // Get date
  let date = getDateString(article.date);
  let dateString = '<span>' + ((date)? date : '-1st of January, 1970') + '</span>';

  // Render
  $('#title').text(article.title);
  $('#date').html(((article.session)? getSessionString(article.session) + '<br>' : '') + dateString);
  if (article.content.length > 0)
    $('#content').html(marked.parse(article.content));
  document.title = article.title + " | intComp"

}).fail(() => {
  $('#title').text('Failed to load article');
  $('#date').text('-1st of January, 1970');
  $('#content').html('<h1>The content of this article failed to load</h1>')
});
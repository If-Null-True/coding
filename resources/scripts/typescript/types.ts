interface ArticleDate {
  year: number,
  month: number,
  day: number
}

interface ArticleSession {
  term: number,
  week: number
}

interface Article {
  id: string,
  title: string,
  date: ArticleDate,
  session?: ArticleSession,
  content: string
}
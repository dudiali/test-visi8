import {
  Article,
  ArticleIndex,
  ArticleIndexScheme,
  ArticleScheme,
} from "./zodScheme";

export const BASE_URL =
  "https://raw.githubusercontent.com/visi8-ppramesi/visi8-interview-mock-backend/main";

export const getAllArticles = async (): Promise<ArticleIndex[]> => {
  const res = await fetch(`${BASE_URL}/articles.json`);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(` HTTP error ${res.status}: ${text}`);
  }

  const raw = await res.json();

  return ArticleIndexScheme.array().parse(raw);
};

export const getArticleDetail = async (id: string): Promise<Article> => {
  const res = await fetch(`${BASE_URL}/articles/${id}.json`);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(` HTTP error ${res.status}: ${text}`);
  }

  const raw = await res.json();

  return ArticleScheme.parse(raw);
};

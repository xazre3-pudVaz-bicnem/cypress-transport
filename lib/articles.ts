import { allArticles, type Article } from "@/data/articles";
import type { CategorySlug } from "@/data/articles/types";

/** 公開日の降順で全記事を返す */
export function getArticles(): Article[] {
  return [...allArticles].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt)
  );
}

export function getArticle(slug: string): Article | undefined {
  return allArticles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: CategorySlug): Article[] {
  return getArticles().filter((a) => a.category === category);
}

/** 関連記事（存在するslugのみ解決） */
export function getRelatedArticles(article: Article): Article[] {
  return article.related
    .map((slug) => getArticle(slug))
    .filter((a): a is Article => Boolean(a));
}

export function getLatestArticles(count: number): Article[] {
  return getArticles().slice(0, count);
}

import { allArticles, type Article } from "@/data/articles";
import type { CategorySlug } from "@/data/articles/types";

/** 公開日の降順で全記事を返す */
export function getArticles(): Article[] {
  return [...allArticles].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt)
  );
}

/**
 * 検索インデックス対象の記事のみを公開日の降順で返す。
 *
 * 他記事へ統合した記事（noindex: true）は、既存URL・被リンクを維持するため
 * ページ自体は残すが、一覧・サイトマップからは外して露出を統合先に寄せる。
 */
export function getIndexableArticles(): Article[] {
  return getArticles().filter((a) => !a.noindex);
}

export function getArticle(slug: string): Article | undefined {
  return allArticles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: CategorySlug): Article[] {
  return getIndexableArticles().filter((a) => a.category === category);
}

/** 関連記事（存在するslugのみ解決） */
export function getRelatedArticles(article: Article): Article[] {
  return article.related
    .map((slug) => getArticle(slug))
    .filter((a): a is Article => Boolean(a));
}

export function getLatestArticles(count: number): Article[] {
  return getIndexableArticles().slice(0, count);
}

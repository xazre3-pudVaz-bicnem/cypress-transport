/**
 * コラム記事のデータ構造。
 *
 * 記事は「結論 → 理由 → 具体例 → 詳細」の構造で書く（AI検索対策）。
 * lead に結論を明示し、sections で詳細を展開する。
 *
 * 法律・税務・保険に関する記事は disclaimer: true を付けること
 * （断定的な助言を避け、公的機関・専門家への確認を促す注意書きが自動表示される）。
 */

import type { PhotoKey } from "@/data/images";
import type { AuthorKey } from "@/data/authors";

export type CategorySlug =
  | "shigoto" // 軽貨物の仕事
  | "beginner" // 未経験者向け
  | "money" // 収入・お金
  | "vehicle" // 車両
  | "workstyle" // 働き方
  | "industry" // 配送業界
  | "kaigyo"; // 開業・業務委託

export const categories: Record<CategorySlug, string> = {
  shigoto: "軽貨物の仕事",
  beginner: "未経験者向け",
  money: "収入・お金",
  vehicle: "車両",
  workstyle: "働き方",
  industry: "配送業界",
  kaigyo: "開業・業務委託",
};

export interface ArticleSubSection {
  heading: string; // h3
  body?: string[];
  list?: string[];
}

export interface ArticleSection {
  heading: string; // h2
  body?: string[];
  list?: string[];
  table?: { headers: string[]; rows: string[][] };
  sub?: ArticleSubSection[];
}

export interface ArticleFaqItem {
  q: string;
  a: string;
}

export interface ArticleSource {
  label: string;
  url: string;
}

export interface Article {
  slug: string;
  title: string;
  description: string; // meta description（120文字以内目安）
  category: CategorySlug;
  /** アイキャッチ画像（data/images.ts のキー） */
  image: PhotoKey;
  tags: string[];
  publishedAt: string; // YYYY-MM-DD
  updatedAt: string; // YYYY-MM-DD
  /** 一覧カードに出す要約 */
  excerpt: string;
  /** 記事冒頭：質問への回答（結論）を最初に書く */
  lead: string[];
  sections: ArticleSection[];
  /** 記事末尾のよくある質問（AI検索・強調スニペット対策） */
  faq?: ArticleFaqItem[];
  /** 参考情報（一次情報・公的機関） */
  sources?: ArticleSource[];
  /** 関連記事 slug */
  related: string[];
  /** 法律・税務・保険系の注意書きを表示 */
  disclaimer?: boolean;
  /** 執筆者（data/authors.ts のキー） */
  author: AuthorKey;
  /** 監修者（有資格者の監修が付いたら設定。それまでは null） */
  supervisor: string | null;
}

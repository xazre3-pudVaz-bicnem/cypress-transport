import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site";
import { getOpenJobs } from "@/lib/jobs";
import { getArticles } from "@/lib/articles";

/**
 * 動的サイトマップ。
 *
 * 含めるもの:
 *  - index対象の固定ページ
 *  - 募集中（open）の求人のみ
 *  - 公開中の記事
 *
 * 除外するもの:
 *  - 終了求人（closed）・準備中（draft）の求人
 *  - noindex ページ（/contact/thanks）
 *
 * lastModified について:
 *  記事と求人はデータ側の日付を使う。固定ページはビルド日時を入れると
 *  内容が変わっていなくても毎回更新されたことになり不正確なため、
 *  実際にページ内容を更新したときだけ下の定数を更新する運用にしている。
 */
const STATIC_PAGES_UPDATED_AT = new Date("2026-08-31");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPageDefs: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/recruit`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/recruit/jobs`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/recruit/about-driver`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/recruit/benefits`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/recruit/flow`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/recruit/faq`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/recruit/area`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/service`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/column`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/company`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const staticPages: MetadataRoute.Sitemap = staticPageDefs.map((page) => ({
    ...page,
    lastModified: STATIC_PAGES_UPDATED_AT,
  }));

  const jobPages: MetadataRoute.Sitemap = getOpenJobs().map((job) => ({
    url: `${SITE_URL}/recruit/jobs/${job.slug}`,
    lastModified: job.datePosted
      ? new Date(job.datePosted)
      : STATIC_PAGES_UPDATED_AT,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const articlePages: MetadataRoute.Sitemap = getArticles().map((article) => ({
    url: `${SITE_URL}/column/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...jobPages, ...articlePages];
}

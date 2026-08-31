import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site";
import { getOpenJobs } from "@/lib/jobs";
import { getArticles } from "@/lib/articles";

/**
 * 動的サイトマップ。
 * - 主要固定ページ
 * - 募集中（open）の求人のみ（closed / draft は除外）
 * - 公開中の全記事
 * を含める。lastModified はデータの日付から生成する。
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/recruit`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/recruit/jobs`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/recruit/benefits`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/recruit/about-driver`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/recruit/flow`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/recruit/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/recruit/area`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/service`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/column`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/company`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const jobPages: MetadataRoute.Sitemap = getOpenJobs().map((job) => ({
    url: `${SITE_URL}/recruit/jobs/${job.slug}`,
    lastModified: job.datePosted ? new Date(job.datePosted) : now,
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

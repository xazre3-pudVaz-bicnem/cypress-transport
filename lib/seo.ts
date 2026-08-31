import type { Metadata } from "next";
import { SITE_URL, company } from "@/data/site";

interface BuildMetadataOptions {
  title: string;
  description: string;
  /** 先頭スラッシュ付きパス（例: "/recruit"）。TOPは "/" */
  path: string;
  /** 検索結果に出さないページ（closed求人・thanksページ等） */
  noindex?: boolean;
  ogType?: "website" | "article";
  /** Article用 */
  publishedTime?: string;
  modifiedTime?: string;
}

/**
 * 全ページ共通のメタデータビルダー。
 * title / description / canonical / OGP / Twitter Card を一括生成する。
 */
export function buildMetadata({
  title,
  description,
  path,
  noindex = false,
  ogType = "website",
  publishedTime,
  modifiedTime,
}: BuildMetadataOptions): Metadata {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title,
      description,
      url,
      siteName: company.siteName,
      locale: "ja_JP",
      type: ogType,
      ...(ogType === "article" && publishedTime
        ? { publishedTime, modifiedTime }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

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
  /**
   * OGP画像。先頭スラッシュ付きの公開パス（例: "/work-loading.webp"）。
   * 未指定の場合は app/opengraph-image.tsx が生成する共通画像が使われる。
   */
  ogImage?: { src: string; width: number; height: number; alt: string };
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
  ogImage,
}: BuildMetadataOptions): Metadata {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;

  /*
   * og:image は必ず1枚出す。
   * 個別指定（記事のアイキャッチなど）がない場合は、
   * app/opengraph-image.tsx が生成する共通画像を使う。
   * ※ 子ルートで openGraph を定義するとファイル規約の画像が
   *   継承されないため、ここで明示的に指定している。
   */
  const images = ogImage
    ? [
        {
          url: `${SITE_URL}${ogImage.src}`,
          width: ogImage.width,
          height: ogImage.height,
          alt: ogImage.alt,
        },
      ]
    : [
        {
          url: `${SITE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${company.siteName}`,
        },
      ];

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
      ...(images ? { images } : {}),
      ...(ogType === "article" && publishedTime
        ? { publishedTime, modifiedTime }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(images ? { images } : {}),
    },
  };
}

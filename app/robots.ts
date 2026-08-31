import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site";

/**
 * production のみ正常クロールを許可。
 * Vercel Preview / development では全クロールを拒否し、
 * 本番公開前のプレビューURLがインデックスされるのを防ぐ。
 */
export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV
    ? process.env.VERCEL_ENV === "production"
    : process.env.NODE_ENV === "production";

  if (!isProduction) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/contact/thanks"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

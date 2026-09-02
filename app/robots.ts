import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site";

/**
 * robots.txt
 *
 * production のみ正常クロールを許可。
 * Vercel Preview / development では全クロールを拒否し、
 * 本番公開前のプレビューURLがインデックスされるのを防ぐ。
 *
 * ── AIクローラーを明示的に許可している理由 ──────────────
 * 生成AIの検索（Google AI Overview / AI Mode、ChatGPT、Perplexity、Copilot など）に
 * 引用されるには、まず各社のクローラーがページを取得できる必要がある。
 * User-Agent: * の Allow で技術的には足りるが、
 *   - Google-Extended … Gemini / AI Overview の学習・生成利用の可否を制御する専用UA
 *   - 各社AIクローラー … robots.txt に自分の名前がないと保守的に扱う実装がある
 * ため、意図して許可していることを明示している。
 *
 * ⚠️ 逆に「AIに使わせたくない」方針へ変える場合は、
 *    ここの Allow を Disallow に変えるだけで切り替えられる。
 * ────────────────────────────────────────
 */

/** 検索・回答生成に使ってほしいAIクローラー */
const AI_CRAWLERS = [
  "Google-Extended", // Google Gemini / AI Overview
  "GPTBot", // OpenAI（学習）
  "OAI-SearchBot", // ChatGPT の検索
  "ChatGPT-User", // ChatGPT がユーザー操作で閲覧
  "ClaudeBot", // Anthropic
  "Claude-Web",
  "PerplexityBot",
  "Perplexity-User",
  "Applebot-Extended", // Apple Intelligence
  "Bytespider",
  "CCBot", // Common Crawl（多くのAIの元データ）
];

export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV
    ? process.env.VERCEL_ENV === "production"
    : process.env.NODE_ENV === "production";

  if (!isProduction) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  const disallow = ["/api/", "/contact/thanks"];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      // 検索エンジン本体
      { userAgent: "Googlebot", allow: "/", disallow },
      { userAgent: "Bingbot", allow: "/", disallow },
      // AIクローラー
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

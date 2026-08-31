# 株式会社サイプレス 軽貨物事業部 公式サイト

https://cypress-transport.com/

軽貨物ドライバー採用を最重要KPIとした採用×SEOサイト。Next.js (App Router) + TypeScript + Tailwind CSS v4。

## 開発

```bash
npm install
npm run dev        # 開発サーバー
npm run build      # 本番ビルド
npm run lint       # ESLint
npm run typecheck  # 型チェック
```

## データの一元管理（ここだけ触れば更新できる）

| ファイル | 内容 |
|---|---|
| `data/site.ts` | 会社情報・住所・電話・Instagram・未確定情報（null管理） |
| `data/jobs.ts` | **求人情報の単一ソース**。一覧・詳細・JobPosting・sitemapすべて連動 |
| `data/areas.ts` | 採用エリア（東京・千葉・埼玉の12市区） |
| `data/faq.ts` | よくある質問（FAQPage構造化データ連動） |
| `data/services.ts` | 法人向けサービス（`available: false`は非表示） |
| `data/articles/` | コラム記事（1記事1ファイル + index.ts に登録） |

### 求人の公開手順

1. `data/jobs.ts` の該当求人の `null` 項目を確定情報で埋める
2. `status` を `"draft"` → `"open"` に変更
3. デプロイ後、`node scripts/notify-indexing.mjs updated <求人URL>` でGoogleに通知

必須項目（title / description / datePosted / validThrough / employmentType / salary.schema）が
揃っていない求人は、公開しても **JobPosting構造化データが出力されない**（完全性ゲート）。
Search Consoleエラーを構造的に防ぐ設計。

### 求人の終了手順

1. `status` を `"closed"` に変更（ページは「募集終了」表示・noindexで残り、募集中求人へ誘導）
2. sitemap・JobPosting からは自動除外される
3. `node scripts/notify-indexing.mjs updated <求人URL>` で更新を通知

## 環境変数

`.env.example` を参照。Vercel には以下を設定：

- `NEXT_PUBLIC_SITE_URL`（本番のみ: `https://cypress-transport.com`）
- `RESEND_API_KEY` / `CONTACT_EMAIL_TO` / `CONTACT_EMAIL_FROM`（応募フォームのメール送信）
- `NEXT_PUBLIC_GA4_ID`（GA4計測。後からでも可）

## SEO設計メモ

- 全ページ canonical / OGP / Twitter Card / 固有title・description（`lib/seo.ts`）
- 構造化データ: Organization（TOP・会社概要）/ JobPosting（個別求人のみ）/
  BreadcrumbList（下層全部）/ BlogPosting + FAQPage（コラム）/ FAQPage（FAQ）
- robots: Vercel Preview環境は自動で全ページnoindex + robots.txt Disallow
- sitemap.xml: open求人と公開記事を動的生成。closed/draftは除外
- 地域ページ量産はしない方針（`data/areas.ts` のコメント参照）

## 写真素材の差し替え

現在は実写真が未提供のため、ヒーローはSVG+グラデーションで構成している。
実際の軽バン・配送風景・スタッフ写真が用意できたら：

1. `public/images/` に配置（WebP推奨）
2. `components/sections/Hero.tsx` の背景を `next/image`（`priority`付き）に差し替え
3. E-E-A-T強化のため、採用TOP・会社概要にも現場写真を追加

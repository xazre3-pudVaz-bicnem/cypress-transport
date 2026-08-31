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
| `data/images.ts` | **写真の単一ソース**。src / alt / 寸法を管理し全ページに反映 |

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

## 写真の運用

写真はすべて `data/images.ts` で一元管理し、ページからは `photos.xxx` で参照する
（コンポーネントに `src` を直書きしない）。表示は次の2つのコンポーネントを使う。

- `<PhotoFrame>` … 枠でアスペクト比を固定し、画像は `fill` + `object-cover`。CLSが出ない
- `<PhotoBackdrop>` … セクション背景。濃紺オーバーレイで白文字のコントラストを確保
  （親要素に `relative` と `overflow-hidden` が必要）

TOPのヒーローだけは `getImageProps` + `<picture>` でアートディレクションしている。
768px以上は横長（`hero-driver.webp`）、未満は縦長（`driver-portrait.webp`）を
**どちらか1枚だけ**読み込むため、LCPが最小になる。

### ⚠️ 現在の写真はイメージカット

`public/` の写真はモデル・車両とも**当社の実物ではないイメージカット**。
そのため `alt` に「葛飾区の配送拠点」「当社スタッフ」など事実と異なる断定は書かないこと
（E-E-A-Tとして逆効果になり、景品表示法上のリスクもあるため）。

実際の車両・配送現場・スタッフを撮影できたら：

1. WebPに変換して `public/` に配置
2. `data/images.ts` の `src` を差し替え、`alt` を実態に沿った説明へ更新
3. 会社概要・採用TOPに「実際の現場写真」として掲載し、E-E-A-Tを強化

`_photo-sources/` は生成直後のPNG原本（1枚2MB）。Git管理外なのでデプロイされない。

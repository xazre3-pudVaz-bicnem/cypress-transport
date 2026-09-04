# 株式会社サイプレス 軽貨物事業部 公式サイト

https://www.cypress-transport.com/

軽貨物ドライバー採用を最重要KPIとした採用×SEOサイト。Next.js (App Router) + TypeScript + Tailwind CSS v4。

## 開発

```bash
npm install
npm run dev        # 開発サーバー
npm run build      # 本番ビルド
npm run lint       # ESLint
npm run typecheck  # 型チェック
```

## このサイトの根本ルール

**確認できていない情報は載せない。** 未確定の項目はコード上で `null` にしてあり、画面にも構造化データにも出力されません。
「たぶんこうだろう」で埋めることは、求職者への虚偽表示になるため行いません。

必要な情報の一覧は **[TODO_REQUIRED_INFO.md](./TODO_REQUIRED_INFO.md)** にまとめてあります。

## データの一元管理（ここだけ触れば更新できる）

| ファイル | 内容 |
|---|---|
| `data/site.ts` | 会社情報・代表メッセージ・実績数値。未確定は `null`（＝非表示） |
| `data/jobs.ts` | **求人情報の単一ソース**。一覧・詳細・JobPosting・sitemapがすべて連動 |
| `data/recruit-status.ts` | **採用ステータスの単一ソース**（求人データから自動導出） |
| `data/areas.ts` | 採用エリア（東京・千葉・埼玉の12市区） |
| `data/faq.ts` | よくある質問。`scope` で「当社の話」と「業界一般論」を分離 |
| `data/services.ts` | 法人向けサービス（`available: false` は非表示） |
| `data/articles/` | コラム記事（1記事1ファイル + `index.ts` に登録） |
| `data/authors.ts` | 記事の執筆者・監修者 |
| `data/images.ts` | **写真の単一ソース**。src / alt / 寸法を管理 |

### 採用ステータスが自動で切り替わる仕組み

以前、TOPに「積極募集中」と書いてあるのに求人一覧は「準備中」という矛盾が起きました。
原因は各ページが個別に文言を持っていたことです。

現在は `data/recruit-status.ts` が `data/jobs.ts` から**自動でステータスを導出**します。

- `status: "open"` の求人が **0件** → `preparing`：「ドライバー登録・相談受付中」「採用情報を見る」「募集開始の案内を受け取る」
- `status: "open"` の求人が **1件以上** → `open`：「軽貨物ドライバー募集中」「募集中の求人を見る」「応募・相談する」

ヒーロー・ヘッダー・スマホ固定CTA・各ページのCTA・404ページがすべてここから文言を受け取るため、
**求人データを更新するだけでサイト全体の表現が正しく切り替わります。手動での書き換えは不要です。**

### 求人の公開手順

1. `data/jobs.ts` の該当求人の `null` 項目を確定情報で埋める
2. `status` を `"draft"` → `"open"` に変更
3. デプロイ後、`node scripts/notify-indexing.mjs updated <求人URL>` でGoogleへ通知

必須項目（title / description / datePosted / validThrough / employmentType / salary.schema）が
揃っていない求人は、公開しても **JobPosting構造化データが出力されません**（`lib/jobs.ts` の完全性ゲート）。
Search Consoleのエラーを構造的に防ぐ設計です。

### 求人の鮮度について

Google 求人検索は掲載情報の鮮度を見ます。`validThrough` を数年先に設定した求人を
何も触らずに放置すると、時間の経過とともに露出が落ちていきます。

**半年〜1年ごとに求人内容を見直し**、条件に変更があれば更新したうえで
`datePosted` も更新してください（内容が変わっていないのに日付だけ新しくするのは避けること）。
更新後は `node scripts/notify-indexing.mjs updated <求人URL>` で通知します。

### 求人の終了手順

1. `status` を `"closed"` に変更（ページは「募集終了」表示・noindexで残り、募集中求人へ誘導）
2. sitemap・JobPosting からは自動で除外される
3. `node scripts/notify-indexing.mjs updated <求人URL>` で通知

> `scripts/notify-indexing.mjs` は**求人URL以外を渡すと実行を中止します**。
> Indexing API がサポートするのは JobPosting / BroadcastEvent を含むページだけで、
> 記事や固定ページに使うのはガイドライン違反にあたるためです。

## デザインの方針

「AIが生成したテンプレートサイト」に見えないよう、次を守っています。

- **英語のセクションラベルを使わない**（`Our Promise` `About the Job` などは廃止）
- **カードに情報を詰め込みすぎない** — 写真＋文章、罫線の定義リスト、比較表、縦線のステップ、
  大きな数字（`components/ui/Layouts.tsx`）を使い分け、ページごとにリズムを変える
- **CTAを使い回さない** — `CtaSection` の `title` / `description` に既定値はなく、
  各ページが文脈に合う文言を必ず渡す
- **発光シャドウ・グラデーションボタン・過剰な角丸を使わない**（`app/globals.css`）
- スクロールアニメーションは廃止（表示速度を優先）

## 写真の運用

写真はすべて `data/images.ts` で一元管理し、`<PhotoFrame>`（枠でアスペクト比を固定＝CLSなし）と
`<PhotoBackdrop>`（背景＋濃紺オーバーレイ）で表示します。

### ⚠️ 現在の写真はすべてイメージカット

- **人物が写った画像は使っていません。** 架空の人物を「当社スタッフ」に見せるのは誤認を招くためです。
  人物入りのAI画像は `_photo-sources/retired-people-photos/` へ退避済み（デプロイ対象外）。
- **alt に実在の場所・人物を断定していません。**「葛飾区の配送拠点」「当社スタッフ」とは書きません。

実車・実拠点・実スタッフを撮影できたら、`data/images.ts` の `src` を差し替え、
`alt` を実態に沿った説明へ更新してください。**実写への置き換えがE-E-A-T上いちばん効きます。**

## SEO設計メモ

- 全ページ canonical / OGP / Twitter Card / 固有title・description（`lib/seo.ts`）
- og:image は全ページに出力（個別指定がなければ `app/opengraph-image.tsx` の生成画像）
- 構造化データ
  - `Organization`（TOP・会社概要）、`WebSite`（TOP）
  - `BreadcrumbList`（下層全ページ）
  - `JobPosting`（**個別求人ページのみ**。一覧ページには入れない）
  - `BlogPosting`（記事）
  - `FAQPage`（**/recruit/faq のみ**。記事内の小さなQ&Aには付けない）
- robots: Vercel Preview 環境は全ページ noindex + robots.txt Disallow
- sitemap.xml: open求人と公開記事を動的生成。closed / draft / noindexページは除外
- **地域ページの量産はしない**（`data/areas.ts` と `/recruit/area` のコメント参照）。
  実際に勤務地・集荷拠点・配送案件が存在し、固有の情報が書ける地域だけページ化する

## 環境変数

`.env.example` を参照。Vercelには `NEXT_PUBLIC_SITE_URL` / `RESEND_API_KEY` /
`NEXT_PUBLIC_GA4_ID` を設定します。詳細と優先度は
[TODO_REQUIRED_INFO.md](./TODO_REQUIRED_INFO.md) にあります。

### お問い合わせフォームのメール

フォームの送信内容は **`info@cypress-all.co.jp`** に届きます（`app/api/contact/route.ts`）。
返信先（Reply-To）には応募者のメールアドレスが入るので、届いたメールにそのまま返信できます。

| 項目 | 既定値 | 変更方法 |
|---|---|---|
| 送信先 | `info@cypress-all.co.jp` | 環境変数 `CONTACT_EMAIL_TO` |
| 送信元 | `サイプレス軽貨物事業部 <no-reply@cypress-all.co.jp>` | 環境変数 `CONTACT_EMAIL_FROM` |

**Vercelに `RESEND_API_KEY` を設定するだけで送信が有効になります。**

> ⚠️ 送信元は Resend で**ドメイン認証済み**でなければ送信が拒否されます。
> 現在 Resend に登録・検証済みなのは `cypress-all.co.jp` のみで、`cypress-transport.com` は未登録です。
> `no-reply@cypress-transport.com` から送りたい場合は、先に Resend でドメインを追加し
> DNS（SPF / DKIM）を設定して「検証済み」にしてから `CONTACT_EMAIL_FROM` を変更してください。

/**
 * サイト全体の確定情報を一元管理するファイル。
 *
 * ⚠️ ここに書いた内容は全ページ・構造化データ・sitemapに反映されます。
 * 未確定の情報は絶対に書かず、`null` のままにしてください。
 * `null` の項目は画面にも構造化データにも出力されません。
 */

/**
 * サイトURL。環境変数が未設定・空文字の場合は本番ドメインにフォールバックする。
 * （Vercelで空のまま登録されても new URL() が落ちないよう || を使用。末尾スラッシュも除去）
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://cypress-transport.com"
).replace(/\/+$/, "");

export const company = {
  /** 正式社名 */
  name: "株式会社サイプレス",
  /** 事業部名 */
  division: "株式会社サイプレス 軽貨物事業部",
  /** サイト名（title等で使用） */
  siteName: "株式会社サイプレス 軽貨物事業部",
  /** 所在地 */
  address: {
    postalCode: null as string | null, // 郵便番号が確定したら入れる（例: "125-0063"）
    prefecture: "東京都",
    city: "葛飾区",
    street: "白鳥4-6-1-623号",
    /** 表示用の全文 */
    full: "東京都葛飾区白鳥4-6-1-623号",
  },
  /** 電話番号（表示用） */
  phone: "090-2360-0052",
  /** 電話番号（tel:リンク用） */
  phoneTel: "+81-90-2360-0052",
  /** Instagram */
  instagram: "https://www.instagram.com/cypress_transport/?hl=ja",
  /** 事業内容（確定している範囲のみ） */
  businessSummary: "軽貨物運送事業（軽貨物ドライバーによる配送業務）",
  /**
   * ▼ 以下は未確定情報。確定したら値を入れる。null の間は表示されない。
   */
  /** 設立年月（軽貨物事業部の開始時期） */
  divisionEstablished: null as string | null, // 例: "2026年◯月"
  /** 代表者名 */
  representative: null as string | null,
  /** 貨物軽自動車運送事業の届出番号など */
  businessLicense: null as string | null,
  /** 問い合わせ用メールアドレス（公開する場合のみ） */
  publicEmail: null as string | null,
} as const;

/**
 * 営業・募集の対象エリア表現。
 * 「車で30分」等の未確認の断定はしない。拠点確定後に見直すこと。
 */
export const serviceAreaLabel = "東京東部・千葉北西部・埼玉東部";

/** ヒーローなどで使う短いエリア表現 */
export const serviceAreaShort = "東京・千葉・埼玉";

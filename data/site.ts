/**
 * 会社情報の単一ソース。
 *
 * ⚠️ ここに書いた内容は全ページ・構造化データ・sitemapに反映されます。
 * ⚠️ 未確定の情報は絶対に埋めず、`null` のままにしてください。
 *    `null` の項目は画面にも構造化データにも一切出力されません。
 *    「たぶんこうだろう」で埋めることは、求職者・取引先への虚偽表示になります。
 *
 * 埋めるべき項目の一覧は TODO_REQUIRED_INFO.md にまとめてあります。
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
    postalCode: null as string | null, // 例: "125-0063"
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

  /* ───────── 以下は未確定。確定したら値を入れる（null の間は非表示） ───────── */

  /** 代表者名 */
  representative: null as string | null,
  /** 会社設立年月日 */
  founded: null as string | null, // 例: "2019年4月1日"
  /** 軽貨物事業部の立ち上げ時期 */
  divisionEstablished: null as string | null, // 例: "2026年9月"
  /** 法人番号（13桁） */
  corporateNumber: null as string | null,
  /** 貨物軽自動車運送事業の届出番号 */
  businessLicense: null as string | null,
  /** 資本金 */
  capital: null as string | null,
  /** 軽貨物事業部の所在地（本社と異なる場合のみ） */
  divisionAddress: null as string | null,
  /** 営業時間 */
  businessHours: null as string | null, // 例: "9:00〜18:00"
  /** 電話受付時間 */
  phoneHours: null as string | null, // 例: "平日9:00〜19:00"
  /** 定休日 */
  closedDays: null as string | null,
  /** 株式会社サイプレスのコーポレートサイトURL */
  corporateSiteUrl: null as string | null,
  /** 公開用メールアドレス */
  publicEmail: null as string | null,
} as const;

/**
 * 代表メッセージ。
 * 実際に代表者から受け取った文章のみを入れること。
 * null の間はセクションごと非表示になる（架空のメッセージは絶対に書かない）。
 */
export const representativeMessage: {
  name: string;
  role: string;
  body: string[];
} | null = null;

/**
 * 「なぜ軽貨物事業を始めたのか」の一次情報。
 * 事業立ち上げの背景は採用にもSEOにも効くが、実際に聞き取った内容のみ掲載する。
 * null の間はセクションごと非表示。
 */
export const foundingStory: { heading: string; body: string[] } | null = null;

/**
 * 実績数値。
 * ⚠️ 架空の数字は絶対に入れない。値が null の項目は表示されず、
 *    すべて null の場合はセクションごと非表示になる。
 */
export interface CompanyStat {
  label: string;
  value: number | null;
  unit: string;
  /** 補足（任意） */
  note?: string;
}

export const companyStats: CompanyStat[] = [
  { label: "登録ドライバー数", value: null, unit: "名" },
  { label: "稼働ドライバー数", value: null, unit: "名" },
  { label: "保有・稼働車両数", value: null, unit: "台" },
  { label: "取引企業数", value: null, unit: "社" },
  { label: "月間配送件数", value: null, unit: "件" },
];

/** 値が入っている実績のみ */
export const availableStats = companyStats.filter(
  (s): s is CompanyStat & { value: number } => s.value !== null
);

/**
 * 営業・募集の対象エリア表現。
 * 「車で30分」等の未確認の断定はしない。拠点確定後に見直すこと。
 */
export const serviceAreaLabel = "東京東部・千葉北西部・埼玉東部";

/** ヒーローなどで使う短いエリア表現 */
export const serviceAreaShort = "東京・千葉・埼玉";

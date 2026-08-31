import type { AreaSlug } from "./areas";

/**
 * 求人情報の単一ソース（Single Source of Truth）。
 *
 * このファイルを更新すると、以下がすべて自動で連動します。
 *  - 求人一覧（/recruit/jobs）
 *  - 個別求人ページ（/recruit/jobs/[slug]）
 *  - JobPosting 構造化データ（必須項目が揃った求人のみ出力）
 *  - sitemap.xml（open の求人のみ）
 *  - 採用エリアページの「募集中」表示
 *
 * ── 運用ルール ─────────────────────────────
 * 1. 未確定の条件は絶対に書かない。null のままにする。
 *    null の項目は画面にも JobPosting にも出力されない。
 * 2. status:
 *    - "draft"  : 準備中。ページ生成されず一覧にも出ない（404）。
 *    - "open"   : 募集中。一覧・詳細・sitemap・JobPosting すべて有効。
 *    - "closed" : 募集終了。ページは「募集終了」表示で残る（noindex）。
 *      JobPosting は出力されず、sitemap からも除外される。
 * 3. JobPosting 構造化データは、Google の必須項目
 *    （title / description / datePosted / validThrough / employmentType /
 *      jobLocation / baseSalary / hiringOrganization / identifier）が
 *    すべて揃った場合のみ自動出力される（lib/jobs.ts の完全性ゲート）。
 *    → 中途半端な求人データで構造化データエラーを出さないための設計。
 * 4. jobLocation は実際に働く場所だけを設定する。SEO目的の偽装は禁止。
 * 5. 求人を終了するときは status を "closed" にし、validThrough を過ぎた
 *    日付のままにする。復活させる場合は新しい求人IDで作り直すのが原則。
 * ──────────────────────────────────────
 */

export type JobStatus = "draft" | "open" | "closed";

/** Google JobPosting の employmentType に対応 */
export type EmploymentType =
  | "FULL_TIME"
  | "PART_TIME"
  | "CONTRACTOR" // 業務委託
  | "TEMPORARY"
  | "OTHER";

export interface JobSalary {
  /** 画面表示用の文言（例: "日額◯◯円〜◯◯円（出来高制）"） */
  text: string;
  /** JobPosting baseSalary 用。確定しない間は null */
  schema: {
    currency: "JPY";
    unitText: "HOUR" | "DAY" | "WEEK" | "MONTH" | "YEAR";
    minValue?: number;
    maxValue?: number;
    value?: number;
  } | null;
}

export interface Job {
  /** 求人ID（社内管理用・JobPosting identifier に使用） */
  id: string;
  /** URL slug（例: katsushika-driver-001） */
  slug: string;
  status: JobStatus;
  /** 求人タイトル（例: 軽貨物配送ドライバー（葛飾区）） */
  title: string;
  /** 勤務地エリア（data/areas.ts のslug）。実際に働く場所のみ設定する */
  area: AreaSlug;
  /** 勤務地の詳細（番地・拠点名など。確定するまで null） */
  workLocationDetail: string | null;

  /** 掲載開始日 YYYY-MM-DD */
  datePosted: string | null;
  /** 募集終了日 YYYY-MM-DD（JobPosting validThrough） */
  validThrough: string | null;

  /** 雇用・契約形態（表示用文言。例: "業務委託"） */
  employmentTypeLabel: string | null;
  /** 雇用・契約形態（JobPosting 用） */
  employmentType: EmploymentType[] | null;

  /** 仕事内容（詳細な説明文。JobPosting description の主体） */
  description: string | null;
  /** 配送エリア（例: "葛飾区および周辺エリア"） */
  deliveryArea: string | null;
  /** 報酬 */
  salary: JobSalary | null;
  /** 勤務時間（例: "8:00〜19:00（実働◯時間）"） */
  workHours: string | null;
  /** 稼働日数（例: "週5日〜"） */
  workDays: string | null;
  /** 休日 */
  holidays: string | null;
  /** 応募資格 */
  requirements: string[] | null;
  /** 必要免許（例: "普通自動車免許（AT限定可）"） */
  licenses: string[] | null;
  /** 待遇・福利厚生 */
  benefits: string[] | null;
  /** 車両条件（例: "車両持ち込み歓迎・リースあり" など確定情報のみ） */
  vehicle: string | null;
  /** 経費負担の区分（ガソリン代・駐車場代・保険料などを誰が負担するか） */
  expenses: string | null;
  /** 募集人数 */
  headcount: string | null;
  /** 必要な経験（不問の場合も、確定してから記載する） */
  experience: string | null;
  /** 研修（確定している内容のみ） */
  training: string | null;
  /** 応募方法の補足 */
  applyMethod: string | null;

  /**
   * サイト上のフォームから短い手順で直接応募が完結する場合のみ true。
   * （JobPosting directApply）
   */
  directApply: boolean;
}

export const jobs: Job[] = [
  /**
   * ▼ 葛飾区・1件目（2026年9月1日 事業部開設にあわせて公開）
   *
   * JobPosting の必須項目（title / description / datePosted / validThrough /
   * employmentType / jobLocation / baseSalary / identifier）がすべて揃ったため
   * status を "open" にしている。
   * これにより求人一覧・詳細・JobPosting構造化データ・sitemap に反映され、
   * サイト全体のCTAが「募集中」の文言へ自動で切り替わる。
   *
   * null のままの項目（稼働日数・休日・待遇・経費負担・研修・募集人数）は
   * まだ確定していないため、画面にも構造化データにも出力されない。
   * 確定したら値を入れるだけで両方に反映される。
   */
  {
    id: "CYP-KATSUSHIKA-001",
    slug: "katsushika-driver-001",
    status: "open",
    title: "軽貨物配送ドライバー（葛飾区）",
    area: "katsushika",
    // 具体的な配送拠点の住所は未確定のため null。
    // jobLocation は「東京都葛飾区」（市区レベル）として出力される。
    workLocationDetail: null,
    datePosted: "2026-09-01",
    // 継続的な募集のため5年後を設定。
    // ただし求人は鮮度が評価に影響するため、半年〜1年ごとに内容を見直し、
    // 変更があれば datePosted も更新することを推奨（README参照）。
    validThrough: "2031-09-01",
    employmentTypeLabel: "業務委託",
    employmentType: ["CONTRACTOR"],
    description:
      "軽バン（軽貨物自動車）を使用した配送業務です。葛飾区を中心としたエリアで、集荷拠点でお預かりした荷物を届け先までお届けします。報酬は日額20,000円の保証制で、出来高や配達件数によって下回ることはありません。ロイヤリティやシステム利用料の差し引きもありません。普通自動車免許（AT限定可）があれば従事でき、軽貨物の経験は問いません。車両をお持ちでない方には、リースの手配が可能です。",
    deliveryArea: "東京都葛飾区を中心としたエリア",
    salary: {
      text: "日額 20,000円保証（ロイヤリティなし）",
      schema: { currency: "JPY", unitText: "DAY", value: 20000 },
    },
    workHours: "9:00〜18:00",
    workDays: null,
    holidays: null,
    requirements: [
      "普通自動車免許をお持ちの方（AT限定可）",
      "軽貨物の経験は問いません",
    ],
    licenses: ["普通自動車免許（AT限定可）"],
    benefits: null,
    vehicle: "車両リースの手配が可能です。車両をお持ちでない方もご相談ください。",
    expenses: null,
    headcount: null,
    experience: "未経験可",
    training: null,
    applyMethod:
      "本ページの応募フォーム、お電話（090-2360-0052）、InstagramのDMからご連絡ください。",
    // 応募フォームから直接応募が完結するため true
    directApply: true,
  },
];

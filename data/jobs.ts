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
   * ▼ 求人テンプレート（葛飾区・1件目）
   *
   * 現在は立ち上げ段階のため "draft"。
   * 下記の null 項目を確定情報で埋め、status を "open" に変更すると
   * 一覧・詳細・構造化データ・sitemap にすべて反映されます。
   */
  {
    id: "CYP-KATSUSHIKA-001",
    slug: "katsushika-driver-001",
    status: "draft", // ← 条件確定後に "open" へ
    title: "軽貨物配送ドライバー（葛飾区）",
    area: "katsushika",
    workLocationDetail: null, // 例: "東京都葛飾区白鳥4-6-1（配送拠点◯◯）"
    datePosted: null, // 例: "2026-09-15"
    validThrough: null, // 例: "2026-12-31"
    employmentTypeLabel: null, // 例: "業務委託"
    employmentType: null, // 例: ["CONTRACTOR"]
    description: null,
    // 例:
    // "軽バンを使用した配送業務です。担当エリアの荷物を集荷拠点で積み込み、
    //  個人宅・企業へお届けします。..."
    deliveryArea: null, // 例: "葛飾区・足立区エリア"
    salary: null,
    // 例:
    // {
    //   text: "日額◯◯,◯◯◯円〜（完全出来高制）",
    //   schema: { currency: "JPY", unitText: "DAY", minValue: 00000 },
    // },
    workHours: null, // 例: "8:00〜19:00の間で実働◯時間"
    workDays: null, // 例: "週◯日〜相談可"
    holidays: null,
    requirements: null, // 例: ["普通自動車免許をお持ちの方", "未経験歓迎"]
    licenses: null, // 例: ["普通自動車免許（AT限定可）"]
    benefits: null,
    vehicle: null,
    expenses: null, // 例: "ガソリン代・駐車場代はドライバー負担"
    headcount: null, // 例: "2名"
    experience: null, // 例: "軽貨物経験不問" ※不問と決まってから記載する
    training: null,
    applyMethod: null,
    directApply: false, // フォームから直接応募が完結する運用が確定したら true
  },
];

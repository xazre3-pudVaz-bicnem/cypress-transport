/**
 * 募集条件の単一ソース。
 *
 * 正式な求人（data/jobs.ts）を公開する前でも、
 * **確定している条件だけ**をサイト上に出すためのファイル。
 *
 * ルール:
 *   value に文字列が入っている項目 = 確認済みの事実。画面に表示される。
 *   value が null の項目           = 未確定。画面にも出さないし、
 *                                    「未定です」とも書かない（無言でスキップする）。
 *
 * ⚠️ 推測で埋めないこと。ここに書いた内容は求職者への提示条件になります。
 */

export interface RecruitCondition {
  /** 項目名 */
  label: string;
  /** 確定内容。未確定なら null */
  value: string | null;
  /** 補足（任意） */
  note?: string;
}

export const recruitConditions: RecruitCondition[] = [
  {
    label: "契約形態",
    value: "業務委託",
    note: "個人事業主として配送業務を請け負う契約です。雇用契約とは税金・保険の扱いが異なります。",
  },
  {
    label: "必要な経験",
    value: "未経験可",
    note: "経験の有無は問いません。",
  },
  {
    label: "必要な免許",
    value: "普通自動車免許（AT限定可）",
    note: "軽自動車を使用するため、中型・大型免許は必要ありません。",
  },
  {
    label: "車両",
    value: "リースの手配が可能",
    note: "車両をお持ちでない方もご相談ください。持ち込みについては面談時にご相談ください。",
  },
  {
    label: "副業・Wワーク",
    value: "可",
  },
  {
    label: "勤務地",
    value: "東京都葛飾区を中心としたエリア",
  },
  {
    label: "勤務時間",
    value: "9:00〜18:00",
  },
  {
    label: "報酬",
    value: "1個 160円以上（出来高制）",
    // 「業務委託＝給与ではない」は契約形態から定義的に言えることなので明記する。
    // 一方で経費の負担区分は会社ごとに異なり未確認のため、ここでは触れない。
    note: "配達1個あたり160円以上の出来高制です。業務委託契約のため、給与ではなく報酬としてのお支払いになります。",
  },
  {
    label: "最低保証",
    value: "日額 15,000円",
    note: "出来高が最低保証を下回った日も、稼働1日あたり15,000円をお支払いします。出来高が上回った場合はその金額になります。",
  },
  {
    label: "ロイヤリティ",
    value: "なし",
    note: "報酬からロイヤリティ・システム利用料を差し引くことはありません。",
  },

  /* ───── 以下は未確定。値が入るまで画面に表示されない ───── */
  { label: "稼働日数", value: null },
  { label: "休日", value: null },
  { label: "経費負担", value: null },
  { label: "研修", value: null },
];

/** 確定している条件のみ */
export const confirmedConditions = recruitConditions.filter(
  (c): c is RecruitCondition & { value: string } => c.value !== null
);

/**
 * ヒーローや求人ブロックで大きく見せる数字。
 * すべて確定条件から作っており、ここに未確定の値は入れない。
 */
export const heroFigures = [
  { label: "1個あたり", figure: "160", unit: "円以上" },
  { label: "最低保証", figure: "15,000", unit: "円 / 日" },
  { label: "ロイヤリティ", figure: "0", unit: "円" },
  { label: "経験", figure: "未経験", unit: "OK" },
] as const;

/**
 * 報酬シミュレーション。
 *
 * 報酬は「1個160円以上の出来高制」＋「日額15,000円の最低保証」という構成。
 * 出来高は配達個数で決まるが、1日あたりの個数の目安は未確定のため計算できない。
 * そのため、ここでは**確実に受け取れる下限**である最低保証だけで算出している。
 * 表示の際は必ず「最低保証ベース」「出来高が上回ればその金額」と併記すること。
 *
 * ⚠️ 業務委託のため給与ではなく報酬であり、経費控除前の金額。
 *    この注記は必ず数字と同じ場所に表示すること（職業安定法の的確表示）。
 *
 * 稼働日数の上限は未確定のため、20日・22日・25日の3例に留めている。
 */
export const UNIT_PRICE = 160;
export const MIN_DAILY_GUARANTEE = 15000;

export const paySimulation = [
  { days: 20, note: "週5日・月20日稼働の場合" },
  { days: 22, note: "月22日稼働の場合" },
  { days: 25, note: "月25日稼働の場合" },
].map((row) => ({ ...row, total: row.days * MIN_DAILY_GUARANTEE }));

/**
 * 条件がひととおり確定しているか（報酬まで決まったか）。
 * 報酬は求職者にとって最重要かつ JobPosting の必須項目なので、
 * これを「まだ出せていない条件がある」の判定基準にしている。
 */
export const hasSalaryFixed = recruitConditions.some(
  (c) => c.label === "報酬" && c.value !== null
);

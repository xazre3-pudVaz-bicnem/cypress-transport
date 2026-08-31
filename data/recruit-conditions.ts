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

  /* ───── 以下は未確定。値が入るまで画面に表示されない ───── */
  { label: "報酬", value: null },
  { label: "勤務時間", value: null },
  { label: "稼働日数", value: null },
  { label: "休日", value: null },
  { label: "経費負担", value: null },
  { label: "研修", value: null },
  { label: "勤務地", value: null },
];

/** 確定している条件のみ */
export const confirmedConditions = recruitConditions.filter(
  (c): c is RecruitCondition & { value: string } => c.value !== null
);

/**
 * 条件がひととおり確定しているか（報酬まで決まったか）。
 * 報酬は求職者にとって最重要かつ JobPosting の必須項目なので、
 * これを「まだ出せていない条件がある」の判定基準にしている。
 */
export const hasSalaryFixed = recruitConditions.some(
  (c) => c.label === "報酬" && c.value !== null
);

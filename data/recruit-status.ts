import { jobs } from "./jobs";

/**
 * 採用ステータスの単一ソース。
 *
 * ── なぜこのファイルがあるか ──────────────────────
 * 以前、TOPに「積極募集中」と書いてあるのに求人一覧は「準備中」という
 * 矛盾が起きた。原因は、各ページが個別に文言を持っていたこと。
 *
 * そこでステータスを data/jobs.ts から**自動で導出**する形にした。
 * open な求人が1件でもあれば "open"、なければ "preparing"。
 * 文言・CTA・バッジ・スマホ固定ボタンはすべてここから供給されるため、
 * 求人データを更新するだけでサイト全体の表現が正しく切り替わる。
 * 手動でステータスを書き換える必要はない（＝二度と矛盾しない）。
 * ──────────────────────────────────────
 */

export type RecruitPhase = "preparing" | "open";

/** 募集中（status: "open"）の求人が存在するか */
export const hasOpenJobs = jobs.some((job) => job.status === "open");

export const recruitPhase: RecruitPhase = hasOpenJobs ? "open" : "preparing";

interface Cta {
  href: string;
  label: string;
}

interface RecruitCopy {
  /** ヒーローのステータス表示 */
  badge: string;
  /** 現在の採用状況セクションの見出し */
  statusHeading: string;
  /** 現在の採用状況セクションの本文 */
  statusBody: string[];
  /** 主要CTA */
  primaryCta: Cta;
  /** 副次CTA */
  secondaryCta: Cta;
  /** スマートフォン固定CTA（左・右） */
  mobileCta: [Cta, Cta];
}

const copy: Record<RecruitPhase, RecruitCopy> = {
  /**
   * 正式な求人条件が未確定の期間。
   * 「積極募集中」「高収入」など、条件が確定していないのに期待を持たせる
   * 表現は使わない。やっていること（相談・登録の受付）だけを書く。
   */
  preparing: {
    badge: "ドライバー登録・相談受付中",
    statusHeading: "現在の採用状況",
    statusBody: [
      "契約形態は業務委託、報酬は配達1個あたり160円以上の出来高制で、日額15,000円の最低保証があります。ロイヤリティの差し引きはありません。未経験可・AT限定免許可で、車両はリースの手配が可能です。副業としての稼働もご相談いただけます。",
      "一方で、勤務地・稼働時間・稼働日数・経費の負担区分は、配送案件にあわせて確定させている段階です。確定していない条件を、確定したように書くことはしません。そのため個別の求人票はまだ公開していません。",
      "いまは働き方のご相談と、募集開始のご案内の登録を受け付けています。ご希望のエリアと稼働イメージを伺い、案件が決まり次第ご連絡します。",
    ],
    primaryCta: { href: "/recruit", label: "採用情報を見る" },
    secondaryCta: { href: "/contact", label: "働き方を相談する" },
    mobileCta: [
      { href: "/recruit", label: "採用情報" },
      { href: "/contact", label: "相談する" },
    ],
  },

  /**
   * 求人を公開している期間。
   * data/jobs.ts に status: "open" の求人を追加すると自動的にこちらへ切り替わる。
   */
  open: {
    badge: "軽貨物ドライバー募集中",
    statusHeading: "現在の採用状況",
    statusBody: [
      "現在、軽貨物ドライバーを募集しています。勤務地・報酬・稼働条件は求人ごとに異なりますので、各求人ページに記載の条件をご確認ください。",
    ],
    primaryCta: { href: "/recruit/jobs", label: "募集要項を見る" },
    secondaryCta: { href: "/contact", label: "応募・相談する" },
    mobileCta: [
      { href: "/recruit/jobs", label: "募集要項" },
      { href: "/contact", label: "応募する" },
    ],
  },
};

export const recruitCopy = copy[recruitPhase];

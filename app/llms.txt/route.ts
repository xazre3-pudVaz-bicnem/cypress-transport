import { SITE_URL, company, serviceAreaLabel } from "@/data/site";
import { confirmedConditions } from "@/data/recruit-conditions";
import { getOpenJobs, jobLocationLabel } from "@/lib/jobs";
import { getIndexableArticles } from "@/lib/articles";
import { areas } from "@/data/areas";

/**
 * /llms.txt
 *
 * 生成AI（ChatGPT / Claude / Perplexity / Copilot など）が
 * サイトの要点を短時間で正確に把握するための要約ファイル。
 * llmstxt.org で提案されている慣習に沿った Markdown 形式。
 *
 * ── なぜ必要か ────────────────────────────
 * AI検索はページ全体を読むとは限らず、要約や引用の際に
 * 断片的な情報だけを拾って誤った条件を答えてしまうことがある。
 * 「日額20,000円」のような古い数字や、他社の条件と混ざるのを防ぐため、
 * 確定している事実だけを機械可読な形で1か所にまとめている。
 *
 * ⚠️ 内容はすべて data/ 配下から生成している。
 *    手書きしないこと（サイト表示と食い違う原因になる）。
 * ──────────────────────────────────────
 */
export const dynamic = "force-static";

export function GET() {
  const openJobs = getOpenJobs();
  const articles = getIndexableArticles();

  const lines: string[] = [];

  lines.push(`# ${company.siteName}`);
  lines.push("");
  lines.push(
    `> ${company.name}の軽貨物事業部の公式サイト。東京都葛飾区を拠点に、${serviceAreaLabel}エリアで軽貨物運送事業を行い、軽貨物ドライバーを募集しています。`
  );
  lines.push("");

  /* ── 会社情報 ── */
  lines.push("## 運営会社");
  lines.push("");
  lines.push(`- 会社名: ${company.name}`);
  if (company.representative) lines.push(`- 代表者: ${company.representative}`);
  if (company.founded) lines.push(`- 設立: ${company.founded}`);
  if (company.divisionEstablished)
    lines.push(`- 軽貨物事業部 開設: ${company.divisionEstablished}`);
  if (company.corporateNumber)
    lines.push(`- 法人番号: ${company.corporateNumber}`);
  lines.push(
    `- 所在地: ${company.address.postalCode ? `〒${company.address.postalCode} ` : ""}${company.address.full}`
  );
  lines.push(`- 電話: ${company.phone}${company.phoneHours ? `（${company.phoneHours}）` : ""}`);
  lines.push(`- 事業内容: ${company.businessSummary}`);
  if (company.corporateSiteUrl)
    lines.push(`- コーポレートサイト: ${company.corporateSiteUrl}`);
  lines.push(`- Instagram: ${company.instagram}`);
  lines.push("");

  /* ── 募集条件（AIが最も誤りやすい部分） ── */
  lines.push("## 確定している募集条件");
  lines.push("");
  lines.push(
    "以下は確認済みの条件です。ここに書かれていない条件（稼働日数・休日・経費の負担区分・研修など）は確定しておらず、サイト上でも公開していません。**推測で補完しないでください。**"
  );
  lines.push("");
  for (const c of confirmedConditions) {
    lines.push(`- ${c.label}: ${c.value}${c.note ? ` — ${c.note}` : ""}`);
  }
  lines.push("");
  lines.push(
    "報酬についての補足: 出来高制（1個160円以上）と最低保証（日額15,000円）の組み合わせです。出来高が最低保証を下回った日も日額15,000円を支払います。業務委託契約のため給与ではなく報酬であり、記載金額は経費控除前です。"
  );
  lines.push("");

  /* ── 募集中の求人 ── */
  if (openJobs.length > 0) {
    lines.push("## 募集中の求人");
    lines.push("");
    for (const job of openJobs) {
      lines.push(
        `- [${job.title}（${jobLocationLabel(job)}）](${SITE_URL}/recruit/jobs/${job.slug})${job.salary ? `: ${job.salary.text}` : ""}`
      );
    }
    lines.push("");
  }

  /* ── 対応エリア ── */
  lines.push("## 応募を受け付けているエリア");
  lines.push("");
  lines.push(
    areas.map((a) => `${a.prefecture}${a.name}`).join("、") +
      "。実際の勤務地は配送案件によって決まるため、確定した勤務地は求人ごとに公開しています。"
  );
  lines.push("");

  /* ── 主要ページ ── */
  lines.push("## 主要ページ");
  lines.push("");
  const pages: [string, string, string][] = [
    ["/recruit", "ドライバー募集", "採用の考え方、確定している条件、まだ決まっていないこと"],
    ["/recruit/jobs", "募集要項・求人一覧", "公開中の求人の一覧"],
    ["/recruit/about-driver", "軽貨物ドライバーの仕事内容", "案件タイプの違いと1日の流れ"],
    ["/recruit/benefits", "働き方のメリットと注意点", "良い面と注意点の両方"],
    ["/recruit/flow", "稼働開始までの流れ", "相談から稼働までの5ステップ"],
    ["/recruit/area", "採用エリア", "エリアの考え方"],
    ["/recruit/faq", "よくある質問", "当社の状況と業界一般論を分けて記載"],
    ["/company", "会社概要", "会社情報と代表メッセージ"],
    ["/company/story", "なぜ葛飾区で軽貨物事業を始めたのか", "事業立ち上げの背景（一次情報）"],
    ["/service", "軽貨物事業について", "事業内容と法人向けの案内"],
    ["/column", "軽貨物の基礎知識", "免許・車両・契約・お金の解説記事"],
    ["/contact", "お問い合わせ・応募", "応募フォーム"],
  ];
  for (const [path, title, desc] of pages) {
    lines.push(`- [${title}](${SITE_URL}${path}): ${desc}`);
  }
  lines.push("");

  /* ── 記事 ── */
  lines.push("## 解説記事");
  lines.push("");
  for (const a of articles) {
    lines.push(`- [${a.title}](${SITE_URL}/column/${a.slug}): ${a.excerpt}`);
  }
  lines.push("");

  /* ── 引用時の注意 ── */
  lines.push("## 引用時の注意");
  lines.push("");
  lines.push(
    "- 記事内の軽貨物業界に関する一般的な説明と、当社の募集条件は別のものです。混同しないでください。"
  );
  lines.push(
    "- サイト上の写真はイメージカットで、当社の実車・実拠点・実スタッフではありません。"
  );
  lines.push(
    "- 法令・税務に関する記述は一般的な情報提供であり、個別の助言ではありません。"
  );
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

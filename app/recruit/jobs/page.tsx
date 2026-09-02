import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JobBlock } from "@/components/ui/JobBlock";
import { CtaSection } from "@/components/ui/CtaSection";
import { getOpenJobs } from "@/lib/jobs";
import { photos } from "@/data/images";
import { recruitCopy } from "@/data/recruit-status";
import { confirmedConditions } from "@/data/recruit-conditions";
import { visibleFaq } from "@/data/faq";
import { areas } from "@/data/areas";

export const metadata: Metadata = buildMetadata({
  title: "軽貨物ドライバーの求人一覧・募集要項｜東京都葛飾区",
  description:
    "東京都葛飾区の軽貨物ドライバー求人。1個160円以上の出来高制＋日額15,000円の最低保証、ロイヤリティなし、業務委託、未経験可、AT限定可、車両リース手配可。勤務地・報酬・勤務時間などの募集要項を掲載しています。",
  path: "/recruit/jobs",
});

/**
 * 求人一覧ページ。
 *
 * 「軽貨物 求人」「葛飾区 軽貨物 求人」の受け皿となる最重要ページのため、
 * 求人カードを並べるだけでなく、条件・エリア・よくある質問まで
 * 検索した人がこのページだけで判断できる情報量を持たせている。
 *
 * ⚠️ JobPosting 構造化データは個別求人ページにのみ実装し、
 *    一覧ページには入れない（Googleのガイドラインに準拠）。
 */
export default function JobsPage() {
  const openJobs = getOpenJobs();
  const jobFaq = visibleFaq
    .filter((f) => f.scope === "company")
    .slice(0, 5);

  return (
    <>
      <PageHero
        title="軽貨物ドライバーの求人一覧"
        description="東京都葛飾区を中心としたエリアで軽貨物配送ドライバーを募集しています。勤務地・報酬・勤務時間は求人ごとに記載しています。"
        photo={photos.logisticsCenter}
      />
      <Breadcrumbs
        items={[
          { name: "ホーム", path: "/" },
          { name: "ドライバー募集", path: "/recruit" },
          { name: "求人一覧" },
        ]}
      />

      <section className="section-pad bg-paper">
        <div className="container-site">
          {openJobs.length > 0 ? (
            <>
              <SectionHeading
                title={`募集中の求人（${openJobs.length}件）`}
                lead="各求人の募集要項ページに、勤務地・報酬・勤務時間・応募資格を記載しています。"
              />
              <div className="mt-10 space-y-8">
                {openJobs.map((job) => (
                  <JobBlock key={job.slug} job={job} />
                ))}
              </div>
            </>
          ) : (
            <div className="max-w-3xl">
              <SectionHeading title="公開中の求人はまだありません" />
              <div className="mt-6 space-y-4 body-text">
                <p>
                  報酬体系や稼働条件を配送案件にあわせて詰めている段階のため、条件が確定した求人はまだ公開していません。数字が決まっていないまま求人票を出すことはしない方針です。
                </p>
                <p>
                  求人を公開した時点で、このページに勤務地・報酬・稼働日数・費用の負担区分まで記載します。先にご案内が欲しい方は、ご希望のエリアと稼働イメージをお知らせください。
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className="btn-accent">
                  {recruitCopy.secondaryCta.label}
                </Link>
                <Link href="/recruit" className="btn-outline">
                  採用情報を見る
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 共通の募集条件。求人ごとの条件と重複しないよう「全求人に共通」と明示する */}
      <section className="border-y border-ink-900/10 bg-white">
        <div className="container-site py-16 md:py-20">
          <SectionHeading
            title="すべての求人に共通する条件"
            lead="以下は確定している条件です。記載のない項目（稼働日数・休日・経費の負担区分・研修など）は確定していないため、あえて書いていません。"
          />
          <table className="spec-table mt-10">
            <tbody>
              {confirmedConditions.map((c) => (
                <tr key={c.label} className="flex flex-col sm:table-row">
                  <th scope="row">{c.label}</th>
                  <td>
                    <span className="font-bold text-ink-900">{c.value}</span>
                    {c.note && (
                      <span className="mt-1 block text-[13px] text-ink-500">
                        {c.note}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* エリア */}
      <section className="section-pad bg-paper">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1fr] lg:gap-16">
            <SectionHeading
              title="応募を受け付けているエリア"
              lead="葛飾区の拠点を中心に、通勤や直行が現実的な範囲から募集しています。実際の勤務地は配送案件によって決まります。"
            />
            <div>
              <ul className="flex flex-wrap gap-x-6 gap-y-3 border-t border-ink-900/15 pt-7">
                {areas.map((a) => (
                  <li
                    key={a.slug}
                    className={`text-sm ${
                      a.priority === "primary"
                        ? "font-bold text-ink-900"
                        : "text-ink-500"
                    }`}
                  >
                    {a.prefecture}
                    {a.name}
                  </li>
                ))}
              </ul>
              <Link href="/recruit/area" className="link-arrow mt-7">
                エリアの考え方を詳しく見る
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 応募前によくある質問 */}
      <section className="section-pad bg-white">
        <div className="container-site max-w-4xl">
          <SectionHeading title="応募前によくある質問" />
          <dl className="mt-9 border-t border-ink-900/15">
            {jobFaq.map((item) => (
              <div
                key={item.q}
                className="grid gap-2 border-b border-ink-900/15 py-6 md:grid-cols-[1fr_1.6fr] md:gap-10"
              >
                <dt className="text-[15px] font-bold leading-snug text-ink-900">
                  {item.q}
                </dt>
                <dd className="text-sm leading-[1.95] text-ink-500">{item.a}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            <Link href="/recruit/faq" className="link-arrow">
              すべての質問を見る
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/recruit/flow" className="link-arrow">
              稼働開始までの流れ
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/recruit/benefits" className="link-arrow">
              働き方のメリットと注意点
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 応募前に読んでおくと理解が早い記事 */}
      <section className="border-t border-ink-900/10 bg-paper">
        <div className="container-site py-14">
          <h2 className="h-sub">応募前に確認しておきたいこと</h2>
          <ul className="mt-5 grid gap-x-10 gap-y-3 md:grid-cols-2">
            {[
              ["/column/what-is-keikamotsu-driver", "軽貨物ドライバーとは？仕事内容の全体像"],
              ["/column/license-for-keikamotsu", "必要な免許は？AT限定でも働けるのか"],
              ["/column/gyomu-itaku-basics", "業務委託とは？雇用との違い"],
              ["/column/income-structure", "報酬と経費｜手取りの考え方"],
              ["/column/kuro-number", "黒ナンバーとは？取得の流れ"],
              ["/column/contract-check", "応募前に確認すべき契約条件チェックリスト"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="link-arrow">
                  {label}
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaSection
        title="気になる求人があればご連絡ください"
        description="募集要項に書かれていない点のご質問だけでも構いません。ご希望のエリアと稼働イメージを伺います。"
      />
    </>
  );
}

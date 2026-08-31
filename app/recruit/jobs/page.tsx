import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JobCard } from "@/components/ui/JobCard";
import { CtaSection } from "@/components/ui/CtaSection";
import { getOpenJobs } from "@/lib/jobs";
import { photos } from "@/data/images";
import { recruitCopy } from "@/data/recruit-status";

export const metadata: Metadata = buildMetadata({
  title: "軽貨物ドライバーの募集状況・求人一覧",
  description:
    "株式会社サイプレス軽貨物事業部の募集中求人の一覧です。勤務地・報酬・勤務時間などの募集要項を、求人ごとに掲載しています。",
  path: "/recruit/jobs",
});

/**
 * 求人一覧ページ。
 * JobPosting 構造化データは個別求人ページにのみ実装し、
 * 一覧ページには入れない（Googleのガイドラインに準拠）。
 */
export default function JobsPage() {
  const openJobs = getOpenJobs();

  return (
    <>
      <PageHero
        title="募集状況・求人一覧"
        description="勤務地・報酬・稼働条件は求人ごとに異なります。公開している求人はすべてこのページに掲載します。"
        photo={photos.logisticsCenter}
      />
      <Breadcrumbs
        items={[
          { name: "ホーム", path: "/" },
          { name: "ドライバー採用", path: "/recruit" },
          { name: "求人一覧" },
        ]}
      />

      <section className="section-pad bg-white">
        <div className="container-site">
          {openJobs.length > 0 ? (
            <>
              <SectionHeading
                title={`募集中の求人（${openJobs.length}件）`}
                lead="各求人の詳細ページに、勤務地・報酬・稼働条件を記載しています。"
              />
              <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {openJobs.map((job) => (
                  <JobCard key={job.slug} job={job} />
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
                  求人を公開した時点で、このページに勤務地・報酬・稼働日数・費用の負担区分まで記載します。先にご案内が欲しい方は、ご希望のエリアと稼働イメージをお知らせください。条件が固まった段階でご連絡します。
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

              <div className="mt-14 border-t border-ink-900/15 pt-10">
                <h2 className="h-sub">
                  求人を待つあいだに確認しておきたいこと
                </h2>
                <ul className="mt-5 space-y-3">
                  {[
                    ["/column/what-is-keikamotsu-driver", "軽貨物ドライバーとは？仕事内容の全体像"],
                    ["/column/license-for-keikamotsu", "必要な免許は？AT限定でも働けるのか"],
                    ["/column/kuro-number", "黒ナンバーとは？取得の流れ"],
                    ["/column/contract-check", "応募前に確認すべき契約条件チェックリスト"],
                  ].map(([href, label]) => (
                    <li key={href}>
                      <Link href={href} className="link-arrow">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      <CtaSection
        title="希望の働き方を先に伝えておきませんか"
        description="ご希望のエリアと稼働できる曜日を伺っておくと、条件が固まった際に合う案件をご案内しやすくなります。"
      />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaSection } from "@/components/ui/CtaSection";
import { areas, prefectures, areasByPrefecture } from "@/data/areas";
import { getOpenJobsByArea } from "@/lib/jobs";
import { JobCard } from "@/components/ui/JobCard";

export const metadata: Metadata = buildMetadata({
  title: "採用エリア｜東京東部・千葉北西部・埼玉東部",
  description:
    "株式会社サイプレスの軽貨物ドライバー採用エリア一覧。葛飾区・三郷市・松戸市・江東区を中心に、東京東部・千葉北西部・埼玉東部から応募を受け付けています。",
  path: "/recruit/area",
});

/**
 * 採用エリアページ。
 * 個別エリアページ（/recruit/area/[slug]）は、そのエリアの求人が実在し、
 * エリア固有の独自コンテンツが用意できた場合にのみ追加する方針
 * （data/areas.ts のコメント参照）。地域名だけの量産ページは作らない。
 */
export default function AreaPage() {
  return (
    <>
      <PageHero
        label="Area"
        title="採用エリア"
        description="葛飾区の拠点を中心に、通勤・直行が現実的なエリアから広くドライバーを募集しています。"
      />
      <Breadcrumbs
        items={[
          { name: "ホーム", path: "/" },
          { name: "ドライバー採用", path: "/recruit" },
          { name: "採用エリア" },
        ]}
      />

      <section className="section-pad bg-white">
        <div className="container-site max-w-4xl">
          <div className="rounded-2xl border-2 border-brand-600/20 bg-brand-50 p-6 md:p-8">
            <p className="text-sm font-bold leading-relaxed text-navy-900 md:text-[15px]">
              勤務地は求人ごとに異なります。実際の勤務地・配送エリアは、必ず現在の求人情報をご確認ください。
            </p>
            <Link
              href="/recruit/jobs"
              className="mt-4 inline-block text-sm font-bold text-brand-600 underline-offset-4 hover:underline"
            >
              募集中の求人一覧を見る →
            </Link>
          </div>

          <div className="mt-12 space-y-10">
            {prefectures.map((pref) => (
              <div key={pref}>
                <SectionHeading label="Area" title={pref} />
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {areasByPrefecture(pref).map((area) => {
                    const openJobs = getOpenJobsByArea(area.slug);
                    return (
                      <li
                        key={area.slug}
                        className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4"
                      >
                        <span className="text-sm font-bold text-navy-900">
                          {area.name}
                          {area.priority === "primary" && (
                            <span className="ml-2 rounded-full bg-navy-900 px-2.5 py-0.5 text-[10px] font-bold text-white">
                              重点エリア
                            </span>
                          )}
                        </span>
                        {openJobs.length > 0 ? (
                          <Link
                            href="/recruit/jobs"
                            className="text-xs font-bold text-emerald-600 underline-offset-4 hover:underline"
                          >
                            募集中 {openJobs.length}件 →
                          </Link>
                        ) : (
                          <span className="text-xs text-slate-400">
                            募集準備中
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 space-y-4 text-sm leading-relaxed text-slate-600">
            <h2 className="heading-2 text-xl md:text-2xl">
              エリアについての考え方
            </h2>
            <p>
              当社は東京都葛飾区に拠点を置き、東京東部・千葉北西部・埼玉東部エリアで軽貨物事業を展開していきます。
              上記のエリアにお住まいの方であれば、勤務地への通勤・直行が現実的な範囲として応募を歓迎しています。
            </p>
            <p>
              一覧にないエリアにお住まいの方も、稼働可能な範囲であればご相談いただけます。
              お問い合わせ時にお住まいのエリアをお知らせください。
            </p>
          </div>

          {/* エリアに求人がある場合はここに表示される */}
          {areas.some((a) => getOpenJobsByArea(a.slug).length > 0) && (
            <div className="mt-12">
              <h2 className="heading-2 text-xl md:text-2xl">
                エリア別の募集中求人
              </h2>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {areas.flatMap((a) =>
                  getOpenJobsByArea(a.slug).map((job) => (
                    <JobCard key={job.slug} job={job} />
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <CtaSection />
    </>
  );
}

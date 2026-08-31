import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoFrame } from "@/components/ui/Photo";
import { CtaSection } from "@/components/ui/CtaSection";
import { JobCard } from "@/components/ui/JobCard";
import { areas, prefectures, areasByPrefecture } from "@/data/areas";
import { getOpenJobsByArea } from "@/lib/jobs";
import { photos } from "@/data/images";

export const metadata: Metadata = buildMetadata({
  title: "採用エリア｜東京東部・千葉北西部・埼玉東部",
  description:
    "株式会社サイプレス軽貨物事業部の採用エリアです。葛飾区の拠点を中心に、江戸川区・足立区・江東区・松戸市・市川市・三郷市・八潮市などからのご相談を受け付けています。",
  path: "/recruit/area",
});

/**
 * 採用エリアページ。
 *
 * ⚠️ 地域ごとのページ（/recruit/area/[slug]）は作っていない。
 * 「〇〇市の軽貨物求人」を地域名だけ差し替えて量産するのは
 * Google のスパムポリシー（Doorway Abuse / Scaled Content Abuse）に該当する。
 *
 * 個別の地域ページを作るのは、次のすべてを満たしたときだけ:
 *  1. その地域に実際の勤務地・集荷拠点・配送案件が存在する
 *  2. 勤務地の住所、アクセス、案件の特性、通勤事情など固有の情報が書ける
 *  3. 他の地域ページと内容が明確に異なる
 */
export default function AreaPage() {
  const hasAnyJob = areas.some((a) => getOpenJobsByArea(a.slug).length > 0);

  return (
    <>
      <PageHero
        title="採用エリア"
        description="葛飾区の拠点を中心に、通勤や直行が現実的な範囲からドライバーを探しています。"
        photo={photos.residentialArea}
      />
      <Breadcrumbs
        items={[
          { name: "ホーム", path: "/" },
          { name: "ドライバー採用", path: "/recruit" },
          { name: "採用エリア" },
        ]}
      />

      <section className="section-pad bg-white">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
              <SectionHeading title="ご相談を受け付けているエリア" />
              <p className="mt-6 body-text">
                以下は「お住まいの地域として想定している範囲」です。
                <strong className="font-bold text-ink-900">
                  実際の勤務地は配送案件によって決まる
                </strong>
                ため、確定した勤務地は求人ごとに公開します。
              </p>

              <dl className="mt-8 border-t border-ink-900/15">
                {prefectures.map((pref) => (
                  <div
                    key={pref}
                    className="flex flex-col gap-2 border-b border-ink-900/15 py-5 sm:flex-row sm:gap-8"
                  >
                    <dt className="shrink-0 text-sm font-bold text-ink-900 sm:w-20">
                      {pref}
                    </dt>
                    <dd className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-ink-500">
                      {areasByPrefecture(pref).map((a) => {
                        const jobs = getOpenJobsByArea(a.slug);
                        return (
                          <span
                            key={a.slug}
                            className={
                              a.priority === "primary"
                                ? "font-bold text-ink-900"
                                : ""
                            }
                          >
                            {a.name}
                            {jobs.length > 0 && (
                              <span className="ml-1 text-xs font-bold text-accent-dark">
                                （募集{jobs.length}件）
                              </span>
                            )}
                          </span>
                        );
                      })}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-[13px] leading-relaxed text-ink-400">
                太字は重点エリアです。一覧にない地域にお住まいの方も、稼働できる範囲であればご相談いただけます。
              </p>
            </div>

            <div>
              <PhotoFrame
                photo={photos.residentialArea}
                ratio="aspect-[4/3]"
                rounded="rounded-[3px]"
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
              <div className="mt-8 border-l-2 border-ink-900 py-2 pl-5">
                <h2 className="h-sub">通勤時間について</h2>
                <p className="mt-2.5 text-sm leading-[1.95] text-ink-500">
                  「車で30分圏内」といった表現は、拠点と案件が確定していない段階では書けません。実際の集荷拠点が決まった時点で、各エリアからの現実的な所要時間をお伝えします。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 地域ページを量産しない理由（方針の説明そのものが独自コンテンツになる） */}
      <section className="section-pad bg-white">
        <div className="container-site max-w-3xl">
          <SectionHeading
            title="地域ごとのページを、まだ作っていない理由"
            lead="求人サイトでは「〇〇市の軽貨物求人」というページが地域の数だけ並んでいることがあります。当社はそれをしていません。"
          />
          <div className="mt-8 space-y-4 body-text">
            <p>
              地域名だけを差し替えたページを並べても、その地域で本当に働けるのかは読んだ人にわかりません。実際には案件がない地域のページから応募して、話が違ったという結果になりかねません。
            </p>
            <p>
              そのため当社では、
              <strong className="font-bold text-ink-900">
                実際にその地域で勤務地・集荷拠点・配送案件が確定したときにだけ
              </strong>
              、その地域のページを作ります。勤務地の場所、周辺の道路事情、案件の特性など、その地域について実際に書けることができてから公開します。
            </p>
            <p>
              それまでは、このページ1枚にまとめています。
            </p>
          </div>
        </div>
      </section>

      {hasAnyJob && (
        <section className="section-pad bg-white">
          <div className="container-site">
            <SectionHeading title="エリア別の募集中求人" />
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {areas.flatMap((a) =>
                getOpenJobsByArea(a.slug).map((job) => (
                  <JobCard key={job.slug} job={job} />
                ))
              )}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-ink-900/15 bg-white">
        <div className="container-site py-12">
          <p className="text-sm leading-[1.95] text-ink-500">
            募集状況は
            <Link href="/recruit/jobs" className="link-arrow mx-1">
              求人一覧
            </Link>
            、仕事内容は
            <Link href="/recruit/about-driver" className="link-arrow mx-1">
              仕事内容のページ
            </Link>
            をご覧ください。
          </p>
        </div>
      </section>

      <CtaSection
        title="お住まいのエリアで働けるか、聞いてみませんか"
        description="お住まいの地域と通勤できる範囲を伺えば、案件が決まった際に現実的かどうかをお伝えできます。"
      />
    </>
  );
}

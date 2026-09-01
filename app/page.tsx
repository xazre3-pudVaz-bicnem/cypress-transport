import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { organizationJsonLd, webSiteJsonLd } from "@/lib/jsonld";
import { JsonLd } from "@/components/ui/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoFrame } from "@/components/ui/Photo";
import { AreaMap } from "@/components/ui/AreaMap";
import { JobBlock } from "@/components/ui/JobBlock";
import { DefinitionList, StatRow } from "@/components/ui/Layouts";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { CtaSection } from "@/components/ui/CtaSection";
import { getOpenJobs } from "@/lib/jobs";
import { getLatestArticles } from "@/lib/articles";
import { company, availableStats } from "@/data/site";
import { photos } from "@/data/images";

export const metadata: Metadata = buildMetadata({
  title: "葛飾区の軽貨物ドライバー求人｜株式会社サイプレス",
  description:
    "東京都葛飾区で軽貨物ドライバーを募集しています。業務委託・日額20,000円保証・ロイヤリティなし。未経験可、AT限定可、車両リースの手配も可能です。東京・千葉・埼玉で一緒に配送網をつくる方を探しています。",
  path: "/",
});

/** 働き方の特徴。すべて確定条件から導いており、未確定の話は書かない */
const features = [
  {
    title: "日額20,000円を保証",
    body: "出来高制ではありません。その日の配達件数や物量にかかわらず、稼働1日あたり20,000円をお支払いします。",
  },
  {
    title: "ロイヤリティは0円",
    body: "報酬からロイヤリティやシステム利用料を差し引くことはしていません。稼いだ分がそのまま報酬になります。",
  },
  {
    title: "免許があれば始められる",
    body: "普通自動車免許があれば従事できます。AT限定でも問題ありません。車両をお持ちでない方にはリースの手配が可能です。",
  },
  {
    title: "条件を曖昧にしない",
    body: "決まっていない条件を、決まったように書くことはしません。求人ページに載せていない条件を口頭だけでお約束することもありません。",
  },
];

export default function HomePage() {
  const openJobs = getOpenJobs();
  const latestArticles = getLatestArticles(3);

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={webSiteJsonLd()} />
      <Hero />

      {/* 2. 募集中の求人 */}
      {openJobs.length > 0 && (
        <section className="section-pad bg-paper">
          <div className="container-site">
            <SectionHeading title="募集中の求人" />
            <div className="mt-10 space-y-8">
              {openJobs.map((job) => (
                <JobBlock key={job.slug} job={job} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. サイプレス軽貨物事業部について */}
      <section className="border-y border-ink-900/10 bg-white">
        <div className="container-site py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:gap-16">
            <div>
              <span aria-hidden="true" className="block h-[3px] w-9 bg-accent" />
              <p className="mt-6 text-[1.75rem] font-bold leading-[1.35] tracking-[-0.02em] text-ink-900 md:text-[2.75rem]">
                Webで培った
                <br />
                「つなぐ力」を、
                <br />
                今度は物流へ。
              </p>
              <p className="mt-7 max-w-lg text-[15px] leading-[1.95] text-ink-500">
                良いサービスがあっても、必要としている人に届かなければ選ばれない。
                葛飾区でWebマーケティングをしてきた私たちが、軽貨物事業を立ち上げた理由です。
              </p>
              <Link href="/company/story" className="link-arrow mt-7">
                なぜ軽貨物事業を始めたのか
                <span aria-hidden="true">→</span>
              </Link>
            </div>
            <PhotoFrame
              photo={photos.cityStreet}
              ratio="aspect-[4/5]"
              rounded="rounded-[3px]"
              sizes="(min-width: 1024px) 38vw, 100vw"
            />
          </div>
        </div>
      </section>

      {/* 4. 働き方・特徴 */}
      <section className="section-pad bg-paper">
        <div className="container-site">
          <SectionHeading title="サイプレスで働くということ" />
          <dl className="mt-12 grid gap-x-14 gap-y-10 md:grid-cols-2">
            {features.map((f, i) => (
              <div key={f.title} className="border-t border-ink-900/15 pt-6">
                <p className="text-[11px] font-bold tracking-[0.18em] text-accent-text">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <dt className="mt-2 text-lg font-bold leading-snug tracking-tight text-ink-900">
                  {f.title}
                </dt>
                <dd className="mt-3 text-sm leading-[1.95] text-ink-500">
                  {f.body}
                </dd>
              </div>
            ))}
          </dl>
          <Link href="/recruit" className="link-arrow mt-10">
            ドライバー募集の詳細を見る
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* 実績数値（値が入っているときだけ表示） */}
      {availableStats.length > 0 && (
        <section className="border-y border-ink-900/10 bg-white">
          <div className="container-site py-14">
            <StatRow stats={availableStats} />
          </div>
        </section>
      )}

      {/* 5. エリア */}
      <section className="section-pad bg-white">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1fr] lg:gap-16">
            <div>
              <SectionHeading
                title="働くエリア"
                lead="葛飾区の拠点を中心に、通勤や直行が現実的な範囲から募集しています。"
              />
              <p className="mt-6 border-l-2 border-accent py-1 pl-5 text-sm leading-[1.95] text-ink-600">
                実際の勤務地は配送案件によって決まります。確定した勤務地は求人ごとに公開しています。
              </p>
              <Link href="/recruit/area" className="link-arrow mt-7">
                エリアの考え方を見る
                <span aria-hidden="true">→</span>
              </Link>
            </div>
            <AreaMap />
          </div>
        </div>
      </section>

      {/* 6. 軽貨物の仕事 */}
      <section className="bg-ink-900">
        <div className="container-site py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
            <PhotoFrame
              photo={photos.cargoStacked}
              ratio="aspect-[16/9]"
              rounded="rounded-[3px]"
              sizes="(min-width: 1024px) 48vw, 100vw"
            />
            <div>
              <SectionHeading title="軽貨物ドライバーの仕事" light />
              <p className="mt-6 text-[15px] leading-[1.95] text-slate-300">
                軽バンで、集荷拠点から届け先まで荷物を運ぶ仕事です。扱うのは宅配便の荷物や企業間の書類・部品など、比較的小型のもの。体力より、安全運転を続けられることと、時間の段取りを組めることが求められます。
              </p>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                <Link href="/recruit/about-driver" className="link-arrow-light">
                  仕事内容を詳しく見る
                  <span aria-hidden="true">→</span>
                </Link>
                <Link href="/column" className="link-arrow-light">
                  軽貨物の基礎知識
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. 最新記事 */}
      <section className="section-pad bg-paper">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading title="軽貨物の基礎知識" />
            <Link href="/column" className="link-arrow shrink-0">
              記事をすべて見る
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {latestArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. 会社情報 */}
      <section className="border-t border-ink-900/10 bg-white">
        <div className="container-site py-14 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.6fr_1fr] lg:gap-16">
            <SectionHeading title="会社情報" />
            <div>
              <DefinitionList
                items={[
                  { term: "会社名", description: company.name },
                  ...(company.representative
                    ? [{ term: "代表者", description: company.representative }]
                    : []),
                  ...(company.divisionEstablished
                    ? [
                        {
                          term: "軽貨物事業部 開設",
                          description: company.divisionEstablished,
                        },
                      ]
                    : []),
                  {
                    term: "所在地",
                    description: company.address.postalCode
                      ? `〒${company.address.postalCode} ${company.address.full}`
                      : company.address.full,
                  },
                  { term: "事業内容", description: company.businessSummary },
                ]}
              />
              <Link href="/company" className="link-arrow mt-7">
                会社概要を見る
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. 応募 */}
      <CtaSection
        title="まずは話を聞くところから"
        description={`ご希望のエリアと稼働イメージを伺います。「自分にできる仕事か知りたい」という段階でも構いません。お電話は${company.phoneHours}に受け付けています。`}
      />
    </>
  );
}

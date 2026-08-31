import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { organizationJsonLd, webSiteJsonLd } from "@/lib/jsonld";
import { JsonLd } from "@/components/ui/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoFrame } from "@/components/ui/Photo";
import {
  SplitSection,
  NumberedList,
  DefinitionList,
  StatRow,
} from "@/components/ui/Layouts";
import { JobCard } from "@/components/ui/JobCard";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { CtaSection } from "@/components/ui/CtaSection";
import { getOpenJobs } from "@/lib/jobs";
import { getLatestArticles } from "@/lib/articles";
import { areas, prefectures, areasByPrefecture } from "@/data/areas";
import { company, availableStats, serviceAreaLabel } from "@/data/site";
import { photos } from "@/data/images";
import { recruitCopy, recruitPhase } from "@/data/recruit-status";
import { confirmedConditions } from "@/data/recruit-conditions";

export const metadata: Metadata = buildMetadata({
  title: `軽貨物ドライバー求人・軽貨物配送｜${company.name} 軽貨物事業部｜東京都葛飾区`,
  description:
    "東京都葛飾区の軽貨物運送会社、株式会社サイプレス軽貨物事業部。業務委託・日額20,000円保証・ロイヤリティなし、未経験可・AT限定可・車両リース手配可。東京・千葉・埼玉で軽貨物ドライバーを募集しています。",
  path: "/",
});

/**
 * 情報開示の方針。
 * 「未経験歓迎」「研修あり」のような未確定の労働条件ではなく、
 * このサイトが実際に守っている運用ルールを書いている（＝すべて事実）。
 */
const editorialPolicy = [
  {
    title: "確定していない条件は載せない",
    body: "報酬・稼働日数・車両の扱いなど、決まっていない条件を先に掲載することはしません。求人票と実際の契約が食い違う状態を、最初からつくらないためです。",
  },
  {
    title: "勤務地は案件が決まってから出す",
    body: "応募を集めるために、実際には配送しない地域を勤務地として並べることはしません。勤務地は案件が確定したものだけを求人ごとに公開します。",
  },
  {
    title: "業界の一般論と当社の条件を分ける",
    body: "コラムなどで扱う軽貨物業界の一般的な話と、当社の募集条件は、読んだときに混ざらないよう書き分けています。",
  },
  {
    title: "条件は書面で確認できる状態にする",
    body: "ご相談の段階でお伝えする内容と、公開している情報を一致させます。口頭だけで条件をお約束することはしません。",
  },
];

const jobBasics = [
  {
    title: "運ぶもの",
    body: "宅配便の荷物や企業間の書類・部品など、比較的小型の荷物が中心です。大型トラックのような重量物の積み下ろしは基本的にありません。",
  },
  {
    title: "使う車",
    body: "軽バン（軽貨物自動車）を使います。普通自動車免許で運転でき、中型・大型免許は必要ありません。",
  },
  {
    title: "1日の流れ",
    body: "拠点で荷物を積み込み、担当エリアを回って届け、完了を報告する。この繰り返しが基本です。案件のタイプによって時間帯と物量が変わります。",
  },
  {
    title: "求められること",
    body: "体力よりも、安全運転を続けられること、時間の段取りを組めること、届け先へ丁寧に対応できることです。",
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

      {/* 2. 軽貨物事業部について */}
      <section className="section-pad bg-white">
        <div className="container-site">
          <SplitSection photo={photos.logisticsCenter} ratio="aspect-[3/2]">
            <SectionHeading title="Webマーケティング会社が、軽貨物事業を始めた理由" />
            <div className="mt-6 space-y-4 prose-body">
              <p>
                {company.name}
                は、Webサイト制作やSEO・MEOを通じて、葛飾区で地域の企業や店舗の集客・採用を支援してきた会社です。その仕事のなかで、業種を問わず見えてくる課題がありました。
              </p>
              <p>
                「良いサービスがあっても、必要としている人に届かなければ選ばれない」ということです。これは物流業界も同じだと考えています。仕事を必要とする荷主企業がいる一方で、条件や仕事内容の情報が十分に届いていないドライバーがいます。
              </p>
              <p>
                Webマーケティングで培ってきた「人とサービスをつなぐ力」を、今度は物流でも生かしたい。それが、私たちが{serviceAreaLabel}
                エリアで軽貨物事業を立ち上げた理由です。
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              <Link href="/company#story" className="link-arrow">
                事業を始めた理由を詳しく読む
              </Link>
              <Link href="/service" className="link-arrow">
                軽貨物事業について
              </Link>
            </div>
          </SplitSection>
        </div>
      </section>

      {/* 3. 現在の採用状況 */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="container-site py-14 md:py-20">
          <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:gap-16">
            <div className="lg:w-64">
              <SectionHeading title={recruitCopy.statusHeading} />
              <p className="mt-5 inline-flex items-center gap-2 border border-brand-600 px-3.5 py-1.5 text-xs font-bold text-brand-700">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-brand-600"
                />
                {recruitCopy.badge}
              </p>
            </div>
            <div>
              <div className="space-y-4 prose-body">
                {recruitCopy.statusBody.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>

              {recruitPhase === "open" && openJobs.length > 0 && (
                <div className="mt-8 grid gap-5 md:grid-cols-2">
                  {openJobs.slice(0, 2).map((job) => (
                    <JobCard key={job.slug} job={job} />
                  ))}
                </div>
              )}

              {/* 確定している条件だけを出す。未確定の項目は表示されない */}
              <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-t border-slate-200 pt-6">
                {confirmedConditions.map((c) => (
                  <div key={c.label}>
                    <dt className="text-xs font-bold text-ink-muted">
                      {c.label}
                    </dt>
                    <dd className="mt-1 text-[15px] font-bold text-navy-900">
                      {c.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={recruitCopy.secondaryCta.href} className="btn-primary">
                  {recruitCopy.secondaryCta.label}
                </Link>
                <Link href={recruitCopy.primaryCta.href} className="btn-outline">
                  {recruitCopy.primaryCta.label}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 軽貨物という仕事 */}
      <section className="section-pad bg-white">
        <div className="container-site">
          <SectionHeading
            title="軽貨物ドライバーという仕事"
            lead="「配送の仕事」と聞いて思い浮かべるものと、実際の軽貨物の仕事は少し違います。応募を考える前に、まず仕事そのものを知ってください。"
          />
          <div className="mt-10">
            <NumberedList items={jobBasics} />
          </div>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            <Link href="/recruit/about-driver" className="link-arrow">
              仕事内容と案件の種類を詳しく見る
            </Link>
            <Link href="/column" className="link-arrow">
              軽貨物の基礎知識を読む
            </Link>
          </div>
        </div>
      </section>

      {/* 5. サイプレスが大切にすること */}
      <section className="bg-navy-950">
        <div className="container-site py-16 md:py-24">
          <SectionHeading
            title="情報の出し方について、決めていること"
            lead="軽貨物の求人には、条件が曖昧なまま人を集めてしまう例が少なくありません。私たちは、そうならないための運用ルールを決めています。"
            light
          />
          <div className="mt-12">
            <NumberedList items={editorialPolicy} light />
          </div>
        </div>
      </section>

      {/* 6. 働くエリア */}
      <section className="section-pad bg-white">
        <div className="container-site">
          <SectionHeading
            title="働くエリア"
            lead="葛飾区の拠点を中心に、通勤や直行が現実的な範囲からドライバーを探しています。実際の勤務地は配送案件によって決まるため、確定したものを求人ごとに公開します。"
          />
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-16">
            <dl className="border-t border-slate-200">
              {prefectures.map((pref) => (
                <div
                  key={pref}
                  className="flex flex-col gap-2 border-b border-slate-200 py-5 sm:flex-row sm:gap-8"
                >
                  <dt className="shrink-0 text-sm font-bold text-navy-900 sm:w-20">
                    {pref}
                  </dt>
                  <dd className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-ink-muted">
                    {areasByPrefecture(pref).map((a) => (
                      <span
                        key={a.slug}
                        className={
                          a.priority === "primary"
                            ? "font-bold text-navy-900"
                            : ""
                        }
                      >
                        {a.name}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
            <div>
              <PhotoFrame
                photo={photos.residentialArea}
                ratio="aspect-[3/2]"
                rounded="rounded-sm"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <p className="mt-4 text-[13px] leading-relaxed text-slate-500">
                太字は重点エリア（{areas
                  .filter((a) => a.priority === "primary")
                  .map((a) => a.name)
                  .join("・")}）。
                一覧にない地域にお住まいの方も、稼働できる範囲であればご相談いただけます。
              </p>
              <Link href="/recruit/area" className="link-arrow mt-4">
                エリアの考え方を詳しく見る
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 実績数値（値が入っているときだけ表示） */}
      {availableStats.length > 0 && (
        <section className="border-y border-slate-200 bg-slate-50">
          <div className="container-site py-14">
            <StatRow stats={availableStats} />
          </div>
        </section>
      )}

      {/* 7. 仕事・車両の様子 */}
      <section className="section-pad bg-slate-50">
        <div className="container-site">
          <SectionHeading title="仕事と車両" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* 直下のコラムカード（cargoLoaded / driverSeat / cityStreet）と
                重複しない写真を選んでいる */}
            {[
              photos.warehouse,
              photos.depotEvening,
              photos.fleet,
              photos.officeDistrict,
            ].map((photo) => (
              <figure key={photo.src}>
                <PhotoFrame
                  photo={photo}
                  ratio="aspect-[4/3]"
                  rounded="rounded-sm"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                />
                <figcaption className="mt-2.5 text-[13px] text-ink-muted">
                  {photo.alt}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-8 text-[13px] leading-relaxed text-slate-500">
            掲載中の写真はイメージです。実際に使用する車両と配送現場の写真は、事業開始にあわせて順次差し替えます。
          </p>
        </div>
      </section>

      {/* 8. コラム */}
      <section className="section-pad bg-white">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              title="軽貨物の仕事を知るための記事"
              lead="免許・車両・契約・お金まわりなど、応募を考えるときに引っかかる点をまとめています。"
            />
            <Link href="/column" className="link-arrow shrink-0">
              記事をすべて見る
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {latestArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* 9. 会社情報 */}
      <section className="border-t border-slate-200 bg-white">
        <div className="container-site py-14 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <SectionHeading title="会社情報" />
            <div>
              <DefinitionList
                items={[
                  { term: "会社名", description: company.name },
                  { term: "事業部", description: "軽貨物事業部" },
                  ...(company.representative
                    ? [{ term: "代表者", description: company.representative }]
                    : []),
                  ...(company.divisionEstablished
                    ? [
                        {
                          term: "事業部開設",
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
                  {
                    term: "電話番号",
                    description: (
                      <a
                        href={`tel:${company.phoneTel}`}
                        className="text-brand-600 underline-offset-4 hover:underline"
                      >
                        {company.phone}
                      </a>
                    ),
                  },
                  { term: "事業内容", description: company.businessSummary },
                ]}
              />
              <Link href="/company" className="link-arrow mt-6">
                会社概要を見る
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 10. 問い合わせ */}
      <CtaSection
        title="軽貨物の働き方について、話を聞いてみませんか"
        description="「自分にできる仕事か知りたい」という段階でも構いません。稼働できる曜日や希望エリアを伺い、条件が固まった段階でご案内します。"
      />
    </>
  );
}

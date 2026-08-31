import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { organizationJsonLd } from "@/lib/jsonld";
import { JsonLd } from "@/components/ui/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { JobCard } from "@/components/ui/JobCard";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { CtaSection } from "@/components/ui/CtaSection";
import { PhotoFrame } from "@/components/ui/Photo";
import { photos } from "@/data/images";
import { getOpenJobs } from "@/lib/jobs";
import { getLatestArticles } from "@/lib/articles";
import { recruitFaq } from "@/data/faq";
import { areas } from "@/data/areas";
import { company } from "@/data/site";

export const metadata: Metadata = buildMetadata({
  title: `軽貨物ドライバー求人・配送なら${company.name}｜東京都葛飾区`,
  description:
    "東京都葛飾区の軽貨物運送会社。東京東部・千葉北西部・埼玉東部で軽貨物ドライバーを募集中。未経験歓迎、条件は書面で明示します。まずはお気軽にご相談ください。",
  path: "/",
});

const promises = [
  {
    title: "条件はすべて書面で明示",
    body: "報酬・費用負担・契約内容は、面談時にすべて書面でご説明します。求人ページに書いていない条件を口頭だけでお約束することはありません。",
  },
  {
    title: "未経験からのスタート歓迎",
    body: "軽貨物ドライバーは普通自動車免許があれば始められる仕事です。応募前の疑問には、お役立ちコラムと面談で丁寧にお答えします。",
  },
  {
    title: "地域に根ざした配送網へ",
    body: "葛飾区を拠点に、東京東部・千葉北西部・埼玉東部で事業を展開。地域の物流を支える会社として、ドライバーと一緒に成長していきます。",
  },
];

export default function HomePage() {
  const openJobs = getOpenJobs();
  const latestArticles = getLatestArticles(3);
  const topFaq = recruitFaq.slice(0, 4);

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <Hero />

      {/* サイプレスの約束 */}
      <section className="section-pad bg-white">
        <div className="container-site">
          <SectionHeading
            label="Our Promise"
            title="サイプレス軽貨物事業部の約束"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {promises.map((p, i) => (
              <Reveal key={p.title} delay={i * 100}>
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                  <span className="label-en">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 text-lg font-bold text-navy-900">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 募集中の求人 */}
      <section className="section-pad bg-slate-50">
        <div className="container-site">
          <SectionHeading label="Jobs" title="募集中の求人" />
          {openJobs.length > 0 ? (
            <>
              <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {openJobs.slice(0, 3).map((job) => (
                  <Reveal key={job.slug}>
                    <JobCard job={job} />
                  </Reveal>
                ))}
              </div>
              <div className="mt-10 text-center">
                <Link href="/recruit/jobs" className="btn-secondary">
                  求人一覧をすべて見る
                </Link>
              </div>
            </>
          ) : (
            <Reveal>
              <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 text-center md:p-12">
                <p className="text-base font-bold text-navy-900">
                  現在、次回の求人公開を準備中です。
                </p>
                <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-600">
                  募集開始前でも「働き方の相談」「条件の質問」は受け付けています。
                  ご希望のエリア・働き方をお聞かせいただければ、募集開始時に優先的にご案内します。
                </p>
                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                  <Link href="/contact" className="btn-primary">
                    募集開始の連絡を受け取る
                  </Link>
                  <Link href="/recruit" className="btn-secondary">
                    採用情報を見る
                  </Link>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* 採用エリア */}
      <section className="section-pad bg-white">
        <div className="container-site grid items-start gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHeading label="Area" title="採用エリア" />
            <p className="mt-5 text-sm leading-relaxed text-slate-600">
              葛飾区の拠点を中心に、通勤・直行が現実的なエリアから広くドライバーを募集しています。
              勤務地は求人ごとに異なりますので、現在の求人情報をご確認ください。
            </p>
            <Link
              href="/recruit/area"
              className="mt-6 inline-block text-sm font-bold text-brand-600 underline-offset-4 hover:underline"
            >
              採用エリアの詳細を見る →
            </Link>
          </div>
          <Reveal>
            <PhotoFrame
              photo={photos.street}
              ratio="aspect-[16/9]"
              sizes="(min-width: 1024px) 640px, 100vw"
              className="mb-6"
            />
            <div className="grid gap-4 sm:grid-cols-3">
              {(["東京都", "千葉県", "埼玉県"] as const).map((pref) => (
                <div
                  key={pref}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                >
                  <p className="text-sm font-bold text-brand-600">{pref}</p>
                  <ul className="mt-3 space-y-1.5 text-sm text-navy-900">
                    {areas
                      .filter((a) => a.prefecture === pref)
                      .map((a) => (
                        <li key={a.slug} className="flex items-center gap-2">
                          <span
                            aria-hidden="true"
                            className="h-1.5 w-1.5 rounded-full bg-brand-400"
                          />
                          {a.name}
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 仕事を知る（内部リンクハブ） */}
      <section className="section-pad bg-navy-950">
        <div className="container-site">
          <SectionHeading
            label="About the Job"
            title="軽貨物ドライバーの仕事を知る"
            light
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                href: "/recruit/about-driver",
                title: "軽貨物ドライバーの仕事",
                body: "仕事内容・案件の種類・1日の流れを解説",
                photo: photos.driving,
              },
              {
                href: "/recruit/benefits",
                title: "働くメリット",
                body: "軽貨物という働き方の魅力と現実",
                photo: photos.walking,
              },
              {
                href: "/recruit/flow",
                title: "仕事開始までの流れ",
                body: "応募から稼働開始までのステップ",
                photo: photos.training,
              },
            ].map((item, i) => (
              <Reveal key={item.href} delay={i * 100}>
                <Link
                  href={item.href}
                  className="group block h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-brand-400/60 hover:bg-white/10"
                >
                  <PhotoFrame
                    photo={item.photo}
                    ratio="aspect-[16/10]"
                    rounded=""
                    sizes="(min-width: 768px) 33vw, 100vw"
                    imageClassName="transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="p-7">
                    <h3 className="text-lg font-bold text-white transition group-hover:text-brand-300">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-slate-300">{item.body}</p>
                    <p className="mt-5 text-sm font-bold text-brand-300">
                      詳しく見る <span aria-hidden="true">→</span>
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ ティザー */}
      <section className="section-pad bg-white">
        <div className="container-site max-w-4xl">
          <SectionHeading label="FAQ" title="よくある質問" align="center" />
          <div className="mt-10 space-y-3">
            {topFaq.map((item) => (
              <details
                key={item.q}
                className="group rounded-xl border border-slate-200 bg-white"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-4 text-sm font-bold text-navy-900 marker:content-none [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span
                    aria-hidden="true"
                    className="text-brand-600 transition group-open:rotate-45"
                  >
                    ＋
                  </span>
                </summary>
                <p className="px-6 pb-5 text-sm leading-relaxed text-slate-600">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/recruit/faq"
              className="text-sm font-bold text-brand-600 underline-offset-4 hover:underline"
            >
              すべての質問を見る →
            </Link>
          </div>
        </div>
      </section>

      {/* コラム */}
      <section className="section-pad bg-slate-50">
        <div className="container-site">
          <SectionHeading label="Column" title="軽貨物お役立ち情報" />
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600">
            「未経験でもできる？」「必要な免許は？」「業務委託って何？」——
            応募前に知っておきたい疑問に、現場の視点でお答えします。
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {latestArticles.map((article) => (
              <Reveal key={article.slug}>
                <ArticleCard article={article} />
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/column" className="btn-secondary">
              コラム一覧を見る
            </Link>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}

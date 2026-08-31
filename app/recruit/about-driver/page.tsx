import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaSection } from "@/components/ui/CtaSection";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { getArticle } from "@/lib/articles";

export const metadata: Metadata = buildMetadata({
  title: "軽貨物ドライバーの仕事内容",
  description:
    "軽貨物ドライバーの仕事内容を解説。宅配・企業配・ルート配送・スポット便の違い、1日の流れ、必要な免許、向いている人まで、応募前に知りたい情報をまとめました。",
  path: "/recruit/about-driver",
});

const jobTypes = [
  {
    name: "宅配（ラストワンマイル）",
    body: "EC商品などを個人宅へお届けする仕事。物量が多く、配達効率がそのまま結果に反映されます。",
  },
  {
    name: "企業配",
    body: "企業から企業へ、書類・部品・商品を届ける仕事。届け先が固定的で、ルートを覚えれば安定して回れます。",
  },
  {
    name: "ルート配送",
    body: "決まった順路で店舗・拠点を回る定期配送。スケジュールが読みやすく、生活リズムを整えやすい働き方です。",
  },
  {
    name: "スポット便・チャーター便",
    body: "急ぎの荷物を単発で直送する仕事。緊急性が高いぶん、1件あたりの単価は高めになる傾向があります。",
  },
];

export default function AboutDriverPage() {
  const related = [
    getArticle("what-is-keikamotsu-driver"),
    getArticle("daily-schedule"),
    getArticle("license-for-keikamotsu"),
  ].filter((a) => a !== undefined);

  return (
    <>
      <PageHero
        label="About the Job"
        title="軽貨物ドライバーの仕事"
        description="軽バンで荷物を届けるシンプルな仕事。しかし案件のタイプによって、働き方は大きく変わります。"
      />
      <Breadcrumbs
        items={[
          { name: "ホーム", path: "/" },
          { name: "ドライバー採用", path: "/recruit" },
          { name: "軽貨物ドライバーの仕事" },
        ]}
      />

      <section className="section-pad bg-white">
        <div className="container-site max-w-4xl">
          <SectionHeading label="Overview" title="どんな仕事？" />
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-700 md:text-[15px]">
            <p>
              軽貨物ドライバーは、軽バン（軽貨物自動車）を使って荷物を集荷拠点から届け先までお届けする仕事です。
              基本のサイクルは「積み込み → 配送 → 完了報告」。普通自動車免許があれば従事でき、
              中型・大型免許は必要ありません。
            </p>
            <p>
              荷物は宅配便の荷物や企業間の書類・部品など、比較的小型のものが中心です。
              体力よりも、安全運転の継続・時間管理・丁寧な対応が求められる仕事です。
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-slate-50">
        <div className="container-site">
          <SectionHeading label="Job Types" title="案件タイプで働き方が変わる" />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {jobTypes.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-slate-200 bg-white p-7"
              >
                <h2 className="text-base font-bold text-navy-900">{t.name}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{t.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm leading-relaxed text-slate-600">
            どのタイプの案件を担当するかは求人ごとに異なります。
            <Link href="/recruit/jobs" className="mx-1 font-bold text-brand-600 underline-offset-4 hover:underline">
              募集中の求人一覧
            </Link>
            で各求人の仕事内容をご確認ください。
          </p>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-site">
          <SectionHeading label="Read More" title="仕事をもっと詳しく知る" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {related.map((article) => (
              <ArticleCard key={article.slug} article={article} />
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

import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SplitSection, DefinitionList } from "@/components/ui/Layouts";
import { CtaSection } from "@/components/ui/CtaSection";
import { availableServices } from "@/data/services";
import { company, serviceAreaLabel } from "@/data/site";
import { areas } from "@/data/areas";
import { photos } from "@/data/images";

export const metadata: Metadata = buildMetadata({
  title: "軽貨物事業について｜東京東部の軽貨物配送",
  description:
    "株式会社サイプレス軽貨物事業部の事業内容です。東京都葛飾区を拠点に、東京東部・千葉北西部・埼玉東部エリアで軽貨物配送の体制を構築しています。配送のご相談も受け付けています。",
  path: "/service",
});

export default function ServicePage() {
  return (
    <>
      <PageHero
        title="軽貨物事業について"
        description={`東京都葛飾区を拠点に、${serviceAreaLabel}エリアで軽貨物配送の体制を構築しています。`}
        photo={photos.fleet}
      />
      <Breadcrumbs
        items={[{ name: "ホーム", path: "/" }, { name: "軽貨物事業について" }]}
      />

      <section className="section-pad bg-white">
        <div className="container-site">
          <SplitSection photo={photos.logisticsCenter} ratio="aspect-[16/9]">
            <SectionHeading title="軽貨物の機動力で、地域の物流を担う" />
            <div className="mt-6 space-y-4 prose-body">
              <p>
                軽貨物車両は、大型トラックが入りにくい住宅街や狭い道路にも入っていける機動力が強みです。EC物流の拡大で個人宅への配送量が増え続けるなか、その担い手が求められています。
              </p>
              <p>
                {company.name}
                の軽貨物事業部は、この分野で地域に根ざした配送ネットワークを構築するために立ち上げました。現在は{serviceAreaLabel}
                エリアを対象に、配送体制とドライバーのチームをつくっている段階です。
              </p>
            </div>
          </SplitSection>
        </div>
      </section>

      <section className="section-pad bg-slate-50">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
            <SectionHeading title="事業の概要" />
            <DefinitionList
              items={[
                { term: "事業内容", description: company.businessSummary },
                { term: "使用車両", description: "軽貨物自動車（軽バン）" },
                {
                  term: "対応エリア",
                  description: `${serviceAreaLabel}エリア（${areas
                    .filter((a) => a.priority === "primary")
                    .map((a) => a.name)
                    .join("・")}ほか）`,
                },
                { term: "拠点", description: company.address.full },
                {
                  term: "提供サービス",
                  description:
                    availableServices.length > 0
                      ? availableServices.map((s) => s.name).join("・")
                      : "配送体制の構築にあわせて確定次第、このページでご案内します。",
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* 提供が確定したサービスのみ表示される */}
      {availableServices.length > 0 && (
        <section className="section-pad bg-white">
          <div className="container-site">
            <SectionHeading title="対応できる配送" />
            <dl className="mt-10 border-t border-slate-200">
              {availableServices.map((s) => (
                <div
                  key={s.slug}
                  className="grid gap-2 border-b border-slate-200 py-6 md:grid-cols-[1fr_2fr] md:gap-10"
                >
                  <dt className="text-[15px] font-bold text-navy-900">
                    {s.name}
                  </dt>
                  <dd className="text-sm leading-[1.95] text-ink-muted">
                    {s.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      <section className="section-pad bg-white">
        <div className="container-site max-w-3xl">
          <SectionHeading
            title="配送をご検討中の企業さまへ"
            lead="配送内容・エリア・頻度を伺ったうえで、現在の体制で対応できるかを正直にお答えします。"
          />
          <div className="mt-8 space-y-4 prose-body">
            <p>
              立ち上げ期のため、お引き受けできる範囲には限りがあります。対応できない内容を「できます」と言うことはしません。そのぶん、お受けした案件には丁寧に向き合います。
            </p>
            <p>
              お問い合わせフォームのご質問欄に、配送内容・エリア・頻度をご記入いただければ、担当者よりご連絡します。
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="btn-primary">
              配送について相談する
            </Link>
            <Link href="/company" className="btn-outline">
              会社概要を見る
            </Link>
          </div>
        </div>
      </section>

      <CtaSection
        title="配送を担うドライバーを探しています"
        description="事業を広げるには、走ってくれるドライバーが必要です。軽貨物の働き方に興味のある方はご相談ください。"
      />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { organizationJsonLd } from "@/lib/jsonld";
import { JsonLd } from "@/components/ui/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoFrame } from "@/components/ui/Photo";
import { DefinitionList, StatRow, SplitSection } from "@/components/ui/Layouts";
import { CtaSection } from "@/components/ui/CtaSection";
import { TrackedLink } from "@/components/ui/TrackedLink";
import {
  company,
  representativeMessage,
  foundingStory,
  availableStats,
  serviceAreaLabel,
} from "@/data/site";
import { photos } from "@/data/images";
import type { ReactNode } from "react";

export const metadata: Metadata = buildMetadata({
  title: "会社概要",
  description:
    "株式会社サイプレス軽貨物事業部の会社概要です。所在地は東京都葛飾区白鳥4-6-1-623号。東京東部・千葉北西部・埼玉東部エリアで軽貨物運送事業を展開しています。",
  path: "/company",
});

export default function CompanyPage() {
  /** 値が入っている項目だけを会社概要表に出す（未確定項目は行ごと非表示） */
  const rows: { term: string; description: ReactNode }[] = [
    { term: "会社名", description: company.name },
    { term: "事業部", description: "軽貨物事業部" },
    ...(company.representative
      ? [{ term: "代表者", description: company.representative }]
      : []),
    ...(company.founded
      ? [{ term: "設立", description: company.founded }]
      : []),
    ...(company.divisionEstablished
      ? [{ term: "軽貨物事業部 開設", description: company.divisionEstablished }]
      : []),
    ...(company.corporateNumber
      ? [{ term: "法人番号", description: company.corporateNumber }]
      : []),
    ...(company.capital ? [{ term: "資本金", description: company.capital }] : []),
    {
      term: "所在地",
      description: company.address.postalCode
        ? `〒${company.address.postalCode} ${company.address.full}`
        : company.address.full,
    },
    ...(company.divisionAddress
      ? [{ term: "軽貨物事業部 所在地", description: company.divisionAddress }]
      : []),
    {
      term: "電話番号",
      description: (
        <TrackedLink
          href={`tel:${company.phoneTel}`}
          event="click_phone"
          eventParams={{ location: "company" }}
          className="text-brand-600 underline-offset-4 hover:underline"
        >
          {company.phone}
        </TrackedLink>
      ),
    },
    ...(company.phoneHours
      ? [{ term: "電話受付時間", description: company.phoneHours }]
      : []),
    ...(company.businessHours
      ? [{ term: "営業時間", description: company.businessHours }]
      : []),
    ...(company.closedDays
      ? [{ term: "定休日", description: company.closedDays }]
      : []),
    { term: "事業内容", description: company.businessSummary },
    { term: "対応エリア", description: `${serviceAreaLabel}エリア` },
    ...(company.businessLicense
      ? [{ term: "許可・届出", description: company.businessLicense }]
      : []),
    {
      term: "Instagram",
      description: (
        <TrackedLink
          href={company.instagram}
          event="click_instagram"
          eventParams={{ location: "company" }}
          className="text-brand-600 underline-offset-4 hover:underline"
        >
          @cypress_transport
        </TrackedLink>
      ),
    },
    ...(company.corporateSiteUrl
      ? [
          {
            term: "コーポレートサイト",
            description: (
              <a
                href={company.corporateSiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 underline-offset-4 hover:underline"
              >
                {company.corporateSiteUrl}
              </a>
            ),
          },
        ]
      : []),
  ];

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <PageHero
        title="会社概要"
        description={`東京都葛飾区を拠点に、${serviceAreaLabel}エリアで軽貨物運送事業を展開しています。`}
        photo={photos.officeDistrict}
      />
      <Breadcrumbs
        items={[{ name: "ホーム", path: "/" }, { name: "会社概要" }]}
      />

      <section className="section-pad bg-white">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.8fr] lg:gap-16">
            <SectionHeading title="会社情報" />
            <DefinitionList items={rows} />
          </div>
        </div>
      </section>

      {/* 実績数値（値が入っているときだけ表示） */}
      {availableStats.length > 0 && (
        <section className="border-y border-slate-200 bg-slate-50">
          <div className="container-site py-14">
            <SectionHeading title="数字で見る軽貨物事業部" />
            <div className="mt-10">
              <StatRow stats={availableStats} />
            </div>
          </div>
        </section>
      )}

      {/* 事業立ち上げの背景（一次情報。他社が書けない内容なので大きく扱う） */}
      {foundingStory && (
        <section id="story" className="section-pad scroll-mt-20 bg-slate-50">
          <div className="container-site">
            <SplitSection photo={photos.waterfront} ratio="aspect-[3/2]">
              <SectionHeading title={foundingStory.heading} as="h2" />
              <div className="mt-6 space-y-4 prose-body">
                {foundingStory.lead.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </SplitSection>

            <div className="mt-14 grid gap-x-16 gap-y-12 md:grid-cols-2">
              {foundingStory.sections.map((s) => (
                <section key={s.heading}>
                  <h3 className="border-l-[3px] border-brand-600 pl-4 text-[17px] font-bold leading-snug text-navy-900">
                    {s.heading}
                  </h3>
                  <div className="mt-4 space-y-3.5 text-sm leading-[1.95] text-ink-muted">
                    {s.body.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 代表メッセージ（実際のメッセージがある場合のみ表示） */}
      {representativeMessage && (
        <section className="bg-navy-950">
          <div className="container-site py-16 md:py-24">
            <SectionHeading title="代表メッセージ" light />
            <div className="mt-10 max-w-3xl space-y-5 text-[15px] leading-[2] text-slate-300">
              {representativeMessage.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p className="mt-8 text-sm text-white">
              <span className="text-slate-400">
                {representativeMessage.role}
              </span>
              <span className="ml-3 text-base font-bold">
                {representativeMessage.name}
              </span>
            </p>
          </div>
        </section>
      )}

      <section className="section-pad bg-white">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading title="軽貨物事業について" />
              <div className="mt-6 space-y-4 prose-body">
                <p>
                  {company.name}
                  の軽貨物事業部は、EC物流の拡大とともに需要が高まっているラストワンマイル配送と、地域企業の物流ニーズに応えるために立ち上げた事業部です。
                </p>
                <p>
                  現在は{serviceAreaLabel}
                  エリアを対象に、配送体制とドライバーのチームを構築している段階にあります。提供できるサービスが確定した時点で、事業内容のページでご案内します。
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                <Link href="/service" className="link-arrow">
                  事業内容を見る
                </Link>
                <Link href="/recruit" className="link-arrow">
                  採用情報を見る
                </Link>
              </div>
            </div>
            <PhotoFrame
              photo={photos.fleet}
              ratio="aspect-[4/3]"
              rounded="rounded-sm"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </section>

      <CtaSection
        title="サイプレスで働くことに興味がある方へ"
        description="軽貨物事業部では、配送網を一緒につくるドライバーを探しています。まずは働き方のご相談からどうぞ。"
      />
    </>
  );
}

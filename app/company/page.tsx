import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { organizationJsonLd } from "@/lib/jsonld";
import { JsonLd } from "@/components/ui/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { CtaSection } from "@/components/ui/CtaSection";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { company } from "@/data/site";
import { PhotoFrame } from "@/components/ui/Photo";
import { photos } from "@/data/images";

export const metadata: Metadata = buildMetadata({
  title: "会社概要",
  description:
    "株式会社サイプレス軽貨物事業部の会社概要。所在地：東京都葛飾区白鳥4-6-1-623号。東京東部・千葉北西部・埼玉東部エリアで軽貨物運送事業を展開しています。",
  path: "/company",
});

export default function CompanyPage() {
  const rows: { label: string; value: React.ReactNode }[] = [
    { label: "会社名", value: company.name },
    { label: "事業部", value: "軽貨物事業部" },
    { label: "所在地", value: company.address.full },
    {
      label: "電話番号",
      value: (
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
    { label: "事業内容", value: company.businessSummary },
    ...(company.representative
      ? [{ label: "代表者", value: company.representative }]
      : []),
    ...(company.divisionEstablished
      ? [{ label: "事業開始", value: company.divisionEstablished }]
      : []),
    ...(company.businessLicense
      ? [{ label: "事業許可", value: company.businessLicense }]
      : []),
    {
      label: "Instagram",
      value: (
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
  ];

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <PageHero label="Company" title="会社概要" photo={photos.cityRoad} />
      <Breadcrumbs
        items={[
          { name: "ホーム", path: "/" },
          { name: "会社概要" },
        ]}
      />

      <section className="section-pad bg-white">
        <div className="container-site max-w-3xl">
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-slate-200">
                {rows.map((row) => (
                  <tr key={row.label} className="flex flex-col sm:table-row">
                    <th
                      scope="row"
                      className="w-full bg-slate-50 px-5 pt-4 text-left align-top font-bold text-navy-900 sm:w-40 sm:py-4"
                    >
                      {row.label}
                    </th>
                    <td className="px-5 pb-4 pt-2 leading-relaxed text-slate-700 sm:py-4">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <PhotoFrame
            photo={photos.fleet}
            ratio="aspect-[21/9]"
            sizes="(min-width: 768px) 768px, 100vw"
            className="mt-10"
          />

          <div className="mt-10 space-y-4 text-sm leading-relaxed text-slate-700">
            <h2 className="heading-2 text-xl md:text-2xl">私たちについて</h2>
            <p>
              {company.name}は、東京都葛飾区を拠点とする会社です。
              軽貨物事業部では、EC物流の拡大とともに需要が高まる軽貨物配送の分野で、
              地域に根ざした配送ネットワークを構築していきます。
            </p>
            <p>
              立ち上げ期の今、私たちが最も大切にしているのは、一緒に働くドライバーとの信頼関係です。
              条件の透明性と誠実なコミュニケーションを軸に、長く働ける環境を作っていきます。
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/recruit" className="btn-primary">
              採用情報を見る
            </Link>
            <Link href="/service" className="btn-secondary">
              事業内容を見る
            </Link>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}

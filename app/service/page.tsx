import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaSection } from "@/components/ui/CtaSection";
import { availableServices } from "@/data/services";
import { company, serviceAreaLabel } from "@/data/site";
import { PhotoFrame } from "@/components/ui/Photo";
import { photos } from "@/data/images";

export const metadata: Metadata = buildMetadata({
  title: "軽貨物事業について｜東京東部の配送パートナー",
  description:
    "株式会社サイプレス軽貨物事業部の事業紹介。東京都葛飾区を拠点に、東京東部・千葉北西部・埼玉東部エリアで軽貨物配送サービスを展開していきます。配送のご相談も受付中。",
  path: "/service",
});

export default function ServicePage() {
  return (
    <>
      <PageHero
        label="Service"
        title="軽貨物事業について"
        description="東京都葛飾区を拠点に、地域の物流を支える軽貨物配送サービスを展開していきます。"
        photo={photos.fleet}
      />
      <Breadcrumbs
        items={[
          { name: "ホーム", path: "/" },
          { name: "軽貨物事業について" },
        ]}
      />

      <section className="section-pad bg-white">
        <div className="container-site max-w-4xl">
          <SectionHeading label="Our Business" title="サイプレスの軽貨物事業" />
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-700 md:text-[15px]">
            <p>
              {company.name}の軽貨物事業部は、{serviceAreaLabel}
              エリアを対象とした軽貨物運送事業です。
              軽バンによる機動力の高い配送で、EC物流の拡大により需要が増え続けるラストワンマイル配送と、
              地域企業の物流ニーズに応えていきます。
            </p>
            <p>
              現在は事業立ち上げ段階として、配送体制の構築とドライバーチームづくりを進めています。
              提供サービスの詳細は、体制が確定し次第このページでご案内します。
            </p>
          </div>
          <PhotoFrame
            photo={photos.waterfront}
            ratio="aspect-[21/9]"
            sizes="(min-width: 768px) 896px, 100vw"
            className="mt-10"
          />
        </div>
      </section>

      {availableServices.length > 0 && (
        <section className="section-pad bg-slate-50">
          <div className="container-site">
            <SectionHeading label="Service Menu" title="提供サービス" />
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {availableServices.map((s) => (
                <div
                  key={s.slug}
                  className="rounded-2xl border border-slate-200 bg-white p-7"
                >
                  <h2 className="text-base font-bold text-navy-900">{s.name}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-pad bg-slate-50">
        <div className="container-site max-w-4xl">
          <SectionHeading label="For Business" title="配送をご検討中の企業さまへ" />
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-700 md:text-[15px]">
            <p>
              荷物の配送についてのご相談を受け付けています。
              配送内容・エリア・頻度をお伺いしたうえで、現在の体制で対応可能かどうかを正直にお答えします。
            </p>
            <p>
              立ち上げ期のため、お引き受けできる範囲には限りがありますが、
              その分ひとつひとつのお取引に丁寧に向き合います。
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="btn-primary">
              配送について相談する
            </Link>
            <Link href="/company" className="btn-secondary">
              会社概要を見る
            </Link>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-site max-w-4xl">
          <SectionHeading label="Team" title="事業を支えるドライバーを募集しています" />
          <p className="mt-6 text-sm leading-relaxed text-slate-700 md:text-[15px]">
            サイプレスの軽貨物事業は、一緒に働くドライバーの皆さんとともに作っていきます。
            軽貨物ドライバーとして働くことに興味のある方は、採用情報をご覧ください。
          </p>
          <Link href="/recruit" className="btn-secondary mt-7">
            ドライバー採用情報を見る
          </Link>
        </div>
      </section>

      <CtaSection />
    </>
  );
}

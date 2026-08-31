import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { PhotoFrame } from "@/components/ui/Photo";
import { CtaSection } from "@/components/ui/CtaSection";
import { foundingStory, company } from "@/data/site";
import { photos } from "@/data/images";

export const metadata: Metadata = buildMetadata({
  title: "なぜ葛飾区で軽貨物事業を始めたのか",
  description:
    "Webマーケティング会社である株式会社サイプレスが、東京都葛飾区で軽貨物事業を立ち上げた理由。拠点に葛飾区を選んだ背景と、これからつくろうとしている仕組みについてお話しします。",
  path: "/company/story",
});

/**
 * 事業立ち上げの背景を扱う専用ページ。
 *
 * 他社が書けない一次情報であり、検索・AI検索の双方で最も評価される種類の内容。
 * TOPで長文を読ませず、ここに集約している。
 *
 * foundingStory が null の場合はページ自体を出さない（架空の内容を作らないため）。
 */
export default function StoryPage() {
  if (!foundingStory) notFound();

  return (
    <>
      <PageHero
        title={foundingStory.heading}
        description={`${company.name}の軽貨物事業部が、どんな考えで立ち上がったのかをお話しします。`}
        photo={photos.officeDistrict}
      />
      <Breadcrumbs
        items={[
          { name: "ホーム", path: "/" },
          { name: "会社情報", path: "/company" },
          { name: "軽貨物事業を始めた理由" },
        ]}
      />

      <article className="bg-white">
        <div className="container-site py-14 md:py-20">
          {/* リード */}
          <div className="grid gap-10 lg:grid-cols-[1fr_0.75fr] lg:items-start lg:gap-16">
            <div className="space-y-5">
              {foundingStory.lead.map((p, i) => (
                <p
                  key={p}
                  className={
                    i === 0
                      ? "text-lg font-bold leading-[1.8] tracking-tight text-ink-900 md:text-xl"
                      : "text-[15px] leading-[2] text-ink-600"
                  }
                >
                  {p}
                </p>
              ))}
            </div>
            <PhotoFrame
              photo={photos.cityStreet}
              ratio="aspect-[4/5]"
              rounded="rounded-[3px]"
              sizes="(min-width: 1024px) 34vw, 100vw"
            />
          </div>

          {/* 本文 */}
          <div className="mt-16 max-w-3xl space-y-14">
            {foundingStory.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="border-l-[3px] border-accent pl-5 text-[1.35rem] font-bold leading-snug tracking-tight text-ink-900 md:text-[1.6rem]">
                  {s.heading}
                </h2>
                <div className="mt-5 space-y-4 pl-5 text-[15px] leading-[2] text-ink-600">
                  {s.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t border-ink-900/15 pt-8">
            <Link href="/company" className="link-arrow">
              会社概要を見る
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/recruit" className="link-arrow">
              ドライバー募集を見る
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </article>

      <CtaSection
        title="この考え方に共感いただけたら"
        description="条件を曖昧にせず、納得したうえで走ってくれる方と組みたいと考えています。まずは話を聞きに来てください。"
      />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/ui/JsonLd";
import { CtaSection } from "@/components/ui/CtaSection";
import { faqJsonLd } from "@/lib/jsonld";
import { recruitFaq, faqCategories } from "@/data/faq";
import { photos } from "@/data/images";

export const metadata: Metadata = buildMetadata({
  title: "軽貨物ドライバー募集に関するよくある質問",
  description:
    "募集状況・応募・免許・車両・契約形態について、よくいただく質問にお答えします。当社の状況についての回答と、軽貨物業界の一般的な話は分けて記載しています。",
  path: "/recruit/faq",
});

/**
 * FAQページ。
 *
 * FAQPage 構造化データは「質問と回答の一覧」であるこのページにのみ実装している。
 * 記事内の小さなQ&Aセクションには付けていない（ページの実態を正確に表さないため）。
 * 検索結果の見た目を操作する目的では使わない。
 */
export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(recruitFaq)} />
      <PageHero
        title="よくある質問"
        description="応募前によくいただく質問をまとめました。ここにない質問もお気軽にお問い合わせください。"
        photo={photos.officeDistrict}
      />
      <Breadcrumbs
        items={[
          { name: "ホーム", path: "/" },
          { name: "ドライバー採用", path: "/recruit" },
          { name: "よくある質問" },
        ]}
      />

      <section className="section-pad bg-white">
        <div className="container-site max-w-4xl">
          <div className="border-l-2 border-brand-600 bg-brand-50 py-4 pl-5 pr-6">
            <p className="text-sm leading-[1.95] text-navy-900">
              <strong className="font-bold">当社の状況</strong>
              についての回答と、
              <strong className="font-bold">軽貨物業界の一般的な話</strong>
              は分けて記載しています。一般論のほうは、他社の求人を検討する際にもお使いください。
            </p>
          </div>

          <div className="mt-14 space-y-14">
            {faqCategories.map((category) => {
              const items = recruitFaq.filter((f) => f.category === category);
              if (items.length === 0) return null;
              return (
                <div key={category}>
                  <SectionHeading title={category} as="h2" />
                  <dl className="mt-8 border-t border-slate-200">
                    {items.map((item) => (
                      <div
                        key={item.q}
                        className="border-b border-slate-200 py-6"
                      >
                        <dt className="flex flex-wrap items-center gap-3">
                          <span
                            className={`shrink-0 px-2 py-0.5 text-[11px] font-bold ${
                              item.scope === "company"
                                ? "bg-navy-900 text-white"
                                : "border border-slate-300 text-ink-muted"
                            }`}
                          >
                            {item.scope === "company" ? "当社について" : "一般的な話"}
                          </span>
                          <span className="text-[15px] font-bold leading-snug text-navy-900">
                            {item.q}
                          </span>
                        </dt>
                        <dd className="mt-3 text-sm leading-[1.95] text-ink-muted">
                          {item.a}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              );
            })}
          </div>

          <p className="mt-12 text-sm leading-[1.95] text-ink-muted">
            より詳しい解説は
            <Link href="/column" className="link-arrow mx-1">
              軽貨物の基礎知識
            </Link>
            にまとめています。募集状況は
            <Link href="/recruit/jobs" className="link-arrow mx-1">
              求人一覧
            </Link>
            でご確認ください。
          </p>
        </div>
      </section>

      <CtaSection
        title="ここにない質問も、お気軽にどうぞ"
        description="お答えできることは正直にお伝えします。まだ決まっていないことは「決まっていない」とお伝えします。"
      />
    </>
  );
}

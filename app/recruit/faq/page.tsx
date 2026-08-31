import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { CtaSection } from "@/components/ui/CtaSection";
import { faqJsonLd } from "@/lib/jsonld";
import { recruitFaq } from "@/data/faq";

export const metadata: Metadata = buildMetadata({
  title: "よくある質問｜軽貨物ドライバー採用",
  description:
    "軽貨物ドライバーの応募・免許・車両・報酬・働き方に関するよくある質問と回答。未経験の方、車をお持ちでない方の疑問にもお答えします。",
  path: "/recruit/faq",
});

const categoryOrder = [
  "応募について",
  "仕事について",
  "車両・免許について",
  "働き方について",
] as const;

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(recruitFaq)} />
      <PageHero
        label="FAQ"
        title="よくある質問"
        description="応募前の疑問にお答えします。ここにない質問は、お問い合わせフォームまたはお電話でお気軽にどうぞ。"
      />
      <Breadcrumbs
        items={[
          { name: "ホーム", path: "/" },
          { name: "ドライバー採用", path: "/recruit" },
          { name: "よくある質問" },
        ]}
      />

      <section className="section-pad bg-white">
        <div className="container-site max-w-4xl space-y-12">
          {categoryOrder.map((category) => {
            const items = recruitFaq.filter((f) => f.category === category);
            if (items.length === 0) return null;
            return (
              <div key={category}>
                <h2 className="heading-2 text-xl md:text-2xl">{category}</h2>
                <div className="mt-6 space-y-3">
                  {items.map((item) => (
                    <details
                      key={item.q}
                      className="group rounded-xl border border-slate-200"
                    >
                      <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-4 text-sm font-bold text-navy-900 marker:content-none [&::-webkit-details-marker]:hidden">
                        {item.q}
                        <span
                          aria-hidden="true"
                          className="shrink-0 text-brand-600 transition group-open:rotate-45"
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
              </div>
            );
          })}

          <div className="rounded-2xl bg-slate-50 p-6 text-center md:p-8">
            <p className="text-sm leading-relaxed text-slate-600">
              より詳しい解説は
              <Link href="/column" className="mx-1 font-bold text-brand-600 underline-offset-4 hover:underline">
                お役立ちコラム
              </Link>
              へ。募集中の求人は
              <Link href="/recruit/jobs" className="mx-1 font-bold text-brand-600 underline-offset-4 hover:underline">
                求人一覧
              </Link>
              からご確認ください。
            </p>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}

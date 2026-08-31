import type { Metadata } from "next";
import { Suspense } from "react";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { ApplyForm } from "@/components/forms/ApplyForm";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { company } from "@/data/site";

export const metadata: Metadata = buildMetadata({
  title: "お問い合わせ・応募フォーム",
  description:
    "株式会社サイプレス軽貨物事業部への応募・お問い合わせフォーム。軽貨物ドライバーへの応募、働き方の相談、配送のご依頼まで、お気軽にご連絡ください。",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact"
        title="お問い合わせ・応募"
        description="応募はもちろん、「話を聞いてみたい」「募集開始の連絡が欲しい」というご相談も歓迎です。1分程度で送信できます。"
      />
      <Breadcrumbs
        items={[
          { name: "ホーム", path: "/" },
          { name: "お問い合わせ・応募" },
        ]}
      />

      <section className="section-pad bg-slate-50">
        <div className="container-site grid max-w-5xl gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-10">
            <Suspense fallback={null}>
              <ApplyForm />
            </Suspense>
          </div>

          <aside className="space-y-5">
            <div className="rounded-2xl bg-navy-950 p-7">
              <h2 className="text-base font-bold text-white">
                お電話でのご連絡
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                お急ぎの方はお電話が確実です。
              </p>
              <TrackedLink
                href={`tel:${company.phoneTel}`}
                event="click_phone"
                eventParams={{ location: "contact_page" }}
                className="mt-4 block text-2xl font-black text-white underline-offset-4 hover:underline"
              >
                {company.phone}
              </TrackedLink>
              <p className="mt-2 text-xs text-slate-400">
                運転中・配送中は出られない場合があります。折り返しご連絡いたします。
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-7">
              <h2 className="text-base font-bold text-navy-900">
                Instagram DMでもOK
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                InstagramのDMからのご質問・ご相談も受け付けています。
              </p>
              <TrackedLink
                href={company.instagram}
                event="click_instagram"
                eventParams={{ location: "contact_page" }}
                className="mt-4 inline-block text-sm font-bold text-brand-600 underline-offset-4 hover:underline"
              >
                @cypress_transport →
              </TrackedLink>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-7 text-sm leading-relaxed text-slate-600">
              <h2 className="text-base font-bold text-navy-900">
                法人のお客様
              </h2>
              <p className="mt-3">
                配送のご依頼・ご相談も本フォームから受け付けています。
                ご質問欄に配送内容・エリア・頻度をご記入ください。
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

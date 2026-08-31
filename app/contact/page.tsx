import type { Metadata } from "next";
import { Suspense } from "react";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ApplyForm } from "@/components/forms/ApplyForm";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { company } from "@/data/site";
import { photos } from "@/data/images";
import { recruitPhase } from "@/data/recruit-status";

export const metadata: Metadata = buildMetadata({
  title: "ご相談・お問い合わせ",
  description:
    "株式会社サイプレス軽貨物事業部へのお問い合わせフォームです。軽貨物ドライバーへのご応募、働き方のご相談、配送のご依頼を受け付けています。お電話・InstagramのDMからもご連絡いただけます。",
  path: "/contact",
});

export default function ContactPage() {
  const isOpen = recruitPhase === "open";

  return (
    <>
      <PageHero
        title={isOpen ? "応募・お問い合わせ" : "ご相談・お問い合わせ"}
        description={
          isOpen
            ? "募集中の求人へのご応募、働き方のご相談を受け付けています。1分程度で送信できます。"
            : "働き方のご相談と、募集開始のご案内の登録を受け付けています。1分程度で送信できます。"
        }
        photo={photos.vanDriving}
      />
      <Breadcrumbs
        items={[
          { name: "ホーム", path: "/" },
          { name: isOpen ? "応募・お問い合わせ" : "ご相談・お問い合わせ" },
        ]}
      />

      <section className="section-pad bg-white">
        <div className="container-site grid max-w-5xl gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <div>
            {!isOpen && (
              <div className="mb-10 border-l-2 border-brand-600 bg-brand-50 py-4 pl-5 pr-6">
                <p className="text-sm leading-[1.95] text-navy-900">
                  現在は正式な求人の公開前です。いただいたご相談は、条件が確定した段階でのご案内に使わせていただきます。今すぐ稼働開始をお約束するものではありませんので、その点だけご了承ください。
                </p>
              </div>
            )}
            <Suspense fallback={null}>
              <ApplyForm />
            </Suspense>
          </div>

          <aside className="space-y-10">
            <div>
              <SectionHeading title="お電話でのご連絡" as="h2" />
              <TrackedLink
                href={`tel:${company.phoneTel}`}
                event="click_phone"
                eventParams={{ location: "contact_page" }}
                className="mt-5 block text-3xl font-black tracking-tight text-navy-900 underline-offset-4 hover:underline"
              >
                {company.phone}
              </TrackedLink>
              <p className="mt-3 text-[13px] leading-relaxed text-ink-muted">
                お急ぎの方はお電話が確実です。運転中・配送中は出られないことがあります。その際は折り返しご連絡します。
              </p>
              {company.phoneHours && (
                <p className="mt-2 text-[13px] text-ink-muted">
                  受付時間：{company.phoneHours}
                </p>
              )}
            </div>

            <div className="border-t border-slate-200 pt-8">
              <SectionHeading title="Instagramからでも" as="h2" />
              <p className="mt-5 text-[13px] leading-relaxed text-ink-muted">
                InstagramのDMからのご質問・ご相談も受け付けています。車両や仕事の様子も投稿していきます。
              </p>
              <TrackedLink
                href={company.instagram}
                event="click_instagram"
                eventParams={{ location: "contact_page" }}
                className="link-arrow mt-4"
                ariaLabel="Instagram（新しいタブで開きます）"
              >
                @cypress_transport
              </TrackedLink>
            </div>

            <div className="border-t border-slate-200 pt-8">
              <SectionHeading title="法人のお客様" as="h2" />
              <p className="mt-5 text-[13px] leading-relaxed text-ink-muted">
                配送のご依頼・ご相談も同じフォームから受け付けています。ご質問欄に配送内容・エリア・頻度をご記入ください。
              </p>
            </div>

            <div className="border-t border-slate-200 pt-8">
              <SectionHeading title="所在地" as="h2" />
              <address className="mt-5 text-[13px] not-italic leading-relaxed text-ink-muted">
                {company.name} 軽貨物事業部
                <br />
                {company.address.postalCode && `〒${company.address.postalCode} `}
                {company.address.full}
              </address>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

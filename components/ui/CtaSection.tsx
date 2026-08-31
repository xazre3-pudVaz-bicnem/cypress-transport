import { company } from "@/data/site";
import { recruitCopy } from "@/data/recruit-status";
import { TrackedLink } from "./TrackedLink";

/**
 * ページ下部の問い合わせ導線。
 *
 * ⚠️ title / description に既定値は置かない。
 * 全ページに同じ「まずは気軽に相談から始めませんか？」が並ぶと
 * テンプレートを使い回した印象になるため、
 * 各ページが自分の文脈に合う文言を必ず渡すこと。
 *
 * ボタンの行き先・ラベルは data/recruit-status.ts から供給されるため、
 * 求人公開の前後で自動的に適切な導線へ切り替わる。
 */
export function CtaSection({
  title,
  description,
  /** 電話番号を出すか（記事下など、軽い導線でよい場所では false） */
  showPhone = true,
}: {
  title: string;
  description: string;
  showPhone?: boolean;
}) {
  return (
    <section className="border-t border-navy-800 bg-navy-950">
      <div className="container-site py-14 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16">
          <div>
            <h2 className="text-xl font-bold leading-snug text-white md:text-2xl">
              {title}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-[1.95] text-slate-300">
              {description}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <TrackedLink
              href={recruitCopy.secondaryCta.href}
              event="click_apply"
              eventParams={{ location: "cta_section" }}
              className="btn-primary w-full"
            >
              {recruitCopy.secondaryCta.label}
            </TrackedLink>
            <TrackedLink
              href={recruitCopy.primaryCta.href}
              event="click_recruit_cta"
              eventParams={{ location: "cta_section" }}
              className="btn-outline-light w-full"
            >
              {recruitCopy.primaryCta.label}
            </TrackedLink>
            {showPhone && (
              <p className="mt-2 text-sm text-slate-400">
                お電話：
                <TrackedLink
                  href={`tel:${company.phoneTel}`}
                  event="click_phone"
                  eventParams={{ location: "cta_section" }}
                  className="ml-1 text-base font-bold text-white underline-offset-4 hover:underline"
                >
                  {company.phone}
                </TrackedLink>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

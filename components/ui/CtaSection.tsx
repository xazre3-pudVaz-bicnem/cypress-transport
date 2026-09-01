import { company } from "@/data/site";
import { recruitCopy } from "@/data/recruit-status";
import { TrackedLink } from "./TrackedLink";

/**
 * ページ下部の問い合わせ導線。
 *
 * ⚠️ title / description に既定値は置かない。
 * 全ページに同じ文言が並ぶとテンプレートを使い回した印象になるため、
 * 各ページが自分の文脈に合う文言を必ず渡すこと。
 *
 * ボタンの行き先・ラベルは data/recruit-status.ts が求人データから導出する。
 */
export function CtaSection({
  title,
  description,
  showPhone = true,
}: {
  title: string;
  description: string;
  showPhone?: boolean;
}) {
  return (
    <section className="bg-ink-900">
      <div className="container-site py-14 md:py-20">
        <div className="grid gap-9 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-16">
          <div>
            <span aria-hidden="true" className="block h-[3px] w-9 bg-accent" />
            <h2 className="mt-5 text-[1.5rem] font-bold leading-[1.35] tracking-tight text-white md:text-[2rem]">
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
              className="btn-accent w-full"
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
              /* 濃紺背景の上なので、明るい側のグレーを使う */
              <p className="mt-1 text-sm text-slate-400">
                お電話：
                <TrackedLink
                  href={`tel:${company.phoneTel}`}
                  event="click_phone"
                  eventParams={{ location: "cta_section" }}
                  className="ml-1 font-bold text-white underline-offset-4 hover:underline"
                >
                  {company.phone}
                </TrackedLink>
                <span className="ml-2 text-xs">
                  （{company.phoneHours}）
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

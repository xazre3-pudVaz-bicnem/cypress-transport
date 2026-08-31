import { company } from "@/data/site";
import { TrackedLink } from "./TrackedLink";

/**
 * ページ下部の共通応募CTAセクション。
 */
export function CtaSection({
  title = "まずは気軽に相談から始めませんか？",
  description = "「話を聞いてみたいだけ」でも歓迎です。仕事内容・条件など、どんなことでもお答えします。",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="bg-navy-950">
      <div className="container-site section-pad text-center">
        <p className="label-en text-brand-300">Contact</p>
        <h2 className="mt-3 text-2xl font-bold leading-snug text-white md:text-3xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-300">
          {description}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <TrackedLink
            href="/contact"
            event="click_apply"
            eventParams={{ location: "cta_section" }}
            className="btn-primary w-full sm:w-auto"
          >
            応募・相談する
          </TrackedLink>
          <TrackedLink
            href="/recruit/jobs"
            event="click_recruit_cta"
            eventParams={{ location: "cta_section" }}
            className="btn-ghost-light w-full sm:w-auto"
          >
            募集中の仕事を見る
          </TrackedLink>
        </div>
        <p className="mt-8 text-sm text-slate-400">
          お電話でのご相談：
          <TrackedLink
            href={`tel:${company.phoneTel}`}
            event="click_phone"
            eventParams={{ location: "cta_section" }}
            className="ml-1 text-lg font-bold text-white underline-offset-4 hover:underline"
          >
            {company.phone}
          </TrackedLink>
        </p>
      </div>
    </section>
  );
}

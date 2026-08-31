import { company, serviceAreaShort } from "@/data/site";
import { TrackedLink } from "@/components/ui/TrackedLink";

/**
 * TOPページのファーストビュー。
 * 3秒以内に「軽貨物会社 / ドライバー募集 / 対象エリア」が伝わることを最優先。
 *
 * 現在は実写真が未提供のためSVG+グラデーションで構成。
 * 実際の軽バン・配送風景の写真が用意でき次第、背景を差し替えること
 * （next/image + priority で実装する）。
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-950">
      {/* 背景装飾（配送ルートのモチーフ） */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 90% at 85% 10%, rgba(31,122,232,0.4), transparent 55%), radial-gradient(ellipse 60% 70% at 5% 95%, rgba(0,194,255,0.18), transparent 55%), linear-gradient(160deg, #081120 0%, #0d1b2a 60%, #13263c 100%)",
          }}
        />
        <svg
          className="absolute inset-0 h-full w-full opacity-25"
          viewBox="0 0 1200 700"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <path
            d="M-50 620 C 200 560, 320 400, 520 420 S 900 560, 1250 420"
            stroke="#4a9bf5"
            strokeWidth="2"
            strokeDasharray="2 10"
          />
          <path
            d="M-50 480 C 250 460, 400 260, 640 300 S 1000 420, 1250 260"
            stroke="#00c2ff"
            strokeWidth="1.5"
            strokeDasharray="2 12"
          />
          <circle cx="520" cy="420" r="6" fill="#1f7ae8" />
          <circle cx="640" cy="300" r="6" fill="#00c2ff" />
          <circle cx="940" cy="520" r="5" fill="#4a9bf5" />
          <circle cx="220" cy="556" r="5" fill="#4a9bf5" />
        </svg>
      </div>

      <div className="container-site relative py-20 md:py-32">
        <p className="inline-flex items-center gap-2 rounded-full border border-brand-400/40 bg-brand-600/15 px-4 py-1.5 text-xs font-bold tracking-wider text-brand-300">
          軽貨物ドライバー積極募集中
        </p>
        <h1 className="mt-6 text-[2.1rem] font-black leading-[1.25] tracking-tight text-white md:text-6xl md:leading-[1.2]">
          {serviceAreaShort}で
          <br />
          軽貨物ドライバー
          <br className="md:hidden" />
          として働く。
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-slate-300 md:text-base">
          {company.name}は、葛飾区を拠点に東京東部・千葉北西部・埼玉東部エリアで軽貨物事業を展開する運送会社です。
          未経験からのスタートも歓迎。条件はすべて書面で明示します。
        </p>

        <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
          <TrackedLink
            href="/recruit/jobs"
            event="click_recruit_cta"
            eventParams={{ location: "hero" }}
            className="btn-primary"
          >
            募集中の仕事を見る
          </TrackedLink>
          <TrackedLink
            href="/contact"
            event="click_apply"
            eventParams={{ location: "hero" }}
            className="btn-ghost-light"
          >
            応募・相談する
          </TrackedLink>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-300">
          <TrackedLink
            href={`tel:${company.phoneTel}`}
            event="click_phone"
            eventParams={{ location: "hero" }}
            className="font-bold text-white underline-offset-4 hover:underline"
          >
            TEL {company.phone}
          </TrackedLink>
          <span className="text-xs text-slate-400">
            東京都葛飾区・三郷市・松戸市・江東区ほか周辺エリア対象
          </span>
        </div>
      </div>
    </section>
  );
}

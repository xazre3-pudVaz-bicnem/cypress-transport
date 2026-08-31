import Image from "next/image";
import Link from "next/link";
import { photos } from "@/data/images";
import { recruitCopy } from "@/data/recruit-status";
import { heroFigures } from "@/data/recruit-conditions";

/**
 * TOPページのファーストビュー。
 *
 * 設計:
 *  - 画面の大半を1枚の写真で見せる（小さな写真カードにしない）
 *  - h1 は検索意図が伝わる文言、その上に大きなデザインコピーを置く
 *  - 確定している条件を大きな数字で横一列に並べる
 *  - CTAは2つまで。電話番号の巨大表示はしない
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[86vh] flex-col justify-end overflow-hidden bg-ink-900 md:min-h-[92vh]">
      <div aria-hidden="true" className="absolute inset-0">
        <Image
          src={photos.heroVan.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[72%_center] md:object-[65%_center]"
        />
        {/* 文字の可読性を確保する濃紺のオーバーレイ。テキスト側を濃くする */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/72 to-ink-900/25 md:bg-gradient-to-r md:from-ink-900 md:via-ink-900/80 md:to-ink-900/20" />
      </div>

      <div className="container-site relative pb-10 pt-28 md:pb-14 md:pt-40">
        <p className="rise rise-1 flex items-center gap-3 text-[11px] font-bold tracking-[0.22em] text-accent">
          <span aria-hidden="true" className="h-px w-8 bg-accent" />
          KATSUSHIKA / LIGHT CARGO
        </p>

        {/* デザインコピー（見た目の主役） */}
        <p className="rise rise-1 mt-6 h-display text-white">
          軽貨物で、
          <br />
          次の働き方へ。
        </p>

        {/* h1 は検索意図が伝わる文言にする */}
        <h1 className="rise rise-2 mt-6 max-w-xl text-[15px] font-bold leading-[1.85] text-slate-200 md:text-lg">
          東京都葛飾区の軽貨物ドライバー求人
          <span className="mt-1 block text-sm font-normal text-slate-300 md:text-[15px]">
            株式会社サイプレスは、葛飾区を拠点に東京・千葉・埼玉で働く軽貨物ドライバーを募集しています。
          </span>
        </h1>

        <div className="rise rise-3 mt-9 flex flex-col gap-3 sm:flex-row">
          <Link href={recruitCopy.primaryCta.href} className="btn-accent">
            {recruitCopy.primaryCta.label}
          </Link>
          <Link href={recruitCopy.secondaryCta.href} className="btn-outline-light">
            {recruitCopy.secondaryCta.label}
          </Link>
        </div>
      </div>

      {/* 確定している条件を数字で見せる帯 */}
      <div className="relative border-t border-white/15 bg-ink-950/70 backdrop-blur-sm">
        <dl className="container-site grid grid-cols-2 divide-x divide-white/10 md:grid-cols-4">
          {heroFigures.map((f, i) => (
            <div
              key={f.label}
              className={`py-6 md:py-7 ${i % 2 === 0 ? "pr-4" : "pl-4"} md:px-6 md:first:pl-0`}
            >
              <dt className="stat-label text-accent">{f.label}</dt>
              <dd className="mt-2 flex items-baseline gap-1.5 text-white">
                <span className="stat-figure">{f.figure}</span>
                <span className="stat-unit text-slate-300">{f.unit}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

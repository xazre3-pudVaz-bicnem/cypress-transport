import { getImageProps } from "next/image";
import { company, serviceAreaShort } from "@/data/site";
import { photos } from "@/data/images";
import { TrackedLink } from "@/components/ui/TrackedLink";

/**
 * TOPページのファーストビュー。
 * 3秒以内に「軽貨物会社 / ドライバー募集 / 対象エリア」が伝わることを最優先。
 *
 * 写真はアートディレクション対応:
 *  - 768px以上 … 横長写真（人物が右、テキストが左に来る構図）
 *  - 768px未満 … 縦長写真（スマートフォンで人物が大きく見える）
 * getImageProps + <picture> で1枚だけを読み込み、LCPを最小化している。
 */
export function Hero() {
  const common = { alt: "", sizes: "100vw", priority: true } as const;

  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...common,
    src: photos.heroWide.src,
    width: photos.heroWide.width,
    height: photos.heroWide.height,
  });

  const {
    props: { srcSet: mobileSrcSet, ...imgProps },
  } = getImageProps({
    ...common,
    src: photos.heroPortrait.src,
    width: photos.heroPortrait.width,
    height: photos.heroPortrait.height,
  });

  return (
    <section className="relative isolate overflow-hidden bg-navy-950">
      {/* 背景写真 */}
      <div aria-hidden="true" className="absolute inset-0">
        <picture>
          <source media="(min-width: 768px)" srcSet={desktopSrcSet} />
          <source srcSet={mobileSrcSet} />
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img
            {...imgProps}
            className="h-full w-full object-cover object-[70%_center] md:object-[75%_center]"
          />
        </picture>
        {/* テキスト可読性のためのオーバーレイ
            SP: 上（見出し）を濃く、下（車両）を明るく残す縦グラデーション
            PC: 左（テキスト）を濃く、右（人物）を明るく残す横グラデーション */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/92 via-navy-950/80 to-navy-950/45 md:bg-gradient-to-r md:from-navy-950/92 md:via-navy-950/68 md:to-navy-950/20" />
      </div>

      <div className="container-site relative py-20 md:py-32">
        <p className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-1.5 text-xs font-bold tracking-wider text-white shadow-lg shadow-navy-950/40">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-white"
          />
          軽貨物ドライバー積極募集中
        </p>
        <h1 className="mt-6 text-[2.1rem] font-black leading-[1.25] tracking-tight text-white drop-shadow-sm md:text-6xl md:leading-[1.2]">
          {serviceAreaShort}で
          <br />
          軽貨物ドライバー
          <br className="md:hidden" />
          として働く。
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-slate-200 md:text-base">
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

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-200">
          <TrackedLink
            href={`tel:${company.phoneTel}`}
            event="click_phone"
            eventParams={{ location: "hero" }}
            className="font-bold text-white underline-offset-4 hover:underline"
          >
            TEL {company.phone}
          </TrackedLink>
          <span className="text-xs text-slate-300">
            東京都葛飾区・三郷市・松戸市・江東区ほか周辺エリア対象
          </span>
        </div>
      </div>
    </section>
  );
}

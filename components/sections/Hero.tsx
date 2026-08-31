import Image from "next/image";
import { company } from "@/data/site";
import { photos } from "@/data/images";
import { recruitCopy } from "@/data/recruit-status";
import { TrackedLink } from "@/components/ui/TrackedLink";

/**
 * TOPページのファーストビュー。
 *
 * 設計方針:
 *  - 軽貨物車両の写真を1枚だけ大きく使い、上にカードや装飾を重ねない
 *  - 「軽貨物」「葛飾区」「東京・千葉・埼玉」「ドライバー募集」が一目で伝わる
 *  - 求人条件が未確定の間は「積極募集」「高収入」等の煽り表現を使わない。
 *    ステータス表示とCTAは data/recruit-status.ts から供給される
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950">
      <div aria-hidden="true" className="absolute inset-0">
        <Image
          src={photos.vanDriving.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_center] md:object-[70%_center]"
        />
        {/* 文字の可読性を確保するオーバーレイ。左（テキスト側）を濃くする */}
        <div className="absolute inset-0 bg-navy-950/78 md:bg-gradient-to-r md:from-navy-950/94 md:via-navy-950/72 md:to-navy-950/25" />
      </div>

      <div className="container-site relative py-20 md:py-32">
        <p className="text-xs font-bold tracking-[0.2em] text-brand-300">
          {company.name}　軽貨物事業部
        </p>

        <h1 className="mt-5 text-[1.9rem] font-bold leading-[1.35] tracking-tight text-white md:text-[3.2rem] md:leading-[1.3]">
          葛飾区から、東京・千葉・埼玉へ。
          <br />
          軽貨物で地域の物流を支える。
        </h1>

        <p className="mt-6 max-w-lg text-sm leading-[1.95] text-slate-200 md:text-base">
          東京都葛飾区を拠点に、東京東部・千葉北西部・埼玉東部エリアで軽貨物運送事業を展開しています。
          業務委託・日額20,000円保証・ロイヤリティなし。未経験可、AT限定可、車両リースの手配も可能です。
        </p>

        {/*
          ヒーローにはCTAボタンを置かない。
          求人広告のLPらしくならないよう、ファーストビューは
          「どこの、どんな会社が、いまどういう状況か」を伝えることに絞っている。
          応募導線はヘッダー・直下の採用状況セクション・スマホ固定CTAが担う。
        */}
        <div className="mt-9 flex flex-col gap-x-8 gap-y-4 border-t border-white/20 pt-6 sm:flex-row sm:items-center">
          {/* 現在の採用ステータス。求人データと連動するため表示が矛盾しない */}
          <p className="inline-flex items-center gap-2.5 text-sm font-bold text-white">
            <span
              aria-hidden="true"
              className="h-2 w-2 shrink-0 rounded-full bg-brand-400"
            />
            {recruitCopy.badge}
          </p>
          <p className="text-sm text-slate-300">
            お問い合わせ：
            <TrackedLink
              href={`tel:${company.phoneTel}`}
              event="click_phone"
              eventParams={{ location: "hero" }}
              className="ml-1 font-bold text-white underline-offset-4 hover:underline"
            >
              {company.phone}
            </TrackedLink>
          </p>
        </div>
      </div>
    </section>
  );
}

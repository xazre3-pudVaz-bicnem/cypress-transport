import type { ReactNode } from "react";
import { PhotoFrame } from "./Photo";
import type { SitePhoto } from "@/data/images";

/**
 * ページのリズムを作るための部品。
 *
 * 「見出し → 3カード → CTA」の繰り返しにならないよう、
 * 写真＋文章／罫線の定義リスト／縦線ステップ／大きな数字を使い分ける。
 * カードは求人・記事・明確な比較にだけ使う。
 */

/** 写真と文章を左右に置く非対称セクション */
export function SplitSection({
  photo,
  children,
  reverse = false,
  ratio = "aspect-[4/5]",
  sizes = "(min-width: 1024px) 42vw, 100vw",
  priority = false,
}: {
  photo: SitePhoto;
  children: ReactNode;
  reverse?: boolean;
  ratio?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1fr] lg:gap-16">
      <PhotoFrame
        photo={photo}
        ratio={ratio}
        sizes={sizes}
        priority={priority}
        rounded="rounded-[3px]"
        className={reverse ? "lg:order-2" : ""}
      />
      <div className={reverse ? "lg:order-1" : ""}>{children}</div>
    </div>
  );
}

/** 縦線でつなぐステップ表示 */
export function Steps({
  items,
  light = false,
}: {
  items: { title: string; body: string; note?: string }[];
  light?: boolean;
}) {
  return (
    <ol className={`relative border-l ${light ? "border-white/20" : "border-ink-900/15"}`}>
      {items.map((item, i) => (
        <li key={item.title} className="relative pb-9 pl-7 last:pb-0">
          <span
            aria-hidden="true"
            className={`absolute -left-[5px] top-2 block h-2.5 w-2.5 ${
              light ? "bg-accent" : "bg-ink-900"
            }`}
          />
          <p className="text-[11px] font-bold tracking-[0.18em] text-ink-400">
            STEP {String(i + 1).padStart(2, "0")}
          </p>
          <h3 className={`mt-1.5 h-sub ${light ? "text-white" : ""}`}>
            {item.title}
          </h3>
          <p
            className={`mt-2 text-sm leading-[1.95] ${
              light ? "text-slate-300" : "text-ink-500"
            }`}
          >
            {item.body}
          </p>
          {item.note && (
            <p className="mt-2 text-[13px] leading-relaxed text-ink-400">
              {item.note}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}

/** 罫線で区切った定義リスト */
export function DefinitionList({
  items,
  light = false,
}: {
  items: { term: string; description: ReactNode }[];
  light?: boolean;
}) {
  const border = light ? "border-white/15" : "border-ink-900/15";
  return (
    <dl className={`border-t ${border}`}>
      {items.map((item) => (
        <div
          key={item.term}
          className={`flex flex-col gap-1 border-b ${border} py-4 sm:flex-row sm:gap-8 sm:py-5`}
        >
          <dt
            className={`shrink-0 text-sm font-bold sm:w-44 ${
              light ? "text-white" : "text-ink-900"
            }`}
          >
            {item.term}
          </dt>
          <dd
            className={`text-sm leading-[1.95] ${
              light ? "text-slate-300" : "text-ink-500"
            }`}
          >
            {item.description}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** 番号を大きく見せる箇条書き（カードを使わない） */
export function NumberedList({
  items,
  light = false,
}: {
  items: { title: string; body: string }[];
  light?: boolean;
}) {
  return (
    <ol className="grid gap-x-14 gap-y-9 md:grid-cols-2">
      {items.map((item, i) => (
        <li key={item.title} className="flex gap-5">
          <span
            aria-hidden="true"
            className={`shrink-0 text-xl font-bold tabular-nums ${
              light ? "text-accent" : "text-accent-dark"
            }`}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className={`h-sub ${light ? "text-white" : ""}`}>{item.title}</h3>
            <p
              className={`mt-2 text-sm leading-[1.95] ${
                light ? "text-slate-300" : "text-ink-500"
              }`}
            >
              {item.body}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** 実績数値。値が入っているものだけ表示する */
export function StatRow({
  stats,
}: {
  stats: { label: string; value: number; unit: string; note?: string }[];
}) {
  if (stats.length === 0) return null;
  return (
    <dl className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label}>
          <dt className="stat-label text-ink-400">{s.label}</dt>
          <dd className="mt-2 flex items-baseline gap-1.5">
            <span className="stat-figure text-ink-900">
              {s.value.toLocaleString("ja-JP")}
            </span>
            <span className="stat-unit text-ink-500">{s.unit}</span>
          </dd>
          {s.note && <p className="mt-1 text-xs text-ink-400">{s.note}</p>}
        </div>
      ))}
    </dl>
  );
}

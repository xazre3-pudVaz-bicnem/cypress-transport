import type { ReactNode } from "react";
import { PhotoFrame } from "./Photo";
import type { SitePhoto } from "@/data/images";

/**
 * ページのリズムを作るためのレイアウト部品。
 *
 * サイト全体が「見出し → 3カード → CTA」の繰り返しになると
 * テンプレートを流用したように見えるため、
 * 写真＋文章 / 左右非対称 / 縦線ステップ / 数字 / 表 を使い分ける。
 */

/** 写真と文章を左右に配置する非対称セクション */
export function SplitSection({
  photo,
  children,
  reverse = false,
  ratio = "aspect-[4/3]",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
}: {
  photo: SitePhoto;
  children: ReactNode;
  /** true で写真を右に置く */
  reverse?: boolean;
  ratio?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
      <PhotoFrame
        photo={photo}
        ratio={ratio}
        sizes={sizes}
        priority={priority}
        rounded="rounded-sm"
        className={reverse ? "lg:order-2" : ""}
      />
      <div className={reverse ? "lg:order-1" : ""}>{children}</div>
    </div>
  );
}

/**
 * 縦線でつなぐステップ表示。番号付きカードの代わりに使う。
 */
export function Steps({
  items,
}: {
  items: { title: string; body: string; note?: string }[];
}) {
  return (
    <ol className="relative border-l border-slate-200">
      {items.map((item, i) => (
        <li key={item.title} className="relative pb-10 pl-8 last:pb-0">
          <span
            aria-hidden="true"
            className="absolute -left-[7px] top-1.5 block h-3.5 w-3.5 rounded-full border-2 border-brand-600 bg-white"
          />
          <p className="text-xs font-bold tracking-widest text-brand-600">
            STEP {i + 1}
          </p>
          <h3 className="mt-1.5 heading-lv3">{item.title}</h3>
          <p className="mt-2 text-sm leading-[1.95] text-ink-muted">
            {item.body}
          </p>
          {item.note && (
            <p className="mt-2 text-[13px] leading-relaxed text-slate-500">
              {item.note}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}

/**
 * 罫線で区切った定義リスト。カードを使わず情報を並べる。
 */
export function DefinitionList({
  items,
}: {
  items: { term: string; description: ReactNode }[];
}) {
  return (
    <dl className="border-t border-slate-200">
      {items.map((item) => (
        <div
          key={item.term}
          className="flex flex-col gap-1 border-b border-slate-200 py-4 sm:flex-row sm:gap-8 sm:py-5"
        >
          <dt className="shrink-0 text-sm font-bold text-navy-900 sm:w-44">
            {item.term}
          </dt>
          <dd className="text-sm leading-[1.95] text-ink-muted">
            {item.description}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * 番号を大きく見せる箇条書き。カードに入れずに並べる。
 */
export function NumberedList({
  items,
  light = false,
}: {
  items: { title: string; body: string }[];
  light?: boolean;
}) {
  return (
    <ol className="grid gap-x-12 gap-y-9 md:grid-cols-2">
      {items.map((item, i) => (
        <li key={item.title} className="flex gap-5">
          <span
            aria-hidden="true"
            className={`shrink-0 text-2xl font-black tabular-nums ${
              light ? "text-brand-400/70" : "text-brand-600/35"
            }`}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h3
              className={`text-[15px] font-bold leading-snug ${
                light ? "text-white" : "text-navy-900"
              }`}
            >
              {item.title}
            </h3>
            <p
              className={`mt-2 text-sm leading-[1.95] ${
                light ? "text-slate-300" : "text-ink-muted"
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

/**
 * 実績数値。値が入っているものだけ表示する（架空の数字は出さない）。
 */
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
          <dt className="text-xs font-bold tracking-wide text-ink-muted">
            {s.label}
          </dt>
          <dd className="mt-2 flex items-baseline gap-1">
            <span className="text-4xl font-black tabular-nums text-navy-900">
              {s.value.toLocaleString("ja-JP")}
            </span>
            <span className="text-sm font-bold text-ink-muted">{s.unit}</span>
          </dd>
          {s.note && (
            <p className="mt-1 text-xs text-slate-500">{s.note}</p>
          )}
        </div>
      ))}
    </dl>
  );
}

import { PhotoBackdrop } from "./Photo";
import type { SitePhoto } from "@/data/images";

/**
 * 下層ページ共通のページヘッダー。
 * h1 は 1ページ1個の原則を守るため、各ページでこのコンポーネントのみが h1 を持つ。
 *
 * photo を渡すと背景写真＋濃紺オーバーレイになる。
 * 渡さない場合はグラデーションのみ（写真が用意できていないページ用）。
 */
export function PageHero({
  label,
  title,
  description,
  photo,
  /** 各ページの最初のビューに入るため、写真がある場合は基本 true */
  priority = true,
  objectPosition = "object-center",
}: {
  label: string;
  title: string;
  description?: string;
  photo?: SitePhoto;
  priority?: boolean;
  objectPosition?: string;
}) {
  return (
    <div className="relative isolate overflow-hidden bg-navy-950">
      {photo ? (
        <PhotoBackdrop
          photo={photo}
          overlay={80}
          priority={priority}
          objectPosition={objectPosition}
        />
      ) : null}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 80% 20%, rgba(31,122,232,0.35), transparent 60%), radial-gradient(ellipse 50% 60% at 10% 90%, rgba(0,194,255,0.15), transparent 60%)",
        }}
      />
      <div className="container-site relative py-14 md:py-20">
        <p className="label-en text-brand-300">{label}</p>
        <h1 className="mt-3 text-[1.7rem] font-bold leading-snug text-white md:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-200 md:text-[15px]">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

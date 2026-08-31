import { PhotoBackdrop } from "./Photo";
import type { SitePhoto } from "@/data/images";

/**
 * 下層ページ共通のページヘッダー。
 * h1 は 1ページ1個の原則を守るため、各ページでこのコンポーネントのみが h1 を持つ。
 *
 * 以前あった英語ラベル（Recruit / Company など）は、
 * テンプレート感の主因だったため廃止した。
 *
 * photo を渡すと背景写真＋濃紺オーバーレイになる。
 * 渡さない場合は無地のネイビー（写真を敷く必然性がないページ用）。
 */
export function PageHero({
  title,
  description,
  photo,
  priority = true,
  objectPosition = "object-center",
}: {
  title: string;
  description?: string;
  photo?: SitePhoto;
  priority?: boolean;
  objectPosition?: string;
}) {
  return (
    <div className="relative isolate overflow-hidden bg-navy-900">
      {photo ? (
        <PhotoBackdrop
          photo={photo}
          overlay={82}
          priority={priority}
          objectPosition={objectPosition}
        />
      ) : null}
      <div className="container-site relative py-12 md:py-16">
        <h1 className="text-[1.6rem] font-bold leading-snug tracking-tight text-white md:text-[2.2rem]">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-sm leading-[1.95] text-slate-300 md:text-[15px]">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

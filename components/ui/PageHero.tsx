import { PhotoBackdrop } from "./Photo";
import type { SitePhoto } from "@/data/images";

/**
 * 下層ページ共通のページヘッダー。
 * h1 は 1ページ1個の原則を守るため、各ページでこれだけが h1 を持つ。
 * 英語ラベルは置かない。
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
    <div className="relative isolate overflow-hidden bg-ink-900">
      {photo ? (
        <PhotoBackdrop
          photo={photo}
          overlay={80}
          priority={priority}
          objectPosition={objectPosition}
        />
      ) : null}
      <div className="container-site relative py-14 md:py-20">
        <h1 className="text-[1.7rem] font-bold leading-[1.35] tracking-[-0.02em] text-white md:text-[2.5rem]">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-sm leading-[1.95] text-slate-300 md:text-[15px]">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

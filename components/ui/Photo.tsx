import Image from "next/image";
import type { SitePhoto } from "@/data/images";

/**
 * 写真表示の共通コンポーネント。
 *
 * 重要:
 *  - 枠側でアスペクト比を固定し、画像は fill + object-cover。
 *    これによりレイアウトシフト（CLS）が発生しない。
 *  - className には枠のスタイルのみを渡す。position を上書きしないこと
 *    （absolute を渡すと高さが 0 になり画像が消える）。
 */
export function PhotoFrame({
  photo,
  ratio = "aspect-[4/3]",
  className = "",
  imageClassName = "",
  sizes = "(min-width: 1024px) 33vw, 100vw",
  priority = false,
  rounded = "rounded-[3px]",
}: {
  photo: SitePhoto;
  /** Tailwind の aspect-* クラス */
  ratio?: string;
  className?: string;
  /** 画像側に当てるクラス（ホバー時の拡大など。枠は固定のままになる） */
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  rounded?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-paper-dark ${ratio} ${rounded} ${className}`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${imageClassName}`}
      />
    </div>
  );
}

/**
 * セクション背景として写真を敷く。
 * 親要素に `relative` と `overflow-hidden` が必要。
 * 上に濃紺のオーバーレイをかけ、白文字のコントラストを確保する。
 */
export function PhotoBackdrop({
  photo,
  /** 0〜100。数値が大きいほど暗くなる */
  overlay = 78,
  priority = false,
  objectPosition = "object-center",
}: {
  photo: SitePhoto;
  overlay?: number;
  priority?: boolean;
  objectPosition?: string;
}) {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <Image
        src={photo.src}
        alt=""
        fill
        sizes="100vw"
        priority={priority}
        className={`object-cover ${objectPosition}`}
      />
      <div
        className="absolute inset-0 bg-ink-900"
        style={{ opacity: overlay / 100 }}
      />
    </div>
  );
}

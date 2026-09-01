import Link from "next/link";
import { breadcrumbJsonLd, type BreadcrumbItem } from "@/lib/jsonld";
import { JsonLd } from "./JsonLd";

/**
 * パンくずリスト（表示 + BreadcrumbList構造化データを同時出力）。
 * items の先頭は必ず { name: "ホーム", path: "/" } を渡す。
 */
export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(items)} />
      <nav aria-label="パンくずリスト" className="container-site py-1.5">
        <ol className="flex flex-wrap items-center gap-x-1.5 text-xs text-ink-500">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={i} className="flex items-center gap-1.5">
                {i > 0 && <span aria-hidden="true">/</span>}
                {isLast || !item.path ? (
                  <span aria-current="page" className="py-2 text-ink-900">
                    {item.name}
                  </span>
                ) : (
                  /* py-2 でタップ領域を約32pxまで広げる */
                  <Link
                    href={item.path}
                    className="inline-block py-2 transition-colors hover:text-accent-text"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

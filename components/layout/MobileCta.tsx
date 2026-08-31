"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";
import { recruitCopy } from "@/data/recruit-status";

/**
 * スマートフォン画面下部の固定CTA。
 *
 * 以前は「電話／求人を見る／応募する」の3つを常時出していたが、
 * 求人LPらしさが出るため2つに絞った。電話はヘッダーのメニューから。
 *
 * ラベルと行き先は data/recruit-status.ts が求人データから導出するため、
 * 募集していない期間に「応募する」と出てしまうことがない。
 */
export function MobileCta() {
  const pathname = usePathname();
  if (pathname.startsWith("/contact")) return null;

  const [primary, secondary] = recruitCopy.mobileCta;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-900/15 bg-paper/97 backdrop-blur lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-2.5 px-4 py-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))]">
        <Link
          href={primary.href}
          onClick={() => track("click_recruit_cta", { location: "mobile_fixed" })}
          className="flex items-center justify-center rounded-[2px] border border-ink-900 py-3 text-sm font-bold text-ink-900"
        >
          {primary.label}
        </Link>
        <Link
          href={secondary.href}
          onClick={() => track("click_apply", { location: "mobile_fixed" })}
          className="flex items-center justify-center rounded-[2px] bg-accent py-3 text-sm font-bold text-ink-900"
        >
          {secondary.label}
        </Link>
      </div>
    </div>
  );
}

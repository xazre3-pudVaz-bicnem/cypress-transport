"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";

/**
 * スマートフォン画面下部の固定CTA（求人を見る / 応募する）。
 * フォームページでは入力の邪魔になるため非表示。
 */
export function MobileCta() {
  const pathname = usePathname();
  if (pathname.startsWith("/contact")) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-2.5 px-4 py-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))]">
        <Link
          href="/recruit/jobs"
          onClick={() => track("click_recruit_cta", { location: "mobile_fixed" })}
          className="flex items-center justify-center rounded-full border-2 border-navy-900 bg-white py-3 text-sm font-bold text-navy-900"
        >
          求人を見る
        </Link>
        <Link
          href="/contact"
          onClick={() => track("click_apply", { location: "mobile_fixed" })}
          className="flex items-center justify-center rounded-full bg-brand-600 py-3 text-sm font-bold text-white shadow-lg shadow-brand-600/30"
        >
          応募する
        </Link>
      </div>
    </div>
  );
}

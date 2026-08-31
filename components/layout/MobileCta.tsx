"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";
import { company } from "@/data/site";
import { recruitCopy } from "@/data/recruit-status";

/**
 * スマートフォン画面下部の固定CTA。
 *
 * ラベルと行き先は data/recruit-status.ts から供給される。
 * 求人がない間は「採用情報 / 相談する」、求人公開後は「求人を見る / 応募する」に
 * 自動で切り替わるため、存在しない求人へ誘導してしまうことがない。
 *
 * 応募者の多くがスマートフォンから見るため、電話導線も常設する。
 */
export function MobileCta() {
  const pathname = usePathname();
  if (pathname.startsWith("/contact")) return null;

  const [primary, secondary] = recruitCopy.mobileCta;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/97 backdrop-blur lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-[auto_1fr_1fr] gap-2 px-3 py-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))]">
        <a
          href={`tel:${company.phoneTel}`}
          onClick={() => track("click_phone", { location: "mobile_fixed" })}
          className="flex w-12 flex-col items-center justify-center rounded-sm border border-navy-900 text-navy-900"
          aria-label={`電話をかける ${company.phone}`}
        >
          <PhoneIcon />
          <span className="mt-0.5 text-[9px] font-bold">電話</span>
        </a>
        <Link
          href={primary.href}
          onClick={() => track("click_recruit_cta", { location: "mobile_fixed" })}
          className="flex items-center justify-center rounded-sm border border-navy-900 bg-white py-3 text-sm font-bold text-navy-900"
        >
          {primary.label}
        </Link>
        <Link
          href={secondary.href}
          onClick={() => track("click_apply", { location: "mobile_fixed" })}
          className="flex items-center justify-center rounded-sm bg-brand-600 py-3 text-sm font-bold text-white"
        >
          {secondary.label}
        </Link>
      </div>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.6 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.8.6a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}

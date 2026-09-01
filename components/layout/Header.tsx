"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";
import { company } from "@/data/site";

/**
 * ヘッダー。
 * リンクを詰め込むとサイトマップのように見えるため、4項目に絞っている。
 * 「募集状況」「採用エリア」は /recruit 配下からたどれるようにした。
 */
const navItems = [
  { href: "/recruit", label: "ドライバー募集" },
  { href: "/service", label: "軽貨物事業" },
  { href: "/company", label: "会社情報" },
  { href: "/column", label: "軽貨物コラム" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-ink-900/10 bg-paper/95 backdrop-blur">
      <div className="container-site relative flex h-16 items-center justify-between md:h-[72px]">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label="株式会社サイプレス 軽貨物事業部 トップページ"
          onClick={() => setOpen(false)}
        >
          <Image src="/logo.png" alt="" width={34} height={34} className="h-[34px] w-[34px]" />
          <span className="leading-tight">
            <span className="block text-[14px] font-bold tracking-wide text-ink-900">
              株式会社サイプレス
            </span>
            <span className="block text-[10px] font-bold tracking-[0.16em] text-ink-400">
              軽貨物事業部
            </span>
          </span>
        </Link>

        <nav aria-label="グローバルナビゲーション" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-sm font-bold transition-colors hover:text-accent-text ${
                      active ? "text-accent-text" : "text-ink-900"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={`tel:${company.phoneTel}`}
            onClick={() => track("click_phone", { location: "header" })}
            className="text-xs font-bold text-ink-500 transition-colors hover:text-ink-900"
          >
            {company.phone}
          </a>
          <Link
            href="/contact"
            onClick={() => track("click_apply", { location: "header" })}
            className="rounded-[2px] bg-accent px-6 py-2.5 text-sm font-bold text-ink-900 transition-colors hover:bg-accent-dark"
          >
            応募する
          </Link>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`h-0.5 w-6 bg-ink-900 transition ${open ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-ink-900 transition ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-ink-900 transition ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>

        {/* backdrop-blur を持つ親の中で fixed を使うと潰れるため absolute + top-full */}
        <div
          id="mobile-menu"
          hidden={!open}
          className="absolute inset-x-0 top-full border-b border-ink-900/10 bg-paper shadow-lg lg:hidden"
        >
          <nav aria-label="モバイルナビゲーション" className="px-5 py-3">
            <ul className="divide-y divide-ink-900/10">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block py-3.5 text-[15px] font-bold text-ink-900"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href={`tel:${company.phoneTel}`}
              className="mt-4 mb-3 block rounded-[2px] border border-ink-900 py-3 text-center text-sm font-bold text-ink-900"
              onClick={() => track("click_phone", { location: "mobile_menu" })}
            >
              電話する {company.phone}
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

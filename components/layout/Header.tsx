"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";
import { company } from "@/data/site";

const navItems = [
  { href: "/service", label: "軽貨物事業" },
  { href: "/recruit", label: "ドライバー採用" },
  { href: "/recruit/jobs", label: "求人一覧" },
  { href: "/column", label: "お役立ちコラム" },
  { href: "/company", label: "会社概要" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="container-site relative flex h-16 items-center justify-between md:h-[72px]">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label="株式会社サイプレス 軽貨物事業部 トップページ"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo.png"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9"
          />
          <span className="leading-tight">
            <span className="block text-[15px] font-bold tracking-wide text-navy-900">
              株式会社サイプレス
            </span>
            <span className="block text-[11px] font-semibold tracking-widest text-brand-600">
              軽貨物事業部
            </span>
          </span>
        </Link>

        {/* PCナビ */}
        <nav aria-label="グローバルナビゲーション" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-sm font-semibold transition hover:text-brand-600 ${
                    pathname === item.href ? "text-brand-600" : "text-navy-900"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${company.phoneTel}`}
            onClick={() => track("click_phone", { location: "header" })}
            className="text-sm font-bold text-navy-900 transition hover:text-brand-600"
          >
            {company.phone}
          </a>
          <Link
            href="/contact"
            onClick={() => track("click_recruit_cta", { location: "header" })}
            className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-bold text-white shadow transition hover:bg-brand-500"
          >
            応募・相談する
          </Link>
        </div>

        {/* モバイルメニューボタン */}
        <button
          type="button"
          className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`h-0.5 w-6 rounded bg-navy-900 transition ${open ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-6 rounded bg-navy-900 transition ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`h-0.5 w-6 rounded bg-navy-900 transition ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </button>

        {/* モバイルメニュー（backdrop-blur内のfixedは潰れるため absolute + top-full） */}
        <div
          id="mobile-menu"
          hidden={!open}
          className="absolute inset-x-0 top-full border-b border-slate-100 bg-white shadow-xl lg:hidden"
        >
          <nav aria-label="モバイルナビゲーション" className="px-5 py-4">
            <ul className="divide-y divide-slate-100">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block py-3.5 text-[15px] font-semibold text-navy-900"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 grid gap-3 pb-2">
              <Link
                href="/contact"
                className="btn-primary py-3.5 text-sm"
                onClick={() => {
                  track("click_recruit_cta", { location: "mobile_menu" });
                  setOpen(false);
                }}
              >
                応募・相談する
              </Link>
              <a
                href={`tel:${company.phoneTel}`}
                className="btn-secondary py-3.5 text-sm"
                onClick={() => track("click_phone", { location: "mobile_menu" })}
              >
                電話をかける {company.phone}
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

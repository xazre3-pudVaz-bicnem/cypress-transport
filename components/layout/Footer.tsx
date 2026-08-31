import Link from "next/link";
import Image from "next/image";
import { company } from "@/data/site";
import { TrackedLink } from "@/components/ui/TrackedLink";

/**
 * フッター。
 * リンクを網羅するとサイトマップのように見えるため、主要導線だけに絞っている。
 * フッターリンクを増やしてもSEOが強くなるわけではない。
 */
const links = [
  { href: "/recruit", label: "ドライバー募集" },
  { href: "/service", label: "軽貨物事業" },
  { href: "/company", label: "会社情報" },
  { href: "/column", label: "軽貨物コラム" },
  { href: "/contact", label: "お問い合わせ" },
  { href: "/privacy", label: "プライバシーポリシー" },
];

export function Footer() {
  return (
    <footer className="border-t border-ink-900/10 bg-paper pb-24 lg:pb-0">
      <div className="container-site grid gap-10 py-14 md:grid-cols-[1.2fr_1fr] md:py-16">
        <div>
          <div className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="" width={34} height={34} className="h-[34px] w-[34px]" />
            <div className="leading-tight">
              <p className="text-[14px] font-bold text-ink-900">{company.name}</p>
              <p className="text-[10px] font-bold tracking-[0.16em] text-ink-400">
                軽貨物事業部
              </p>
            </div>
          </div>
          <address className="mt-5 text-sm not-italic leading-relaxed text-ink-500">
            {company.address.postalCode && `〒${company.address.postalCode} `}
            {company.address.full}
            <br />
            TEL{" "}
            <TrackedLink
              href={`tel:${company.phoneTel}`}
              event="click_phone"
              eventParams={{ location: "footer" }}
              className="font-bold text-ink-900 underline-offset-2 hover:underline"
            >
              {company.phone}
            </TrackedLink>
            {company.phoneHours && (
              <span className="text-ink-400">（{company.phoneHours}）</span>
            )}
          </address>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
            <TrackedLink
              href={company.instagram}
              event="click_instagram"
              eventParams={{ location: "footer" }}
              className="inline-flex items-center gap-2 text-xs font-bold text-ink-900 hover:text-accent-dark"
              ariaLabel="Instagram（新しいタブで開きます）"
            >
              <InstagramIcon />
              Instagram
            </TrackedLink>
            {company.corporateSiteUrl && (
              <a
                href={company.corporateSiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-ink-500 hover:text-ink-900"
              >
                株式会社サイプレス コーポレートサイト
              </a>
            )}
          </div>
        </div>

        <nav aria-label="フッターナビゲーション">
          <ul className="grid grid-cols-2 gap-y-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[13px] text-ink-500 transition-colors hover:text-ink-900"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-ink-900/10">
        <p className="container-site py-5 text-center text-xs text-ink-400">
          &copy; {new Date().getFullYear()} {company.name}
        </p>
      </div>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.8" cy="6.2" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

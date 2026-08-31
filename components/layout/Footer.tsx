import Link from "next/link";
import Image from "next/image";
import { company, serviceAreaLabel } from "@/data/site";
import { TrackedLink } from "@/components/ui/TrackedLink";

const footerNav = [
  {
    title: "採用情報",
    links: [
      { href: "/recruit", label: "ドライバー採用について" },
      { href: "/recruit/jobs", label: "募集状況・求人一覧" },
      { href: "/recruit/about-driver", label: "仕事内容" },
      { href: "/recruit/benefits", label: "働き方のメリットと注意点" },
      { href: "/recruit/flow", label: "稼働開始までの流れ" },
      { href: "/recruit/area", label: "採用エリア" },
      { href: "/recruit/faq", label: "よくある質問" },
    ],
  },
  {
    title: "事業・会社情報",
    links: [
      { href: "/service", label: "軽貨物事業について" },
      { href: "/company", label: "会社概要" },
      { href: "/column", label: "軽貨物の基礎知識" },
      { href: "/contact", label: "お問い合わせ・ご相談" },
      { href: "/privacy", label: "プライバシーポリシー" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-navy-950 pb-28 text-slate-300 lg:pb-0">
      <div className="container-site grid gap-10 py-14 md:grid-cols-[1.2fr_1fr_1fr] md:py-16">
        <div>
          <div className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="" width={36} height={36} className="h-9 w-9 rounded bg-white p-0.5" />
            <div className="leading-tight">
              <p className="text-[15px] font-bold text-white">{company.name}</p>
              <p className="text-[11px] font-semibold tracking-widest text-brand-300">
                軽貨物事業部
              </p>
            </div>
          </div>
          <address className="mt-5 text-sm not-italic leading-relaxed">
            {company.address.full}
            <br />
            TEL:{" "}
            <TrackedLink
              href={`tel:${company.phoneTel}`}
              event="click_phone"
              eventParams={{ location: "footer" }}
              className="underline-offset-2 hover:underline"
            >
              {company.phone}
            </TrackedLink>
          </address>
          <p className="mt-3 text-xs text-slate-400">
            {serviceAreaLabel}エリアで軽貨物事業を展開しています。
          </p>
          <TrackedLink
            href={company.instagram}
            event="click_instagram"
            eventParams={{ location: "footer" }}
            className="mt-5 inline-flex items-center gap-2 rounded-sm border border-slate-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:border-brand-400 hover:text-brand-300"
            ariaLabel="Instagram（新しいタブで開く）"
          >
            <InstagramIcon />
            Instagram
          </TrackedLink>
        </div>

        {footerNav.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <p className="text-sm font-bold text-white">{group.title}</p>
            <ul className="mt-4 space-y-2.5">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-slate-300 transition hover:text-brand-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-white/10">
        <p className="container-site py-5 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} {company.name}
        </p>
      </div>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.8" cy="6.2" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

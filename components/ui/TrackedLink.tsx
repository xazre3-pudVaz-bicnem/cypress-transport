"use client";

import Link from "next/link";
import { track, type GaEvent } from "@/lib/analytics";
import type { ReactNode } from "react";

/**
 * GA4イベントを送信するリンク。
 * 内部リンクは next/link、外部・tel は <a> を使用する。
 */
export function TrackedLink({
  href,
  event,
  eventParams,
  className,
  children,
  ariaLabel,
}: {
  href: string;
  event: GaEvent;
  eventParams?: Record<string, string>;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  const external = href.startsWith("http");
  const tel = href.startsWith("tel:");
  const onClick = () => track(event, eventParams);

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }
  if (tel) {
    return (
      <a href={href} className={className} onClick={onClick} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

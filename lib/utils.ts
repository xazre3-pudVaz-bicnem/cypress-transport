/** "2026-08-31" → "2026年8月31日" */
export function formatDateJa(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${y}年${m}月${d}日`;
}

/** クラス名の結合（falsy を除去） */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

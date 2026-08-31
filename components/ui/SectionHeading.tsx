/**
 * セクション見出し。
 *
 * 以前は「Our Promise」「About the Job」のような英語ラベルを必ず上に置いていたが、
 * これがテンプレートサイトらしさの主因だったため廃止した。
 * 日本語の見出しと、細い罫線のアクセントだけで成立させる。
 */
export function SectionHeading({
  title,
  lead,
  align = "left",
  light = false,
  as: Tag = "h2",
}: {
  title: string;
  /** 見出し直下のリード文（任意） */
  lead?: string;
  align?: "left" | "center";
  light?: boolean;
  as?: "h2" | "h3";
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <span
        aria-hidden="true"
        className={`block h-px w-10 ${light ? "bg-brand-400" : "bg-brand-600"} ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
      <Tag
        className={`mt-5 text-[1.35rem] font-bold leading-snug tracking-tight md:text-[1.75rem] ${
          light ? "text-white" : "text-navy-900"
        }`}
      >
        {title}
      </Tag>
      {lead && (
        <p
          className={`mt-4 max-w-2xl text-[15px] leading-[1.95] ${
            align === "center" ? "mx-auto" : ""
          } ${light ? "text-slate-300" : "text-ink-muted"}`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}

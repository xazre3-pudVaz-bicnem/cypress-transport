/**
 * セクション見出し。
 * 英語ラベルによる装飾は使わず、日本語の見出しと細い罫線で成立させる。
 */
export function SectionHeading({
  title,
  lead,
  align = "left",
  light = false,
  as: Tag = "h2",
}: {
  title: string;
  lead?: string;
  align?: "left" | "center";
  light?: boolean;
  as?: "h2" | "h3";
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <span
        aria-hidden="true"
        className={`block h-[3px] w-9 ${light ? "bg-accent" : "bg-accent"} ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
      <Tag className={`mt-5 h-section ${light ? "text-white" : ""}`}>
        {title}
      </Tag>
      {lead && (
        <p
          className={`mt-4 max-w-2xl text-[15px] leading-[1.95] ${
            align === "center" ? "mx-auto" : ""
          } ${light ? "text-slate-300" : "text-ink-500"}`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}

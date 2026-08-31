/**
 * セクション見出し（英字ラベル + 日本語見出し）。
 */
export function SectionHeading({
  label,
  title,
  align = "left",
  light = false,
}: {
  label: string;
  title: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <p className={`label-en ${light ? "text-brand-300" : ""}`}>{label}</p>
      <h2
        className={`mt-3 text-2xl font-bold leading-snug md:text-[2rem] ${
          light ? "text-white" : "text-navy-900"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}

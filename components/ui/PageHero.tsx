/**
 * 下層ページ共通のページヘッダー。
 * h1 は 1ページ1個の原則を守るため、各ページでこのコンポーネントのみが h1 を持つ。
 */
export function PageHero({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="relative overflow-hidden bg-navy-950">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 80% 20%, rgba(31,122,232,0.35), transparent 60%), radial-gradient(ellipse 50% 60% at 10% 90%, rgba(0,194,255,0.15), transparent 60%)",
        }}
      />
      <div className="container-site relative py-14 md:py-20">
        <p className="label-en text-brand-300">{label}</p>
        <h1 className="mt-3 text-[1.7rem] font-bold leading-snug text-white md:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-[15px]">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

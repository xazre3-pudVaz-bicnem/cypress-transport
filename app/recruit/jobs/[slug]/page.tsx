import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { CtaSection } from "@/components/ui/CtaSection";
import { PhotoBackdrop } from "@/components/ui/Photo";
import { photos } from "@/data/images";
import { jobPostingJsonLd } from "@/lib/jsonld";
import { getJob, getPublishedJobs, jobLocationLabel } from "@/lib/jobs";
import { formatDateJa } from "@/lib/utils";
import { company } from "@/data/site";
import type { Job } from "@/data/jobs";

export function generateStaticParams() {
  return getPublishedJobs().map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job || job.status === "draft") return {};

  if (job.status === "closed") {
    return buildMetadata({
      title: `【募集終了】${job.title}`,
      description: `${job.title}の募集は終了しました。現在募集中の軽貨物ドライバー求人は求人一覧をご覧ください。`,
      path: `/recruit/jobs/${job.slug}`,
      noindex: true,
    });
  }

  return buildMetadata({
    title: `${job.title}の求人`,
    description: `${jobLocationLabel(job)}の軽貨物配送ドライバー募集。${
      job.salary ? `報酬：${job.salary.text}。` : ""
    }${company.name}の求人詳細・応募はこちら。`,
    path: `/recruit/jobs/${job.slug}`,
  });
}

/** 確定している項目だけを表示する求人詳細テーブルの行を構築 */
function buildRows(job: Job): { label: string; value: string }[] {
  const rows: { label: string; value: string }[] = [];
  const push = (label: string, value: string | null | undefined) => {
    if (value) rows.push({ label, value });
  };

  push("仕事内容", job.description);
  push("雇用・契約形態", job.employmentTypeLabel);
  push("勤務地", job.workLocationDetail ?? jobLocationLabel(job));
  push("配送エリア", job.deliveryArea);
  push("報酬", job.salary?.text);
  push("勤務時間", job.workHours);
  push("稼働日数", job.workDays);
  push("休日", job.holidays);
  push("応募資格", job.requirements?.join("\n"));
  push("必要免許", job.licenses?.join("\n"));
  push("待遇", job.benefits?.join("\n"));
  push("車両条件", job.vehicle);
  push("研修", job.training);
  push("応募方法", job.applyMethod);
  push("掲載開始日", job.datePosted ? formatDateJa(job.datePosted) : null);
  push("募集終了日", job.validThrough ? formatDateJa(job.validThrough) : null);
  push("求人ID", job.id);
  return rows;
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job || job.status === "draft") notFound();

  const breadcrumbs = (
    <Breadcrumbs
      items={[
        { name: "ホーム", path: "/" },
        { name: "ドライバー採用", path: "/recruit" },
        { name: "求人一覧", path: "/recruit/jobs" },
        { name: job.title },
      ]}
    />
  );

  // ── 募集終了求人 ──
  if (job.status === "closed") {
    return (
      <>
        {breadcrumbs}
        <section className="section-pad bg-slate-50">
          <div className="container-site max-w-2xl">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center md:p-12">
              <p className="inline-block rounded-full bg-slate-200 px-4 py-1.5 text-xs font-bold text-slate-600">
                募集終了
              </p>
              <h1 className="mt-5 text-xl font-bold leading-snug text-navy-900 md:text-2xl">
                {job.title}
              </h1>
              <p className="mt-5 text-sm leading-relaxed text-slate-600">
                この求人は募集を終了しました。
                現在募集中の求人、または今後の募集のご案内をご希望の方は下記をご覧ください。
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/recruit/jobs" className="btn-primary">
                  現在募集中の求人を見る
                </Link>
                <Link href="/contact" className="btn-secondary">
                  募集開始の連絡を受け取る
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // ── 募集中求人 ──
  const rows = buildRows(job);
  const jsonLd = jobPostingJsonLd(job); // 必須項目が揃った場合のみ生成される

  return (
    <>
      {jsonLd && <JsonLd data={jsonLd} />}
      {breadcrumbs}

      <article>
        <header className="relative isolate overflow-hidden bg-navy-950">
          <PhotoBackdrop photo={photos.warehouse} overlay={82} priority />
          <div className="container-site relative py-12 md:py-16">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300">
                募集中
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-brand-300">
                {jobLocationLabel(job)}
              </span>
              {job.employmentTypeLabel && (
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-300">
                  {job.employmentTypeLabel}
                </span>
              )}
            </div>
            <h1 className="mt-4 text-2xl font-bold leading-snug text-white md:text-3xl">
              {job.title}
            </h1>
            {job.salary && (
              <p className="mt-4 text-lg font-bold text-brand-300">
                {job.salary.text}
              </p>
            )}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href={`/contact?job=${job.slug}`}
                event="click_apply"
                eventParams={{ location: "job_header", job_id: job.id }}
                className="btn-primary"
              >
                この求人に応募する
              </TrackedLink>
              <TrackedLink
                href={`tel:${company.phoneTel}`}
                event="click_phone"
                eventParams={{ location: "job_header", job_id: job.id }}
                className="btn-ghost-light"
              >
                電話で相談する
              </TrackedLink>
            </div>
          </div>
        </header>

        <section className="section-pad bg-white">
          <div className="container-site max-w-4xl">
            <h2 className="heading-2">募集要項</h2>
            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-slate-200">
                  {rows.map((row) => (
                    <tr key={row.label} className="flex flex-col sm:table-row">
                      <th
                        scope="row"
                        className="w-full bg-slate-50 px-5 pt-4 text-left align-top font-bold text-navy-900 sm:w-44 sm:py-4"
                      >
                        {row.label}
                      </th>
                      <td className="whitespace-pre-line px-5 pb-4 pt-2 leading-relaxed text-slate-700 sm:py-4">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-6 rounded-xl bg-brand-50 p-5 text-[13px] leading-relaxed text-navy-900">
              上記に記載のない条件は、面談時にすべて書面でご説明します。
              応募前に確認しておきたいポイントは
              <Link
                href="/column/contract-check"
                className="mx-1 font-bold text-brand-600 underline-offset-4 hover:underline"
              >
                契約条件チェックリスト
              </Link>
              をご覧ください。
            </p>

            {/* 内部リンク: 仕事解説・FAQ */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <Link
                href="/recruit/about-driver"
                className="rounded-xl border border-slate-200 p-5 text-sm font-bold text-navy-900 transition hover:border-brand-400 hover:text-brand-600"
              >
                軽貨物ドライバーの仕事内容を見る →
              </Link>
              <Link
                href="/recruit/faq"
                className="rounded-xl border border-slate-200 p-5 text-sm font-bold text-navy-900 transition hover:border-brand-400 hover:text-brand-600"
              >
                よくある質問を見る →
              </Link>
            </div>
          </div>
        </section>
      </article>

      <CtaSection
        title="この求人に応募・相談する"
        description="「まず話を聞いてみたい」だけでも構いません。フォームまたはお電話でご連絡ください。"
      />
    </>
  );
}

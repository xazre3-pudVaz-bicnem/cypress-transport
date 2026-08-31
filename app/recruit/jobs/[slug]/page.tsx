import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { CtaSection } from "@/components/ui/CtaSection";
import { PhotoBackdrop } from "@/components/ui/Photo";
import { jobPostingJsonLd } from "@/lib/jsonld";
import { getJob, getPublishedJobs, jobLocationLabel } from "@/lib/jobs";
import { formatDateJa } from "@/lib/utils";
import { company } from "@/data/site";
import { photos } from "@/data/images";
import { recruitPhase } from "@/data/recruit-status";
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
    title: `${job.title}｜${jobLocationLabel(job)}`,
    description: `${jobLocationLabel(job)}の軽貨物配送ドライバー募集。${
      job.salary ? `報酬：${job.salary.text}。` : ""
    }${company.name}の募集要項と応募方法はこちら。`,
    path: `/recruit/jobs/${job.slug}`,
  });
}

/**
 * 確定している項目だけを募集要項の行に変換する。
 * ここで生成した内容と JobPosting 構造化データの description は
 * 同じ Job データから作られるため、表示と構造化データが必ず一致する。
 */
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
  push("必要な経験", job.experience);
  push("車両条件", job.vehicle);
  push("経費負担", job.expenses);
  push("待遇", job.benefits?.join("\n"));
  push("研修", job.training);
  push("募集人数", job.headcount);
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

  /* ───── 募集終了した求人 ───── */
  if (job.status === "closed") {
    return (
      <>
        {breadcrumbs}
        <section className="section-pad bg-white">
          <div className="container-site max-w-2xl">
            <p className="inline-block border border-slate-300 px-3 py-1 text-xs font-bold text-ink-muted">
              募集終了
            </p>
            <h1 className="mt-5 text-xl font-bold leading-snug text-navy-900 md:text-2xl">
              {job.title}
            </h1>
            <p className="mt-6 prose-body">
              この求人の募集は終了しました。現在募集中の求人、または今後の募集のご案内をご希望の方は、下記からご確認ください。
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/recruit/jobs" className="btn-primary">
                現在募集中の求人を見る
              </Link>
              {/* 他に募集中の求人があるかどうかで、2つ目の導線の文言を変える */}
              <Link href="/contact" className="btn-outline">
                {recruitPhase === "open"
                  ? "働き方について相談する"
                  : "次回募集の案内を受け取る"}
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  /* ───── 募集中の求人 ───── */
  const rows = buildRows(job);
  // 必須項目が揃った求人のみ JobPosting を出力（lib/jobs.ts の完全性ゲート）
  const jsonLd = jobPostingJsonLd(job);

  return (
    <>
      {jsonLd && <JsonLd data={jsonLd} />}
      {breadcrumbs}

      <article>
        <header className="relative isolate overflow-hidden bg-navy-900">
          <PhotoBackdrop photo={photos.warehouse} overlay={84} priority />
          <div className="container-site relative py-12 md:py-16">
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
              <span className="bg-brand-600 px-2.5 py-1 text-white">募集中</span>
              <span className="border border-white/40 px-2.5 py-1 text-white">
                {jobLocationLabel(job)}
              </span>
              {job.employmentTypeLabel && (
                <span className="border border-white/40 px-2.5 py-1 text-white">
                  {job.employmentTypeLabel}
                </span>
              )}
            </div>
            <h1 className="mt-5 text-2xl font-bold leading-snug text-white md:text-[2.1rem]">
              {job.title}
            </h1>
            {job.salary && (
              <p className="mt-4 text-lg font-bold text-brand-300">
                {job.salary.text}
              </p>
            )}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
                className="btn-outline-light"
              >
                電話で相談する
              </TrackedLink>
            </div>
          </div>
        </header>

        <section className="section-pad bg-white">
          <div className="container-site max-w-4xl">
            <h2 className="heading-lv2">募集要項</h2>
            <table className="spec-table mt-8">
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className="flex flex-col sm:table-row">
                    <th scope="row">{row.label}</th>
                    <td className="whitespace-pre-line">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="mt-8 border-l-2 border-brand-600 bg-brand-50 py-4 pl-5 pr-6 text-[13px] leading-[1.95] text-navy-900">
              上記に記載のない条件は、ご相談・面談の際にご説明します。応募前に確認しておきたい項目は
              <Link
                href="/column/contract-check"
                className="mx-1 font-bold text-brand-700 underline-offset-4 hover:underline"
              >
                契約条件チェックリスト
              </Link>
              にまとめています。
            </p>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-slate-200 pt-8">
              <Link href="/recruit/about-driver" className="link-arrow">
                軽貨物ドライバーの仕事内容を見る
              </Link>
              <Link href="/recruit/faq" className="link-arrow">
                よくある質問を見る
              </Link>
              <Link href="/recruit/flow" className="link-arrow">
                稼働開始までの流れを見る
              </Link>
            </div>
          </div>
        </section>
      </article>

      <CtaSection
        title="この求人について質問する"
        description="募集要項に書かれていない点や、ご自身の状況で稼働できるかといったご相談も受け付けています。"
      />
    </>
  );
}

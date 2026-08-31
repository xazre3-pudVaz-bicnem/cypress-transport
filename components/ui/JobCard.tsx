import Link from "next/link";
import type { Job } from "@/data/jobs";
import { jobLocationLabel } from "@/lib/jobs";

/**
 * 求人一覧で使う求人カード。
 * 未確定（null）の項目は表示しない。表示している内容は
 * 個別求人ページおよび JobPosting 構造化データと一致する。
 */
export function JobCard({ job }: { job: Job }) {
  return (
    <Link
      href={`/recruit/jobs/${job.slug}`}
      className="group block border border-slate-200 bg-white p-6 transition-colors hover:border-navy-900"
    >
      <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
        <span className="bg-navy-900 px-2.5 py-1 text-white">
          {jobLocationLabel(job)}
        </span>
        {job.employmentTypeLabel && (
          <span className="border border-slate-300 px-2.5 py-1 text-ink-muted">
            {job.employmentTypeLabel}
          </span>
        )}
        <span className="border border-brand-600 px-2.5 py-1 text-brand-700">
          募集中
        </span>
      </div>
      <h3 className="mt-4 text-lg font-bold leading-snug text-navy-900 transition-colors group-hover:text-brand-600">
        {job.title}
      </h3>
      <dl className="mt-4 space-y-2 border-t border-slate-200 pt-4 text-sm">
        {job.salary && (
          <div className="flex gap-4">
            <dt className="w-20 shrink-0 font-bold text-ink-muted">報酬</dt>
            <dd className="text-navy-900">{job.salary.text}</dd>
          </div>
        )}
        {job.deliveryArea && (
          <div className="flex gap-4">
            <dt className="w-20 shrink-0 font-bold text-ink-muted">配送エリア</dt>
            <dd className="text-navy-900">{job.deliveryArea}</dd>
          </div>
        )}
        {job.workDays && (
          <div className="flex gap-4">
            <dt className="w-20 shrink-0 font-bold text-ink-muted">稼働</dt>
            <dd className="text-navy-900">{job.workDays}</dd>
          </div>
        )}
      </dl>
      <p className="mt-5 text-sm font-bold text-brand-600">
        募集要項を見る <span aria-hidden="true">→</span>
      </p>
    </Link>
  );
}

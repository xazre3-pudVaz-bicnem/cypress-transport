import Link from "next/link";
import type { Job } from "@/data/jobs";
import { jobLocationLabel } from "@/lib/jobs";

/**
 * 求人一覧・トップページで使う求人カード。
 * 未確定（null）の項目は表示しない。
 */
export function JobCard({ job }: { job: Job }) {
  return (
    <Link
      href={`/recruit/jobs/${job.slug}`}
      className="group block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-400 hover:shadow-lg"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-600">
          {jobLocationLabel(job)}
        </span>
        {job.employmentTypeLabel && (
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {job.employmentTypeLabel}
          </span>
        )}
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
          募集中
        </span>
      </div>
      <h3 className="mt-4 text-lg font-bold leading-snug text-navy-900 transition group-hover:text-brand-600">
        {job.title}
      </h3>
      <dl className="mt-4 space-y-1.5 text-sm">
        {job.salary && (
          <div className="flex gap-3">
            <dt className="w-16 shrink-0 font-semibold text-slate-500">報酬</dt>
            <dd className="text-navy-900">{job.salary.text}</dd>
          </div>
        )}
        {job.deliveryArea && (
          <div className="flex gap-3">
            <dt className="w-16 shrink-0 font-semibold text-slate-500">
              配送エリア
            </dt>
            <dd className="text-navy-900">{job.deliveryArea}</dd>
          </div>
        )}
        {job.workDays && (
          <div className="flex gap-3">
            <dt className="w-16 shrink-0 font-semibold text-slate-500">稼働</dt>
            <dd className="text-navy-900">{job.workDays}</dd>
          </div>
        )}
      </dl>
      <p className="mt-5 text-sm font-bold text-brand-600">
        詳細を見る <span aria-hidden="true">→</span>
      </p>
    </Link>
  );
}

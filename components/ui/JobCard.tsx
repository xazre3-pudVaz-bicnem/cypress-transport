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
      className="group block border border-ink-900/15 bg-white p-6 transition-colors hover:border-ink-900"
    >
      <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
        <span className="bg-ink-900 px-2.5 py-1 text-white">
          {jobLocationLabel(job)}
        </span>
        {job.employmentTypeLabel && (
          <span className="border border-ink-900/25 px-2.5 py-1 text-ink-500">
            {job.employmentTypeLabel}
          </span>
        )}
        <span className="border border-accent px-2.5 py-1 text-accent-dark">
          募集中
        </span>
      </div>
      <h3 className="mt-4 text-lg font-bold leading-snug text-ink-900 transition-colors group-hover:text-accent-dark">
        {job.title}
      </h3>
      <dl className="mt-4 space-y-2 border-t border-ink-900/15 pt-4 text-sm">
        {job.salary && (
          <div className="flex gap-4">
            <dt className="w-20 shrink-0 font-bold text-ink-500">報酬</dt>
            <dd className="text-ink-900">{job.salary.text}</dd>
          </div>
        )}
        {job.deliveryArea && (
          <div className="flex gap-4">
            <dt className="w-20 shrink-0 font-bold text-ink-500">配送エリア</dt>
            <dd className="text-ink-900">{job.deliveryArea}</dd>
          </div>
        )}
        {job.workDays && (
          <div className="flex gap-4">
            <dt className="w-20 shrink-0 font-bold text-ink-500">稼働</dt>
            <dd className="text-ink-900">{job.workDays}</dd>
          </div>
        )}
      </dl>
      <p className="mt-5 text-sm font-bold text-accent-dark">
        募集要項を見る <span aria-hidden="true">→</span>
      </p>
    </Link>
  );
}

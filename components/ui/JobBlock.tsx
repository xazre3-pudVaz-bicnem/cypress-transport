import Link from "next/link";
import Image from "next/image";
import type { Job } from "@/data/jobs";
import { jobLocationLabel } from "@/lib/jobs";
import { photos } from "@/data/images";

/**
 * 求人の見せ方。よくある求人サイトのカードではなく、
 * 写真と大きな数字を組み合わせた採用ブロックにしている。
 * 表示している条件は data/jobs.ts が唯一の出どころで、
 * 求人詳細ページおよび JobPosting 構造化データと必ず一致する。
 */
export function JobBlock({ job }: { job: Job }) {
  return (
    <article className="overflow-hidden bg-ink-900 text-white">
      <div className="grid lg:grid-cols-[1fr_0.85fr]">
        <div className="order-2 p-8 md:p-12 lg:order-1">
          <p className="flex items-center gap-3 text-[11px] font-bold tracking-[0.22em] text-accent">
            <span aria-hidden="true" className="h-2 w-2 bg-accent" />
            NOW HIRING
          </p>

          <h3 className="mt-5 text-[1.6rem] font-bold leading-snug tracking-tight md:text-[2rem]">
            {job.title}
          </h3>
          <p className="mt-3 text-sm text-slate-300">
            {jobLocationLabel(job)}
            {job.employmentTypeLabel && ` ／ ${job.employmentTypeLabel}`}
          </p>

          {/* 確定条件を数字で見せる */}
          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-6 border-t border-white/15 pt-7">
            {job.salary && (
              <div>
                <dt className="stat-label text-accent">日額保証</dt>
                <dd className="mt-1.5 flex items-baseline gap-1.5">
                  <span className="stat-figure">20,000</span>
                  <span className="stat-unit text-slate-300">円 / 日</span>
                </dd>
              </div>
            )}
            <div>
              <dt className="stat-label text-accent">ロイヤリティ</dt>
              <dd className="mt-1.5 flex items-baseline gap-1.5">
                <span className="stat-figure">0</span>
                <span className="stat-unit text-slate-300">円</span>
              </dd>
            </div>
            {job.workHours && (
              <div>
                <dt className="stat-label text-accent">勤務時間</dt>
                <dd className="mt-1.5 text-2xl font-bold tabular-nums md:text-[2rem]">
                  {job.workHours}
                </dd>
              </div>
            )}
          </dl>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href={`/recruit/jobs/${job.slug}`} className="btn-accent">
              募集要項を見る
            </Link>
            <Link href={`/contact?job=${job.slug}`} className="btn-outline-light">
              応募・相談する
            </Link>
          </div>
        </div>

        <div className="relative order-1 min-h-[220px] lg:order-2 lg:min-h-full">
          <Image
            src={photos.logisticsCenter.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </article>
  );
}

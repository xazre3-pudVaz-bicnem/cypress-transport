import { jobs, type Job } from "@/data/jobs";
import { getArea } from "@/data/areas";
import type { AreaSlug } from "@/data/areas";

/** 募集中の求人（一覧・sitemap・トップ表示に使用） */
export function getOpenJobs(): Job[] {
  return jobs.filter((j) => j.status === "open");
}

/** ページを生成する求人（open + closed。draftは404） */
export function getPublishedJobs(): Job[] {
  return jobs.filter((j) => j.status === "open" || j.status === "closed");
}

export function getJob(slug: string): Job | undefined {
  return jobs.find((j) => j.slug === slug);
}

export function getOpenJobsByArea(areaSlug: AreaSlug): Job[] {
  return getOpenJobs().filter((j) => j.area === areaSlug);
}

/** 求人の勤務地表示用ラベル（例: "東京都葛飾区"） */
export function jobLocationLabel(job: Job): string {
  const area = getArea(job.area);
  return `${area.prefecture}${area.name}`;
}

/**
 * JobPosting 構造化データの完全性ゲート。
 *
 * Google の JobPosting 必須プロパティ
 * （title / description / datePosted / employmentType /
 *   jobLocation / baseSalary / hiringOrganization / identifier）を
 * すべて満たす場合のみ true。
 *
 * validThrough は含めていない。Google は「求人に期限がない場合は
 * validThrough を指定しない」ことを推奨しており、
 * 期限を決めていないのに架空の終了日を入れるほうが問題になるため。
 * 実際に募集終了日が決まっている求人だけ validThrough を設定する。
 *
 * false の求人にはページ上に JobPosting JSON-LD を一切出力しない。
 * 中途半端なデータで構造化データを出すと Search Console でエラーになり、
 * 求人検索への掲載可否にも悪影響があるため。
 */
export function isJobPostingComplete(job: Job): boolean {
  if (job.status !== "open") return false;
  return Boolean(
    job.title &&
      job.description &&
      job.datePosted &&
      job.employmentType &&
      job.employmentType.length > 0 &&
      job.salary &&
      job.salary.schema &&
      job.id
  );
}

/** validThrough を過ぎた open 求人を検出（運用アラート用） */
export function getExpiredOpenJobs(today = new Date()): Job[] {
  const iso = today.toISOString().slice(0, 10);
  return getOpenJobs().filter(
    (j) => j.validThrough !== null && j.validThrough < iso
  );
}

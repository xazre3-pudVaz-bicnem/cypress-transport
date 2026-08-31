import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { JobCard } from "@/components/ui/JobCard";
import { CtaSection } from "@/components/ui/CtaSection";
import { getOpenJobs } from "@/lib/jobs";
import { photos } from "@/data/images";

export const metadata: Metadata = buildMetadata({
  title: "募集中の軽貨物ドライバー求人一覧",
  description:
    "株式会社サイプレス軽貨物事業部で現在募集中の軽貨物ドライバー求人一覧です。東京東部・千葉北西部・埼玉東部エリアの求人を掲載しています。",
  path: "/recruit/jobs",
});

/**
 * 求人一覧ページ。
 * 注意: JobPosting 構造化データは個別求人ページのみに実装し、
 * 一覧ページには入れない（Googleガイドライン準拠）。
 */
export default function JobsPage() {
  const openJobs = getOpenJobs();

  return (
    <>
      <PageHero
        label="Jobs"
        title="募集中の求人一覧"
        description="現在募集中の軽貨物ドライバー求人です。勤務地・条件は求人ごとに異なります。"
        photo={photos.warehouse}
      />
      <Breadcrumbs
        items={[
          { name: "ホーム", path: "/" },
          { name: "ドライバー採用", path: "/recruit" },
          { name: "求人一覧" },
        ]}
      />

      <section className="section-pad bg-slate-50">
        <div className="container-site">
          {openJobs.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {openJobs.map((job) => (
                <JobCard key={job.slug} job={job} />
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 text-center md:p-12">
              <p className="text-lg font-bold text-navy-900">
                現在、次回の求人公開を準備中です。
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                軽貨物事業部は立ち上げ準備中のため、求人情報は順次公開していきます。
                募集開始のご案内を希望される方は、お問い合わせフォームから
                「募集開始の連絡希望」とご希望のエリアをお送りください。
                募集開始時に優先的にご案内いたします。
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/contact" className="btn-primary">
                  募集開始の連絡を受け取る
                </Link>
                <Link href="/recruit" className="btn-secondary">
                  採用情報を見る
                </Link>
              </div>
            </div>
          )}

          <div className="mx-auto mt-12 max-w-2xl rounded-xl bg-white p-6 text-center">
            <p className="text-sm leading-relaxed text-slate-600">
              応募前の疑問は
              <Link href="/recruit/faq" className="mx-1 font-bold text-brand-600 underline-offset-4 hover:underline">
                よくある質問
              </Link>
              や
              <Link href="/column" className="mx-1 font-bold text-brand-600 underline-offset-4 hover:underline">
                お役立ちコラム
              </Link>
              でも解説しています。
            </p>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}

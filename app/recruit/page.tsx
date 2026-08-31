import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { JobCard } from "@/components/ui/JobCard";
import { CtaSection } from "@/components/ui/CtaSection";
import { PhotoFrame } from "@/components/ui/Photo";
import { photos } from "@/data/images";
import { getOpenJobs } from "@/lib/jobs";
import { recruitFaq } from "@/data/faq";
import { areas } from "@/data/areas";
import { company } from "@/data/site";

export const metadata: Metadata = buildMetadata({
  title: "軽貨物ドライバー求人｜東京・千葉・埼玉",
  description:
    "軽貨物ドライバー求人なら株式会社サイプレス。東京東部・千葉北西部・埼玉東部エリアで募集中。未経験歓迎、契約条件はすべて書面で明示。応募前の相談も受け付けています。",
  path: "/recruit",
});

const fitPoints = [
  "運転が好きで、安全運転を続けられる方",
  "ひとりで黙々と取り組む仕事が好きな方",
  "段取りや時間管理を考えるのが得意な方",
  "お客様への丁寧な対応を大切にできる方",
  "未経験から手に職をつけたい方",
];

const steps = [
  { title: "応募・相談", body: "フォームまたはお電話でご連絡ください。" },
  { title: "面談", body: "仕事内容と条件をすべて書面でご説明します。" },
  { title: "契約・準備", body: "契約内容の確認と稼働に必要な準備を進めます。" },
  { title: "稼働開始", body: "準備が整い次第、業務スタートです。" },
];

export default function RecruitPage() {
  const openJobs = getOpenJobs();

  return (
    <>
      <PageHero
        label="Recruit"
        title="軽貨物ドライバー採用情報"
        description="葛飾区を拠点に、東京東部・千葉北西部・埼玉東部エリアで一緒に働く軽貨物ドライバーを募集しています。未経験の方も歓迎です。"
        photo={photos.loading}
      />
      <Breadcrumbs
        items={[
          { name: "ホーム", path: "/" },
          { name: "ドライバー採用" },
        ]}
      />

      {/* サイプレスの軽貨物事業について */}
      <section className="section-pad bg-white">
        <div className="container-site grid items-start gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              label="About Us"
              title="サイプレスの軽貨物事業について"
            />
            <PhotoFrame
              photo={photos.fleet}
              ratio="aspect-[4/3]"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="mt-8"
            />
          </div>
          <div className="space-y-4 text-sm leading-relaxed text-slate-600 md:text-[15px]">
            <p>
              {company.name}は、東京都葛飾区を拠点とする軽貨物運送会社です。
              軽貨物事業部は新しく立ち上がったばかりの事業部であり、これから配送網とチームを一緒に作っていく仲間を探しています。
            </p>
            <p>
              立ち上げ期だからこそ、一人ひとりのドライバーと向き合い、働き方や条件について丁寧に話し合うことを大切にしています。
              「大きな組織の歯車ではなく、事業の立ち上げに関わりたい」という方には、面白いタイミングです。
            </p>
            <p>
              仕事の様子は
              <a
                href={company.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-1 font-bold text-brand-600 underline-offset-4 hover:underline"
              >
                Instagram
              </a>
              でも発信していきます。
            </p>
          </div>
        </div>
      </section>

      {/* どんな仕事か */}
      <section className="section-pad bg-slate-50">
        <div className="container-site">
          <SectionHeading label="Job" title="どんな仕事？" />
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <PhotoFrame
                photo={photos.appScan}
                ratio="aspect-[16/9]"
                rounded=""
                sizes="(min-width: 1024px) 60vw, 100vw"
              />
              <div className="p-7 md:p-9">
              <p className="text-sm leading-relaxed text-slate-600 md:text-[15px]">
                軽バン（軽貨物自動車）を使って、荷物を集荷拠点から届け先までお届けする仕事です。
                普通自動車免許があれば従事でき、中型・大型免許は必要ありません。
                担当する案件のタイプ（宅配・企業配など）によって、1日の流れや働き方は変わります。
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  "集荷拠点での荷物の積み込み",
                  "担当エリアでの配達",
                  "再配達・不在対応（案件による）",
                  "アプリ・端末での配完報告",
                ].map((t) => (
                  <li
                    key={t}
                    className="flex items-center gap-2.5 rounded-lg bg-brand-50 px-4 py-3 text-sm font-semibold text-navy-900"
                  >
                    <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                    {t}
                  </li>
                ))}
              </ul>
              <Link
                href="/recruit/about-driver"
                className="mt-6 inline-block text-sm font-bold text-brand-600 underline-offset-4 hover:underline"
              >
                軽貨物ドライバーの仕事を詳しく見る →
              </Link>
              </div>
            </div>
            <div className="rounded-2xl bg-navy-950 p-7 md:p-9">
              <h3 className="text-base font-bold text-white">
                こんな方に向いています
              </h3>
              <ul className="mt-5 space-y-3">
                {fitPoints.map((t) => (
                  <li key={t} className="flex gap-2.5 text-sm leading-relaxed text-slate-300">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 条件・報酬について（誠実さで差別化） */}
      <section className="section-pad bg-white">
        <div className="container-site max-w-4xl">
          <SectionHeading
            label="Conditions"
            title="報酬・契約条件について"
            align="center"
          />
          <Reveal>
            <div className="mt-10 rounded-2xl border-2 border-brand-600/20 bg-brand-50 p-7 md:p-10">
              <p className="text-sm leading-relaxed text-navy-900 md:text-[15px]">
                報酬体系・稼働時間・費用負担などの条件は、
                <strong className="font-bold">案件・求人ごとに異なります。</strong>
                当社では誇張した「月収◯◯万円可能」といった表現は使わず、
                各求人ページに実際の条件を記載し、
                <strong className="font-bold">
                  面談時にすべての条件を書面でご説明する
                </strong>
                ことをお約束します。
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                応募前に確認しておきたいポイントは、コラム
                <Link
                  href="/column/contract-check"
                  className="mx-1 font-bold text-brand-600 underline-offset-4 hover:underline"
                >
                  「応募前に確認すべき契約条件チェックリスト」
                </Link>
                にまとめています。他社の求人と比較する際にもご活用ください。
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 募集中の求人 */}
      <section className="section-pad bg-slate-50">
        <div className="container-site">
          <SectionHeading label="Open Positions" title="募集中の求人" />
          {openJobs.length > 0 ? (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {openJobs.map((job) => (
                <JobCard key={job.slug} job={job} />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 text-center md:p-10">
              <p className="text-base font-bold text-navy-900">
                現在、次回の求人公開を準備中です。
              </p>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-600">
                募集開始時にご案内を受け取りたい方は、お問い合わせフォームから「募集開始の連絡希望」とお送りください。
              </p>
              <Link href="/contact" className="btn-primary mt-6">
                募集開始の連絡を受け取る
              </Link>
            </div>
          )}
          <div className="mt-8 text-center">
            <Link
              href="/recruit/jobs"
              className="text-sm font-bold text-brand-600 underline-offset-4 hover:underline"
            >
              求人一覧ページへ →
            </Link>
          </div>
        </div>
      </section>

      {/* 採用エリア */}
      <section className="section-pad bg-white">
        <div className="container-site">
          <SectionHeading label="Area" title="採用エリア" />
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600">
            以下のエリアからの応募を歓迎しています。勤務地・配送エリアは求人ごとに異なります。
          </p>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {areas.map((a) => (
              <span
                key={a.slug}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  a.priority === "primary"
                    ? "bg-navy-900 text-white"
                    : "bg-slate-100 text-navy-900"
                }`}
              >
                {a.name}
              </span>
            ))}
          </div>
          <Link
            href="/recruit/area"
            className="mt-6 inline-block text-sm font-bold text-brand-600 underline-offset-4 hover:underline"
          >
            採用エリアの詳細を見る →
          </Link>
        </div>
      </section>

      {/* 応募から稼働開始まで */}
      <section className="section-pad bg-navy-950">
        <div className="container-site">
          <SectionHeading label="Flow" title="応募から稼働開始まで" light />
          <ol className="mt-10 grid gap-5 md:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 100}>
                <li className="h-full rounded-2xl border border-white/10 bg-white/5 p-6">
                  <span className="label-en text-brand-300">
                    Step {i + 1}
                  </span>
                  <h3 className="mt-2 text-base font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-300">
                    {step.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
          <div className="mt-8 text-center">
            <Link
              href="/recruit/flow"
              className="text-sm font-bold text-brand-300 underline-offset-4 hover:underline"
            >
              流れの詳細を見る →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad bg-white">
        <div className="container-site max-w-4xl">
          <SectionHeading label="FAQ" title="よくある質問" align="center" />
          <div className="mt-10 space-y-3">
            {recruitFaq.slice(0, 5).map((item) => (
              <details
                key={item.q}
                className="group rounded-xl border border-slate-200"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-4 text-sm font-bold text-navy-900 marker:content-none [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span aria-hidden="true" className="text-brand-600 transition group-open:rotate-45">
                    ＋
                  </span>
                </summary>
                <p className="px-6 pb-5 text-sm leading-relaxed text-slate-600">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/recruit/faq"
              className="text-sm font-bold text-brand-600 underline-offset-4 hover:underline"
            >
              すべての質問を見る →
            </Link>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}

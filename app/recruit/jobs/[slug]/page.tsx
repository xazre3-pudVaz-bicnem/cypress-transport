import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { CtaSection } from "@/components/ui/CtaSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoFrame } from "@/components/ui/Photo";
import { Steps, NumberedList } from "@/components/ui/Layouts";
import { jobPostingJsonLd } from "@/lib/jsonld";
import { getJob, getPublishedJobs, jobLocationLabel } from "@/lib/jobs";
import { formatDateJa } from "@/lib/utils";
import { company } from "@/data/site";
import { photos } from "@/data/images";
import {
  paySimulation,
  UNIT_PRICE,
  MIN_DAILY_GUARANTEE,
} from "@/data/recruit-conditions";
import { visibleFaq } from "@/data/faq";
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
    title: `${jobLocationLabel(job)}の${job.title}求人`,
    description: `${jobLocationLabel(job)}で軽貨物配送ドライバーを募集。${
      job.salary ? `${job.salary.text}。` : ""
    }${job.employmentTypeLabel ?? ""}。募集要項と応募方法をご案内します。`,
    path: `/recruit/jobs/${job.slug}`,
  });
}

/** 確定している項目だけを募集要項の行に変換する */
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
  // 募集終了日は決まっている場合のみ表示（架空の期限を出さない）
  push("募集終了日", job.validThrough ? formatDateJa(job.validThrough) : null);
  push("求人ID", job.id);
  return rows;
}

const dayFlow = [
  { title: "拠点で荷物を受け取る", body: "集荷拠点で当日の荷物を受け取り、配達順を考えながら車両に積み込みます。ここでの積み方が、その日の効率を大きく左右します。" },
  { title: "ルートを組む", body: "届け先の位置と時間指定を見ながら、回る順番を決めます。地理を覚えるほど組み立てが速くなります。" },
  { title: "担当エリアを回る", body: "対面、置き配、宅配ボックスなど、案件で決められた方法でお届けします。" },
  { title: "完了を報告する", body: "端末やアプリで配達完了を報告して、その日の業務は終了です。" },
];

const fitPoints = [
  { title: "ひとりで進める仕事が苦にならない", body: "配送中は基本的にひとりです。自分で段取りを決めて動くほうが性に合う方に向いています。" },
  { title: "安全運転を毎日続けられる", body: "1日を通して公道を走ります。速さより、事故を起こさないことが結果的に収入を守ります。" },
  { title: "段取りを考えるのが好き", body: "積み込みの順番、回るルート、時間指定の組み方。工夫がそのまま成果に返ってきます。" },
  { title: "立ち上げに関わるのが面白いと思える", body: "配送網とチームをこれからつくる段階です。整っていない部分も一緒に考えてくれる方を探しています。" },
];

const applySteps = [
  { title: "ご応募・お問い合わせ", body: "応募フォーム、お電話、InstagramのDMからご連絡ください。ご希望のエリアと稼働イメージを伺います。" },
  { title: "条件のご説明", body: "仕事内容と契約条件をご説明します。報酬の計算と支払日、費用の負担区分、契約形態など、判断に必要な内容を書面で確認いただけるようにします。" },
  { title: "ご検討・ご契約", body: "内容にご納得いただけた場合に契約手続きへ進みます。その場での即決をお願いすることはありません。" },
  { title: "稼働の準備", body: "車両の手配を進めます。ご自身の車両を使う場合は事業用ナンバー（黒ナンバー）の取得と事業用保険の加入が必要です。" },
  { title: "稼働開始", body: "準備が整い次第、業務を開始します。開始後の相談も随時受け付けます。" },
];

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
        { name: "ドライバー募集", path: "/recruit" },
        { name: "募集要項", path: "/recruit/jobs" },
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
            <p className="inline-block border border-ink-900/25 px-3 py-1 text-xs font-bold text-ink-500">
              募集終了
            </p>
            <h1 className="mt-5 text-2xl font-bold leading-snug text-ink-900 md:text-3xl">
              {job.title}
            </h1>
            <p className="mt-6 body-text">
              この求人の募集は終了しました。現在募集中の求人、または今後の募集のご案内をご希望の方は、下記からご確認ください。
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/recruit/jobs" className="btn-accent">
                現在募集中の求人を見る
              </Link>
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
  const jsonLd = jobPostingJsonLd(job);
  const jobFaq = visibleFaq
    .filter((f) => f.category === "募集状況・応募について" && f.scope === "company")
    .slice(0, 5);

  return (
    <>
      {jsonLd && <JsonLd data={jsonLd} />}
      {breadcrumbs}

      <article>
        {/* ヒーロー */}
        <header className="relative isolate overflow-hidden bg-ink-900">
          <div aria-hidden="true" className="absolute inset-0">
            <Image
              src={photos.logisticsCenter.src}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-[70%_center]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/85 to-ink-900/45 md:bg-gradient-to-r md:from-ink-900 md:via-ink-900/85 md:to-ink-900/30" />
          </div>

          <div className="container-site relative py-14 md:py-20">
            <p className="flex items-center gap-3 text-[11px] font-bold tracking-[0.22em] text-accent">
              <span aria-hidden="true" className="h-2 w-2 bg-accent" />
              NOW HIRING
            </p>
            <h1 className="mt-5 text-[1.9rem] font-bold leading-[1.3] tracking-[-0.02em] text-white md:text-[3rem]">
              {job.title}
            </h1>
            <p className="mt-4 text-sm text-slate-300 md:text-base">
              {jobLocationLabel(job)}
              {job.employmentTypeLabel && ` ／ ${job.employmentTypeLabel}`}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href={`/contact?job=${job.slug}`}
                event="click_apply"
                eventParams={{ location: "job_header", job_id: job.id }}
                className="btn-accent"
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

        {/* 報酬 */}
        {job.salary && (
          <section className="border-b border-ink-900/10 bg-ink-800 text-white">
            <div className="container-site py-14 md:py-16">
              <SectionHeading title="報酬" light />
              <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1fr] lg:gap-16">
                <div>
                  <dl className="flex flex-wrap gap-x-12 gap-y-8">
                    <div>
                      <dt className="stat-label text-accent">1個あたり</dt>
                      <dd className="mt-2 flex items-baseline gap-1.5">
                        <span className="stat-figure">{UNIT_PRICE}</span>
                        <span className="stat-unit text-slate-300">円以上</span>
                      </dd>
                    </div>
                    <div>
                      <dt className="stat-label text-accent">最低保証</dt>
                      <dd className="mt-2 flex items-baseline gap-1.5">
                        <span className="stat-figure">
                          {MIN_DAILY_GUARANTEE.toLocaleString("ja-JP")}
                        </span>
                        <span className="stat-unit text-slate-300">円 / 日</span>
                      </dd>
                    </div>
                    <div>
                      <dt className="stat-label text-accent">ロイヤリティ</dt>
                      <dd className="mt-2 flex items-baseline gap-1.5">
                        <span className="stat-figure">0</span>
                        <span className="stat-unit text-slate-300">円</span>
                      </dd>
                    </div>
                  </dl>
                  <p className="mt-8 text-sm leading-[1.95] text-slate-300">
                    配達1個あたり160円以上の出来高制です。その日の出来高が15,000円を下回った場合も日額15,000円をお支払いするため、収入が落ち込みません。報酬からロイヤリティやシステム利用料を差し引くこともしていません。
                  </p>
                </div>

                {/* 報酬シミュレーション */}
                <div>
                  <p className="text-[11px] font-bold tracking-[0.18em] text-accent">
                    月間報酬の下限（最低保証ベース）
                  </p>
                  <table className="mt-4 w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-white/25 text-left">
                        <th scope="col" className="py-2.5 font-bold text-white">
                          稼働日数
                        </th>
                        <th scope="col" className="py-2.5 text-right font-bold text-white">
                          月間報酬の下限
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paySimulation.map((row) => (
                        <tr key={row.days} className="border-b border-white/15">
                          <th scope="row" className="py-3.5 text-left font-bold text-slate-300">
                            月{row.days}日
                          </th>
                          <td className="py-3.5 text-right">
                            <span className="text-xl font-bold tabular-nums text-white md:text-2xl">
                              {row.total.toLocaleString("ja-JP")}
                            </span>
                            <span className="ml-1 text-sm text-slate-300">
                              円〜
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="mt-4 text-[13px] leading-[1.85] text-slate-400">
                    最低保証の日額15,000円に稼働日数を掛けた「下限」の金額です。実際は1個160円以上の出来高で計算するため、配達個数が伸びればこれを上回ります。業務委託契約のため給与ではなく報酬であり、燃料費など経費を差し引く前の金額です。実際の稼働日数は案件により異なります。
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 募集要項 */}
        <section className="section-pad bg-white">
          <div className="container-site max-w-4xl">
            <SectionHeading title="募集要項" />
            <table className="spec-table mt-9">
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className="flex flex-col sm:table-row">
                    <th scope="row">{row.label}</th>
                    <td className="whitespace-pre-line">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-8 border-l-2 border-accent bg-accent-soft py-4 pl-5 pr-6 text-[13px] leading-[1.95] text-ink-900">
              上記に記載のない条件（稼働日数・休日・経費の負担区分・研修など）は、ご相談・面談の際にご説明します。決まっていない条件を、決まったようにお伝えすることはしません。
            </p>
          </div>
        </section>

        {/* 仕事内容・1日の流れ */}
        <section className="border-y border-ink-900/10 bg-paper">
          <div className="container-site py-16 md:py-20">
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-16">
              <div>
                <SectionHeading
                  title="1日の流れ"
                  lead="軽バンで荷物を運ぶ仕事です。基本のサイクルはどの案件でも共通しています。"
                />
                <PhotoFrame
                  photo={photos.cargoStacked}
                  ratio="aspect-[16/9]"
                  rounded="rounded-[3px]"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="mt-8"
                />
              </div>
              <Steps items={dayFlow} />
            </div>
          </div>
        </section>

        {/* 向いている人 */}
        <section className="section-pad bg-white">
          <div className="container-site">
            <SectionHeading title="こんな方に向いています" />
            <div className="mt-10">
              <NumberedList items={fitPoints} />
            </div>
          </div>
        </section>

        {/* 契約前に知ってほしいこと */}
        <section className="bg-ink-900">
          <div className="container-site py-16 md:py-20">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
              <SectionHeading title="契約の前に知ってほしいこと" light />
              <div className="space-y-5 text-[15px] leading-[2] text-slate-300">
                <p>
                  この求人は業務委託契約です。個人事業主として業務を請け負う形になり、雇用契約とは仕組みが根本的に違います。最低賃金・残業代・有給休暇といった労働基準法の保護の対象外となり、確定申告や保険の手続きはご自身で行っていただきます。
                </p>
                <p>
                  また、軽貨物は最初の1〜3ヶ月が道と段取りを覚える期間になるのが一般的です。出来高が伸びるまでは時間がかかりますが、日額15,000円の最低保証があるため、その間も収入が落ち込まない設計にしています。
                </p>
                <p>
                  応募前に確認しておきたい項目は
                  <Link
                    href="/column/contract-check"
                    className="mx-1 font-bold text-accent underline-offset-4 hover:underline"
                  >
                    契約条件チェックリスト
                  </Link>
                  にまとめています。当社に限らず、どの会社を検討する際にもお使いください。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 応募から稼働まで */}
        <section className="section-pad bg-paper">
          <div className="container-site">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.4fr] lg:gap-16">
              <SectionHeading
                title="応募から稼働まで"
                lead="所要期間は車両の準備状況によって変わります。"
              />
              <Steps items={applySteps} />
            </div>
          </div>
        </section>

        {/* FAQ */}
        {jobFaq.length > 0 && (
          <section className="section-pad bg-white">
            <div className="container-site max-w-4xl">
              <SectionHeading title="この求人についてよくある質問" />
              <dl className="mt-9 border-t border-ink-900/15">
                {jobFaq.map((item) => (
                  <div
                    key={item.q}
                    className="grid gap-2 border-b border-ink-900/15 py-6 md:grid-cols-[1fr_1.6fr] md:gap-10"
                  >
                    <dt className="text-[15px] font-bold leading-snug text-ink-900">
                      {item.q}
                    </dt>
                    <dd className="text-sm leading-[1.95] text-ink-500">
                      {item.a}
                    </dd>
                  </div>
                ))}
              </dl>
              <Link href="/recruit/faq" className="link-arrow mt-8">
                すべての質問を見る
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </section>
        )}
      </article>

      <CtaSection
        title="この求人に応募する"
        description="ご希望のエリアと稼働イメージを伺います。募集要項に書かれていない点のご質問だけでも構いません。"
      />
    </>
  );
}

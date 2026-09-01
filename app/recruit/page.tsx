import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoFrame } from "@/components/ui/Photo";
import { SplitSection, NumberedList, Steps } from "@/components/ui/Layouts";
import { JobCard } from "@/components/ui/JobCard";
import { CtaSection } from "@/components/ui/CtaSection";
import { getOpenJobs } from "@/lib/jobs";
import { visibleFaq } from "@/data/faq";
import { areas } from "@/data/areas";
import { company, serviceAreaLabel } from "@/data/site";
import { photos } from "@/data/images";
import { recruitCopy, recruitPhase } from "@/data/recruit-status";
import { confirmedConditions } from "@/data/recruit-conditions";
import { driverInterviews } from "@/data/interviews";

export const metadata: Metadata = buildMetadata({
  title: "軽貨物ドライバーの採用について｜東京・千葉・埼玉",
  description:
    "軽貨物ドライバー募集。業務委託・日額20,000円保証・ロイヤリティなし、未経験可・AT限定可・車両リース手配可。東京東部・千葉北西部・埼玉東部エリアで、株式会社サイプレス軽貨物事業部と一緒に配送網をつくるドライバーを探しています。",
  path: "/recruit",
});

const fitPoints = [
  {
    title: "ひとりで進める仕事が苦にならない",
    body: "配送中は基本的にひとりです。人に指示されながら動くより、自分で段取りを決めて進めるほうが性に合う方に向いています。",
  },
  {
    title: "安全運転を毎日続けられる",
    body: "1日を通して公道を走り続ける仕事です。速さより、事故を起こさないことのほうが結果的に収入を守ります。",
  },
  {
    title: "段取りを考えるのが好き",
    body: "積み込みの順番、回るルート、時間指定の組み方。工夫がそのまま成果に返ってくるのがこの仕事の面白さです。",
  },
  {
    title: "立ち上げに関わることを面白いと思える",
    body: "できあがった仕組みに入るのではなく、配送網とチームをこれからつくる段階です。整っていない部分も一緒に考えてくれる方を探しています。",
  },
];

const steps = [
  {
    title: "ご相談・お問い合わせ",
    body: "フォームまたはお電話でご連絡ください。ご希望のエリア、稼働できる曜日や時間帯、車両をお持ちかどうかを伺います。",
    note: "この時点で応募を確定するものではありません。",
  },
  {
    title: "条件のご説明",
    body: "仕事内容と契約条件をご説明します。報酬の計算方法、費用の負担区分、契約形態など、ご判断に必要な内容を書面で確認いただけるようにします。",
  },
  {
    title: "ご検討・ご契約",
    body: "内容にご納得いただけた場合に契約手続きへ進みます。その場での即決をお願いすることはありません。",
  },
  {
    title: "稼働の準備",
    body: "車両の手配、業務委託契約の場合は事業用ナンバー（黒ナンバー）の取得や保険の加入など、稼働に必要な準備を進めます。",
  },
  {
    title: "稼働開始",
    body: "準備が整い次第、業務を開始します。開始後の相談も随時受け付けます。",
  },
];

export default function RecruitPage() {
  const openJobs = getOpenJobs();
  const companyFaq = visibleFaq
    .filter((f) => f.category === "募集状況・応募について")
    .slice(0, 4);

  return (
    <>
      <PageHero
        title="軽貨物ドライバーの採用について"
        description={`葛飾区を拠点に、${serviceAreaLabel}エリアで一緒に配送網をつくるドライバーを探しています。`}
        photo={photos.warehouse}
      />
      <Breadcrumbs
        items={[{ name: "ホーム", path: "/" }, { name: "ドライバー採用" }]}
      />

      {/* 現在の採用状況 — ページ冒頭で状況を明示する */}
      <section className="border-b border-ink-900/15 bg-white">
        <div className="container-site py-12 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:gap-16">
            <div className="lg:w-64">
              <SectionHeading title={recruitCopy.statusHeading} />
              <p className="mt-5 inline-flex items-center gap-2 border border-accent px-3.5 py-1.5 text-xs font-bold text-accent-text">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-accent"
                />
                {recruitCopy.badge}
              </p>
            </div>
            <div>
              <div className="space-y-4 body-text">
                {recruitCopy.statusBody.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              {recruitPhase === "open" && openJobs.length > 0 && (
                <div className="mt-8 grid gap-5 md:grid-cols-2">
                  {openJobs.map((job) => (
                    <JobCard key={job.slug} job={job} />
                  ))}
                </div>
              )}
              <div className="mt-8">
                <Link href={recruitCopy.secondaryCta.href} className="btn-accent">
                  {recruitCopy.secondaryCta.label}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* なぜドライバーを探しているのか */}
      <section className="section-pad bg-white">
        <div className="container-site">
          <SplitSection photo={photos.warehouse} ratio="aspect-[4/5]" reverse>
            <SectionHeading title="なぜ、いまドライバーを探しているのか" />
            <div className="mt-6 space-y-4 body-text">
              <p>
                {company.name}
                の軽貨物事業部は、立ち上がったばかりの事業部です。配送の受け皿をつくり、地域の物流を担えるところまで広げていくには、走ってくれるドライバーが必要です。
              </p>
              <p>
                だからこそ、条件を曖昧にしたまま人数だけ集めることはしたくないと考えています。何をどこまで決められているかを正直にお伝えしたうえで、納得して走ってくれる方と組みたいと思っています。
              </p>
            </div>
          </SplitSection>
        </div>
      </section>

      {/* 仕事内容 */}
      <section className="section-pad bg-white">
        <div className="container-site">
          <SectionHeading
            title="どんな仕事をするのか"
            lead="軽バンで荷物を集荷拠点から届け先まで運ぶ仕事です。基本の流れは共通していますが、担当する案件のタイプによって1日の組み立ては変わります。"
          />
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
              <PhotoFrame
                photo={photos.cargoLoaded}
                ratio="aspect-[16/9]"
                rounded="rounded-[3px]"
                sizes="(min-width: 1024px) 55vw, 100vw"
              />
            </div>
            <ol className="space-y-0 border-t border-ink-900/15">
              {[
                ["拠点で荷物を受け取る", "集荷拠点で当日の荷物を受け取り、配達順を考えながら車両に積み込みます。"],
                ["担当エリアを回る", "ルートを組み立て、届け先を順番に回ります。地理を覚えるほど効率が上がります。"],
                ["指定の方法で届ける", "対面、置き配、宅配ボックスなど、案件で決められた方法で届けます。"],
                ["完了を報告する", "端末やアプリで配達完了を報告して、その日の業務は終了です。"],
              ].map(([title, body], i) => (
                <li
                  key={title}
                  className="flex gap-5 border-b border-ink-900/15 py-5"
                >
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-lg font-black tabular-nums text-accent-text/40"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[15px] font-bold text-ink-900">
                      {title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-[1.95] text-ink-500">
                      {body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <Link href="/recruit/about-driver" className="link-arrow mt-8">
            案件のタイプごとの違いを詳しく見る
          </Link>
        </div>
      </section>

      {/* 向いている人 */}
      <section className="section-pad bg-white">
        <div className="container-site">
          <SectionHeading title="こんな方に向いていると思います" />
          <div className="mt-10">
            <NumberedList items={fitPoints} />
          </div>
          <p className="mt-10 max-w-2xl text-sm leading-[1.95] text-ink-500">
            反対に、常にチームで動きたい方や、毎日決まった時刻に必ず終わる仕事を求める方には、
            軽貨物の働き方は合わないことがあります。
            <Link href="/recruit/benefits" className="link-arrow ml-1">
              メリットと注意点を読む
            </Link>
          </p>
        </div>
      </section>

      {/* 確定している募集条件 */}
      <section className="section-pad bg-white">
        <div className="container-site">
          <SectionHeading
            title="現時点で確定している条件"
            lead="以下は決まっている条件です。記載のない項目は、確定していないため書いていません。"
          />
          <table className="spec-table mt-10">
            <tbody>
              {confirmedConditions.map((c) => (
                <tr key={c.label} className="flex flex-col sm:table-row">
                  <th scope="row">{c.label}</th>
                  <td>
                    <span className="font-bold text-ink-900">{c.value}</span>
                    {c.note && (
                      <span className="mt-1 block text-[13px] text-ink-500">
                        {c.note}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* まだ決まっていないこと（誠実さで差別化する中核セクション） */}
      <section className="bg-ink-900">
        <div className="container-site py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
            <SectionHeading title="まだ決まっていないこと" light />
            <div className="space-y-5 text-[15px] leading-[2] text-slate-300">
              <p>
                稼働日数、休日、経費の負担区分、研修の内容は、案件や個々の稼働スタイルにあわせて決まる部分があり、現時点では一律にお伝えできる形になっていません。そのため、この場に書くことはしていません。
              </p>
              <p>
                これらはご相談・面談の際に、ご希望の稼働イメージを伺ったうえで具体的にご説明します。確定した内容は書面でご確認いただけるようにします。ページに書いていない条件を口頭だけでお約束することはしません。
              </p>
              <p>
                他社の求人を検討される場合も、
                <Link
                  href="/column/contract-check"
                  className="mx-1 font-bold text-accent underline-offset-4 hover:underline"
                >
                  応募前に確認すべき契約条件チェックリスト
                </Link>
                を参考に、報酬・控除・費用負担・弁済・解約の5点を書面で確認することをおすすめします。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ドライバーインタビュー（実際の取材が入るまでは非表示） */}
      {driverInterviews.length > 0 && (
        <section className="section-pad bg-white">
          <div className="container-site">
            <SectionHeading
              title="働いているドライバーの声"
              lead="実際に稼働しているドライバーに話を聞きました。"
            />
            <div className="mt-10 space-y-10">
              {driverInterviews.map((iv) => (
                <article
                  key={iv.slug}
                  className="border-t border-ink-900/15 pt-8"
                >
                  <h3 className="h-sub">
                    {iv.name}
                    {iv.attribute && (
                      <span className="ml-3 text-sm font-normal text-ink-500">
                        {iv.attribute}
                      </span>
                    )}
                  </h3>
                  <p className="mt-3 text-sm leading-[1.95] text-ink-500">
                    {iv.lead}
                  </p>
                  <dl className="mt-6 border-t border-ink-900/15">
                    {iv.qa.map((item) => (
                      <div
                        key={item.q}
                        className="grid gap-2 border-b border-ink-900/15 py-5 md:grid-cols-[1fr_1.6fr] md:gap-10"
                      >
                        <dt className="text-sm font-bold text-ink-900">
                          {item.q}
                        </dt>
                        <dd className="text-sm leading-[1.95] text-ink-500">
                          {item.a}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* エリア */}
      <section className="section-pad bg-white">
        <div className="container-site">
          <SectionHeading
            title="働くエリア"
            lead="以下のエリアからのご相談を受け付けています。実際の勤務地は配送案件によって決まるため、確定したものを求人ごとに公開します。"
          />
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-ink-900/15 pt-8">
            {areas.map((a) => (
              <li
                key={a.slug}
                className={`text-sm ${
                  a.priority === "primary"
                    ? "font-bold text-ink-900"
                    : "text-ink-500"
                }`}
              >
                {a.prefecture}
                {a.name}
              </li>
            ))}
          </ul>
          <Link href="/recruit/area" className="link-arrow mt-8">
            エリアの考え方を詳しく見る
          </Link>
        </div>
      </section>

      {/* 流れ */}
      <section className="section-pad bg-white">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            <div>
              <SectionHeading title="ご相談から稼働開始まで" />
              <p className="mt-5 text-sm leading-[1.95] text-ink-500">
                所要期間は車両の準備状況や案件の状況によって変わります。
              </p>
              <Link href="/recruit/flow" className="link-arrow mt-5">
                各ステップの詳細を見る
              </Link>
            </div>
            <Steps items={steps} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad bg-white">
        <div className="container-site">
          <SectionHeading title="よく聞かれること" />
          <dl className="mt-10 border-t border-ink-900/15">
            {companyFaq.map((item) => (
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
            すべての質問と回答を見る
          </Link>
        </div>
      </section>

      <CtaSection
        title="まずは働き方を聞いてみませんか"
        description="稼働できる曜日、希望エリア、車両の有無をお聞かせください。条件が固まった段階で、合う案件があればご案内します。"
      />
    </>
  );
}

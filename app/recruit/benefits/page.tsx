import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CtaSection } from "@/components/ui/CtaSection";

export const metadata: Metadata = buildMetadata({
  title: "軽貨物ドライバーとして働くメリット",
  description:
    "軽貨物ドライバーという働き方のメリットと注意点を正直に解説。ひとりで働ける、頑張りが反映されやすい、普通免許で始められる——現実とあわせてお伝えします。",
  path: "/recruit/benefits",
});

const merits = [
  {
    title: "普通免許があれば始められる",
    body: "軽自動車を使うため、中型・大型免許は不要。特別な資格やスキルがなくても、安全運転と丁寧な対応ができればスタートラインに立てます。",
  },
  {
    title: "ひとりで進められる仕事",
    body: "配送中は基本的にひとり。人間関係のストレスが少なく、自分のペースで段取りを組みながら黙々と働けるのは、この仕事の大きな魅力です。",
  },
  {
    title: "頑張りが反映されやすい",
    body: "出来高制の案件では、配達効率を上げた分だけ収入に反映されます。ルートの工夫や経験の蓄積が、そのまま自分の力になる仕事です。",
  },
  {
    title: "働き方の選択肢がある",
    body: "案件のタイプ（宅配・企業配・ルート配送など）によって、稼ぎ方も生活リズムも変えられます。自分に合う働き方を選べるのが軽貨物の特徴です。",
  },
  {
    title: "需要が伸び続けている業界",
    body: "EC市場の拡大にともない、ラストワンマイル配送の担い手はますます求められています。長く続けられるスキルと経験が身につきます。",
  },
  {
    title: "立ち上げ期のチームに入れる",
    body: "サイプレスの軽貨物事業部は立ち上げ期。決まりきった組織ではなく、事業とともに自分のポジションを作っていける環境です。",
  },
];

const cautions = [
  "収入は案件・稼働量に左右されます。特に業務委託では、経費を引いた手取りで考える必要があります。",
  "最初の1〜3ヶ月は道を覚える期間で、効率が上がりきらないのが普通です。",
  "業務委託の場合、確定申告・保険・車両管理は自分で行う必要があります。",
];

export default function BenefitsPage() {
  return (
    <>
      <PageHero
        label="Benefits"
        title="軽貨物ドライバーとして働くメリット"
        description="良いことばかりを並べるのではなく、注意点もあわせて正直にお伝えします。納得したうえで一歩を踏み出してください。"
      />
      <Breadcrumbs
        items={[
          { name: "ホーム", path: "/" },
          { name: "ドライバー採用", path: "/recruit" },
          { name: "働くメリット" },
        ]}
      />

      <section className="section-pad bg-white">
        <div className="container-site">
          <SectionHeading label="Merit" title="軽貨物ドライバーの6つのメリット" />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {merits.map((m, i) => (
              <Reveal key={m.title} delay={(i % 3) * 100}>
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                  <span className="label-en">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="mt-3 text-base font-bold text-navy-900">{m.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{m.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-slate-50">
        <div className="container-site max-w-4xl">
          <SectionHeading label="Honestly" title="知っておいてほしい注意点" />
          <p className="mt-5 text-sm leading-relaxed text-slate-600">
            軽貨物ドライバーは「誰でも楽に稼げる仕事」ではありません。
            当社は応募前の段階から、次の現実もお伝えしています。
          </p>
          <ul className="mt-7 space-y-4">
            {cautions.map((c) => (
              <li
                key={c}
                className="flex gap-3 rounded-xl border border-slate-200 bg-white p-5 text-sm leading-relaxed text-slate-700"
              >
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-navy-900" />
                {c}
              </li>
            ))}
          </ul>
          <p className="mt-7 text-sm leading-relaxed text-slate-600">
            こうした注意点への備え方は、
            <Link href="/column" className="mx-1 font-bold text-brand-600 underline-offset-4 hover:underline">
              お役立ちコラム
            </Link>
            で詳しく解説しています。疑問が残る場合は、面談時に何でもご質問ください。
          </p>
        </div>
      </section>

      <CtaSection />
    </>
  );
}

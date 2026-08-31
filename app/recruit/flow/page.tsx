import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { CtaSection } from "@/components/ui/CtaSection";
import { company } from "@/data/site";
import { photos } from "@/data/images";

export const metadata: Metadata = buildMetadata({
  title: "応募から仕事開始までの流れ",
  description:
    "株式会社サイプレスの軽貨物ドライバーに応募してから稼働開始までの流れを解説。応募・面談・条件確認・契約・準備・稼働開始まで、各ステップでやることがわかります。",
  path: "/recruit/flow",
});

const steps = [
  {
    title: "応募・お問い合わせ",
    body: "応募フォームまたはお電話（090-2360-0052）でご連絡ください。「話を聞いてみたい」という段階でも歓迎です。ご希望のエリア・働き方があれば、あわせてお知らせください。",
  },
  {
    title: "面談・条件のご説明",
    body: "仕事内容・報酬体系・費用負担・契約内容など、働くうえで必要な条件をすべて書面でご説明します。疑問点はこの場ですべて解消してください。その場での即決をお願いすることはありません。",
  },
  {
    title: "契約",
    body: "条件にご納得いただけたら契約手続きに進みます。契約書の内容をご自身でも確認したうえで締結してください。",
  },
  {
    title: "稼働準備",
    body: "車両の手配（持ち込み・リース等）、業務委託の場合は黒ナンバーの取得や事業用保険の加入など、稼働に必要な準備を進めます。必要な手続きは面談時にご案内します。",
  },
  {
    title: "稼働開始",
    body: "準備が整い次第、業務スタートです。開始後も、困りごとや相談はいつでも受け付けます。",
  },
];

export default function FlowPage() {
  return (
    <>
      <PageHero
        label="Flow"
        title="仕事開始までの流れ"
        description="応募から稼働開始までのステップをご案内します。所要期間は車両の準備状況などにより異なります。"
        photo={photos.training}
      />
      <Breadcrumbs
        items={[
          { name: "ホーム", path: "/" },
          { name: "ドライバー採用", path: "/recruit" },
          { name: "仕事開始までの流れ" },
        ]}
      />

      <section className="section-pad bg-white">
        <div className="container-site max-w-3xl">
          <ol className="relative space-y-8 border-l-2 border-brand-100 pl-8">
            {steps.map((step, i) => (
              <li key={step.title} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[41px] flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-xs font-black text-white"
                >
                  {i + 1}
                </span>
                <h2 className="text-lg font-bold text-navy-900">{step.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-12 rounded-2xl bg-brand-50 p-6 md:p-8">
            <h2 className="text-base font-bold text-navy-900">
              稼働準備について詳しく知りたい方へ
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/column/kuro-number" className="font-bold text-brand-600 underline-offset-4 hover:underline">
                  黒ナンバーとは？取得の流れ →
                </Link>
              </li>
              <li>
                <Link href="/column/no-vehicle" className="font-bold text-brand-600 underline-offset-4 hover:underline">
                  軽バンを持っていない場合はどうする？ →
                </Link>
              </li>
              <li>
                <Link href="/column/contract-check" className="font-bold text-brand-600 underline-offset-4 hover:underline">
                  応募前に確認すべき契約条件チェックリスト →
                </Link>
              </li>
            </ul>
          </div>

          <p className="mt-8 text-sm leading-relaxed text-slate-600">
            ご不明な点は{company.phone}まで、お気軽にお問い合わせください。
          </p>
        </div>
      </section>

      <CtaSection />
    </>
  );
}

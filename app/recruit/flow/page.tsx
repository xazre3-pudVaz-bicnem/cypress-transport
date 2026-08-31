import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Steps } from "@/components/ui/Layouts";
import { CtaSection } from "@/components/ui/CtaSection";
import { company } from "@/data/site";
import { photos } from "@/data/images";

export const metadata: Metadata = buildMetadata({
  title: "ご相談から稼働開始までの流れ",
  description:
    "株式会社サイプレス軽貨物事業部へご相談いただいてから、稼働を開始するまでの流れをご案内します。各ステップで何を確認し、何を準備するのかをまとめています。",
  path: "/recruit/flow",
});

const steps = [
  {
    title: "ご相談・お問い合わせ",
    body: "フォームまたはお電話（090-2360-0052）、InstagramのDMからご連絡ください。ご希望のエリア、稼働できる曜日や時間帯、車両をお持ちかどうかを伺います。",
    note: "この時点で応募を確定するものではありません。「話を聞いてみたい」だけでも構いません。",
  },
  {
    title: "条件のご説明",
    body: "仕事内容と契約条件をご説明します。報酬の計算方法と支払日、費用の負担区分、契約形態、荷物事故時の扱いなど、判断に必要な内容を書面で確認いただけるようにします。",
    note: "ご質問はこの場ですべて解消してください。答えられないことは「わからない」とお伝えします。",
  },
  {
    title: "ご検討・ご契約",
    body: "内容にご納得いただけた場合に契約手続きへ進みます。契約書はご自身でも内容を確認したうえで締結してください。その場での即決をお願いすることはありません。",
  },
  {
    title: "稼働の準備",
    body: "車両の手配を進めます。業務委託契約で自分の車両を使う場合は、事業用ナンバー（黒ナンバー）の取得と事業用任意保険への加入が必要です。必要な手続きはご案内します。",
    note: "手続きには日数がかかるため、稼働開始日から逆算して進めます。",
  },
  {
    title: "稼働開始",
    body: "準備が整い次第、業務を開始します。開始後に出てきた疑問や困りごとの相談も随時受け付けます。",
  },
];

export default function FlowPage() {
  return (
    <>
      <PageHero
        title="ご相談から稼働開始までの流れ"
        description="所要期間は車両の準備状況や案件の状況によって変わります。各ステップで何をするのかをご案内します。"
        photo={photos.warehouse}
      />
      <Breadcrumbs
        items={[
          { name: "ホーム", path: "/" },
          { name: "ドライバー採用", path: "/recruit" },
          { name: "稼働開始までの流れ" },
        ]}
      />

      <section className="section-pad bg-white">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.7fr] lg:gap-16">
            <div>
              <SectionHeading title="5つのステップ" />
              <p className="mt-5 text-sm leading-[1.95] text-ink-muted">
                所要期間は、車両の準備状況やご希望の稼働開始時期によって変わります。とくに業務委託で自分の車両を使う場合は、事業用ナンバーの取得に日数がかかるため、余裕をもって進めます。
              </p>
              <Link href="/recruit/jobs" className="link-arrow mt-5">
                募集中の求人を見る
              </Link>
            </div>
            <Steps items={steps} />
          </div>
        </div>
      </section>

      <section className="section-pad bg-slate-50">
        <div className="container-site">
          <div className="max-w-3xl">
            <SectionHeading
              title="準備について、先に読んでおくと理解が早いもの"
              lead="とくに業務委託で始める場合、車両とナンバーの手続きが最初のハードルになります。"
            />
            <ul className="mt-8 space-y-4 border-t border-slate-200 pt-8">
              {[
                ["/column/kuro-number", "黒ナンバーとは？軽貨物運送に必要な理由と取得の流れ"],
                ["/column/no-vehicle", "軽バンを持っていない場合はどうする？"],
                ["/column/contract-check", "応募前に確認すべき契約条件チェックリスト"],
                ["/column/gyomu-itaku-basics", "業務委託とは？雇用との違い"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="link-arrow">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm leading-[1.95] text-ink-muted">
              ご不明な点は {company.phone} までお気軽にお問い合わせください。
            </p>
          </div>
        </div>
      </section>

      <CtaSection
        title="最初の一歩は、話を聞くところからで構いません"
        description="ご相談いただいた内容をもとに、稼働開始までに必要な準備をご案内します。"
      />
    </>
  );
}

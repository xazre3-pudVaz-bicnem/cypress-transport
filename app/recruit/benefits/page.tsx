import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NumberedList, SplitSection } from "@/components/ui/Layouts";
import { CtaSection } from "@/components/ui/CtaSection";
import { photos } from "@/data/images";

export const metadata: Metadata = buildMetadata({
  title: "軽貨物ドライバーという働き方｜メリットと注意点",
  description:
    "軽貨物ドライバーとして働くメリットと、始める前に知っておいてほしい注意点を正直に解説します。良い面だけでなく、収入の変動や自己管理の必要性もあわせてお伝えします。",
  path: "/recruit/benefits",
});

const merits = [
  {
    title: "普通免許があれば始められる",
    body: "軽自動車を使うため、中型・大型免許は必要ありません。特別な資格や職歴がなくても、安全に運転できればスタートラインに立てます。",
  },
  {
    title: "ひとりで進められる",
    body: "配送中は基本的にひとりです。人間関係の煩わしさが少なく、自分のペースで段取りを組みながら働けます。",
  },
  {
    title: "工夫が結果に返ってくる",
    body: "出来高制の案件では、ルートの組み方や積み込みの順番といった工夫が、そのまま配達件数と収入に反映されます。",
  },
  {
    title: "働き方を選べる",
    body: "宅配・企業配・ルート配送など、案件のタイプによって生活リズムが変わります。経験を積んでからタイプを変えるドライバーも珍しくありません。",
  },
  {
    title: "需要が伸びている分野",
    body: "EC市場の拡大にともない、ラストワンマイル配送の担い手は求められ続けています。続けるほど地理とルートの勘が資産になります。",
  },
  {
    title: "立ち上げから関われる",
    body: "サイプレスの軽貨物事業部は立ち上げ期です。決まりきった組織ではなく、配送網とチームを一緒につくっていける段階にあります。",
  },
];

const cautions = [
  {
    title: "収入は稼働量と案件に左右される",
    body: "固定給とは仕組みが違います。とくに業務委託の場合は、燃料費・車両費などの経費を引いた「手取り」で考える必要があります。額面の報酬だけで判断すると見誤ります。",
    link: { href: "/column/income-structure", label: "報酬の仕組みを読む" },
  },
  {
    title: "最初の1〜3ヶ月は効率が上がりきらない",
    body: "道や届け先の傾向を覚えるまでは、経験者の倍近く時間がかかるのが普通です。出来高制ではこの時期の収入が伸びにくいのが一般的ですが、当社は日額15,000円の最低保証を設けているため、慣れるまでの期間も収入が落ち込まない設計にしています。",
    link: { href: "/column/beginner-guide", label: "未経験からの始め方を読む" },
  },
  {
    title: "業務委託なら自己管理が前提になる",
    body: "確定申告、保険の加入、車両の整備、体調管理はすべて自分の責任です。雇用契約とは仕組みが根本的に違うため、契約前に理解しておく必要があります。",
    link: { href: "/column/gyomu-itaku-basics", label: "業務委託とは何かを読む" },
  },
];

export default function BenefitsPage() {
  return (
    <>
      <PageHero
        title="軽貨物ドライバーという働き方"
        description="良い面だけを並べても、始めてから「聞いていた話と違う」となれば意味がありません。メリットと注意点の両方をお伝えします。"
        photo={photos.residentialArea}
      />
      <Breadcrumbs
        items={[
          { name: "ホーム", path: "/" },
          { name: "ドライバー採用", path: "/recruit" },
          { name: "働き方のメリットと注意点" },
        ]}
      />

      <section className="section-pad bg-white">
        <div className="container-site">
          <SectionHeading title="この仕事の良いところ" />
          <div className="mt-10">
            <NumberedList items={merits} />
          </div>
        </div>
      </section>

      {/* 注意点 — ここがこのページの核心 */}
      <section className="bg-ink-900">
        <div className="container-site py-16 md:py-24">
          <SectionHeading
            title="始める前に知っておいてほしいこと"
            lead="軽貨物は「誰でも楽に稼げる仕事」ではありません。応募前の段階で、次の3点はお伝えしておきます。"
            light
          />
          <dl className="mt-12 border-t border-white/15">
            {cautions.map((c) => (
              <div
                key={c.title}
                className="grid gap-3 border-b border-white/15 py-7 md:grid-cols-[1fr_1.7fr] md:gap-10"
              >
                <dt className="text-[15px] font-bold leading-snug text-white">
                  {c.title}
                </dt>
                <dd className="text-sm leading-[1.95] text-slate-300">
                  {c.body}
                  <Link
                    href={c.link.href}
                    className="ml-1 inline-flex py-1 font-bold text-accent underline-offset-4 hover:underline"
                  >
                    {c.link.label} →
                  </Link>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-site">
          <SplitSection photo={photos.driverSeat} ratio="aspect-[4/3]" reverse>
            <SectionHeading title="向き不向きは、条件より先に確かめてほしい" />
            <div className="mt-6 space-y-4 body-text">
              <p>
                報酬の金額だけで決めると、生活リズムが合わずに続かないことがあります。1日を通してひとりで運転し続けること、時間の段取りを自分で組むこと、届け先へ丁寧に対応すること。この3つが苦にならないかを、まず考えてみてください。
              </p>
              <p>
                そのうえで条件を比較するほうが、結果的に長く続けられます。判断に迷う点があれば、相談の段階でお聞かせください。
              </p>
            </div>
          </SplitSection>
        </div>
      </section>

      <CtaSection
        title="向いているかどうか、一度話してみませんか"
        description="いまの生活リズムや希望の稼働イメージを伺えば、軽貨物が合いそうかどうかを率直にお伝えします。"
      />
    </>
  );
}

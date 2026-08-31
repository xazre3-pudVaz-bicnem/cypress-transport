import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SplitSection } from "@/components/ui/Layouts";
import { CtaSection } from "@/components/ui/CtaSection";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { getArticle } from "@/lib/articles";
import { photos } from "@/data/images";

export const metadata: Metadata = buildMetadata({
  title: "軽貨物ドライバーの仕事内容｜案件の種類と1日の流れ",
  description:
    "軽貨物ドライバーの仕事内容を解説します。宅配・企業配・ルート配送・スポット便の違い、1日の流れ、必要な免許まで、応募を考える前に知っておきたい内容をまとめました。",
  path: "/recruit/about-driver",
});

/** 案件タイプの比較。カードではなく表で見せる（比較しやすさを優先） */
const jobTypes = [
  {
    name: "宅配（ラストワンマイル）",
    target: "個人宅",
    volume: "多い",
    time: "夜間・土日もあり",
    pay: "出来高制が多い",
    note: "配達件数が結果に直結する。不在対応の工夫が効く",
  },
  {
    name: "企業配",
    target: "企業・店舗",
    volume: "中程度",
    time: "平日日中が中心",
    pay: "日額制が多い",
    note: "届け先が固定的でルートを覚えやすい",
  },
  {
    name: "ルート配送",
    target: "決まった拠点",
    volume: "安定",
    time: "スケジュールが読める",
    pay: "日額制が多い",
    note: "生活リズムを整えやすい",
  },
  {
    name: "スポット便・チャーター便",
    target: "都度異なる",
    volume: "案件次第",
    time: "不定",
    pay: "1件単価が高め",
    note: "緊急性が高い。待機時間が出ることもある",
  },
];

export default function AboutDriverPage() {
  const related = [
    getArticle("what-is-keikamotsu-driver"),
    getArticle("daily-schedule"),
    getArticle("license-for-keikamotsu"),
  ].filter((a) => a !== undefined);

  return (
    <>
      <PageHero
        title="軽貨物ドライバーの仕事内容"
        description="軽バンで荷物を届けるという点は共通ですが、担当する案件のタイプによって働き方は大きく変わります。"
        photo={photos.cityStreet}
      />
      <Breadcrumbs
        items={[
          { name: "ホーム", path: "/" },
          { name: "ドライバー採用", path: "/recruit" },
          { name: "仕事内容" },
        ]}
      />

      <section className="section-pad bg-white">
        <div className="container-site">
          <SplitSection photo={photos.cargoLoaded} ratio="aspect-[16/9]">
            <SectionHeading title="荷物を預かり、決められた時間内に届ける" />
            <div className="mt-6 space-y-4 prose-body">
              <p>
                軽貨物ドライバーの仕事は、軽バン（軽貨物自動車）で集荷拠点から届け先まで荷物を運ぶことです。基本の流れは「積み込み → 配送 → 完了報告」で、これはどの案件でも変わりません。
              </p>
              <p>
                扱う荷物は宅配便の荷物や企業間の書類・部品など、比較的小型のものが中心です。大型トラックのような重量物の積み下ろしは基本的になく、体力面のハードルは低めです。そのぶん、担当エリアの地理を覚えること、時間どおりに正確に届けることが求められます。
              </p>
              <p>
                必要な免許は普通自動車免許のみです。軽自動車を使うため、中型免許・大型免許は必要ありません。
              </p>
            </div>
          </SplitSection>
        </div>
      </section>

      {/* 案件タイプ比較表 */}
      <section className="section-pad bg-slate-50">
        <div className="container-site">
          <SectionHeading
            title="案件のタイプで働き方が変わる"
            lead="同じ軽貨物でも、扱う案件によって1日の流れ・物量・報酬の決まり方が違います。以下は業界一般の傾向です。実際の条件は個別の求人でご確認ください。"
          />
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-sm">
              <thead>
                <tr className="border-y-2 border-navy-900 text-left">
                  <th scope="col" className="py-3.5 pr-6 font-bold text-navy-900">
                    案件タイプ
                  </th>
                  <th scope="col" className="py-3.5 pr-6 font-bold text-navy-900">
                    届け先
                  </th>
                  <th scope="col" className="py-3.5 pr-6 font-bold text-navy-900">
                    物量
                  </th>
                  <th scope="col" className="py-3.5 pr-6 font-bold text-navy-900">
                    時間帯
                  </th>
                  <th scope="col" className="py-3.5 pr-6 font-bold text-navy-900">
                    報酬の決まり方
                  </th>
                  <th scope="col" className="py-3.5 font-bold text-navy-900">
                    特徴
                  </th>
                </tr>
              </thead>
              <tbody>
                {jobTypes.map((t) => (
                  <tr key={t.name} className="border-b border-slate-200 align-top">
                    <th
                      scope="row"
                      className="py-4 pr-6 text-left font-bold text-navy-900"
                    >
                      {t.name}
                    </th>
                    <td className="py-4 pr-6 text-ink-muted">{t.target}</td>
                    <td className="py-4 pr-6 text-ink-muted">{t.volume}</td>
                    <td className="py-4 pr-6 text-ink-muted">{t.time}</td>
                    <td className="py-4 pr-6 text-ink-muted">{t.pay}</td>
                    <td className="py-4 text-ink-muted">{t.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-[13px] leading-relaxed text-slate-500">
            当社がどのタイプの案件を扱うかは、配送先が確定した時点で求人ページに明記します。
          </p>
        </div>
      </section>

      {/* 1日の流れ */}
      <section className="section-pad bg-white">
        <div className="container-site">
          <SectionHeading
            title="1日の流れ（宅配案件の例）"
            lead="案件によって異なりますが、宅配のケースではおおよそ次のように進みます。"
          />
          <ol className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2">
            {[
              ["朝", "集荷拠点で当日の荷物を受け取り、配達順を考えながら積み込む。ルートを組み立てる"],
              ["午前", "午前指定の荷物を中心に配達を進める"],
              ["昼", "物量と時間指定の合間を見て休憩を取る"],
              ["午後〜夕方", "時間指定便と通常便を配達しながら、不在先の再配達も並行する"],
              ["夜", "最終の再配達を終え、完了報告をして業務終了"],
            ].map(([time, body]) => (
              <li
                key={time}
                className="flex gap-6 border-t border-slate-200 pt-5"
              >
                <span className="w-24 shrink-0 text-sm font-bold text-brand-600">
                  {time}
                </span>
                <p className="text-sm leading-[1.95] text-ink-muted">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-pad bg-slate-50">
        <div className="container-site">
          <SectionHeading title="仕事をもっと詳しく知る" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {related.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
          <Link href="/column" className="link-arrow mt-8">
            記事をすべて見る
          </Link>
        </div>
      </section>

      <CtaSection
        title="自分に合う案件があるか相談してみませんか"
        description="どのタイプの働き方を希望されるかを伺っておくと、案件が決まった際にご案内しやすくなります。"
      />
    </>
  );
}

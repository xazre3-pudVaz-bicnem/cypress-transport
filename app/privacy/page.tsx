import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { company } from "@/data/site";

export const metadata: Metadata = buildMetadata({
  title: "プライバシーポリシー",
  description:
    "株式会社サイプレス軽貨物事業部のプライバシーポリシー。個人情報の取得・利用目的・管理・第三者提供について定めています。",
  path: "/privacy",
});

const sections = [
  {
    heading: "1. 基本方針",
    body: [
      `${company.name}（以下「当社」）は、個人情報の重要性を認識し、個人情報の保護に関する法律（個人情報保護法）およびその他の関係法令を遵守し、適切な取得・利用・管理を行います。`,
    ],
  },
  {
    heading: "2. 取得する個人情報",
    body: [
      "当社は、お問い合わせ・応募フォームおよびお電話を通じて、以下の個人情報を取得します。",
    ],
    list: [
      "氏名",
      "電話番号",
      "メールアドレス",
      "希望エリア・免許や車両の保有状況・経験など、応募に関する情報",
      "お問い合わせ内容",
    ],
  },
  {
    heading: "3. 利用目的",
    body: ["取得した個人情報は、以下の目的の範囲内で利用します。"],
    list: [
      "採用選考および応募に関するご連絡",
      "お問い合わせへの回答",
      "配送サービスに関するご相談への対応",
      "求人・募集開始のご案内（ご希望いただいた場合）",
    ],
  },
  {
    heading: "4. 第三者提供",
    body: [
      "当社は、法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供しません。",
    ],
  },
  {
    heading: "5. 委託",
    body: [
      "当社は、利用目的の達成に必要な範囲で、個人情報の取り扱いを外部（メール配信システム等）に委託する場合があります。委託先には適切な管理を求めます。",
    ],
  },
  {
    heading: "6. 安全管理",
    body: [
      "当社は、個人情報の漏えい・滅失・毀損の防止のため、必要かつ適切な安全管理措置を講じます。",
    ],
  },
  {
    heading: "7. 開示・訂正・削除の請求",
    body: [
      "ご本人からの個人情報の開示・訂正・利用停止・削除のご請求には、本人確認のうえ、法令に従って速やかに対応します。下記の窓口までご連絡ください。",
    ],
  },
  {
    heading: "8. アクセス解析について",
    body: [
      "当サイトでは、サイト改善のためにGoogle Analyticsなどのアクセス解析ツールを利用する場合があります。これらのツールはCookieを使用してトラフィックデータを収集しますが、個人を特定する情報は含まれません。",
    ],
  },
  {
    heading: "9. 改定",
    body: [
      "本ポリシーの内容は、法令の変更や運用の見直しに応じて改定することがあります。改定後の内容は本ページに掲載した時点から適用されます。",
    ],
  },
  {
    heading: "10. お問い合わせ窓口",
    body: [
      `${company.name} 軽貨物事業部`,
      `所在地：${company.address.full}`,
      `電話番号：${company.phone}`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero label="Privacy Policy" title="プライバシーポリシー" />
      <Breadcrumbs
        items={[
          { name: "ホーム", path: "/" },
          { name: "プライバシーポリシー" },
        ]}
      />

      <section className="section-pad bg-white">
        <div className="container-site max-w-3xl space-y-10">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="text-lg font-bold text-navy-900">{s.heading}</h2>
              {s.body.map((p, i) => (
                <p key={i} className="mt-3 text-sm leading-[2] text-slate-700">
                  {p}
                </p>
              ))}
              {s.list && (
                <ul className="mt-3 list-disc space-y-1.5 pl-6 text-sm leading-relaxed text-slate-700">
                  {s.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <p className="text-xs text-slate-500">制定日：2026年8月31日</p>
        </div>
      </section>
    </>
  );
}

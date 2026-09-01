import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { company } from "@/data/site";
import { recruitPhase } from "@/data/recruit-status";

export const metadata: Metadata = buildMetadata({
  title: "送信完了",
  description: "お問い合わせありがとうございました。担当者よりご連絡いたします。",
  path: "/contact/thanks",
  noindex: true, // コンバージョン計測用ページのためインデックス不要
});

export default function ThanksPage() {
  return (
    <section className="section-pad bg-white">
      <div className="container-site max-w-2xl">
        <p className="text-sm font-bold text-accent-text">送信完了</p>
        <h1 className="mt-3 text-2xl font-bold text-ink-900 md:text-3xl">
          ありがとうございました
        </h1>
        <div className="mt-6 space-y-4 body-text">
          <p>
            内容を確認のうえ、担当者より順次ご連絡いたします。お急ぎの場合は {company.phone} までお電話ください。
          </p>
          {recruitPhase === "preparing" && (
            <p>
              現在は正式な求人の公開前のため、条件が固まった段階で改めてご案内します。ご希望のエリアと稼働イメージは記録させていただきます。
            </p>
          )}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/column" className="btn-accent">
            軽貨物の基礎知識を読む
          </Link>
          <Link href="/" className="btn-outline">
            トップページへ戻る
          </Link>
        </div>
      </div>
    </section>
  );
}

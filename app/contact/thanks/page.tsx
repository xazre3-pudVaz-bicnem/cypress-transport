import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { company } from "@/data/site";

export const metadata: Metadata = buildMetadata({
  title: "送信完了",
  description: "お問い合わせありがとうございました。担当者よりご連絡いたします。",
  path: "/contact/thanks",
  noindex: true, // コンバージョン計測用ページのためインデックス不要
});

export default function ThanksPage() {
  return (
    <section className="section-pad bg-slate-50">
      <div className="container-site max-w-2xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center md:p-12">
          <span
            aria-hidden="true"
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-2xl"
          >
            ✓
          </span>
          <h1 className="mt-5 text-xl font-bold text-navy-900 md:text-2xl">
            送信ありがとうございました
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-slate-600">
            内容を確認のうえ、担当者より順次ご連絡いたします。
            <br />
            お急ぎの場合は {company.phone} までお電話ください。
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            ご連絡までの間、軽貨物の仕事について
            <Link href="/column" className="mx-1 font-bold text-brand-600 underline-offset-4 hover:underline">
              お役立ちコラム
            </Link>
            もぜひご覧ください。
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/" className="btn-secondary">
              トップページへ戻る
            </Link>
            <Link href="/column" className="btn-primary">
              コラムを読む
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

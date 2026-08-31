import Link from "next/link";
import { recruitCopy } from "@/data/recruit-status";

/**
 * 独自404ページ。
 * 終了した求人URLへのアクセスも想定し、現在の募集状況に合った導線へ誘導する。
 */
export default function NotFound() {
  return (
    <section className="section-pad bg-white">
      <div className="container-site max-w-2xl">
        <p className="text-sm font-bold text-brand-600">404</p>
        <h1 className="mt-3 text-2xl font-bold text-navy-900 md:text-3xl">
          ページが見つかりませんでした
        </h1>
        <p className="mt-6 prose-body">
          お探しのページは移動または削除されたか、URLが変更された可能性があります。求人ページをお探しの場合、その求人は募集を終了している可能性があります。
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href={recruitCopy.primaryCta.href} className="btn-primary">
            {recruitCopy.primaryCta.label}
          </Link>
          <Link href="/" className="btn-outline">
            トップページへ戻る
          </Link>
        </div>
        <ul className="mt-12 space-y-3 border-t border-slate-200 pt-8">
          {[
            ["/recruit", "ドライバー採用について"],
            ["/recruit/jobs", "募集状況・求人一覧"],
            ["/column", "軽貨物の基礎知識"],
            ["/company", "会社概要"],
            ["/contact", "お問い合わせ・ご相談"],
          ].map(([href, label]) => (
            <li key={href}>
              <Link href={href} className="link-arrow">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

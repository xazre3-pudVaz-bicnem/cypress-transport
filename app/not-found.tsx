import Link from "next/link";

/**
 * 独自404ページ。
 * 終了した求人URLへのアクセスも想定し、現在募集中の求人へ誘導する。
 */
export default function NotFound() {
  return (
    <section className="section-pad bg-slate-50">
      <div className="container-site max-w-2xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center md:p-12">
          <p className="label-en">404 Not Found</p>
          <h1 className="mt-4 text-xl font-bold text-navy-900 md:text-2xl">
            ページが見つかりませんでした
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-slate-600">
            お探しのページは移動・削除されたか、URLが変更された可能性があります。
            <br />
            求人ページをお探しの場合、その求人は募集を終了している可能性があります。
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/recruit/jobs" className="btn-primary">
              現在募集中の求人を見る
            </Link>
            <Link href="/" className="btn-secondary">
              トップページへ戻る
            </Link>
          </div>
          <p className="mt-8 text-sm text-slate-500">
            お困りの場合は
            <Link href="/contact" className="mx-1 font-bold text-brand-600 underline-offset-4 hover:underline">
              お問い合わせ
            </Link>
            ください。
          </p>
        </div>
      </div>
    </section>
  );
}

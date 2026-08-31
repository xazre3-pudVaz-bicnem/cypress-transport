import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { CtaSection } from "@/components/ui/CtaSection";
import { articleJsonLd, faqJsonLd } from "@/lib/jsonld";
import { getArticle, getArticles, getRelatedArticles } from "@/lib/articles";
import { categories } from "@/data/articles";
import { formatDateJa } from "@/lib/utils";
import { company } from "@/data/site";
import type { ArticleSection } from "@/data/articles/types";

export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return buildMetadata({
    title: article.title,
    description: article.description,
    path: `/column/${article.slug}`,
    ogType: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
  });
}

function SectionBlock({ section }: { section: ArticleSection }) {
  return (
    <section>
      <h2 className="mt-12 border-l-4 border-brand-600 pl-4 text-xl font-bold leading-snug text-navy-900 md:text-2xl">
        {section.heading}
      </h2>
      {section.body?.map((p, i) => (
        <p key={i} className="mt-4 text-[15px] leading-[2] text-slate-700">
          {p}
        </p>
      ))}
      {section.list && (
        <ul className="mt-5 space-y-2.5">
          {section.list.map((item) => (
            <li
              key={item}
              className="flex gap-3 rounded-lg bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-700"
            >
              <span
                aria-hidden="true"
                className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600"
              />
              {item}
            </li>
          ))}
        </ul>
      )}
      {section.table && (
        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="bg-navy-900 text-left text-white">
                {section.table.headers.map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 font-bold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {section.table.rows.map((row, i) => (
                <tr key={i} className={i % 2 === 1 ? "bg-slate-50" : ""}>
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={`px-4 py-3 leading-relaxed ${
                        j === 0 ? "font-bold text-navy-900" : "text-slate-700"
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {section.sub?.map((sub) => (
        <div key={sub.heading}>
          <h3 className="mt-8 text-lg font-bold text-navy-900">
            {sub.heading}
          </h3>
          {sub.body?.map((p, i) => (
            <p key={i} className="mt-3 text-[15px] leading-[2] text-slate-700">
              {p}
            </p>
          ))}
          {sub.list && (
            <ul className="mt-4 list-disc space-y-2 pl-6 text-sm leading-relaxed text-slate-700">
              {sub.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </section>
  );
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = getRelatedArticles(article);

  return (
    <>
      <JsonLd data={articleJsonLd(article)} />
      {article.faq && article.faq.length > 0 && (
        <JsonLd data={faqJsonLd(article.faq)} />
      )}
      <Breadcrumbs
        items={[
          { name: "ホーム", path: "/" },
          { name: "お役立ちコラム", path: "/column" },
          { name: article.title },
        ]}
      />

      <article className="section-pad bg-white pt-8 md:pt-12">
        <div className="container-site max-w-3xl">
          <header>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-full bg-brand-50 px-3 py-1 font-bold text-brand-600">
                {categories[article.category]}
              </span>
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-100 px-3 py-1 text-slate-500"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <h1 className="mt-5 text-[1.6rem] font-bold leading-snug text-navy-900 md:text-[2.1rem]">
              {article.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-slate-500">
              <span>執筆：{article.author}</span>
              {article.supervisor && <span>監修：{article.supervisor}</span>}
              <span>
                公開日：
                <time dateTime={article.publishedAt}>
                  {formatDateJa(article.publishedAt)}
                </time>
              </span>
              {article.updatedAt !== article.publishedAt && (
                <span>
                  更新日：
                  <time dateTime={article.updatedAt}>
                    {formatDateJa(article.updatedAt)}
                  </time>
                </span>
              )}
            </div>
          </header>

          {/* 結論ファーストの導入 */}
          <div className="mt-8 rounded-2xl bg-brand-50 p-6 md:p-8">
            {article.lead.map((p, i) => (
              <p
                key={i}
                className={`text-[15px] leading-[2] text-navy-900 ${i > 0 ? "mt-4" : ""}`}
              >
                {p}
              </p>
            ))}
          </div>

          {article.sections.map((section) => (
            <SectionBlock key={section.heading} section={section} />
          ))}

          {article.faq && article.faq.length > 0 && (
            <section>
              <h2 className="mt-12 border-l-4 border-brand-600 pl-4 text-xl font-bold text-navy-900 md:text-2xl">
                よくある質問
              </h2>
              <dl className="mt-6 space-y-4">
                {article.faq.map((item) => (
                  <div
                    key={item.q}
                    className="rounded-xl border border-slate-200 p-5"
                  >
                    <dt className="text-sm font-bold text-navy-900">
                      Q. {item.q}
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-slate-600">
                      A. {item.a}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {article.disclaimer && (
            <p className="mt-10 rounded-xl bg-slate-50 p-5 text-xs leading-relaxed text-slate-500">
              本記事は一般的な情報の提供を目的としており、法律・税務・保険等に関する個別の助言ではありません。
              制度・手続きは変更される場合があります。最新の情報は公的機関の公式案内をご確認のうえ、
              個別の判断については税理士・行政書士等の専門家にご相談ください。
            </p>
          )}

          {article.sources && article.sources.length > 0 && (
            <section className="mt-10">
              <h2 className="text-sm font-bold text-navy-900">参考情報</h2>
              <ul className="mt-3 space-y-1.5 text-sm">
                {article.sources.map((s) => (
                  <li key={s.url}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-600 underline-offset-4 hover:underline"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* 採用への内部リンク */}
          <div className="mt-12 rounded-2xl bg-navy-950 p-7 md:p-9">
            <p className="label-en text-brand-300">Recruit</p>
            <p className="mt-3 text-lg font-bold leading-snug text-white">
              {company.name}では、東京・千葉・埼玉で
              <br className="hidden md:block" />
              軽貨物ドライバーを募集しています。
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link href="/recruit/jobs" className="btn-primary py-3 text-sm">
                募集中の求人を見る
              </Link>
              <Link href="/recruit" className="btn-ghost-light py-3 text-sm">
                採用情報を見る
              </Link>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section-pad bg-slate-50">
          <div className="container-site">
            <h2 className="heading-2 text-xl md:text-2xl">関連記事</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {related.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaSection />
    </>
  );
}

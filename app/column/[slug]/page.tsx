import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { CtaSection } from "@/components/ui/CtaSection";
import { PhotoFrame } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { articleJsonLd } from "@/lib/jsonld";
import { getArticle, getArticles, getRelatedArticles } from "@/lib/articles";
import { categories } from "@/data/articles";
import { authors } from "@/data/authors";
import { photos } from "@/data/images";
import { formatDateJa } from "@/lib/utils";
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
  const image = photos[article.image];
  return buildMetadata({
    title: article.title,
    description: article.description,
    path: `/column/${article.slug}`,
    // 他記事へ統合した記事は noindex（URLと被リンクは残す）
    noindex: article.noindex,
    ogType: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
    ogImage: {
      src: image.src,
      width: image.width,
      height: image.height,
      alt: image.alt,
    },
  });
}

function SectionBlock({ section }: { section: ArticleSection }) {
  return (
    <section>
      <h2 className="mt-14 border-l-[3px] border-accent pl-4 text-xl font-bold leading-snug text-ink-900 md:text-[1.6rem]">
        {section.heading}
      </h2>
      {section.body?.map((p, i) => (
        <p key={i} className="mt-5 text-[15px] leading-[2] text-ink-800">
          {p}
        </p>
      ))}
      {section.list && (
        <ul className="mt-6 border-t border-ink-900/15">
          {section.list.map((item) => (
            <li
              key={item}
              className="flex gap-3.5 border-b border-ink-900/15 py-3.5 text-sm leading-[1.95] text-ink-800"
            >
              <span
                aria-hidden="true"
                className="mt-[11px] h-1 w-2.5 shrink-0 bg-accent"
              />
              {item}
            </li>
          ))}
        </ul>
      )}
      {section.table && (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr className="border-y-2 border-ink-900 text-left">
                {section.table.headers.map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className="py-3 pr-6 font-bold text-ink-900"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, i) => (
                <tr key={i} className="border-b border-ink-900/15 align-top">
                  {row.map((cell, j) =>
                    j === 0 ? (
                      <th
                        key={j}
                        scope="row"
                        className="py-3.5 pr-6 text-left font-bold text-ink-900"
                      >
                        {cell}
                      </th>
                    ) : (
                      <td key={j} className="py-3.5 pr-6 leading-relaxed text-ink-500">
                        {cell}
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {section.sub?.map((sub) => (
        <div key={sub.heading}>
          <h3 className="mt-9 text-lg font-bold text-ink-900">{sub.heading}</h3>
          {sub.body?.map((p, i) => (
            <p key={i} className="mt-3.5 text-[15px] leading-[2] text-ink-800">
              {p}
            </p>
          ))}
          {sub.list && (
            <ul className="mt-4 list-disc space-y-2 pl-6 text-sm leading-[1.95] text-ink-500">
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
  const author = authors[article.author];

  return (
    <>
      {/*
        BlogPosting のみ実装。記事末尾のQ&Aに FAQPage は付けない。
        FAQPage はページ全体が質問と回答の一覧である場合の型であり、
        記事の一部に付けるのは実態と合わないため（/recruit/faq にのみ実装）。
      */}
      <JsonLd data={articleJsonLd(article)} />
      <Breadcrumbs
        items={[
          { name: "ホーム", path: "/" },
          { name: "軽貨物の基礎知識", path: "/column" },
          { name: article.title },
        ]}
      />

      <article className="bg-white pb-16 pt-6 md:pb-24 md:pt-10">
        <div className="container-narrow max-w-3xl">
          <header>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
              <span className="font-bold text-accent-text">
                {categories[article.category]}
              </span>
              <span className="text-ink-400">
                公開日{" "}
                <time dateTime={article.publishedAt}>
                  {formatDateJa(article.publishedAt)}
                </time>
              </span>
              {article.updatedAt !== article.publishedAt && (
                <span className="text-ink-400">
                  更新日{" "}
                  <time dateTime={article.updatedAt}>
                    {formatDateJa(article.updatedAt)}
                  </time>
                </span>
              )}
            </div>
            <h1 className="mt-4 text-[1.6rem] font-bold leading-[1.45] tracking-tight text-ink-900 md:text-[2.1rem]">
              {article.title}
            </h1>
            <p className="mt-4 text-xs text-ink-400">
              執筆：{author.name}
              {article.supervisor && `　監修：${article.supervisor}`}
            </p>
          </header>

          <PhotoFrame
            photo={photos[article.image]}
            ratio="aspect-[16/9]"
            rounded="rounded-[3px]"
            sizes="(min-width: 768px) 768px, 100vw"
            priority
            className="mt-8"
          />

          {/* 結論を最初に置く（検索・AI検索の双方で要点が拾われやすくなる） */}
          <div className="mt-10 border-l-2 border-ink-900 pl-6">
            {article.lead.map((p, i) => (
              <p
                key={i}
                className={`text-[15px] leading-[2] text-ink-900 ${i > 0 ? "mt-4" : ""}`}
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
              <h2 className="mt-14 border-l-[3px] border-accent pl-4 text-xl font-bold text-ink-900 md:text-[1.6rem]">
                よくある質問
              </h2>
              <dl className="mt-6 border-t border-ink-900/15">
                {article.faq.map((item) => (
                  <div key={item.q} className="border-b border-ink-900/15 py-5">
                    <dt className="text-sm font-bold text-ink-900">
                      {item.q}
                    </dt>
                    <dd className="mt-2 text-sm leading-[1.95] text-ink-500">
                      {item.a}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {article.sources && article.sources.length > 0 && (
            <section className="mt-12">
              <h2 className="h-sub">参考情報</h2>
              <ul className="mt-3 space-y-1.5 text-sm">
                {article.sources.map((s) => (
                  <li key={s.url}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-text underline-offset-4 hover:underline"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {article.disclaimer && (
            <p className="mt-8 border border-ink-900/15 bg-white p-5 text-xs leading-[1.9] text-ink-500">
              本記事は一般的な情報の提供を目的としており、法律・税務・保険等に関する個別の助言ではありません。制度・手続きは変更される場合があります。最新の情報は公的機関の公式案内をご確認のうえ、個別の判断については税理士・行政書士等の専門家にご相談ください。
            </p>
          )}

          {/* 求人への導線。記事からの内部リンクを求人ページへ集める */}
          <aside className="mt-12 border border-ink-900/15 bg-paper p-6 md:p-8">
            <p className="text-[11px] font-bold tracking-[0.18em] text-accent-text">
              募集中
            </p>
            <h2 className="mt-2 text-lg font-bold leading-snug text-ink-900 md:text-xl">
              東京都葛飾区の軽貨物ドライバー求人
            </h2>
            <p className="mt-3 text-sm leading-[1.95] text-ink-500">
              1個160円以上の出来高制に、日額15,000円の最低保証。ロイヤリティはありません。
              未経験可・AT限定可で、車両をお持ちでない方にはリースの手配が可能です。
            </p>
            <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
              <Link href="/recruit/jobs" className="link-arrow">
                募集要項を見る
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/recruit" className="link-arrow">
                採用について
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </aside>

          {/* 執筆者情報（E-E-A-T） */}
          <section className="mt-12 border-t border-ink-900/15 pt-8">
            <h2 className="h-sub">この記事を書いた人</h2>
            <p className="mt-3 text-sm font-bold text-ink-900">
              {author.name}
              <span className="ml-2 font-normal text-ink-500">
                {author.role}
              </span>
            </p>
            {author.profile && (
              <p className="mt-2.5 text-sm leading-[1.95] text-ink-500">
                {author.profile}
              </p>
            )}
            {author.credentials && (
              <p className="mt-2 text-xs text-ink-400">
                {author.credentials}
              </p>
            )}
          </section>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section-pad border-t border-ink-900/15 bg-white">
          <div className="container-site">
            <SectionHeading title="関連記事" as="h2" />
            <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {related.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
            <Link href="/column" className="link-arrow mt-8">
              記事をすべて見る
            </Link>
          </div>
        </section>
      )}

      <CtaSection
        title="軽貨物の仕事について相談する"
        description="記事の内容について、自分の場合はどうなるのかといったご質問にもお答えします。働き方のご相談もどうぞ。"
        showPhone={false}
      />
    </>
  );
}

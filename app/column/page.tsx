import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { CtaSection } from "@/components/ui/CtaSection";
import { getIndexableArticles } from "@/lib/articles";
import { categories } from "@/data/articles";
import type { CategorySlug } from "@/data/articles/types";
import { photos } from "@/data/images";

export const metadata: Metadata = buildMetadata({
  title: "軽貨物の基礎知識｜仕事・免許・車両・お金のこと",
  description:
    "軽貨物ドライバーの仕事内容、必要な免許、黒ナンバー、業務委託の仕組み、報酬と経費の考え方まで。応募を考えるときに引っかかる点を、公的機関の情報も参照しながら解説します。",
  path: "/column",
});

export default function ColumnPage() {
  const articles = getIndexableArticles();
  const usedCategories = (Object.keys(categories) as CategorySlug[]).filter(
    (c) => articles.some((a) => a.category === c)
  );

  return (
    <>
      <PageHero
        title="軽貨物の基礎知識"
        description="免許・車両・契約・お金まわりなど、軽貨物ドライバーを検討するときに引っかかる点をまとめています。"
        photo={photos.driverSeat}
      />
      <Breadcrumbs
        items={[{ name: "ホーム", path: "/" }, { name: "軽貨物の基礎知識" }]}
      />

      <section className="border-b border-ink-900/15 bg-white">
        <div className="container-site py-8">
          <nav aria-label="カテゴリ">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {usedCategories.map((c) => (
                <li key={c}>
                  <a
                    href={`#category-${c}`}
                    className="text-sm font-bold text-ink-500 underline-offset-4 hover:text-accent-dark hover:underline"
                  >
                    {categories[c]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-site space-y-16">
          {usedCategories.map((c) => (
            <div key={c} id={`category-${c}`} className="scroll-mt-24">
              <SectionHeading title={categories[c]} as="h2" />
              <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {articles
                  .filter((a) => a.category === c)
                  .map((article) => (
                    <ArticleCard key={article.slug} article={article} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-ink-900/15 bg-white">
        <div className="container-site py-12">
          <div className="max-w-3xl">
            <h2 className="h-sub">記事の書き方について</h2>
            <p className="mt-3 text-sm leading-[1.95] text-ink-500">
              法令・税務・保険に関する内容は、国土交通省・国税庁など公的機関が公開している情報を参照して執筆し、記事末尾に参考情報として明記しています。制度は変更されることがあるため、個別の判断については最新の公式情報をご確認いただくか、専門家にご相談ください。
            </p>
            <p className="mt-3 text-sm leading-[1.95] text-ink-500">
              また、軽貨物業界の一般的な話と、当社の募集条件は分けて記載しています。当社の条件は
              <Link href="/recruit" className="link-arrow mx-1">
                採用情報
              </Link>
              をご確認ください。
            </p>
          </div>
        </div>
      </section>

      <CtaSection
        title="軽貨物の仕事について相談する"
        description="記事を読んで気になった点や、自分の場合はどうなるのかといったご質問にもお答えします。"
      />
    </>
  );
}

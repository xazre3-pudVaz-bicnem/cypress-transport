import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { CtaSection } from "@/components/ui/CtaSection";
import { getArticles } from "@/lib/articles";
import { categories } from "@/data/articles";
import type { CategorySlug } from "@/data/articles/types";

export const metadata: Metadata = buildMetadata({
  title: "軽貨物お役立ち情報｜仕事・免許・収入の疑問を解説",
  description:
    "軽貨物ドライバーの仕事内容・必要な免許・黒ナンバー・業務委託・報酬の仕組みなど、応募前に知っておきたい情報を解説するコラムです。未経験の方もぜひご覧ください。",
  path: "/column",
});

export default function ColumnPage() {
  const articles = getArticles();
  const usedCategories = (Object.keys(categories) as CategorySlug[]).filter(
    (c) => articles.some((a) => a.category === c)
  );

  return (
    <>
      <PageHero
        label="Column"
        title="軽貨物お役立ち情報"
        description="「未経験でもできる？」「必要な免許は？」——軽貨物ドライバーを検討する方が応募前に知っておきたい疑問に、ひとつずつお答えします。"
      />
      <Breadcrumbs
        items={[
          { name: "ホーム", path: "/" },
          { name: "お役立ちコラム" },
        ]}
      />

      <section className="section-pad bg-slate-50">
        <div className="container-site">
          {/* カテゴリ内リンク */}
          <nav aria-label="カテゴリ" className="flex flex-wrap gap-2">
            {usedCategories.map((c) => (
              <a
                key={c}
                href={`#category-${c}`}
                className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-xs font-bold text-navy-900 transition hover:border-brand-400 hover:text-brand-600"
              >
                {categories[c]}
              </a>
            ))}
          </nav>

          <div className="mt-12 space-y-16">
            {usedCategories.map((c) => (
              <div key={c} id={`category-${c}`} className="scroll-mt-24">
                <h2 className="heading-2 text-xl md:text-2xl">
                  {categories[c]}
                </h2>
                <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {articles
                    .filter((a) => a.category === c)
                    .map((article) => (
                      <ArticleCard key={article.slug} article={article} />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title="読んで気になったら、相談してみませんか？"
        description="記事を読んで疑問が残った方、働き方を相談したい方は、お気軽にご連絡ください。"
      />
    </>
  );
}

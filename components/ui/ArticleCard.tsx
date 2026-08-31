import Link from "next/link";
import type { Article } from "@/data/articles";
import { categories } from "@/data/articles";
import { photos } from "@/data/images";
import { PhotoFrame } from "./Photo";
import { formatDateJa } from "@/lib/utils";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/column/${article.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-brand-400 hover:shadow-lg"
    >
      <PhotoFrame
        photo={photos[article.image]}
        ratio="aspect-[16/10]"
        rounded=""
        sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
        imageClassName="transition-transform duration-500 group-hover:scale-[1.04]"
      />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-xs">
          <span className="rounded-full bg-brand-50 px-3 py-1 font-bold text-brand-600">
            {categories[article.category]}
          </span>
          <time dateTime={article.publishedAt} className="text-slate-400">
            {formatDateJa(article.publishedAt)}
          </time>
        </div>
        <h3 className="mt-3 text-base font-bold leading-snug text-navy-900 transition group-hover:text-brand-600">
          {article.title}
        </h3>
        <p className="mt-2.5 line-clamp-3 flex-1 text-[13px] leading-relaxed text-slate-500">
          {article.excerpt}
        </p>
        <p className="mt-4 text-sm font-bold text-brand-600">
          続きを読む <span aria-hidden="true">→</span>
        </p>
      </div>
    </Link>
  );
}

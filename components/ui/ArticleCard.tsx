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
      className="group flex h-full flex-col border-b border-slate-200 pb-6 transition-colors hover:border-brand-600"
    >
      <PhotoFrame
        photo={photos[article.image]}
        ratio="aspect-[16/10]"
        rounded="rounded-sm"
        sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
        imageClassName="transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <div className="flex flex-1 flex-col pt-5">
        <div className="flex items-center gap-3 text-xs">
          <span className="font-bold text-brand-600">
            {categories[article.category]}
          </span>
          <time dateTime={article.publishedAt} className="text-slate-400">
            {formatDateJa(article.publishedAt)}
          </time>
        </div>
        <h3 className="mt-2.5 text-[15px] font-bold leading-snug text-navy-900 transition-colors group-hover:text-brand-600">
          {article.title}
        </h3>
        <p className="mt-2.5 line-clamp-3 flex-1 text-[13px] leading-[1.9] text-ink-muted">
          {article.excerpt}
        </p>
      </div>
    </Link>
  );
}

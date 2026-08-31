import { SITE_URL, company } from "@/data/site";
import { getArea } from "@/data/areas";
import { photos } from "@/data/images";
import { authors } from "@/data/authors";
import { isJobPostingComplete } from "@/lib/jobs";
import type { Job } from "@/data/jobs";
import type { Article } from "@/data/articles";
import type { FaqItem } from "@/data/faq";

/**
 * JSON-LD 構造化データのビルダー群。
 * ページ上の表示内容と構造化データの内容は必ず一致させること。
 */

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: company.name,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    address: {
      "@type": "PostalAddress",
      addressCountry: "JP",
      addressRegion: company.address.prefecture,
      addressLocality: company.address.city,
      streetAddress: company.address.street,
      ...(company.address.postalCode
        ? { postalCode: company.address.postalCode }
        : {}),
    },
    telephone: company.phoneTel,
    /*
     * sameAs には同一組織を指す公式プロフィールのみを列挙する。
     * コーポレートサイトを含めることで、検索エンジンが
     * cypress-transport.com と cypress-all.co.jp を同一企業として結び付けやすくなる。
     */
    sameAs: [
      company.instagram,
      ...(company.corporateSiteUrl ? [company.corporateSiteUrl] : []),
    ],
    /*
     * 代表者は JSON-LD に含めていない。schema.org で近いのは founder だが、
     * 「代表取締役＝創業者」とは限らず、確認できていないため断定しない。
     * 画面上の会社概要には代表者名を表示している。
     */
  };
}

/**
 * WebSite。サイト名を検索結果に正しく認識させるためのもの。
 * SearchAction（サイト内検索）は実装していないため含めない
 * （実態のない機能を構造化データで主張しない）。
 */
export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: company.siteName,
    inLanguage: "ja",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export interface BreadcrumbItem {
  name: string;
  /** 先頭スラッシュ付きパス。最後の項目は省略可 */
  path?: string;
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.path
        ? { item: item.path === "/" ? SITE_URL : `${SITE_URL}${item.path}` }
        : {}),
    })),
  };
}

/**
 * JobPosting 構造化データ。
 * 完全性ゲート（lib/jobs.ts）を通過した求人のみ生成し、
 * それ以外は null を返す（呼び出し側で出力しない）。
 */
export function jobPostingJsonLd(job: Job): object | null {
  if (!isJobPostingComplete(job)) return null;

  const area = getArea(job.area);
  const salary = job.salary!;

  // description はページ表示内容と一致させる（表示している項目のみで構成）
  const descriptionParts: string[] = [job.description!];
  if (job.deliveryArea) descriptionParts.push(`【配送エリア】${job.deliveryArea}`);
  if (job.workHours) descriptionParts.push(`【勤務時間】${job.workHours}`);
  if (job.workDays) descriptionParts.push(`【稼働日数】${job.workDays}`);
  if (job.holidays) descriptionParts.push(`【休日】${job.holidays}`);
  if (job.requirements?.length)
    descriptionParts.push(`【応募資格】${job.requirements.join("、")}`);
  if (job.licenses?.length)
    descriptionParts.push(`【必要免許】${job.licenses.join("、")}`);
  if (job.benefits?.length)
    descriptionParts.push(`【待遇】${job.benefits.join("、")}`);
  if (job.vehicle) descriptionParts.push(`【車両】${job.vehicle}`);
  if (job.expenses) descriptionParts.push(`【経費負担】${job.expenses}`);
  if (job.experience) descriptionParts.push(`【必要な経験】${job.experience}`);
  if (job.headcount) descriptionParts.push(`【募集人数】${job.headcount}`);
  if (job.training) descriptionParts.push(`【研修】${job.training}`);

  const baseSalaryValue: Record<string, unknown> = {
    "@type": "QuantitativeValue",
    unitText: salary.schema!.unitText,
  };
  if (salary.schema!.value !== undefined) baseSalaryValue.value = salary.schema!.value;
  if (salary.schema!.minValue !== undefined) baseSalaryValue.minValue = salary.schema!.minValue;
  if (salary.schema!.maxValue !== undefined) baseSalaryValue.maxValue = salary.schema!.maxValue;

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: `<p>${descriptionParts.join("</p><p>")}</p>`,
    datePosted: job.datePosted,
    validThrough: `${job.validThrough}T23:59:59+09:00`,
    employmentType: job.employmentType,
    hiringOrganization: {
      "@type": "Organization",
      name: company.name,
      sameAs: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
    },
    identifier: {
      "@type": "PropertyValue",
      name: company.name,
      value: job.id,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: "JP",
        addressRegion: area.addressRegion,
        addressLocality: area.addressLocality,
        ...(job.workLocationDetail
          ? { streetAddress: job.workLocationDetail }
          : {}),
      },
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: salary.schema!.currency,
      value: baseSalaryValue,
    },
    ...(job.directApply ? { directApply: true } : {}),
  };
}

export function articleJsonLd(article: Article) {
  const url = `${SITE_URL}/column/${article.slug}`;
  const image = photos[article.image];
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": url,
    headline: article.title,
    description: article.description,
    image: [`${SITE_URL}${image.src}`],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Organization",
      name: authors[article.author].name,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: company.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: "ja",
  };
}

export function faqJsonLd(items: Pick<FaqItem, "q" | "a">[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

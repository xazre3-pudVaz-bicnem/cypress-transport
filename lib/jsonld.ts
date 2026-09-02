import { SITE_URL, company } from "@/data/site";
import { getArea, areas } from "@/data/areas";
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
     * 法人番号は国が採番した一意の識別子で、企業実体の裏付けとして最も強い。
     * PropertyValue で識別子として明示する。
     */
    ...(company.corporateNumber
      ? {
          identifier: {
            "@type": "PropertyValue",
            name: "法人番号",
            value: company.corporateNumber,
          },
        }
      : {}),
    /* 対応エリア。地域検索での関連性の裏付けになる */
    areaServed: areas.map((a) => ({
      "@type": "AdministrativeArea",
      name: `${a.prefecture}${a.name}`,
    })),
    knowsAbout: [
      "軽貨物運送",
      "貨物軽自動車運送事業",
      "ラストワンマイル配送",
      "軽貨物ドライバーの採用",
    ],
    /*
     * 代表者は Person として employee で関連付ける。
     * founder は「代表取締役＝創業者」とは限らず確認できていないため使わない。
     */
    ...(company.representative
      ? {
          employee: {
            "@type": "Person",
            "@id": `${SITE_URL}/company#representative`,
            name: company.representative,
            jobTitle: "代表取締役",
            worksFor: { "@id": `${SITE_URL}/#organization` },
          },
        }
      : {}),
    ...(company.phoneHours
      ? {
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "recruitment",
            telephone: company.phoneTel,
            areaServed: "JP",
            availableLanguage: "Japanese",
            hoursAvailable: {
              "@type": "OpeningHoursSpecification",
              opens: "09:00",
              closes: "21:00",
            },
          },
        }
      : {}),
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
    alternateName: "サイプレス軽貨物",
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
    // 募集終了日が決まっている求人だけ validThrough を出す。
    // 期限未定の求人に架空の終了日を入れないため（Googleの推奨に従う）。
    ...(job.validThrough
      ? { validThrough: `${job.validThrough}T23:59:59+09:00` }
      : {}),
    employmentType: job.employmentType,
    /*
     * 事業部単位の募集であることを明示。
     * Google はこれを勤務先の内訳として解釈する。
     */
    employmentUnit: {
      "@type": "Organization",
      name: company.division,
    },
    /*
     * 職種分類。O*NET-SOC の 53-3033（Light Truck Drivers）が
     * 軽貨物の配送ドライバーに対応する。日本語の職種名も併記する。
     */
    occupationalCategory: "53-3033 Light Truck Drivers（配送ドライバー）",
    industry: "運輸・物流（貨物軽自動車運送事業）",
    hiringOrganization: {
      // 同一組織であることを @id で示し、Organization ノードと結び付ける
      "@id": `${SITE_URL}/#organization`,
      "@type": "Organization",
      name: company.name,
      url: SITE_URL,
      sameAs: SITE_URL,
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
    /*
     * 以下は description に埋め込むだけでなく個別プロパティにも出す。
     * Google 求人検索は勤務時間・応募資格・必要経験を項目として読み取り、
     * 求職者の絞り込み条件とのマッチングに使うため。
     * すべて画面の募集要項に表示している内容と一致している。
     */
    ...(job.workHours ? { workHours: job.workHours } : {}),
    ...(job.requirements?.length
      ? { qualifications: job.requirements.join("、") }
      : {}),
    ...(job.licenses?.length
      ? { skills: job.licenses.join("、") }
      : {}),
    ...(job.benefits?.length
      ? { jobBenefits: job.benefits.join("、") }
      : {}),
    /*
     * 未経験可の場合は必要経験0ヶ月として明示する。
     * 「経験不問」を構造化データで表せるため、未経験者の検索に拾われやすくなる。
     */
    ...(job.experience === "未経験可"
      ? {
          experienceRequirements: {
            "@type": "OccupationalExperienceRequirements",
            monthsOfExperience: 0,
          },
          experienceInPlaceOfEducation: true,
        }
      : job.experience
        ? { experienceRequirements: job.experience }
        : {}),
    /*
     * 出来高部分は baseSalary（最低保証）とは別に incentiveCompensation で表す。
     * baseSalary に出来高を混ぜると保証額が正しく伝わらないため分けている。
     */
    incentiveCompensation:
      "配達1個あたり160円以上の出来高制。出来高が最低保証を下回った日は日額15,000円を保証します。ロイヤリティ・システム利用料の差し引きはありません。",
    ...(job.headcount ? { totalJobOpenings: job.headcount } : {}),
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
    /*
     * author / publisher とも同一の Organization ノードを @id で参照する。
     * 別々のノードとして書くと、検索エンジンから見て
     * 「サイト運営者」と「記事の書き手」が別の実体に見えてしまうため。
     */
    author: {
      "@id": `${SITE_URL}/#organization`,
      "@type": "Organization",
      name: authors[article.author].name,
      url: SITE_URL,
    },
    publisher: { "@id": `${SITE_URL}/#organization` },
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

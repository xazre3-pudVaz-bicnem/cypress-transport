/**
 * 記事の執筆者・監修者。
 *
 * ⚠️ 実在しない人物を著者として掲載しない。
 * 現時点で個人名を出せる書き手がいないため、組織名義の1件のみを定義している。
 *
 * 実際の執筆担当者・監修者（行政書士・税理士など）が決まったら、
 * ここに追加して各記事の author / supervisor から参照する。
 * 個人名・保有資格・担当業務・経験年数を明示できると
 * E-E-A-T（特に Experience と Expertise）の評価に効く。
 */

export interface Author {
  name: string;
  /** 肩書き・立場 */
  role: string;
  /** プロフィール（未確定なら null で非表示） */
  profile: string | null;
  /** 保有資格など（未確定なら null） */
  credentials: string | null;
}

export const authors = {
  editorial: {
    name: "株式会社サイプレス 軽貨物事業部",
    role: "編集部",
    profile:
      "東京都葛飾区を拠点に軽貨物運送事業の立ち上げを進めている、株式会社サイプレスの軽貨物事業部です。事業の準備を通して調べた内容と、公的機関が公開している一次情報をもとに記事を作成しています。",
    credentials: null,
  },
} as const satisfies Record<string, Author>;

export type AuthorKey = keyof typeof authors;

/**
 * 監修者。
 * 法務・税務の記事には本来、有資格者の監修を付けたい。
 * 依頼が決まるまでは空のまま（記事側の supervisor は null）。
 */
export const supervisors = {} as Record<string, Author>;

export type SupervisorKey = keyof typeof supervisors;

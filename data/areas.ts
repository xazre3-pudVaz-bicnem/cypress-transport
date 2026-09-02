/**
 * 採用エリアの一元管理。
 *
 * ここは「応募を受け付けたいエリアの整理」であり、
 * 個別の勤務地は求人ごと（data/jobs.ts）に定義する。
 *
 * 個別エリアページ（/recruit/area/[slug]）は、
 * そのエリアに実際の求人（status: "open"）が存在し、かつ
 * エリア固有の独自コンテンツを用意できた場合にのみ作成する方針。
 * 地域名だけを差し替えた量産ページは作らない（Doorway対策）。
 */

export type AreaSlug =
  | "katsushika"
  | "edogawa"
  | "adachi"
  | "koto"
  | "sumida"
  | "matsudo"
  | "ichikawa"
  | "nagareyama"
  | "misato"
  | "yashio"
  | "soka"
  | "yoshikawa";

export interface Area {
  slug: AreaSlug;
  /** 市区名 */
  name: string;
  /** 都道府県 */
  prefecture: "東京都" | "千葉県" | "埼玉県";
  /** 優先度: primary = 最優先候補 / secondary = 周辺候補 */
  priority: "primary" | "secondary";
  /** Schema.org jobLocation 用 */
  addressRegion: string;
  addressLocality: string;
  /**
   * 拠点（葛飾区）との地理的な関係。
   * ⚠️ ここに書けるのは地図で確認できる事実だけ。
   *    「車で30分」のような所要時間は、実際の集荷拠点が確定するまで書かない。
   */
  relation: string;
}

export const areas: Area[] = [
  // ── 最優先候補 ──
  { slug: "katsushika", name: "葛飾区", prefecture: "東京都", priority: "primary", addressRegion: "東京都", addressLocality: "葛飾区", relation: "拠点の所在地" },
  { slug: "misato", name: "三郷市", prefecture: "埼玉県", priority: "primary", addressRegion: "埼玉県", addressLocality: "三郷市", relation: "葛飾区に隣接（埼玉県南東部）" },
  { slug: "matsudo", name: "松戸市", prefecture: "千葉県", priority: "primary", addressRegion: "千葉県", addressLocality: "松戸市", relation: "葛飾区に隣接（千葉県北西部）" },
  { slug: "koto", name: "江東区", prefecture: "東京都", priority: "primary", addressRegion: "東京都", addressLocality: "江東区", relation: "東京23区東部。葛飾区の南側" },
  // ── 周辺候補 ──
  { slug: "edogawa", name: "江戸川区", prefecture: "東京都", priority: "secondary", addressRegion: "東京都", addressLocality: "江戸川区", relation: "葛飾区に隣接（東京23区東部）" },
  { slug: "adachi", name: "足立区", prefecture: "東京都", priority: "secondary", addressRegion: "東京都", addressLocality: "足立区", relation: "葛飾区に隣接（東京23区東部）" },
  { slug: "sumida", name: "墨田区", prefecture: "東京都", priority: "secondary", addressRegion: "東京都", addressLocality: "墨田区", relation: "葛飾区に隣接（東京23区東部）" },
  { slug: "ichikawa", name: "市川市", prefecture: "千葉県", priority: "secondary", addressRegion: "千葉県", addressLocality: "市川市", relation: "江戸川区・松戸市に隣接（千葉県北西部）" },
  { slug: "nagareyama", name: "流山市", prefecture: "千葉県", priority: "secondary", addressRegion: "千葉県", addressLocality: "流山市", relation: "松戸市に隣接（千葉県北西部）" },
  { slug: "yashio", name: "八潮市", prefecture: "埼玉県", priority: "secondary", addressRegion: "埼玉県", addressLocality: "八潮市", relation: "葛飾区に隣接（埼玉県南東部）" },
  { slug: "soka", name: "草加市", prefecture: "埼玉県", priority: "secondary", addressRegion: "埼玉県", addressLocality: "草加市", relation: "八潮市に隣接（埼玉県南東部）" },
  { slug: "yoshikawa", name: "吉川市", prefecture: "埼玉県", priority: "secondary", addressRegion: "埼玉県", addressLocality: "吉川市", relation: "三郷市に隣接（埼玉県南東部）" },
];

export function getArea(slug: AreaSlug): Area {
  const area = areas.find((a) => a.slug === slug);
  if (!area) throw new Error(`Unknown area slug: ${slug}`);
  return area;
}

export const prefectures = ["東京都", "千葉県", "埼玉県"] as const;

export function areasByPrefecture(pref: (typeof prefectures)[number]): Area[] {
  return areas.filter((a) => a.prefecture === pref);
}

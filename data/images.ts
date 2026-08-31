/**
 * サイト内で使用する写真の一元管理。
 *
 * ページからは必ず `photos.xxx` で参照する（コンポーネントに src を直書きしない）。
 * 差し替えはこのファイルの src / alt / 寸法を変えるだけで全ページに反映される。
 *
 * ── 枚数を絞る方針 ────────────────────────────
 * 同じような白い軽バンの写真が何枚も続くと、かえって生成画像らしさが出る。
 * TOPページで使うのは3枚まで、下層ページも1〜2枚に留める。
 * 使い所のなくなった写真は _photo-sources/retired-unused/ へ退避している。
 *
 * ── 現在の写真について ──────────────────────────
 * 掲載中の写真はすべて**イメージカット（当社の実車・実拠点ではない）**。
 *  1. 人物が写った画像は使わない（架空の人物を当社スタッフに見せないため）
 *  2. alt に実在の場所・人物を断定しない
 *
 * 実車・実拠点・実スタッフを撮影できたら src を差し替え、
 * alt を実態に沿った説明へ更新すること。実写への置き換えが最も効く。
 * ──────────────────────────────────────────
 */

export interface SitePhoto {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const photos = {
  /** TOPヒーロー：東京湾岸を背景にした軽貨物車両（横長・人物なし） */
  heroVan: {
    src: "/keikamotsu-van-tokyo-hero.webp",
    alt: "東京の湾岸エリアを背景に停車する白い軽貨物車両",
    width: 1672,
    height: 941,
  },
  /** 荷室にダンボールを積載した状態（真後ろから） */
  cargoStacked: {
    src: "/keikamotsu-van-cargo-stacked.webp",
    alt: "後部ドアを開け、段ボール箱を積み上げた軽貨物車両の荷室",
    width: 1400,
    height: 788,
  },
  /** 荷室への積み込み（斜め） */
  cargoLoaded: {
    src: "/keikamotsu-van-cargo-loaded.webp",
    alt: "住宅街で後部ドアを開けて荷物を積んだ軽貨物車両",
    width: 1600,
    height: 900,
  },
  /** 物流拠点の積み込み口 */
  logisticsCenter: {
    src: "/keikamotsu-van-logistics-center.webp",
    alt: "物流倉庫の積み込み口に停車する軽貨物車両と荷物",
    width: 1600,
    height: 900,
  },
  /** 街なかの軽貨物車両 */
  cityStreet: {
    src: "/keikamotsu-van-city-street.webp",
    alt: "街なかの道路に停車している軽貨物車両",
    width: 1200,
    height: 900,
  },
  /** 住宅街での配送風景 */
  residentialArea: {
    src: "/keikamotsu-van-residential-area.webp",
    alt: "住宅街の道路に停車している軽貨物車両",
    width: 1200,
    height: 900,
  },
  /** オフィス街での配送風景 */
  officeDistrict: {
    src: "/keikamotsu-van-office-district.webp",
    alt: "オフィス街の道路脇に停車している軽貨物車両",
    width: 1200,
    height: 900,
  },
  /** 運転席まわり */
  driverSeat: {
    src: "/keikamotsu-van-driver-seat.webp",
    alt: "軽貨物車両の運転席まわり",
    width: 1200,
    height: 900,
  },
  /** 配送拠点前の車両とカゴ台車 */
  warehouse: {
    src: "/keikamotsu-van-warehouse.webp",
    alt: "配送拠点の前に停まる軽貨物車両とカゴ台車",
    width: 1200,
    height: 900,
  },
  /** 複数の軽貨物車両 */
  fleet: {
    src: "/keikamotsu-van-fleet.webp",
    alt: "並んで駐車している複数台の軽貨物車両",
    width: 1400,
    height: 1050,
  },
} as const satisfies Record<string, SitePhoto>;

export type PhotoKey = keyof typeof photos;

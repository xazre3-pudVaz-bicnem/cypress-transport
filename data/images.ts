/**
 * サイト内で使用する写真の一元管理。
 *
 * ページからは必ず `photos.xxx` で参照する（コンポーネントに src を直書きしない）。
 * 差し替えはこのファイルの src / alt / 寸法を変えるだけで全ページに反映される。
 *
 * ── 現在の写真について ──────────────────────────
 * 掲載中の写真はすべて**イメージカット（当社の実車・実拠点ではない）**。
 * そのため方針として次の2点を守っている。
 *
 *  1. 人物が写った画像は使わない。
 *     架空の人物を「当社スタッフ」に見せるのは誤認を招くため。
 *     人物入りのAI画像は _photo-sources/retired-people-photos/ へ退避済み。
 *  2. alt に実在の場所・人物を断定しない。
 *     「葛飾区の配送拠点」「当社スタッフ」などとは書かない。
 *
 * 実車・実拠点・実スタッフを撮影できたら、src を差し替え、
 * alt を実態に沿った説明（例：「葛飾区の拠点に停車する当社の軽貨物車両」）へ
 * 更新すること。実写に置き換えることがE-E-A-T上いちばん効く。
 * ──────────────────────────────────────────
 */

export interface SitePhoto {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const photos = {
  /** ヒーロー：走行中の軽貨物車両 */
  vanDriving: {
    src: "/keikamotsu-van-driving-tokyo.webp",
    alt: "湾岸の道路を走行する白い軽貨物車両",
    width: 1536,
    height: 1024,
  },
  /** 荷室に段ボールを積載した状態 */
  cargoLoaded: {
    src: "/keikamotsu-van-cargo-loaded.webp",
    alt: "後部ドアを開けて段ボール箱を積載した軽貨物車両の荷室",
    width: 1600,
    height: 900,
  },
  /** 物流拠点・積み込み場 */
  logisticsCenter: {
    src: "/keikamotsu-van-logistics-center.webp",
    alt: "物流倉庫の積み込み口に停車する軽貨物車両と荷物",
    width: 1600,
    height: 900,
  },
  /** 拠点に並ぶ車両（夕景） */
  depotEvening: {
    src: "/keikamotsu-van-depot-evening.webp",
    alt: "夕暮れの配送拠点に並ぶ配送車両",
    width: 1600,
    height: 900,
  },
  /** 複数の軽貨物車両 */
  fleet: {
    src: "/keikamotsu-van-fleet.webp",
    alt: "並んで駐車している複数台の軽貨物車両",
    width: 1400,
    height: 1050,
  },
  /** 街なかの軽貨物車両 */
  cityStreet: {
    src: "/keikamotsu-van-city-street.webp",
    alt: "街なかの道路に停車している軽貨物車両",
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
  /** 住宅街での配送風景 */
  residentialArea: {
    src: "/keikamotsu-van-residential-area.webp",
    alt: "住宅街の道路に停車している軽貨物車両",
    width: 1200,
    height: 900,
  },
  /** 住宅街での配送風景（2） */
  residentialStreet: {
    src: "/keikamotsu-van-residential-street.webp",
    alt: "街路樹のある住宅街を走る軽貨物車両",
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
  /** 湾岸エリアの風景 */
  waterfront: {
    src: "/keikamotsu-van-waterfront.webp",
    alt: "水辺の街並みを背景にした軽貨物車両",
    width: 1200,
    height: 900,
  },
} as const satisfies Record<string, SitePhoto>;

export type PhotoKey = keyof typeof photos;

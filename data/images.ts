/**
 * サイト内で使用する写真の一元管理。
 *
 * ここに登録した写真だけをページから参照する（コンポーネントに直書きしない）。
 * 差し替え時はこのファイルの src / alt / width / height を変更すれば全ページに反映される。
 *
 * ── alt の書き方ルール ────────────────────────
 * 写真はイメージカット（モデル・車両とも当社の実物ではない）です。
 * そのため alt には「葛飾区の配送拠点」「当社スタッフ」など、
 * 事実と異なる場所・人物の断定を書かないこと。
 * 実際の車両・現場・スタッフの写真が撮影でき次第、
 * src を差し替えたうえで alt を実態に沿った説明へ更新してください。
 * ──────────────────────────────────────
 */

export interface SitePhoto {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const photos = {
  /** TOPヒーロー（横長・PC用） */
  heroWide: {
    src: "/hero-driver.webp",
    alt: "軽貨物車両の前に立つドライバーと都市の風景",
    width: 1672,
    height: 941,
  },
  /** TOPヒーロー（縦長・スマートフォン用） */
  heroPortrait: {
    src: "/driver-portrait.webp",
    alt: "軽貨物車両の前に立つドライバー",
    width: 1086,
    height: 1448,
  },
  /** 荷物の積み込み */
  loading: {
    src: "/work-loading.webp",
    alt: "軽貨物車両の荷室に段ボール箱を積み込む様子",
    width: 1200,
    height: 900,
  },
  /** 荷物の受け渡し（縦） */
  delivery: {
    src: "/work-delivery.webp",
    alt: "玄関先で荷物を手渡しする配送ドライバー",
    width: 1086,
    height: 1448,
  },
  /** 運転中 */
  driving: {
    src: "/work-driving.webp",
    alt: "軽貨物車両を運転するドライバー",
    width: 1200,
    height: 800,
  },
  /** 物流拠点・倉庫 */
  warehouse: {
    src: "/warehouse.webp",
    alt: "物流拠点の前に停まる軽貨物車両とカゴ台車",
    width: 1200,
    height: 900,
  },
  /** 複数車両 */
  fleet: {
    src: "/fleet.webp",
    alt: "並んで駐車している複数台の軽貨物車両",
    width: 1400,
    height: 1050,
  },
  /** 街中の軽バン */
  vanCity: {
    src: "/van-city.webp",
    alt: "街なかに停車している軽貨物車両",
    width: 1200,
    height: 900,
  },
  /** 車内・運転席まわり */
  vanInterior: {
    src: "/van-interior.webp",
    alt: "軽貨物車両の運転席まわり",
    width: 1200,
    height: 900,
  },
  /** 打ち合わせ・研修 */
  training: {
    src: "/training.webp",
    alt: "車両の前で書類を見ながら打ち合わせをする2人のドライバー",
    width: 1200,
    height: 900,
  },
  /** 出発・1日の始まり */
  walking: {
    src: "/walking.webp",
    alt: "拠点で車両に向かって歩くドライバー",
    width: 1200,
    height: 800,
  },
  /** スマートフォンでの配完報告 */
  appScan: {
    src: "/app-scan.webp",
    alt: "荷物を持ちながらスマートフォンで配送情報を確認するドライバー",
    width: 1200,
    height: 900,
  },
  /** 走行中（CTA背景） */
  ctaDrive: {
    src: "/cta-drive.webp",
    alt: "湾岸の道路を走行する軽貨物車両",
    width: 1536,
    height: 1024,
  },
  /** 住宅街の配送風景 */
  street: {
    src: "/area-kasai.webp",
    alt: "住宅街の道路に停車している軽貨物車両",
    width: 1200,
    height: 900,
  },
  /** 住宅街の配送風景（2） */
  streetAlt: {
    src: "/area-funabashi.webp",
    alt: "街路樹のある住宅街を走る軽貨物車両",
    width: 1200,
    height: 900,
  },
  /** オフィス街の配送風景 */
  cityRoad: {
    src: "/area-shinagawa.webp",
    alt: "オフィス街の道路脇に停車している軽貨物車両",
    width: 1200,
    height: 900,
  },
  /** 湾岸エリアの風景 */
  waterfront: {
    src: "/area-koto.webp",
    alt: "水辺の街並みを背景にした軽貨物車両",
    width: 1200,
    height: 900,
  },
} as const satisfies Record<string, SitePhoto>;

export type PhotoKey = keyof typeof photos;

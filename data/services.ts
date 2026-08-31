/**
 * 法人向けサービスメニューの一元管理。
 *
 * ⚠️ available: true にできるのは「実際に提供が確定したサービス」だけ。
 * 提供が確定していないものを「対応可能」と掲載してはならない。
 * available: false のサービスは /service ページに表示されない。
 *
 * サービス提供開始時は available を true にし、description を
 * 実際の提供内容に合わせて記載する。
 */

export interface ServiceMenu {
  slug: string;
  name: string;
  description: string;
  available: boolean;
}

export const serviceMenus: ServiceMenu[] = [
  {
    slug: "charter",
    name: "チャーター便",
    description: "1台の車両を貸し切り、指定のルート・時間で配送します。",
    available: false, // 提供確定後に true
  },
  {
    slug: "spot",
    name: "スポット便",
    description: "急な配送ニーズに単発でお応えします。",
    available: false,
  },
  {
    slug: "regular",
    name: "定期便",
    description: "決まったルート・スケジュールでの定期配送に対応します。",
    available: false,
  },
  {
    slug: "last-mile",
    name: "宅配（ラストワンマイル）",
    description: "EC商品などの個人宅向け配送を行います。",
    available: false,
  },
  {
    slug: "b2b",
    name: "企業配",
    description: "企業間の荷物を決まった届け先へ配送します。",
    available: false,
  },
];

export const availableServices = serviceMenus.filter((s) => s.available);

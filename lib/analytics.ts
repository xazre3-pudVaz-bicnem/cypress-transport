/**
 * GA4 イベント計測ヘルパー。
 *
 * NEXT_PUBLIC_GA4_ID を設定すると gtag が読み込まれ（components/GoogleAnalytics）、
 * 未設定の間は track() は何もしない（開発時も安全）。
 *
 * イベント設計:
 *  - view_job            : 個別求人ページ閲覧（page_viewから GA4 側で作成も可）
 *  - click_job           : 求人カードのクリック
 *  - click_apply         : 応募CTAのクリック
 *  - submit_application  : 応募フォーム送信完了
 *  - click_phone         : 電話番号タップ
 *  - click_instagram     : Instagramリンククリック
 *  - click_recruit_cta   : 採用系CTA全般のクリック
 */

export type GaEvent =
  | "view_job"
  | "click_job"
  | "click_apply"
  | "submit_application"
  | "click_phone"
  | "click_instagram"
  | "click_recruit_cta";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: GaEvent, params?: Record<string, string>) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", event, params ?? {});
}

export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;

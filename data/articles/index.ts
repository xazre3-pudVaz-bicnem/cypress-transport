import type { Article } from "./types";
import { article as whatIsKeikamotsuDriver } from "./what-is-keikamotsu-driver";
import { article as licenseForKeikamotsu } from "./license-for-keikamotsu";
import { article as kuroNumber } from "./kuro-number";
import { article as gyomuItakuBasics } from "./gyomu-itaku-basics";
import { article as incomeStructure } from "./income-structure";
import { article as noVehicle } from "./no-vehicle";
import { article as dailySchedule } from "./daily-schedule";
import { article as kigyohaiTakuhaiDifference } from "./kigyohai-takuhai-difference";
import { article as beginnerGuide } from "./beginner-guide";
import { article as kakuteiShinkoku } from "./kakutei-shinkoku";
import { article as vehicleCost } from "./vehicle-cost";
import { article as contractCheck } from "./contract-check";

/**
 * 公開記事の一覧。新しい記事を追加したらここに登録する。
 * 並び順は公開日の降順で自動ソートされる（lib/articles.ts）。
 */
export const allArticles: Article[] = [
  whatIsKeikamotsuDriver,
  licenseForKeikamotsu,
  kuroNumber,
  gyomuItakuBasics,
  incomeStructure,
  noVehicle,
  dailySchedule,
  kigyohaiTakuhaiDifference,
  beginnerGuide,
  kakuteiShinkoku,
  vehicleCost,
  contractCheck,
];

export type { Article } from "./types";
export { categories } from "./types";

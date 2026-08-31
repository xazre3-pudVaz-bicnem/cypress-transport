/**
 * IndexNow 通知スクリプト（Bing / Copilot などの対応検索エンジン向け）。
 *
 * ── Google Indexing API との違い ──────────────────
 *  Google Indexing API … Google専用。**求人ページ（JobPosting）にのみ**使用可。
 *                        → scripts/notify-indexing.mjs
 *  IndexNow            … Bing / Yandex / Naver / Seznam など対応エンジン共通。
 *                        **どのページにも使える**（記事・固定ページ含む）。
 *  2つは別物なので混同しないこと。Googleは IndexNow を採用していない。
 * ──────────────────────────────────────────
 *
 * ── 事前準備（初回のみ）────────────────────────
 * 1. 任意の英数字キーを生成する（8〜128文字）。例:
 *      node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
 * 2. 環境変数に設定する（Vercel と .env.local の両方）
 *      INDEXNOW_KEY=生成したキー
 * 3. キーの所有確認用ファイルは app/[key].txt/route.ts が自動で返すため、
 *    public/ にファイルを置く必要はない。
 *    https://www.cypress-transport.com/<キー>.txt でキーが返ることを確認する。
 * 4. Bing Webmaster Tools にサイトを登録しておく（必須ではないが推奨）
 *
 * ── 使い方 ──────────────────────────────────
 *   # 個別URLを通知
 *   node scripts/indexnow.mjs https://www.cypress-transport.com/recruit/jobs/katsushika-driver-001
 *
 *   # sitemap.xml の全URLを通知（大きな更新のあと）
 *   node scripts/indexnow.mjs --all
 *
 * 削除したページも同じように通知してよい（404を検知して除外される）。
 */

const KEY = process.env.INDEXNOW_KEY;
const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  "https://www.cypress-transport.com";
const HOST = new URL(SITE).host;

if (!KEY) {
  console.error(
    [
      "エラー: 環境変数 INDEXNOW_KEY が設定されていません。",
      "",
      "キーの作り方:",
      '  node -e "console.log(require(\'crypto\').randomBytes(16).toString(\'hex\'))"',
      "",
      "生成したキーを INDEXNOW_KEY に設定してください（Vercelにも同じ値を登録）。",
    ].join("\n")
  );
  process.exit(1);
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error(
    "使い方: node scripts/indexnow.mjs <URL...>  または  node scripts/indexnow.mjs --all"
  );
  process.exit(1);
}

/** sitemap.xml から全URLを取得する */
async function urlsFromSitemap() {
  const res = await fetch(`${SITE}/sitemap.xml`);
  if (!res.ok) {
    throw new Error(`sitemap.xml を取得できませんでした (${res.status})`);
  }
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const urlList = args[0] === "--all" ? await urlsFromSitemap() : args;

// 自サイト以外のURLは送れない仕様なので、事前に弾く
const invalid = urlList.filter((u) => {
  try {
    return new URL(u).host !== HOST;
  } catch {
    return true;
  }
});
if (invalid.length > 0) {
  console.error("次のURLは対象外です（ホストが一致しません）:\n" + invalid.join("\n"));
  process.exit(1);
}

console.log(`${urlList.length}件のURLを IndexNow に送信します（host: ${HOST}）`);

const res = await fetch("https://api.indexnow.org/IndexNow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `${SITE}/${KEY}.txt`,
    urlList,
  }),
});

// 200 / 202 が成功。202 は「受理したが検証中」
if (res.status === 200 || res.status === 202) {
  console.log(`✓ 送信しました (HTTP ${res.status})`);
  for (const u of urlList) console.log("  " + u);
} else {
  console.error(`✗ 送信に失敗しました (HTTP ${res.status})`);
  console.error(await res.text());
  if (res.status === 403) {
    console.error(
      `\nキーファイルが公開されているか確認してください: ${SITE}/${KEY}.txt`
    );
  }
  process.exit(1);
}

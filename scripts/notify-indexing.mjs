/**
 * Google Indexing API 通知スクリプト（求人ページの更新をGoogleへ即時通知）。
 *
 * ⚠️⚠️ 使ってよいのは求人ページ（/recruit/jobs/…）だけです。⚠️⚠️
 *
 * Indexing API の公式サポート対象は JobPosting または BroadcastEvent を
 * 含むページに限られます。コラム記事や会社概要など通常のページに使うのは
 * Google のガイドライン違反にあたり、API の利用停止につながる可能性があります。
 * このスクリプトは求人URL以外を渡すと実行を中止します。
 *
 * ── 事前準備（初回のみ）──────────────────────────
 * 1. Google Cloud Console でプロジェクトを作成し「Indexing API」を有効化
 * 2. サービスアカウントを作成し、JSON鍵をダウンロード
 *    → このリポジトリには絶対にコミットしない（.gitignoreで除外済み）
 * 3. Search Console のプロパティ（cypress-transport.com）の「設定 > ユーザーと権限」で
 *    サービスアカウントのメールアドレスを「所有者」として追加
 * 4. 環境変数を設定:
 *    GOOGLE_SERVICE_ACCOUNT_JSON_PATH=C:\path\to\service-account.json
 *
 * ── 使い方 ─────────────────────────────────
 * 求人公開時:
 *   node scripts/notify-indexing.mjs updated https://cypress-transport.com/recruit/jobs/katsushika-driver-001
 * 求人終了時（ページ削除・404/410化した場合）:
 *   node scripts/notify-indexing.mjs deleted https://cypress-transport.com/recruit/jobs/katsushika-driver-001
 *
 * 依存パッケージなし（Node標準のcryptoでJWT署名を行う）。
 */

import { readFileSync } from "node:fs";
import { createSign } from "node:crypto";

const [, , type, url] = process.argv;

if (!type || !url || !["updated", "deleted"].includes(type)) {
  console.error(
    "使い方: node scripts/notify-indexing.mjs <updated|deleted> <求人URL>"
  );
  process.exit(1);
}

// Indexing API は求人ページ専用。誤用を防ぐためURLを検証する
if (!/\/recruit\/jobs\/[^/]+$/.test(url)) {
  console.error(
    [
      "エラー: このスクリプトは求人ページのURLにのみ使用できます。",
      "  指定されたURL: " + url,
      "",
      "Google Indexing API がサポートするのは JobPosting / BroadcastEvent を",
      "含むページだけです。記事や固定ページの更新通知には使えません。",
      "それらは sitemap.xml と Search Console の URL 検査で対応してください。",
    ].join("\n")
  );
  process.exit(1);
}

const keyPath = process.env.GOOGLE_SERVICE_ACCOUNT_JSON_PATH;
if (!keyPath) {
  console.error(
    "環境変数 GOOGLE_SERVICE_ACCOUNT_JSON_PATH にサービスアカウント鍵のパスを設定してください"
  );
  process.exit(1);
}

const key = JSON.parse(readFileSync(keyPath, "utf8"));

function base64url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

// サービスアカウントのJWTを作成してアクセストークンを取得
const now = Math.floor(Date.now() / 1000);
const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
const claim = base64url(
  JSON.stringify({
    iss: key.client_email,
    scope: "https://www.googleapis.com/auth/indexing",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  })
);
const signer = createSign("RSA-SHA256");
signer.update(`${header}.${claim}`);
const signature = signer
  .sign(key.private_key, "base64")
  .replace(/\+/g, "-")
  .replace(/\//g, "_")
  .replace(/=+$/, "");
const jwt = `${header}.${claim}.${signature}`;

const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    assertion: jwt,
  }),
});

if (!tokenRes.ok) {
  console.error("トークン取得失敗:", tokenRes.status, await tokenRes.text());
  process.exit(1);
}

const { access_token } = await tokenRes.json();

const publishRes = await fetch(
  "https://indexing.googleapis.com/v3/urlNotifications:publish",
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url,
      type: type === "updated" ? "URL_UPDATED" : "URL_DELETED",
    }),
  }
);

const result = await publishRes.text();
if (!publishRes.ok) {
  console.error("通知失敗:", publishRes.status, result);
  process.exit(1);
}

console.log(`✓ Googleへ通知しました（${type}）: ${url}`);
console.log(result);

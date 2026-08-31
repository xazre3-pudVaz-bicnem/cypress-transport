import { notFound } from "next/navigation";

/**
 * IndexNow のキー所有確認用エンドポイント。
 *
 * IndexNow は「https://ドメイン/<キー>.txt にキーと同じ文字列が置かれていること」で
 * サイトの所有を確認する。public/ に実ファイルを置くとキーがGitに入ってしまうため、
 * 環境変数 INDEXNOW_KEY から動的に返している。
 *
 * 例: INDEXNOW_KEY=abc123 のとき
 *     https://www.cypress-transport.com/abc123.txt → "abc123"
 *
 * キーが未設定、またはリクエストされたファイル名がキーと一致しない場合は404。
 */
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;
  const expected = process.env.INDEXNOW_KEY?.trim();

  if (!expected) notFound();
  if (key !== `${expected}.txt`) notFound();

  return new Response(expected, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

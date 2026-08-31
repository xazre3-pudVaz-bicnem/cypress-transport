import { NextRequest, NextResponse } from "next/server";

/**
 * 応募・お問い合わせフォームの送信API。
 *
 * セキュリティ対策:
 *  - honeypot（website欄に入力があればスパム判定・成功を装って破棄）
 *  - 同一IPのレートリミット（1時間に5件まで）
 *  - Origin/Hostチェック（CSRF対策）
 *  - 入力バリデーション + 長さ制限
 *  - メール本文はプレーンテキスト（HTMLインジェクション不可）
 *
 * メール送信: Resend API（環境変数 RESEND_API_KEY / CONTACT_EMAIL_TO /
 * CONTACT_EMAIL_FROM）。未設定時は本番ではエラー、開発ではログ出力のみ。
 */

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;
const rateMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (rateMap.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (hits.length >= RATE_LIMIT) {
    rateMap.set(ip, hits);
    return true;
  }
  hits.push(now);
  rateMap.set(ip, hits);
  // メモリリーク防止
  if (rateMap.size > 10000) rateMap.clear();
  return false;
}

interface ContactBody {
  name?: string;
  phone?: string;
  email?: string;
  area?: string;
  license?: string;
  vehicle?: string;
  experience?: string;
  startTiming?: string;
  message?: string;
  job?: string;
  website?: string; // honeypot
}

function validate(body: ContactBody): string | null {
  const required: [keyof ContactBody, string, number][] = [
    ["name", "お名前", 50],
    ["phone", "電話番号", 20],
    ["email", "メールアドレス", 100],
    ["area", "希望エリア", 30],
    ["license", "免許の有無", 20],
    ["vehicle", "車両の有無", 20],
    ["experience", "経験の有無", 20],
    ["startTiming", "希望開始時期", 30],
  ];
  for (const [key, label, max] of required) {
    const value = body[key];
    if (!value || typeof value !== "string" || value.trim().length === 0) {
      return `${label}を入力してください`;
    }
    if (value.length > max) return `${label}が長すぎます`;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email!)) {
    return "メールアドレスの形式が正しくありません";
  }
  if (!/^[\d+\-() ]{10,20}$/.test(body.phone!)) {
    return "電話番号の形式が正しくありません";
  }
  if (body.message && body.message.length > 2000) {
    return "ご質問・ご希望は2000文字以内で入力してください";
  }
  return null;
}

export async function POST(req: NextRequest) {
  // CSRF対策: Origin と Host の一致を確認
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return NextResponse.json({ error: "不正なリクエストです" }, { status: 403 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "送信回数の上限に達しました。しばらくしてからお試しください。" },
      { status: 429 }
    );
  }

  let body: ContactBody;
  try {
    body = (await req.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: "不正なリクエストです" }, { status: 400 });
  }

  // honeypot: botには成功したように見せて破棄
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const validationError = validate(body);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const lines = [
    "軽貨物事業部サイトからの応募・お問い合わせ",
    "",
    `お名前: ${body.name}`,
    `電話番号: ${body.phone}`,
    `メール: ${body.email}`,
    `希望エリア: ${body.area}`,
    `普通自動車免許: ${body.license}`,
    `車両: ${body.vehicle}`,
    `軽貨物経験: ${body.experience}`,
    `希望開始時期: ${body.startTiming}`,
    ...(body.job ? [`対象求人: ${body.job}`] : []),
    "",
    "── ご質問・ご希望 ──",
    body.message?.trim() || "（記入なし）",
  ];
  const text = lines.join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO;
  const from = process.env.CONTACT_EMAIL_FROM;

  if (!apiKey || !to || !from) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[contact] メール設定未完了のためログ出力のみ:\n" + text);
      return NextResponse.json({ ok: true });
    }
    console.error("[contact] メール送信の環境変数が未設定です");
    return NextResponse.json(
      {
        error:
          "現在フォームを利用できません。お手数ですがお電話またはInstagram DMでご連絡ください。",
      },
      { status: 500 }
    );
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: body.email,
      subject: `【応募・問い合わせ】${body.name}様（${body.area}）`,
      text,
    }),
  });

  if (!res.ok) {
    console.error("[contact] Resend送信失敗:", res.status, await res.text());
    return NextResponse.json(
      {
        error:
          "送信に失敗しました。お手数ですがお電話またはInstagram DMでご連絡ください。",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}

"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { track } from "@/lib/analytics";
import { areas } from "@/data/areas";

/**
 * 応募・お問い合わせフォーム。
 * スマートフォンで1分以内に送信できることを最優先に、入力項目を最小限にしている。
 * スパム対策: honeypot（website欄）+ サーバー側レートリミット。
 */

const startTimings = [
  "すぐにでも",
  "1ヶ月以内",
  "2〜3ヶ月以内",
  "時期は未定（情報収集中）",
];

export function ApplyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobSlug = searchParams.get("job") ?? "";

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(body?.error ?? "送信に失敗しました");
      }
      track("submit_application", { job: jobSlug || "(none)" });
      router.push("/contact/thanks");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "送信に失敗しました。時間をおいて再度お試しいただくか、お電話でご連絡ください。"
      );
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-[15px] text-navy-900 placeholder:text-slate-400 focus:border-brand-600 focus:outline-2 focus:outline-brand-600/30";
  const labelClass = "block text-sm font-bold text-navy-900";

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate={false}>
      {jobSlug && <input type="hidden" name="job" value={jobSlug} />}

      {/* honeypot（人間には見えない。入力されたらスパム判定） */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 overflow-hidden">
        <label>
          このフィールドは空のままにしてください
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label htmlFor="name" className={labelClass}>
          お名前 <Req />
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={50}
          autoComplete="name"
          placeholder="山田 太郎"
          className={`mt-2 ${inputClass}`}
        />
      </div>

      <div>
        <label htmlFor="phone" className={labelClass}>
          電話番号 <Req />
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          maxLength={20}
          autoComplete="tel"
          inputMode="tel"
          placeholder="090-0000-0000"
          className={`mt-2 ${inputClass}`}
        />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          メールアドレス <Req />
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={100}
          autoComplete="email"
          inputMode="email"
          placeholder="example@email.com"
          className={`mt-2 ${inputClass}`}
        />
      </div>

      <div>
        <label htmlFor="area" className={labelClass}>
          希望エリア <Req />
        </label>
        <select id="area" name="area" required className={`mt-2 ${inputClass}`}>
          <option value="">選択してください</option>
          {areas.map((a) => (
            <option key={a.slug} value={`${a.prefecture}${a.name}`}>
              {a.prefecture} {a.name}
            </option>
          ))}
          <option value="その他・未定">その他・未定</option>
        </select>
      </div>

      <fieldset>
        <legend className={labelClass}>
          普通自動車免許 <Req />
        </legend>
        <div className="mt-2 flex flex-wrap gap-3">
          {["あり（AT限定なし）", "あり（AT限定）", "なし"].map((v) => (
            <label
              key={v}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm has-checked:border-brand-600 has-checked:bg-brand-50"
            >
              <input type="radio" name="license" value={v} required className="accent-brand-600" />
              {v}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className={labelClass}>
          車両（軽バン等） <Req />
        </legend>
        <div className="mt-2 flex flex-wrap gap-3">
          {["持っている", "持っていない", "検討中"].map((v) => (
            <label
              key={v}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm has-checked:border-brand-600 has-checked:bg-brand-50"
            >
              <input type="radio" name="vehicle" value={v} required className="accent-brand-600" />
              {v}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className={labelClass}>
          軽貨物の経験 <Req />
        </legend>
        <div className="mt-2 flex flex-wrap gap-3">
          {["未経験", "経験あり"].map((v) => (
            <label
              key={v}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm has-checked:border-brand-600 has-checked:bg-brand-50"
            >
              <input type="radio" name="experience" value={v} required className="accent-brand-600" />
              {v}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="startTiming" className={labelClass}>
          希望開始時期 <Req />
        </label>
        <select
          id="startTiming"
          name="startTiming"
          required
          className={`mt-2 ${inputClass}`}
        >
          <option value="">選択してください</option>
          {startTimings.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          ご質問・ご希望（任意）
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          maxLength={2000}
          placeholder="例：副業として週2日から始めたい／募集開始の連絡が欲しい など"
          className={`mt-2 ${inputClass}`}
        />
      </div>

      {error && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="btn-primary w-full disabled:opacity-60"
      >
        {submitting ? "送信中…" : "この内容で送信する"}
      </button>

      <p className="text-xs leading-relaxed text-slate-500">
        送信いただいた個人情報は、採用選考およびお問い合わせへの回答のためにのみ利用します。
        詳しくは
        <a href="/privacy" className="mx-1 text-brand-600 underline-offset-2 hover:underline">
          プライバシーポリシー
        </a>
        をご確認ください。
      </p>
    </form>
  );
}

function Req() {
  return (
    <span className="ml-1 rounded bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
      必須
    </span>
  );
}

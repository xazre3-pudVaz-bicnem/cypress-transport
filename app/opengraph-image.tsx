import { ImageResponse } from "next/og";

/**
 * サイト共通のOG画像（ビルド時に静的生成）。
 *
 * ImageResponse の標準フォントは日本語グリフを含まないため英字のみで構成している。
 * 募集状況によって内容が変わらないよう、会社・事業の情報だけを載せる
 * （「積極採用中」のような、状況が変われば嘘になる表現は入れない）。
 *
 * 実車の写真が用意できたら、1200x630 の画像を public/ に置き、
 * lib/seo.ts の既定 og:image をそちらへ差し替えるとより効果的。
 */

export const alt = "株式会社サイプレス 軽貨物事業部";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "84px",
          background: "#0a1626",
          position: "relative",
        }}
      >
        {/* 左端のアクセントライン */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "14px",
            background: "#1266cc",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            color: "#86bcf6",
            fontSize: "26px",
            fontWeight: 700,
            letterSpacing: "0.32em",
          }}
        >
          CYPRESS TRANSPORT
        </div>
        <div
          style={{
            marginTop: "34px",
            color: "#ffffff",
            fontSize: "76px",
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            display: "flex",
          }}
        >
          Light Cargo Delivery
        </div>
        <div
          style={{
            marginTop: "26px",
            color: "#c7d5e4",
            fontSize: "30px",
            fontWeight: 500,
            display: "flex",
          }}
        >
          Katsushika, Tokyo — Tokyo / Chiba / Saitama
        </div>
        <div
          style={{
            marginTop: "52px",
            display: "flex",
            alignItems: "center",
            gap: "18px",
          }}
        >
          <div
            style={{
              height: "2px",
              width: "64px",
              background: "#1266cc",
              display: "flex",
            }}
          />
          <div
            style={{
              color: "#8ea3b8",
              fontSize: "24px",
              letterSpacing: "0.1em",
              display: "flex",
            }}
          >
            cypress-transport.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

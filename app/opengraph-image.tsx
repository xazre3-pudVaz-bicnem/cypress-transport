import { ImageResponse } from "next/og";

/**
 * サイト共通のデフォルトOG画像（ビルド時に静的生成）。
 * ImageResponse の標準フォントは日本語グリフを含まないため英字のみで構成。
 * 実写真・ロゴ入りのOG画像が用意できたら public/og-image.jpg に置き換え、
 * lib/seo.ts で images を指定する運用に切り替えてもよい。
 */

export const alt = "CYPRESS TRANSPORT - 軽貨物ドライバー募集";
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
          padding: "80px",
          background:
            "linear-gradient(135deg, #081120 0%, #0d1b2a 55%, #13263c 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-80px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(31,122,232,0.45), transparent 65%)",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            color: "#4a9bf5",
            fontSize: "28px",
            fontWeight: 700,
            letterSpacing: "0.35em",
          }}
        >
          CYPRESS TRANSPORT
        </div>
        <div
          style={{
            marginTop: "36px",
            color: "#ffffff",
            fontSize: "88px",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          DRIVER
        </div>
        <div
          style={{
            color: "#85bdfa",
            fontSize: "88px",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          RECRUITING
        </div>
        <div
          style={{
            marginTop: "44px",
            display: "flex",
            gap: "14px",
          }}
        >
          {["TOKYO", "CHIBA", "SAITAMA"].map((area) => (
            <div
              key={area}
              style={{
                border: "2px solid rgba(133,189,250,0.5)",
                borderRadius: "999px",
                color: "#e2e8f0",
                padding: "10px 28px",
                fontSize: "24px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                display: "flex",
              }}
            >
              {area}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}

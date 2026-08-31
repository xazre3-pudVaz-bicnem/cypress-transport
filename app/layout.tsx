import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCta } from "@/components/layout/MobileCta";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { SITE_URL, company } from "@/data/site";
import "./globals.css";

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
  variable: "--font-noto-sans-jp",
});

/** Vercel Preview / 開発環境ではインデックスさせない */
const isProduction = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === "production"
  : process.env.NODE_ENV === "production";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `軽貨物ドライバー求人・配送なら${company.name}｜東京都葛飾区`,
    template: `%s｜${company.name}`,
  },
  description:
    "東京都葛飾区の軽貨物運送会社。東京東部・千葉北西部・埼玉東部エリアで軽貨物ドライバーを募集しています。",
  ...(isProduction
    ? {}
    : { robots: { index: false, follow: false } }),
  formatDetection: { telephone: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={notoSansJp.variable}>
      <body>
        {/* JS無効環境でもフェードイン対象が見えるようにする */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <GoogleAnalytics />
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileCta />
      </body>
    </html>
  );
}

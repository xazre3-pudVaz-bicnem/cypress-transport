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
    default: `葛飾区の軽貨物ドライバー求人｜${company.name}`,
    // 会社名を毎回フルで付けると長くなるため、下層は短い接尾辞にする
    template: `%s｜${company.name} 軽貨物事業部`,
  },
  description:
    "東京都葛飾区で軽貨物ドライバーを募集しています。業務委託・1個160円以上の出来高制・日額15,000円の最低保証・ロイヤリティなし。未経験可、AT限定可、車両リースの手配も可能です。",
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
        <GoogleAnalytics />
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileCta />
      </body>
    </html>
  );
}

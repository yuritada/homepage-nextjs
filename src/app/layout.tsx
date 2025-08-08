import type { Metadata } from "next";
import { Roboto, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: ['300', '400', '700'],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const notoSansJP = Noto_Sans_JP({
  weight: ['300', '400', '700'],
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
  title: "多田 有里 - データサイエンス×エンジニアリング",
  description: "データの力とエンジニアリングで未来を創る",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="scroll-smooth">
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" 
        />
      </head>
      <body
        className={`${roboto.variable} ${notoSansJP.variable} font-roboto antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

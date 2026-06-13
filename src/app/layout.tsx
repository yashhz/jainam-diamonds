import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-serif",
});

const montserrat = Montserrat({
  weight: ["200", "300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jainamdiamonds.com"),
  title: "Jainam Diamonds Masterpiece Collection",
  description: "Exquisite natural and lab-grown diamonds and fine jewelry from Surat, the diamond capital of the world. Handcrafted heritage and certified integrity.",
  keywords: ["Jainam Diamonds", "Surat Diamonds", "Fine Jewelry", "Natural Diamonds", "Lab-Grown Diamonds", "Eternity Rings", "Bridal Necklaces", "Bespoke Jewelry"],
  openGraph: {
    title: "Jainam Diamonds Masterpiece Collection",
    description: "Exquisite natural and lab-grown diamonds and fine jewelry from Surat.",
    url: "https://jainamdiamonds.com",
    siteName: "Jainam Diamonds",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "Jainam Diamonds Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorantGaramond.variable} ${montserrat.variable}`}>
      <body className="antialiased bg-[#0a0a0a] text-white selection:bg-[#CCA43D] selection:text-black">
        {children}
      </body>
    </html>
  );
}

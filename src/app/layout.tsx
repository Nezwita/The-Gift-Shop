import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import { CartProvider } from "@/lib/cart";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CuratedCities - Luxury Global Gifts & Iconic Local Treasures",
  description: "Experience the world's finest luxury gifts. Hand-curated, iconic treasures from vibrant metropolises like NYC, Paris, and Tokyo. Premium quality, global delivery.",
  keywords: ["luxury gifts", "curated gifts", "authentic local treasures", "premium global shopping", "NYC luxury gifts", "Paris designer gifts", "gifts with stories", "artisanal global treasures"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body bg-soft-ivory text-slate-black">
        {/* Google Analytics Placeholder */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script> */}
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://chopstick-sepia.vercel.app'),
  title: "Chopsticks Spice Malabar | 25 Years of Culinary Excellence",
  description: "Experience the finest Malabar, Chinese, and Tandoori cuisine in Pune. 25 years of authentic flavors and tradition.",
  openGraph: {
    title: "Chopsticks Spice Malabar | 25 Years of Culinary Excellence",
    description: "Experience the finest Malabar, Chinese, and Tandoori cuisine in Pune. 25 years of authentic flavors and tradition.",
    url: 'https://chopstick-sepia.vercel.app',
    siteName: 'Chopsticks Spice Malabar',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Chopsticks Spice Malabar | 25 Years of Culinary Excellence",
    description: "Experience the finest Malabar, Chinese, and Tandoori cuisine in Pune.",
  },
};

import { CartProvider } from "@/context/CartContext";
import Toast from "@/components/ui/Toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-cream text-accent`}
      >
        <CartProvider>
          {children}
          <Toast />
        </CartProvider>
      </body>
    </html>
  );
}

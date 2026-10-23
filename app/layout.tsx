import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Abipay.id - Platform Top Up Game & PPOB Tercepat",
  description: "Top up Mobile Legends, Free Fire, PUBG, dan layanan PPOB murah & terpercaya di Abipay.id.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-[#0B0F17] text-white antialiased selection:bg-[#00A3FF] selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import { Playfair_Display, Inter, Bodoni_Moda } from "next/font/google";
import "./globals.css";
import { SmoothScroller } from "@/components/layout/SmoothScroller";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PANACHE | Fashion & Grooming Club",
  description: "The official fashion and grooming club of MIT Arts, Commerce & Science College, Pune.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${bodoni.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground selection:bg-accent/30 selection:text-accent-foreground">
        <SmoothScroller>
          {children}
        </SmoothScroller>
      </body>
    </html>
  );
}

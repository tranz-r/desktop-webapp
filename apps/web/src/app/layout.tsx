import { TempoInit } from "@/components/tempo-init";
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Providers from "@/components/Providers";
import dynamic from "next/dynamic";

const RouteLoadingOverlay = dynamic(() => import("@/components/RouteLoadingOverlay"), { ssr: false });

const quicksand = Quicksand({ 
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tempo - Modern SaaS Starter",
  description: "A modern full-stack starter template powered by Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Script src="https://api.tempo.build/proxy-asset?url=https://storage.googleapis.com/tempo-public-assets/error-handling.js" />
      <body className={`${quicksand.variable} font-quicksand`}>
        <Providers>
          {children}
          <RouteLoadingOverlay />
          <TempoInit />
        </Providers>
      </body>
    </html>
  );
}

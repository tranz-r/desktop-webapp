import { TempoInit } from "@/components/tempo-init";
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Providers from "@/components/Providers";
import dynamicImport from "next/dynamic";
import 'mapbox-gl/dist/mapbox-gl.css';

const RouteLoadingOverlay = dynamicImport(() => import("@/components/RouteLoadingOverlay"), { ssr: false });

const quicksand = Quicksand({ 
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
});

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Tempo - Modern SaaS Starter",
  description: "A modern full-stack starter template powered by Next.js",
};

// Suppress specific React warnings in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const originalConsoleWarn = console.warn;
  console.warn = (...args) => {
    const message = args[0];
    if (
      typeof message === 'string' && 
      (message.includes('useInsertionEffect must not schedule updates') ||
       message.includes('Warning: useInsertionEffect'))
    ) {
      return; // Suppress this specific warning
    }
    originalConsoleWarn.apply(console, args);
  };
}

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
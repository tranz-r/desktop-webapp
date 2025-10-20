import { TempoInit } from "@/components/tempo-init";
import ChatwootWidget from "@/components/ChatwootWidget";
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
  title: {
    default: "Tranzr Moves - Professional Moving Services in Northamptonshire",
    template: "%s | Tranzr Moves"
  },
  description: "Professional moving services in Northamptonshire. 24/7 moving, house removals, office moves, packing services, and storage solutions.",
  keywords: "moving services, house removals, office moves, packing services, storage, Northamptonshire, 24/7 moving, professional movers",
  authors: [{ name: "Tranzr Moves" }],
  creator: "Tranzr Moves",
  publisher: "Tranzr Moves",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://tranzrmoves.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://tranzrmoves.com',
    siteName: 'Tranzr Moves',
    title: 'Tranzr Moves - Professional Moving Services in Northamptonshire',
    description: 'Professional moving services in Northamptonshire. 24/7 moving, house removals, office moves, packing services, and storage solutions.',
    images: [
      {
        url: '/images/tranzr-van-express.png',
        width: 1200,
        height: 630,
        alt: 'Tranzr Moves Professional Moving Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tranzr Moves - Professional Moving Services in Northamptonshire',
    description: 'Professional moving services in Northamptonshire. 24/7 moving, house removals, office moves, packing services, and storage solutions.',
    images: ['/images/tranzr-van-express.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
      {/* <Script src="https://api.tempo.build/proxy-asset?url=https://storage.googleapis.com/tempo-public-assets/error-handling.js" /> */}
      <body className={`${quicksand.variable} font-quicksand`}>
        <Providers>
          {children}
          <RouteLoadingOverlay />
          <TempoInit />
          <ChatwootWidget />
        </Providers>
      </body>
    </html>
  );
}
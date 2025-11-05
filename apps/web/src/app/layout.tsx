import { TempoInit } from "@/components/tempo-init";
import ChatwootWidget from "@/components/ChatwootWidget";
import SilktideCookieBanner from "@/components/SilktideCookieBanner";
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
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Silktide Cookie Banner CSS */}
        <link
          rel="stylesheet"
          id="silktide-consent-manager-css"
          href="/cookie-banner/silktide-consent-manager.css"
        />
      </head>
      {/* <Script src="https://api.tempo.build/proxy-asset?url=https://storage.googleapis.com/tempo-public-assets/error-handling.js" /> */}
      <body className={`${quicksand.variable} font-quicksand`}>
        {/* Google Tag Manager (noscript) */}
        {gtmId ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        ) : null}
        <Providers>
          {children}
          <RouteLoadingOverlay />
          <TempoInit />
          <ChatwootWidget />
          <SilktideCookieBanner />
        </Providers>

        {/* Google Tag Manager */}
        {gtmId ? (
          <Script id="gtm-init" strategy="beforeInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
        ) : null}
      </body>
    </html>
  );
}
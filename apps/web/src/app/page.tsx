import type { Metadata } from 'next';
import HomePageClient from './HomePageClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Professional Moving Services in Northamptonshire | Tranzr Moves",
  description: "Expert moving services in Northamptonshire. 24/7 moving, house removals, office moves, packing services, and storage solutions. Get your free quote today!",
  keywords: "moving services, house removals, office moves, packing services, storage, Northamptonshire, 24/7 moving, professional movers",
  openGraph: {
    title: "Professional Moving Services in Northamptonshire | Tranzr Moves",
    description: "Expert moving services in Northamptonshire. 24/7 moving, house removals, office moves, packing services, and storage solutions.",
    images: ["/images/tranzr-van-express.png"],
    url: "https://tranzrmoves.com",
    siteName: "Tranzr Moves",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Moving Services in Northamptonshire | Tranzr Moves",
    description: "Expert moving services in Northamptonshire. 24/7 moving, house removals, office moves, packing services, and storage solutions.",
    images: ["/images/tranzr-van-express.png"],
  },
  alternates: {
    canonical: "https://tranzrmoves.com",
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
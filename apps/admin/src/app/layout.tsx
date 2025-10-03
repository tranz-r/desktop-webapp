import "./globals.css";
import { AdminLayout } from '../components/layout/admin-layout';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased">
        <AdminLayout>{children}</AdminLayout>
      </body>
    </html>
  );
}

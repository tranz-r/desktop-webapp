import "./globals.css";

export const metadata = {
  title: "Tranzr Group - Building Tomorrow's Mobility Solutions",
  description: "Tranzr Group is a leading technology company focused on innovative mobility and transportation solutions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

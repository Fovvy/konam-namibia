import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

export const metadata: Metadata = {
  title: "KoNam | Korean-Namibian Tourism",
  description: "KoNam connects Korean travelers to the wonders of Namibia with customized tour packages, vehicle rentals, and unforgettable experiences.",
  icons: {
    icon: '/favicon.ico',
  },
  keywords: ['Namibia tourism', 'Korean travel', 'African safari', 'Namibia tours', 'Vehicle rental Namibia'],
  authors: [{ name: 'KoNam Tours' }],
  creator: 'KoNam Tours',
  publisher: 'KoNam Tours',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <Header />
        <main className="min-h-screen pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

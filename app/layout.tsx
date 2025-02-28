import type { Metadata } from "next";
import { Poppins, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: "--font-poppins",
});

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ['300', '400', '500', '700'],
  variable: "--font-noto-sans-kr",
});

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
      <body
        className={`${poppins.variable} ${notoSansKR.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

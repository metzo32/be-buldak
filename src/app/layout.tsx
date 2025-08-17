import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackgroundPattern from "./BackgroundPattern";
import MUIThemeProvider from "@/components/provider/MUIThemeProvider";

export const metadata: Metadata = {
  title: "불닭이되",
  description: "세상의 모든 불닭볶음면 레시피",
};

const kingSejong = localFont({
  src: [
    {
      path: "../../public/assets/fonts/KingSejongInstitute-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/KingSejongInstitute-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-kingsejong",
  preload: true,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr" className={kingSejong.variable}>
      <body className="font-king">
        <MUIThemeProvider>
          <Header />
          {children}
          <Footer />
          <BackgroundPattern />
        </MUIThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackgroundPattern from "./BackgroundPattern";

export const metadata: Metadata = {
  title: "불닭이되",
  description: "세상의 모든 불닭볶음면 레시피",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <body>
        <Header />
        {children}
        <Footer />
        <BackgroundPattern />
      </body>
    </html>
  );
}

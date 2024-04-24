import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/Navbar/Navbar";
import RegisterModal from "./components/Modals/RegisterModal";
import LoginModel from "./components/Modals/LoginModel";

import ToasterProvider from "./Providers/ToasterProvider";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <LoginModel />
        <RegisterModal />
        <Navbar />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Suspense } from "react";
import Loader from "./components/Loader";
import LoginModel from "./components/Modals/LoginModel";
import RegisterModal from "./components/Modals/RegisterModal";
import RentModal from "./components/Modals/RentModal";
import SearchModal from "./components/Modals/SearchModal";
import Navbar from "./components/Navbar/Navbar";
import "./globals.css";
import ToasterProvider from "./Providers/ToasterProvider";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <RentModal />
        <SearchModal />
        <LoginModel />
        <RegisterModal />
        <Navbar />
        <div className="pb-20 pt-20">
          <Suspense fallback={<Loader />}>
            {children}
          </Suspense>
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import RegisterModal from "./components/Modals/RegisterModal";
import LoginModel from "./components/Modals/LoginModel";
import RentModal from "./components/Modals/RentModal";
import ToasterProvider from "./Providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";
import SearchModal from "./components/Modals/SearchModal";
import { Suspense } from "react";
import Loader from "./components/Loader";

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

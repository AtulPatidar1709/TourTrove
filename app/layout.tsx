import type { Metadata } from "next";
import { Modak, Nunito } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/Navbar/Navbar";
import Modal from "./components/Modals/Modal";

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
        <Modal actionLable="Submit" isOpen title="Hello World" />
        <Navbar />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BackgroundColor from "@/components/BackgroundColor";
import Provider from "@/components/Provider";
import "react-loading-skeleton/dist/skeleton.css";
import { Toaster } from "@/components/ui/toaster";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reader App",
  description: "Reader is an AI based App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Provider>
        <body className={inter.className}>
          <Toaster />
          <Navbar />
          <BackgroundColor>{children}</BackgroundColor>
        </body>
      </Provider>
    </html>
  );
}

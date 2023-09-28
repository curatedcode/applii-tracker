import "./globals.css";
import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import MainContextProvider from "../components/MainContextProvider";

const font = Work_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Applii",
  description:
    "Comprehensive job application tracker, helping you organize, monitor, and manage your job applications effortlessly",
  themeColor: "#014EE8",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainContextProvider>
      <html lang="en" className="bg-site-main text-white">
        <body className={font.className}>{children}</body>
      </html>
    </MainContextProvider>
  );
}

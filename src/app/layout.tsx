import "./globals.css";
import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import Navbar from "../components/Navbar";

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
    <html lang="en" className="grid bg-site-main pb-12 text-neutral-100">
      <body
        className={`grid w-full max-w-8xl gap-10 justify-self-center px-4 ${font.className}`}
      >
        <Navbar />
        <main className="grid">{children}</main>
      </body>
    </html>
  );
}

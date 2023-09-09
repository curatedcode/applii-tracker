import "./globals.css";
import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";

const font = Work_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Applii | My Board",
  description:
    "Comprehensive job application tracker, helping you organize, monitor, and manage your job applications effortlessly",
  themeColor: "#101c27",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-site-main text-white">
      <body className={font.className}>{children}</body>
    </html>
  );
}

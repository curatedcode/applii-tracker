import ThemeProvider from "@/src/components/Theme/ThemeProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import Footer from "../components/Footer";

const font = Work_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Applii",
  description:
    "Comprehensive job application tracker, helping you organize, monitor, and manage your job applications effortlessly",
  themeColor: "#191919",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        id="root-body"
        className={`bg-light-primary dark:bg-dark-primary grid text-light-text dark:text-dark-text ${font.className}`}
      >
        <ThemeProvider>
          <div className="flex min-h-screen w-full max-w-7xl flex-col justify-self-center px-4">
            <div className="mb-32">{children}</div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

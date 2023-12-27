import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import Footer from "../components/Footer";
import ThemeProvider from "../components/ThemeProvider";
import "./globals.css";

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
        className={`grid bg-light-primary text-light-text dark:bg-dark-primary dark:text-dark-text ${font.className}`}
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

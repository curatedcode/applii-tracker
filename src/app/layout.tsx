import "./globals.css";
import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import Navbar from "../components/Navbar";
import MobileNavbar from "../components/MobileNavbar";
import ThemeProvider from "../components/Theme/ThemeProvider";
import SyncData from "../components/SyncData";
import ToastContextProvider from "../components/Toast/ToastContextProvider";

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
    <html
      lang="en"
      className="main-scrollbar grid pb-12"
      suppressHydrationWarning
    >
      <body
        id="root-body"
        className={`grid w-full max-w-8xl
        gap-2 justify-self-center bg-light-main px-4 text-light-text dark:bg-dark-main dark:text-dark-text ${font.className}`}
      >
        <ThemeProvider>
          <ToastContextProvider>
            <MobileNavbar />
            <Navbar />
            <div>
              <SyncData />
              <main className="grid">{children}</main>
            </div>
          </ToastContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

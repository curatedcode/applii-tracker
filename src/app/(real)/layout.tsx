import ThemeProvider from "@/src/components/Theme/ThemeProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import SyncProvider from "@/src/components/Sync/SyncProvider";
import TutorialModal from "@/src/components/TutorialModal";
import Toaster from "@/src/components/Toaster";
import MobileNavbar from "@/src/components/MobileNavbar";
import Navbar from "@/src/components/Navbar";

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
    <html
      lang="en"
      className="main-scrollbar grid pb-12"
      suppressHydrationWarning
    >
      <body
        id="root-body"
        className={`grid w-full max-w-8xl gap-2 justify-self-center bg-light-main px-4 text-light-text dark:bg-dark-main dark:text-dark-text ${font.className}`}
      >
        <ThemeProvider>
          <SyncProvider>
            <TutorialModal />
            <Toaster />
            <MobileNavbar />
            <Navbar />
            <main className="grid">{children}</main>
          </SyncProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

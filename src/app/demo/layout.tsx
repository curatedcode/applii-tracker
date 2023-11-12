import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import DemoNavbar from "@/src/components/Demo/DemoNavbar";
import DemoMobileNavbar from "@/src/components/Demo/DemoMobileNavbar";
import Link from "next/link";
import "../(real)/globals.css";
import ThemeProvider from "@/src/components/Theme/ThemeProvider";

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
        className={`grid w-full max-w-8xl gap-2 justify-self-center bg-light-main text-light-text dark:bg-dark-main dark:text-dark-text ${font.className}`}
      >
        <ThemeProvider>
          <header
            className="bg-yellow-400 px-2 py-1 text-center font-semibold text-dark-main"
            role="banner"
          >
            To exit demo mode, please{" "}
            <Link href={"/"} className="underline underline-offset-1">
              click here
            </Link>
          </header>
          <div className="px-4">
            <DemoNavbar />
            <DemoMobileNavbar />
          </div>
          <main className="grid px-4">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}

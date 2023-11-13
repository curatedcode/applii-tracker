import DemoNavbar from "@/src/components/Demo/DemoNavbar";
import DemoMobileNavbar from "@/src/components/Demo/DemoMobileNavbar";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header
        className="absolute left-0 top-0 z-[1] w-full bg-yellow-400 px-2 py-1 text-center font-semibold text-dark-main"
        role="banner"
      >
        To exit demo mode, please{" "}
        <Link href={"/"} className="underline underline-offset-1">
          click here
        </Link>
      </header>
      <div className="mt-8 px-4">
        <DemoNavbar />
        <DemoMobileNavbar />
      </div>
      <main className="grid px-4">{children}</main>
    </>
  );
}

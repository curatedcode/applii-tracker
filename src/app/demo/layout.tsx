import Link from "next/link";
import Navbar from "@/src/components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header
        className="text-dark-primary absolute left-0 top-0 w-full bg-yellow-400 px-2 py-1 text-center font-semibold"
        role="banner"
      >
        <Link href={"/boards"} className="underline underline-offset-1">
          Click here
        </Link>{" "}
        to exit demo mode
      </header>
      <div className="mt-14 micro:mt-8">
        <Navbar
          items={[
            { name: "Home", href: "/demo" },
            { name: "Create", href: "/demo/applications/create" },
            { name: "Metrics", href: "/demo/applications/metrics" },
          ]}
        />
      </div>
      <main className="grid">{children}</main>
    </>
  );
}

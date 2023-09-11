import Link from "next/link";

export default function NotFound() {
  return (
    <main className="text-lg flex flex-col gap-1 items-center justify-center pb-32 h-screen">
      <h1>Not Found</h1>
      <p>Count not find requested resource</p>
      <Link href={"/"} className="px-4 py-1 font-medium underline">
        Return Home
      </Link>
    </main>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-1 pb-32 text-lg">
      <h1>Not Found</h1>
      <p>Count not find requested resource</p>
      <Link href={"/"} className="px-4 py-1 font-medium underline">
        Return Home
      </Link>
    </main>
  );
}

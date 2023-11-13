import InternalLink from "@/src/components/Links/InternalLink";

export default function NotFound() {
  return (
    <div className="mt-48 flex flex-col items-center justify-center gap-2 md:mt-60">
      <h1 className="text-6xl font-bold md:text-9xl">404</h1>
      <h2 className="text-2xl md:text-3xl">Oops, something went wrong</h2>
      <p className="text-base md:text-lg">
        We can&apos;t find the page you&apos;re looking for
      </p>
      <InternalLink href={"/"} style="button" className="mt-8">
        Return home
      </InternalLink>
    </div>
  );
}

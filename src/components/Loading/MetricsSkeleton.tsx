export default function MetricsSkeleton() {
  return (
    <>
      <div aria-live="polite" className="sr-only">
        <p>Loading metrics.</p>
      </div>
      <div className="flex w-full items-center justify-center">
        <div className="mt-24 grid w-full max-w-6xl justify-items-center gap-12 justify-self-center md:gap-20">
          <div className="h-[36rem] w-full animate-pulse rounded-md border-[0.4rem] border-light-secondary bg-light-secondary p-[0.4rem] dark:border-dark-secondary dark:bg-dark-secondary"></div>
          <div className="h-60 w-full max-w-sm animate-pulse rounded-md border-[0.4rem] border-light-secondary bg-light-secondary p-[0.4rem] dark:border-dark-secondary dark:bg-dark-secondary"></div>
        </div>
      </div>
    </>
  );
}

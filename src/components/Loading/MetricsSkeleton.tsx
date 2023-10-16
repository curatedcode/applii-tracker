export default function MetricsSkeleton() {
  return (
    <>
      <div aria-live="polite" className="sr-only">
        <p>Loading metrics.</p>
      </div>
      <div className="flex h-screen-minus-nav w-full items-center justify-center gap-1 md:gap-2">
        <div className="h-4 w-4 animate-metric-loading rounded-full bg-dark-secondary dark:bg-light-secondary md:h-8 md:w-8"></div>
        <div className="animation-delay-200 h-4 w-4 animate-metric-loading rounded-full bg-dark-secondary dark:bg-light-secondary md:h-8 md:w-8"></div>
        <div className="animation-delay-400 h-4 w-4 animate-metric-loading rounded-full bg-dark-secondary dark:bg-light-secondary md:h-8 md:w-8"></div>
      </div>
    </>
  );
}

export default function MetricsSkeleton() {
  return (
    <>
      <div aria-live="polite" className="sr-only">
        <p>Loading metrics.</p>
      </div>
      <div className="h-screen-minus-nav flex w-full items-center justify-center gap-1 md:gap-2">
        <div className="animate-metric-loading h-4 w-4 rounded-full bg-neutral-300 md:h-8 md:w-8"></div>
        <div className="animate-metric-loading animation-delay-200 h-4 w-4 rounded-full bg-neutral-300 md:h-8 md:w-8"></div>
        <div className="animate-metric-loading animation-delay-400 h-4 w-4 rounded-full bg-neutral-300 md:h-8 md:w-8"></div>
      </div>
    </>
  );
}

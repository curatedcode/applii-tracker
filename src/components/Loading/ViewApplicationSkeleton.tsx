export default function ViewApplicationSkeleton() {
  return (
    <>
      <div aria-live="polite" className="sr-only">
        <p>Loading application.</p>
      </div>
      <div className="h-20"></div>
      <div className="grid w-full justify-items-center gap-x-12 gap-y-20 justify-self-center md:max-w-5xl md:grid-cols-2">
        <div className="grid w-full max-w-md auto-rows-min justify-items-center md:max-w-none">
          <div className="mb-6 h-[70px] w-full"></div>
          <div className="h-[304px] w-full max-w-full animate-pulse rounded-md bg-light-secondary dark:bg-dark-secondary"></div>
        </div>
        <div className="grid w-full max-w-md auto-rows-min justify-items-center md:max-w-none">
          <div className="mb-6 h-[70px] w-full"></div>
          <div className="h-[304px] min-w-full max-w-full animate-pulse rounded-md bg-light-secondary dark:bg-dark-secondary"></div>
        </div>
        <div className="grid w-full max-w-md auto-rows-min justify-items-center justify-self-center md:col-span-full md:max-w-none">
          <div className="mb-6 h-[70px] w-full"></div>
          <div className="h-[304px] w-full max-w-full animate-pulse rounded-md bg-light-secondary dark:bg-dark-secondary"></div>
        </div>
      </div>
    </>
  );
}

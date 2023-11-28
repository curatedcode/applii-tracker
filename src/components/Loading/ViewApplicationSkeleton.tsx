export default function ViewApplicationSkeleton() {
  return (
    <>
      <div aria-live="polite" className="sr-only">
        <p>Loading application.</p>
      </div>
      <div className="mb-8 h-[132px] md:h-24"></div>
      <div className="grid justify-items-center gap-x-12 gap-y-8 md:grid-cols-2">
        <div className="grid w-full auto-rows-min">
          <div className="mb-6 h-[29px]"></div>
          <div className="h-[11.5rem] animate-pulse rounded-md bg-light-secondary dark:bg-dark-secondary"></div>
        </div>
        <div className="grid w-full auto-rows-min gap-8">
          <div className="grid auto-rows-min">
            <div className="mb-6 h-[29px]"></div>
            <div className="h-[11.5rem] animate-pulse rounded-md bg-light-secondary dark:bg-dark-secondary"></div>
          </div>
          <div className="grid auto-rows-min">
            <div className="mb-6 h-[29px]"></div>
            <div className="h-[11.5rem] animate-pulse rounded-md bg-light-secondary dark:bg-dark-secondary"></div>
          </div>
        </div>
      </div>
    </>
  );
}

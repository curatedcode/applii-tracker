export default function EditApplicationSkeleton() {
  return (
    <>
      <div aria-live="polite" className="sr-only">
        <p>Loading application.</p>
      </div>
      <div className="mb-7 h-24 md:h-12"></div>
      <div className="grid justify-items-center gap-x-12 gap-y-8 md:grid-cols-2">
        <div className="grid w-full auto-rows-min">
          <div className="mb-6 h-[29px]"></div>
          <div className="h-80 animate-pulse rounded-md bg-light-secondary dark:bg-dark-secondary"></div>
        </div>
        <div className="grid w-full auto-rows-min">
          <div className="mb-6 h-[29px]"></div>
          <div className="h-80 animate-pulse rounded-md bg-light-secondary dark:bg-dark-secondary"></div>
        </div>
        <div className="col-span-full grid w-full auto-rows-min">
          <div className="mb-6 h-[29px]"></div>
          <div className="h-72 animate-pulse rounded-md bg-light-secondary dark:bg-dark-secondary"></div>
        </div>
      </div>
    </>
  );
}

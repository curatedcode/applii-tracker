export default function HomeSkeleton() {
  return (
    <>
      <div aria-live="polite" className="sr-only">
        <p>Loading applications.</p>
      </div>
      <div className="mb-12 h-[5.25rem] md:h-9"></div>
      <div className="flex w-full flex-wrap justify-center gap-4 justify-self-center">
        <div className="h-board-section w-full max-w-board-section animate-pulse rounded-md bg-light-secondary dark:bg-dark-secondary"></div>
        <div className="h-board-section w-full max-w-board-section animate-pulse rounded-md bg-light-secondary dark:bg-dark-secondary"></div>
        <div className="h-board-section w-full max-w-board-section animate-pulse rounded-md bg-light-secondary dark:bg-dark-secondary"></div>
        <div className="h-board-section w-full max-w-board-section animate-pulse rounded-md bg-light-secondary dark:bg-dark-secondary"></div>
        <div className="h-board-section w-full max-w-board-section animate-pulse rounded-md bg-light-secondary dark:bg-dark-secondary"></div>
      </div>
    </>
  );
}

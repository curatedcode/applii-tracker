export default function HomeSkeleton() {
  return (
    <>
      <div aria-live="polite" className="sr-only">
        <p>Loading applications.</p>
      </div>
      <div className="mt-20 flex cursor-wait flex-wrap justify-center gap-8">
        <div className="flex w-full max-w-board-section animate-pulse flex-col items-center gap-2">
          <div className="flex h-7 min-h-max items-center justify-center gap-1 text-xl" />
          <div className="grid h-board-section w-full gap-2 overflow-auto rounded-md border-[0.4rem] border-site-section bg-site-section p-[0.4rem]" />
        </div>
        <div className="flex w-full max-w-board-section animate-pulse flex-col items-center gap-2">
          <div className="flex h-7 min-h-max items-center justify-center gap-1 text-xl" />
          <div className="grid h-board-section w-full gap-2 overflow-auto rounded-md border-[0.4rem] border-site-section bg-site-section p-[0.4rem]" />
        </div>
        <div className="flex w-full max-w-board-section animate-pulse flex-col items-center gap-2">
          <div className="flex h-7 min-h-max items-center justify-center gap-1 text-xl" />
          <div className="grid h-board-section w-full gap-2 overflow-auto rounded-md border-[0.4rem] border-site-section bg-site-section p-[0.4rem]" />
        </div>
        <div className="flex w-full max-w-board-section animate-pulse flex-col items-center gap-2">
          <div className="flex h-7 min-h-max items-center justify-center gap-1 text-xl" />
          <div className="grid h-board-section w-full gap-2 overflow-auto rounded-md border-[0.4rem] border-site-section bg-site-section p-[0.4rem]" />
        </div>
        <div className="flex w-full max-w-board-section animate-pulse flex-col items-center gap-2">
          <div className="flex h-7 min-h-max items-center justify-center gap-1 text-xl" />
          <div className="grid h-board-section w-full gap-2 overflow-auto rounded-md border-[0.4rem] border-site-section bg-site-section p-[0.4rem]" />
        </div>
      </div>
    </>
  );
}

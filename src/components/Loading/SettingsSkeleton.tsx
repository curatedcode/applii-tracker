export default function SettingsSkeleton() {
  return (
    <>
      <div aria-live="polite" className="sr-only">
        <p>Loading settings.</p>
      </div>
      <div className="mt-28 h-[704px] w-full max-w-lg animate-pulse justify-self-center rounded-md bg-light-secondary dark:bg-dark-secondary md:h-[630px]"></div>
    </>
  );
}

export default function SettingsSkeleton() {
  return (
    <>
      <div aria-live="polite" className="sr-only">
        <p>Loading settings.</p>
      </div>
      <div className="mt-[84px] h-52 w-full max-w-md animate-pulse justify-self-center rounded-md bg-light-secondary dark:bg-dark-secondary"></div>
    </>
  );
}

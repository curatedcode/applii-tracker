export default function SettingsSkeleton() {
  return (
    <>
      <div aria-live="polite" className="sr-only">
        <p>Loading settings.</p>
      </div>
      <div className="mt-[84px] h-[88px] w-[448px] animate-pulse justify-self-center rounded-md bg-light-secondary dark:bg-dark-secondary"></div>
    </>
  );
}

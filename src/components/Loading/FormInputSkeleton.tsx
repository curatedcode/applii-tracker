export default function FormInputSkeleton({
  withLabel,
}: {
  withLabel?: boolean;
}) {
  if (withLabel) {
    return (
      <div className="grid">
        <div className="mb-1 h-6"></div>
        <div className="h-10 w-full animate-pulse border-[0.4rem] border-light-secondary bg-light-secondary p-[0.4rem] dark:border-dark-secondary dark:bg-dark-secondary"></div>
      </div>
    );
  }

  return (
    <div className="h-10 w-full animate-pulse border-[0.4rem] border-light-secondary bg-light-secondary p-[0.4rem] dark:border-dark-secondary dark:bg-dark-secondary"></div>
  );
}

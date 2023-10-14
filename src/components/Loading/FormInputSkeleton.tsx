export default function FormInputSkeleton({
  withLabel,
}: {
  withLabel?: boolean;
}) {
  if (withLabel) {
    return (
      <div className="grid">
        <div className="mb-1 h-6"></div>
        <div className="h-10 w-full animate-pulse border-[0.4rem] border-site-section bg-site-section p-[0.4rem]"></div>
      </div>
    );
  }

  return (
    <div className="h-10 w-full animate-pulse border-[0.4rem] border-site-section bg-site-section p-[0.4rem]"></div>
  );
}

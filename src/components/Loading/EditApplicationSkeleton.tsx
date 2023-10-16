import FormInputSkeleton from "./FormInputSkeleton";

export default function EditApplicationSkeleton() {
  return (
    <>
      <div aria-live="polite" className="sr-only">
        <p>Loading application.</p>
      </div>
      <div className="mb-8 grid h-[68px] cursor-wait justify-items-center gap-2 justify-self-center"></div>
      <div className="grid justify-items-center gap-4 md:grid-cols-2">
        <div className="col-span-full flex h-fit w-full max-w-md flex-col p-4 md:min-h-formSection">
          <div className="mb-6 h-[30px]"></div>
          <div className="grid gap-2">
            <FormInputSkeleton />
            <FormInputSkeleton />
            <FormInputSkeleton />
            <FormInputSkeleton withLabel />
          </div>
        </div>
        <div className="grid h-fit w-full max-w-md auto-rows-min p-4 md:min-h-formSection">
          <div className="mb-6 h-[30px]"></div>
          <div className="grid gap-2">
            <FormInputSkeleton />
            <FormInputSkeleton />
            <FormInputSkeleton />
            <FormInputSkeleton />
          </div>
        </div>
        <div className="grid h-fit w-full max-w-md auto-rows-min p-4 md:min-h-formSection">
          <div className="mb-6 h-[30px]"></div>
          <div className="grid gap-2">
            <FormInputSkeleton />
            <div className="h-[135px] w-full animate-pulse border-[0.4rem] border-light-secondary bg-light-secondary p-[0.4rem] dark:border-dark-secondary dark:bg-dark-secondary"></div>
          </div>
        </div>
      </div>
    </>
  );
}

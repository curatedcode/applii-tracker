import { Transition } from "@headlessui/react";
import { ToastProps } from "../../utils/customVariables";
import { useEffect } from "react";

export default function Toast({ show, setShow, children }: ToastProps) {
  useEffect(() => {
    const timeout = setTimeout(() => setShow(false), 5_000);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);
  return (
    <Transition
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      show={show}
    >
      <div
        aria-live="polite"
        aria-atomic="true"
        className="fixed left-1/2 top-6 z-50 flex h-fit w-fit -translate-x-1/2 items-center gap-2 rounded-md border border-light-secondary-shaded bg-light-secondary px-4 py-2 text-sm font-medium shadow-md dark:border-dark-secondary-shaded dark:bg-dark-secondary md:bottom-6 md:left-auto md:right-6 md:top-auto md:-translate-x-0"
      >
        {children}
      </div>
    </Transition>
  );
}

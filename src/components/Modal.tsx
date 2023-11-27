import { Fragment } from "react";
import { ModalProps } from "../utils/customVariables";
import { Dialog, Transition } from "@headlessui/react";

export default function Modal({
  title,
  children,
  isOpen,
  setIsOpen,
}: ModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-100"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="-mt-16 grid w-full max-w-md transform gap-2 overflow-hidden rounded-md bg-light-secondary p-6 px-5 py-8 text-center align-middle text-lg shadow-xl outline-none ring-1 ring-black ring-opacity-20 ring-offset-black transition-all focus-within:outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-black focus-visible:ring-offset-black dark:bg-dark-secondary">
                <Dialog.Title as="h3" className="text-2xl font-medium">
                  {title}
                </Dialog.Title>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

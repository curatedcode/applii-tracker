import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import useScrollbar from "../Hooks/useScrollbar";
import ModalButtons, { ModalButtonType } from "./ModalButtons";

export type ModalProps = {
  title: string;
  description: string;
  primaryButton: ModalButtonType;
  secondaryButton: ModalButtonType;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * If you pass form=true do not surround the form children in a form tag
 */
export default function Modal({
  title,
  description,
  isOpen,
  setIsOpen,
  ...buttons
}: ModalProps) {
  const scrollbar = useScrollbar();

  useEffect(() => {
    const htmlElement = document.getElementsByTagName("html").item(0);

    if (!htmlElement || !isOpen) return;

    htmlElement.style.overflow = "hidden";
    htmlElement.style.paddingRight = `${scrollbar.width}px`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  function closeModal() {
    setIsOpen(false);
    // stop janky transition exit
    setTimeout(() => {
      const htmlElement = document.getElementsByTagName("html").item(0);
      if (!htmlElement) return;

      htmlElement.style.removeProperty("overflow");
      htmlElement.style.removeProperty("padding-right");
    }, 100);
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-100"
              enterFrom="opacity-0 translate-y-5 sm:scale-95 sm:translate-y-0"
              enterTo="opacity-100 translate-y-0 sm:scale-100 sm:translate-y-0"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100 sm:translate-y-0"
              leaveTo="opacity-0 translate-y-5 sm:scale-95 sm:translate-y-0"
            >
              <Dialog.Panel className="fixed bottom-0 -mt-16 grid w-full max-w-md transform gap-3 overflow-hidden rounded-t-md bg-light-primary px-6 py-10 pb-14 text-center align-middle text-lg shadow-xl outline-none ring-1 ring-dark-tertiary ring-opacity-20 ring-offset-dark-tertiary transition-all focus-within:outline-none dark:bg-dark-primary sm:static sm:rounded-md sm:px-5 sm:pb-10">
                <Dialog.Title as="h3" className="text-2xl font-medium">
                  {title}
                </Dialog.Title>
                <p className="text-base">{description}</p>
                <ModalButtons {...buttons} closeModal={closeModal} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

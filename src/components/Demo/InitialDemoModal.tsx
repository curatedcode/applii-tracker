/* eslint-disable @next/next/no-img-element */
"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { zodTutorialStatus } from "../../utils/customVariables";
import Button from "../Button";
import InternalLink from "../Links/InternalLink";

export default function InitialDemoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function exitTutorial() {
    window.localStorage.setItem(
      "tutorialStatus",
      zodTutorialStatus.Enum.completed,
    );
    closeModal();
  }

  useEffect(() => {
    setIsMounted(true);
    const tutorialStatus = window.localStorage.getItem("tutorialStatus");

    if (!tutorialStatus) {
      window.localStorage.setItem(
        "tutorialStatus",
        zodTutorialStatus.Enum.notStarted,
      );
      setIsOpen(true);
      return;
    }

    const tutorialStatusParsed = zodTutorialStatus.parse(tutorialStatus);
    setIsOpen(tutorialStatusParsed === "notStarted");
  }, []);

  useEffect(() => {
    if (!isMounted || !isOpen) return;

    document.body.style.overflow = "hidden";
  }, [isMounted, isOpen]);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => closeModal()}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
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
                <Dialog.Panel className="grid w-full max-w-md transform gap-2 overflow-hidden rounded-md bg-light-secondary p-6 px-5 py-8 text-center align-middle text-lg shadow-xl outline-none ring-2 ring-black ring-opacity-20 ring-offset-black transition-all focus-within:outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-black focus-visible:ring-offset-black dark:bg-dark-secondary">
                  <Dialog.Title as="h3" className="text-2xl font-medium">
                    Welcome to Applii!
                  </Dialog.Title>
                  <img
                    alt="Confetti exploding from canister"
                    width="200"
                    height="200"
                    src="/media/confetti.gif"
                    className="-my-5 justify-self-center"
                  />
                  <div className="grid gap-2">
                    <p>Would you like to view the demo page?</p>
                    <div className="mt-4 flex w-full items-center justify-center gap-4">
                      <Button onClick={() => exitTutorial()} style="shaded">
                        No
                      </Button>
                      <InternalLink
                        onClick={() => exitTutorial()}
                        href="/demo"
                        style="buttonShaded"
                      >
                        Yes
                      </InternalLink>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

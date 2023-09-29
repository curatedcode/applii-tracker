"use client";
/* eslint-disable @next/next/no-img-element */
import {
  ClockIcon,
  ChatBubbleBottomCenterTextIcon,
  ArchiveBoxXMarkIcon,
  TrophyIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/solid";
import BoardSection from "../components/BoardSection";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Form from "../components/Form";
import { useEffect, useState } from "react";
import { useMainContext } from "../components/MainContextProvider";
import { ApplicationStatusType } from "../customVariables";

const testing = {
  id: 1,
  position: "Testing Developer",
  company: "Google",
  postingURL: "asdfasfdas",
  status: "needToApply" as ApplicationStatusType,
  dateModified: "2023-09-28",
};

export default function Home() {
  const { formIsOpen, setFormIsOpen, allApplications } = useMainContext();

  const [isIndexedDBSupported, setIsIndexedDBSupported] =
    useState<boolean>(true);

  useEffect(() => {
    if (!window.indexedDB) {
      setIsIndexedDBSupported(false);
      return;
    }
  }, []);

  return isIndexedDBSupported ? (
    <>
      <Form />
      <main
        className={`relative left-1/2 grid max-w-8xl -translate-x-1/2 gap-10 px-4 py-8 3xl:py-12 ${
          formIsOpen && "max-h-screen overflow-hidden"
        }`}
      >
        <button
          className="flex items-center gap-1 justify-self-center rounded-md px-2 py-1 font-medium transition-colors hover:bg-neutral-100 hover:text-site-main"
          onClick={() => setFormIsOpen(true)}
        >
          <PlusCircleIcon aria-hidden className="w-6" />
          <span>New Application</span>
        </button>
        <div className="flex flex-wrap justify-center gap-8">
          <BoardSection
            title="Need To Apply"
            Icon={
              <ClockIcon className="w-5 text-card-needToApply" aria-hidden />
            }
            cards={allApplications ? allApplications.needToApply : []}
          />
          <BoardSection
            title="Applied"
            Icon={
              <EnvelopeIcon className="w-5 text-card-applied" aria-hidden />
            }
            cards={[
              testing,
              testing,
              testing,
              testing,
              testing,
              testing,
              testing,
            ]}
          />
          <BoardSection
            title="Interviewing"
            Icon={
              <ChatBubbleBottomCenterTextIcon
                className="w-5 text-card-interviewing"
                aria-hidden
              />
            }
            cards={allApplications ? allApplications.interviewing : []}
          />
          <BoardSection
            title="Offer"
            Icon={<TrophyIcon className="w-5 text-card-offer" aria-hidden />}
            cards={allApplications ? allApplications.offer : []}
          />
          <BoardSection
            title="Closed"
            Icon={
              <ArchiveBoxXMarkIcon
                className="w-5 text-card-closed"
                aria-hidden
              />
            }
            cards={allApplications ? allApplications.closed : []}
          />
        </div>
      </main>
    </>
  ) : (
    <div className="flex h-screen items-center justify-center">
      <p role="error" className="w-full max-w-md">
        Your browser is not supported. Please exit incognito or private mode.
        Otherwise download a supported browser like{" "}
        <a
          rel="nofollow noreferrer"
          target="_blank"
          href="https://www.mozilla.org/en-US/firefox/new/"
          className="underline"
        >
          Firefox
        </a>{" "}
        or{" "}
        <a
          rel="nofollow noreferrer"
          target="_blank"
          href="https://www.google.com/chrome/index.html"
          className="underline"
        >
          Google Chrome
        </a>
      </p>
    </div>
  );
}

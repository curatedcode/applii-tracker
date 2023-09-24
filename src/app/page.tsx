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
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { MainContextType } from "../customVariables";
import { GetAllApplicationsReturnType, getAllApplications } from "../db";

const MainContext = createContext<MainContextType>({
  formIsOpen: false,
  setFormIsOpen: () => {},
  applicationId: undefined,
  setApplicationId: () => {},
  fetchApplications: () => {},
  allApplications: undefined,
});
export const useMainContext = () => useContext(MainContext);

export default function Home() {
  const [isIndexedDBSupported, setIsIndexedDBSupported] =
    useState<boolean>(true);

  useEffect(() => {
    if (!window.indexedDB) {
      setIsIndexedDBSupported(false);
      return;
    }
  }, []);

  const [formIsOpen, setFormIsOpen] = useState(false);
  const [applicationId, setApplicationId] = useState<undefined | number>(
    undefined
  );
  const [allApplications, setAllApplications] =
    useState<GetAllApplicationsReturnType>();

  function fetchApplications() {
    getAllApplications().then((data) => setAllApplications(data));
  }

  useEffect(() => {
    if (formIsOpen) return;
    fetchApplications();
  }, [formIsOpen]);

  return isIndexedDBSupported ? (
    <MainContext.Provider
      value={{
        formIsOpen,
        setFormIsOpen,
        applicationId,
        setApplicationId,
        fetchApplications,
        allApplications,
      }}
    >
      <Form />
      <main
        className={`py-8 px-4 3xl:py-12 grid gap-7 max-w-8xl relative left-1/2 -translate-x-1/2 ${
          formIsOpen && "overflow-hidden max-h-screen"
        }`}
      >
        <button
          className="justify-self-center flex gap-1 hover:bg-neutral-100 font-medium hover:text-site-main transition-colors rounded-md px-2 py-1"
          onClick={() => setFormIsOpen(true)}
        >
          <PlusCircleIcon aria-hidden className="w-6" />
          New Application
        </button>

        <div className="grid grid-cols-1 gap-y-6 gap-x-2 child:justify-self-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
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
            cards={allApplications ? allApplications.applied : []}
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
    </MainContext.Provider>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <p role="error" className="max-w-md w-full">
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

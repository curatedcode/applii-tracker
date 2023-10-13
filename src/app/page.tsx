"use client";

import {
  ClockIcon,
  ChatBubbleBottomCenterTextIcon,
  ArchiveBoxXMarkIcon,
  TrophyIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/solid";
import BoardSection from "../components/BoardSection";
import { useEffect, useState } from "react";
import {
  ApplicationStatusType,
  GetAllApplicationsReturnType,
  SortByType,
} from "../customVariables";
import { getAllApplications } from "../db";
import IndexedDBNotSupported from "../components/IndexedDBNotSupported";
import HomeSkeleton from "../components/Loading/HomeSkeleton";

export default function Home() {
  const [allApplications, setAllApplications] =
    useState<GetAllApplicationsReturnType>();
  const [isIndexedDBSupported, setIsIndexedDBSupported] =
    useState<boolean>(true);

  const [sortBy, setSortBy] = useState<SortByType>("dateModified");

  useEffect(() => {
    if (!window) return;
    if (!window.indexedDB) {
      setIsIndexedDBSupported(false);
      return;
    }
    getAllApplications(sortBy).then((data) => setAllApplications(data));
  }, [sortBy]);

  if (!isIndexedDBSupported) return <IndexedDBNotSupported />;

  if (!allApplications) return <HomeSkeleton />;

  const { needToApply, applied, interviewing, offer, closed } = allApplications;

  return (
    <>
      <div id="loadingHome" aria-live="polite" className="sr-only">
        <p>Loaded applications.</p>
      </div>
      <div className="mb-12 grid w-fit gap-2 justify-self-center text-sm">
        <div className="flex items-center gap-2">
          <label htmlFor="sortByInput" className="mb-1 font-semibold">
            Sort by:
          </label>
          <select
            id="sortByInput"
            className="duration-50 h-fit w-fit rounded-md border border-transparent bg-site-section px-2 py-1 transition-colors focus-within:border-inherit focus-within:outline-none"
            onChange={(e) => setSortBy(e.currentTarget.value as SortByType)}
          >
            <option value="dateModified">Date Modified</option>
            <option value="dateCreated">Date Created</option>
          </select>
        </div>
      </div>
      <div className="flex w-full flex-wrap justify-center gap-8 justify-self-center md:max-w-[100rem]">
        <BoardSection
          title="Need To Apply"
          Icon={<ClockIcon className="w-5 text-card-needToApply" aria-hidden />}
          cards={needToApply}
          sortBy={sortBy}
        />
        <BoardSection
          title="Applied"
          Icon={<EnvelopeIcon className="w-5 text-card-applied" aria-hidden />}
          cards={applied}
          sortBy={sortBy}
        />
        <BoardSection
          title="Interviewing"
          Icon={
            <ChatBubbleBottomCenterTextIcon
              className="w-5 text-card-interviewing"
              aria-hidden
            />
          }
          cards={interviewing}
          sortBy={sortBy}
        />
        <BoardSection
          title="Offer"
          Icon={<TrophyIcon className="w-5 text-card-offer" aria-hidden />}
          cards={offer}
          sortBy={sortBy}
        />
        <BoardSection
          title="Closed"
          Icon={
            <ArchiveBoxXMarkIcon className="w-5 text-card-closed" aria-hidden />
          }
          cards={closed}
          sortBy={sortBy}
        />
      </div>
    </>
  );
}

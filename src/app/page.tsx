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
  GetAllApplicationsReturnType,
  SortByOptionType,
  sortByOptions,
} from "../customVariables";
import { getAllApplications } from "../db";
import IndexedDBNotSupported from "../components/IndexedDBNotSupported";
import HomeSkeleton from "../components/Loading/HomeSkeleton";
import SelectInput from "../components/SelectInput";

export default function Home() {
  const [allApplications, setAllApplications] =
    useState<GetAllApplicationsReturnType>();
  const [isIndexedDBSupported, setIsIndexedDBSupported] =
    useState<boolean>(true);

  const [sortBy, setSortBy] = useState<SortByOptionType>({
    label: "Date Modified",
    value: "dateModified",
  });

  useEffect(() => {
    if (!window) return;
    if (!window.indexedDB) {
      setIsIndexedDBSupported(false);
      return;
    }
    getAllApplications(sortBy.value).then((data) => setAllApplications(data));
  }, [sortBy]);

  if (!isIndexedDBSupported) return <IndexedDBNotSupported />;

  if (!allApplications) return <HomeSkeleton />;

  const { needToApply, applied, interviewing, offer, closed } = allApplications;

  return (
    <>
      <div id="loadingHome" aria-live="polite" className="sr-only">
        <p>Loaded applications.</p>
      </div>
      <div className="mb-12 grid justify-items-center gap-2 justify-self-center text-sm md:flex md:items-center md:gap-4">
        <h1 className="text-3xl font-semibold">All applications</h1>
        <div className="h-0 border-l md:h-full"></div>
        <SelectInput
          options={sortByOptions}
          selected={sortBy}
          onChange={setSortBy}
        />
      </div>
      <div className="flex w-full flex-wrap justify-center gap-8 justify-self-center md:max-w-[100rem]">
        <BoardSection
          title="Need To Apply"
          Icon={
            <ClockIcon
              className="w-5 text-card-needToApply"
              aria-hidden="true"
            />
          }
          cards={needToApply}
          sortBy={sortBy.value}
        />
        <BoardSection
          title="Applied"
          Icon={
            <EnvelopeIcon
              className="w-5 text-card-applied"
              aria-hidden="true"
            />
          }
          cards={applied}
          sortBy={sortBy.value}
        />
        <BoardSection
          title="Interviewing"
          Icon={
            <ChatBubbleBottomCenterTextIcon
              className="w-5 text-card-interviewing"
              aria-hidden="true"
            />
          }
          cards={interviewing}
          sortBy={sortBy.value}
        />
        <BoardSection
          title="Offer"
          Icon={
            <TrophyIcon className="w-5 text-card-offer" aria-hidden="true" />
          }
          cards={offer}
          sortBy={sortBy.value}
        />
        <BoardSection
          title="Closed"
          Icon={
            <ArchiveBoxXMarkIcon
              className="w-5 text-card-closed"
              aria-hidden="true"
            />
          }
          cards={closed}
          sortBy={sortBy.value}
        />
      </div>
    </>
  );
}

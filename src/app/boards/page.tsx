"use client";
import { useEffect, useState } from "react";

import BoardSection from "@/src/components/Board/BoardSection";
import {
  GetAllApplicationsReturnType,
  OptionType,
  SortByLabelType,
  SortByValueType,
  sortByOptions,
} from "@/src/utils/customVariables";
import { getAllApplications } from "@/src/utils/db";
import IndexedDBNotSupported from "@/src/components/IndexedDBNotSupported";
import HomeSkeleton from "@/src/components/Loading/HomeSkeleton";
import SelectInput from "@/src/components/SelectInput";

export default function Home() {
  const [allApplications, setAllApplications] =
    useState<GetAllApplicationsReturnType>();
  const [isIndexedDBSupported, setIsIndexedDBSupported] =
    useState<boolean>(true);

  const [sortBy, setSortBy] = useState<
    OptionType<SortByLabelType, SortByValueType>
  >(sortByOptions[1]);

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
          setSelected={setSortBy}
        />
      </div>
      <div className="flex w-full flex-wrap justify-center gap-4 justify-self-center">
        <BoardSection
          title="Need To Apply"
          cards={needToApply}
          sortBy={sortBy.value}
          status="needToApply"
        />
        <BoardSection
          title="Applied"
          cards={applied}
          sortBy={sortBy.value}
          status="applied"
        />
        <BoardSection
          title="Interviewing"
          cards={interviewing}
          sortBy={sortBy.value}
          status="interviewing"
        />
        <BoardSection
          title="Offer"
          cards={offer}
          sortBy={sortBy.value}
          status="offer"
        />
        <BoardSection
          title="Closed"
          cards={closed}
          sortBy={sortBy.value}
          status="closed"
        />
      </div>
    </>
  );
}

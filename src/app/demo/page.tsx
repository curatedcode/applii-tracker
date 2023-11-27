"use client";

import BoardSection from "@/src/components/Board/BoardSection";
import getAllMockApplications from "@/src/components/Demo/getAllDemoApplications";
import HomeSkeleton from "@/src/components/Loading/HomeSkeleton";
import SelectInput from "@/src/components/SelectInput";
import {
  GetAllApplicationsReturnType,
  OptionType,
  SortByLabelType,
  SortByValueType,
  sortByOptions,
} from "@/src/utils/customVariables";
import { useEffect, useState } from "react";

export default function Demo() {
  const [sortBy, setSortBy] = useState<
    OptionType<SortByLabelType, SortByValueType>
  >(sortByOptions[1]);

  const [applications, setApplications] =
    useState<GetAllApplicationsReturnType>();

  useEffect(() => {
    setApplications(getAllMockApplications(sortBy.value));
  }, [sortBy]);

  if (!applications) return <HomeSkeleton />;

  const { needToApply, applied, interviewing, offer, closed } = applications;

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
      <div className="flex flex-wrap justify-center gap-4 justify-self-center">
        <BoardSection
          title="Need To Apply"
          cards={needToApply}
          sortBy={sortBy.value}
          mode="demo"
          status="needToApply"
        />
        <BoardSection
          title="Applied"
          cards={applied}
          sortBy={sortBy.value}
          mode="demo"
          status="applied"
        />
        <BoardSection
          title="Interviewing"
          cards={interviewing}
          sortBy={sortBy.value}
          mode="demo"
          status="interviewing"
        />
        <BoardSection
          title="Offer"
          cards={offer}
          sortBy={sortBy.value}
          mode="demo"
          status="offer"
        />
        <BoardSection
          title="Closed"
          cards={closed}
          sortBy={sortBy.value}
          mode="demo"
          status="closed"
        />
      </div>
    </>
  );
}

"use client";

import BoardSection from "@/src/components/BoardSection";
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
import {
  ArchiveBoxXMarkIcon,
  ChatBubbleBottomCenterTextIcon,
  ClockIcon,
  EnvelopeIcon,
  TrophyIcon,
} from "@heroicons/react/24/solid";
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
          mode="demo"
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
          mode="demo"
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
          mode="demo"
        />
        <BoardSection
          title="Offer"
          Icon={
            <TrophyIcon className="w-5 text-card-offer" aria-hidden="true" />
          }
          cards={offer}
          sortBy={sortBy.value}
          mode="demo"
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
          mode="demo"
        />
      </div>
    </>
  );
}

import {
  ApplicationStatusType,
  FullApplicationType,
} from "@/src/types/applications";
import { SortByValueType } from "@/src/types/global";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import {
  ArchiveBoxXMarkIcon,
  ChatBubbleBottomCenterTextIcon,
  ClockIcon,
  EnvelopeIcon,
  TrophyIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import BoardSectionCard from "./BoardSectionCard";

export type BoardSectionProps = {
  title: "Need To Apply" | "Applied" | "Interviewing" | "Offer" | "Closed";
  cards: FullApplicationType[];
  sortBy: SortByValueType;
  mode?: "demo";
  status: ApplicationStatusType;
};

export default function BoardSection({
  title,
  cards,
  mode,
  status,
  ...cardProps
}: BoardSectionProps) {
  const createLink =
    mode === "demo"
      ? `/demo/applications/create?status=${status}`
      : `/boards/applications/create?status=${status}`;

  function Icon(): React.ReactNode {
    switch (status) {
      case "needToApply":
        return (
          <ClockIcon className="w-5 text-card-needToApply" aria-hidden="true" />
        );
      case "applied":
        return <EnvelopeIcon className="w-5 text-card-applied" />;
      case "interviewing":
        return (
          <ChatBubbleBottomCenterTextIcon
            className="w-5 text-card-interviewing"
            aria-hidden="true"
          />
        );
      case "offer":
        return (
          <TrophyIcon className="w-5 text-card-offer" aria-hidden="true" />
        );
      case "closed":
        return (
          <ArchiveBoxXMarkIcon
            className="w-5 text-card-closed"
            aria-hidden="true"
          />
        );
    }
  }

  return (
    <div className="grid w-full max-w-board-section gap-1 rounded-md border-[3px] border-light-secondary bg-light-secondary p-1 py-2 ring-2 ring-light-tertiary dark:border-dark-secondary dark:bg-dark-secondary dark:ring-dark-tertiary">
      <div className="relative flex items-center justify-between gap-1 px-2">
        <h2 className="flex gap-2 text-lg font-medium">
          {Icon()}
          <span>{title}</span>
        </h2>
        <Link href={createLink} aria-label={`Create new ${title} application`}>
          <PlusCircleIcon
            className="h-6 w-6 transition-opacity hover:opacity-80"
            aria-hidden="true"
          />
        </Link>
      </div>
      <div className="grid h-board-section w-full auto-rows-min gap-2 overflow-auto px-2 py-1">
        {cards.length > 0 ? (
          cards.map((card, index) => (
            <BoardSectionCard
              key={index}
              mode={mode}
              {...card}
              {...cardProps}
            />
          ))
        ) : (
          <span className="mt-4 justify-self-center">
            Nothing to show yet...
          </span>
        )}
      </div>
    </div>
  );
}

import { FullApplicationType } from "@/src/types/applications";
import relativeDate from "../Fn/relativeDate";

export default function BoardSectionCard({
  position,
  company,
  dateCreated,
  status,
}: FullApplicationType) {
  const date = relativeDate(dateCreated, "dateCreated");

  return (
    <div
      className={`bg-card-${status} h-board-section-card rounded-md px-3 py-2 text-black`}
    >
      <div className="relative flex h-full flex-col justify-between">
        <div className="grid font-medium">
          <span className="line-clamp-1">{position}</span>
          <span className="line-clamp-1">{company}</span>
        </div>
        <span
          className="absolute bottom-0.5 right-0 text-sm"
          title={date.title}
        >
          {date.time}
        </span>
      </div>
    </div>
  );
}

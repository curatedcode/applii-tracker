"use client";

import relativeDate from "./Fn/relativeDate";
import { BoardSectionCardProps } from "../customVariables";
import Link from "next/link";

export default function BoardSectionCard({
  id,
  position,
  company,
  dateModified,
  dateCreated,
  sortBy,
}: BoardSectionCardProps) {
  const date = relativeDate(
    sortBy === "dateCreated" ? dateCreated : dateModified,
    sortBy,
  );

  return (
    <Link
      href={`/applications/${position}-at-${company}?id=${id}`}
      className="group h-[5.75rem] rounded-md bg-site-main px-3 py-2"
      data-testid="board-section-card"
      aria-label={`Open application for ${position} at ${company}`}
    >
      <div className="relative flex h-full flex-col justify-between">
        <div className="grid font-medium">
          <span className="line-clamp-1">{position}</span>
          <span className="line-clamp-1">{company}</span>
        </div>
        <span
          className="absolute bottom-0.5 right-0 text-sm md:opacity-0 md:transition-opacity md:group-hover:opacity-100"
          title={date.title}
        >
          {date.time}
        </span>
      </div>
    </Link>
  );
}

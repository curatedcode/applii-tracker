"use client";

import { FullApplicationType } from "@/src/types/applications";
import { SortByValueType } from "@/src/types/global";
import Link from "next/link";
import relativeDate from "../Fn/relativeDate";

export type BoardSectionCardProps = {
	sortBy: SortByValueType;
	mode?: "demo";
} & FullApplicationType;

export default function BoardSectionCard({
	id,
	position,
	company,
	dateModified,
	dateCreated,
	sortBy,
	status,
	mode,
}: BoardSectionCardProps) {
	const date = relativeDate(
		sortBy === "dateCreated" ? dateCreated : dateModified,
		sortBy,
	);

	const applicationLink =
		mode === "demo"
			? `/demo/applications/${position}-at-${company}?id=${id}`
			: `/boards/applications/${position}-at-${company}?id=${id}`;

	return (
		<Link
			href={applicationLink}
			className={`bg-card-${status} h-board-section-card rounded-md px-3 py-2 text-black`}
			data-testid="board-section-card"
			aria-label={`Open application for ${position} at ${company}`}
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
		</Link>
	);
}

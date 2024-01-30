"use client";

import { ApplicationType } from "@/src/types/applications";
import { SortByValueType } from "@/src/types/global";
import Link from "next/link";
import getContrastingColor from "../Fn/getContrastingColor";
import relativeDate from "../Fn/relativeDate";

export type BoardSectionCardProps = {
	sortBy: SortByValueType;
	mode?: "demo";
} & ApplicationType;

export default function BoardSectionCard({
	id,
	position,
	company,
	dateModified,
	dateCreated,
	sortBy,
	mode,
	cardColor,
}: BoardSectionCardProps) {
	const date = relativeDate(
		sortBy === "dateCreated" ? dateCreated : dateModified,
		sortBy,
	);

	const applicationLink =
		mode === "demo"
			? `/demo/applications/${position}-at-${company}?id=${id}`
			: `/boards/applications/${position}-at-${company}?id=${id}`;

	const hexColor = cardColor.slice(1);

	return (
		<Link
			href={applicationLink}
			className="h-board-section-card rounded-md px-3 py-2"
			data-testid="board-section-card"
			data-axe-ignore={true}
			style={{
				backgroundColor: cardColor,
				color: getContrastingColor(hexColor),
			}}
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

"use client";

import type { zApplication } from "@/src/types/db";
import type { SortByValueType } from "@/src/types/global";
import Link from "next/link";
import getContrastingColor from "../Fn/getContrastingColor";
import relativeDate from "../Fn/relativeDate";

export type BoardSectionCardProps = {
	sortBy: SortByValueType;
	mode?: "demo" | "default";
} & zApplication["GET"];

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
			? `/demo/applications/${position}-at-${company.name}?id=${id}`
			: `/boards/applications/${position}-at-${company.name}?id=${id}`;

	const hexColor = cardColor.slice(1);

	return (
		<Link
			href={applicationLink}
			className="h-board-section-card rounded-md max-w-board-section w-full px-3 py-2 relative flex flex-col justify-between"
			data-testid="board-section-card"
			style={{
				backgroundColor: cardColor,
				color: getContrastingColor(hexColor),
			}}
			aria-label={`Open application for ${position} at ${company}`}
		>
			<div className="grid font-medium">
				<span className="line-clamp-1">{position}</span>
				<span className="line-clamp-1">{company.name}</span>
			</div>
			<span className="absolute bottom-2 right-3 text-sm" title={date.title}>
				{date.time}
			</span>
		</Link>
	);
}

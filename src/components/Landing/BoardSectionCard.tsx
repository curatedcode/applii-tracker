import type { ApplicationType } from "@/src/types/applications";
import getContrastingColor from "../Fn/getContrastingColor";
import relativeDate from "../Fn/relativeDate";

export default function BoardSectionCard({
	position,
	company,
	dateCreated,
	cardColor,
}: ApplicationType) {
	const date = relativeDate(dateCreated, "dateCreated");

	const hexColor = cardColor.slice(1);

	return (
		<div
			className="h-board-section-card rounded-md px-3 py-2 text-black relative flex flex-col justify-between"
			style={{
				backgroundColor: cardColor,
				color: getContrastingColor(hexColor),
			}}
		>
			<div className="grid font-medium">
				<span className="line-clamp-1">{position}</span>
				<span className="line-clamp-1">{company}</span>
			</div>
			<span className="absolute bottom-2 right-3 text-sm" title={date.title}>
				{date.time}
			</span>
		</div>
	);
}

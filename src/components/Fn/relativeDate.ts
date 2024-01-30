import { SortByValueType } from "@/src/types/global";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
	relativeTime: {
		past: "1min",
		s: "%ds",
		m: "1min",
		mm: "%dmin",
		h: "1h",
		hh: "%dh",
		d: "1d",
		dd: "%dd",
		M: "1mo",
		MM: "%dmo",
		y: "1yr",
		yy: "%dyr",
	},
	config: {
		thresholds: [
			{ l: "s", r: 1 },
			{ l: "m", r: 1 },
			{ l: "mm", r: 59, d: "minute" },
			{ l: "h", r: 1 },
			{ l: "hh", r: 23, d: "hour" },
			{ l: "d", r: 1 },
			{ l: "dd", r: 29, d: "day" },
			{ l: "M", r: 1 },
			{ l: "MM", r: 11, d: "month" },
			{ l: "y", r: 1 },
			{ l: "yy", d: "year" },
		],
	},
	rounding: Math.floor,
});

export default function relativeDate(
	date: string,
	sortBy: SortByValueType,
): { time: string; title: string } {
	let dateFrom = dayjs().from(date, true);

	if (dateFrom === "0s") {
		dateFrom = "Now";
	}

	const titleBase = dateFrom === "Now" ? "now" : `${dateFrom} ago`;

	return {
		time: dateFrom,
		title:
			sortBy === "dateCreated"
				? `Created ${titleBase}`
				: `Updated ${titleBase}`,
	};
}

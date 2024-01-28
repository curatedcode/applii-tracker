import { FullApplicationType } from "@/src/types/applications";
import { TimelineType } from "@/src/types/global";
import {
	ApplicationsInDateRangeType,
	timelineUnits,
} from "@/src/types/metrics";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

export type GroupApplicationsByDateRangeProps = {
	applications: FullApplicationType[];
	timeline: TimelineType;
};

/**
 * @param applications - An array of applications to be group
 * @param timeline - "1 year", "6 months", "1 month", "1 week"
 * @returns An object containing the label and applications in the labels range
 */
export default function groupApplicationsByDateRange({
	applications,
	timeline,
}: GroupApplicationsByDateRangeProps): ApplicationsInDateRangeType[] {
	const applicationsInDateRange: ApplicationsInDateRangeType[] = [];

	const labels: string[] = [];
	const currentDate = dayjs();

	for (let i = 0; i < timelineUnits[timeline]; i++) {
		if (timeline === "1 year" || timeline === "6 months") {
			const dateOffset = currentDate.subtract(i, "months");
			labels.unshift(dateOffset.toISOString());
		}

		if (timeline === "1 month") {
			const dateOffsetEnd = currentDate.subtract(i * 7 + i, "days");
			const dateOffsetStart = dateOffsetEnd.subtract(7, "days");

			const date = `${dateOffsetStart.toISOString()} ${dateOffsetEnd.toISOString()}`;

			labels.unshift(date);
		}

		if (timeline === "1 week") {
			const dateOffset = currentDate.subtract(i, "days");
			labels.unshift(dateOffset.toISOString());
		}
	}

	for (let i = 0; i < timelineUnits[timeline]; i++) {
		let label: string;

		switch (timeline) {
			case "1 week":
				label = dayjs(labels[i]).format("MM/DD");
				break;
			case "1 month": {
				const startDate = labels[i].split(" ")[0];
				const endDate = labels[i].split(" ")[1];
				label = `${dayjs(startDate).format("MM/DD")} - ${dayjs(endDate).format(
					"MM/DD",
				)}`;
				break;
			}
			default:
				label = dayjs(labels[i]).format("MMM");
		}

		applicationsInDateRange.push({ label, applications: [] });

		for (let j = 0; j < applications.length; j++) {
			const application = applications[j];
			const applicationDate = application.dateCreated;

			if (timeline === "1 year" || timeline === "6 months") {
				const isSameMonth = dayjs(applicationDate).isSame(labels[i], "month");

				if (isSameMonth) {
					applicationsInDateRange[i].applications.push(application);
				}
				continue;
			}

			if (timeline === "1 month") {
				const startDate = labels[i].split(" ")[0];
				const endDate = labels[i].split(" ")[1];

				const isBetweenDates = dayjs(applicationDate).isBetween(
					startDate,
					endDate,
					"date",
					"[]",
				);

				if (isBetweenDates) {
					applicationsInDateRange[i].applications.push(application);
				}
				continue;
			}

			if (timeline === "1 week") {
				const isSameDate = dayjs(applicationDate).isSame(labels[i], "date");

				if (isSameDate) {
					applicationsInDateRange[i].applications.push(application);
				}
			}
		}
	}

	return applicationsInDateRange;
}

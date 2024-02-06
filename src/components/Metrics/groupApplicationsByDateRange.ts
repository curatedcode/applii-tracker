import { ApplicationType } from "@/src/types/applications";
import { TimelineType } from "@/src/types/global";
import {
	ApplicationsInDateRangeType,
	timelineUnits,
} from "@/src/types/metrics";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

export type GroupApplicationsByDateRangeProps = {
	applications: ApplicationType[];
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

	for (let i = 0; i < timelineUnits[timeline]; i++) {
		if (timeline === "1 year" || timeline === "6 months") {
			const dateOffset = dayjs().subtract(i, "months");
			labels.unshift(dateOffset.toISOString());
		}

		if (timeline === "1 month") {
			const dateOffsetEnd = dayjs().subtract(i * 7 + i, "days");
			const dateOffsetStart = dateOffsetEnd.subtract(7, "days");

			const date = `${dateOffsetStart.toISOString()} ${dateOffsetEnd.toISOString()}`;

			labels.unshift(date);
		}

		if (timeline === "1 week") {
			const dateOffset = dayjs().subtract(i, "days");
			labels.unshift(dateOffset.toISOString());
		}
	}

	for (let i = 0; i < timelineUnits[timeline]; i++) {
		let label = "";
		const labelAsDayjs = dayjs(labels[i]);

		if (timeline === "1 week") {
			if (labelAsDayjs.year() === dayjs().year()) {
				label = labelAsDayjs.format("MM/DD");
			} else {
				label = labelAsDayjs.format("MM/DD/YY");
			}
		}

		if (timeline === "1 month") {
			const startDate = dayjs(labels[i].split(" ")[0]);
			const endDate = dayjs(labels[i].split(" ")[1]);

			let firstHalf: string;
			let secondHalf: string;

			if (startDate.year() === dayjs().year()) {
				firstHalf = startDate.format("MM/DD");
			} else {
				firstHalf = startDate.format("MM/DD/YY");
			}

			if (startDate.year() === dayjs().year()) {
				secondHalf = endDate.format("MM/DD");
			} else {
				secondHalf = endDate.format("MM/DD/YY");
			}

			label = `${firstHalf} - ${secondHalf}`;
		}

		if (timeline === "6 months" || timeline === "1 year") {
			if (labelAsDayjs.year() === dayjs().year()) {
				label = labelAsDayjs.format("MMM");
			} else {
				label = labelAsDayjs.format("MMM, YYYY");
			}
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

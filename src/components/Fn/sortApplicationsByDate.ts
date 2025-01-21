import type { zApplication } from "@/src/types/db";
import type { SortByValueType } from "@/src/types/global";
import dayjs from "dayjs";

export type SortApplicationsByDateProps = {
	applications: zApplication["GET"][];
	sortBy: SortByValueType;
};

export default function sortApplicationsByDate({
	applications,
	sortBy,
}: SortApplicationsByDateProps) {
	const applicationsSorted = applications.sort((a, b) => {
		const dateA = dayjs(a[sortBy]);
		const dateB = dayjs(b[sortBy]);

		if (dateA.isSame(dateB, "millisecond")) return 0;
		if (dateA.isBefore(dateB, "millisecond")) return 1;
		return -1;
	});

	return applicationsSorted;
}

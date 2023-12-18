import { FullApplicationType } from "@/src/types/applications";
import { SortByValueType } from "@/src/types/global";
import dayjs from "dayjs";

export type SortApplicationsByDateProps = {
  applications: FullApplicationType[];
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

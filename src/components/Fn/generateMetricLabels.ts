import {
  TimelineType,
  timelineArrayLengths,
} from "@/src/utils/customVariables";
import dayjs from "dayjs";

export default function generateMetricLabels(timeline: TimelineType) {
  const labels: string[] = [];

  const today = dayjs();
  let earliestDate: dayjs.Dayjs;

  switch (timeline) {
    case "1 year":
      earliestDate = dayjs().subtract(1, "year");
      break;
    case "6 months":
      earliestDate = dayjs().subtract(5, "months");
      break;
    case "1 month":
      earliestDate = dayjs().subtract(1, "months");
      break;
    case "1 week":
      earliestDate = dayjs().subtract(6, "days");
      break;
  }

  for (let i = 0; i < timelineArrayLengths[timeline]; i++) {
    if (timeline === "1 year" || timeline === "6 months") {
      const dateOffset = earliestDate.add(i, "month");

      if (dateOffset.year() === today.year()) {
        labels[i] = dateOffset.format("MMM");
        continue;
      } else {
        labels[i] = `${dateOffset.format("MMM")}, ${dateOffset.year()}`;
        continue;
      }
    }
    if (timeline === "1 month") {
      if (i > 0) {
        const dateOffsetStart = earliestDate.add(i * 7 + i, "days");
        const dateOffsetEnd = dateOffsetStart.add(7, "days").format("M/D");

        labels[i] = `${dateOffsetStart.format("M/D")} - ${dateOffsetEnd}`;
        continue;
      } else {
        const dateOffsetStart = earliestDate.add(i * 7, "days");
        const dateOffsetEnd = dateOffsetStart.add(7, "days").format("M/D");

        labels[i] = `${dateOffsetStart.format("M/D")} - ${dateOffsetEnd}`;
        continue;
      }
    }
    if (timeline === "1 week") {
      labels[i] = earliestDate.add(i, "days").format("M/D");
      continue;
    }
  }

  return labels;
}

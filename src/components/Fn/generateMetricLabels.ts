import { TimelineType } from "@/src/utils/customVariables";
import dayjs from "dayjs";

/**
 * Creates an array of labels from the provided timeline
 * @example
 * generateMetricsLabels("1 month")
 * returns
 * ["9/5 - 9/12", "9/13 - 9/20", "9/21 - 9/28", "9/29 - 10/6"]
 */
export default function generateMetricLabels(timeline: TimelineType) {
  const labels: string[] = [];

  const timelineLengths = {
    "1 year": 13,
    "6 months": 6,
    "1 month": 4,
    "1 week": 7,
  } as const;

  const currentDate = dayjs();
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

  for (let i = 0; i < timelineLengths[timeline]; i++) {
    if (timeline === "1 year" || timeline === "6 months") {
      const dateOffset = earliestDate.add(i, "month");

      if (dateOffset.year() === currentDate.year()) {
        labels[i] = dateOffset.format("MMM");
        continue;
      } else {
        labels[i] = `${dateOffset.format("MMM")}, ${dateOffset.year()}`;
        continue;
      }
    }
    if (timeline === "1 month") {
      const dateOffsetStart = earliestDate.add(i * 7 + i, "days");
      const dateOffsetEnd = dateOffsetStart.add(7, "days").format("M/D");

      labels[i] = `${dateOffsetStart.format("M/D")} - ${dateOffsetEnd}`;
      continue;
    }
    if (timeline === "1 week") {
      labels[i] = earliestDate.add(i, "days").format("M/D");
      continue;
    }
  }

  return labels;
}

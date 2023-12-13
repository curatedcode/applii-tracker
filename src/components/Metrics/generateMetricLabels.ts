import { TimelineType } from "@/src/types/global";
import {
  timelineUnits,
  zodChartDataLabelArraySchema,
} from "@/src/types/metrics";
import dayjs from "dayjs";

/**
 * Creates an array of labels from the provided timeline
 * @example
 * generateMetricsLabels("1 month")
 * [
      "12/12/22 - 12/19/22",
      "12/20/22 - 12/27/22",
      "12/28/22 - 1/4",
      "1/5 - 1/12",
    ]
 */
export default function generateMetricLabels(timeline: TimelineType) {
  const labels: string[] = [];

  function formatOneMonthDate(dateStart: dayjs.Dayjs, dateEnd: dayjs.Dayjs) {
    let dateStartFormatted = "";
    let dateEndFormatted = "";

    if (timeline !== "1 month") {
      throw new Error(
        "Incorrect usage of formatOneMonthDate function: 1 month timeline is not being used",
      );
    }

    if (currentDate.year() !== dateStart.year()) {
      dateStartFormatted = dateStart.format("MM/DD/YY");
    } else {
      dateStartFormatted = dateStart.format("MM/DD");
    }

    if (currentDate.year() !== dateEnd.year()) {
      dateEndFormatted = dateEnd.format("MM/DD/YY");
    } else {
      dateEndFormatted = dateEnd.format("MM/DD");
    }

    return `${dateStartFormatted} - ${dateEndFormatted}`;
  }

  function formatStandardDate(date: dayjs.Dayjs): string {
    if (timeline === "1 month") {
      throw new Error(
        "Incorrect usage of formatStandardDate function: 1 month timeline is being used",
      );
    }

    if (timeline === "1 year" || timeline === "6 months") {
      if (currentDate.year() !== date.year()) {
        return date.format("MMM, YYYY");
      } else {
        return date.format("MMM");
      }
    }

    if (currentDate.year() !== date.year()) {
      return date.format("MM/DD/YY");
    } else {
      return date.format("MM/DD");
    }
  }

  const currentDate = dayjs();

  for (let i = 0; i < timelineUnits[timeline]; i++) {
    if (timeline === "1 year" || timeline === "6 months") {
      const dateOffset = currentDate.subtract(i, "months");
      labels.unshift(formatStandardDate(dateOffset));
    }

    if (timeline === "1 month") {
      const dateOffsetEnd = currentDate.subtract(i * 7 + i, "days");
      const dateOffsetStart = dateOffsetEnd.subtract(7, "days");

      labels.unshift(formatOneMonthDate(dateOffsetStart, dateOffsetEnd));
    }

    if (timeline === "1 week") {
      const dateOffset = currentDate.subtract(i, "days");
      labels.unshift(formatStandardDate(dateOffset));
    }
  }

  const labelsParsed = zodChartDataLabelArraySchema.safeParse(labels);

  if (!labelsParsed.success) {
    throw new Error(
      `Generated metric labels do not match the required format: ${labelsParsed.error}`,
    );
  }
  return labelsParsed.data;
}

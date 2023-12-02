import { FullApplicationType } from "@/src/types/applications";
import { FixedArrayType, TimelineType } from "@/src/types/global";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

export type CalculateApplicationsInDateRangeProps = {
  applications: FullApplicationType[];
  dateType:
    | "dateCreated"
    | "dateApplied"
    | "dateInterviewing"
    | "dateOffered"
    | "dateClosed";
  timeline: TimelineType;
  labels: string[];
};

export default function calculateApplicationsInDateRange({
  applications,
  dateType,
  labels,
  timeline,
}: CalculateApplicationsInDateRangeProps) {
  const appsInYearRange: FixedArrayType<number, 13> = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ];
  const appsInSixMonthRange: FixedArrayType<number, 6> = [0, 0, 0, 0, 0, 0];
  const appsInOneMonthRange: FixedArrayType<number, 4> = [0, 0, 0, 0];
  const appsInWeekRange: FixedArrayType<number, 7> = [0, 0, 0, 0, 0, 0, 0];

  let appsInDateRange;

  switch (timeline) {
    case "1 year":
      appsInDateRange = appsInYearRange;
      break;
    case "6 months":
      appsInDateRange = appsInSixMonthRange;
      break;
    case "1 month":
      appsInDateRange = appsInOneMonthRange;
      break;
    case "1 week":
      appsInDateRange = appsInWeekRange;
      break;
  }

  for (const application of applications) {
    const applicationDate = application[dateType];

    if (!applicationDate) continue;

    for (const label of labels) {
      const standardLabelDate = labelToDate({ label, timeline });
      const index = labels.indexOf(label);

      if (timeline === "1 year" || timeline === "6 months") {
        const isSameYear =
          dayjs(applicationDate).year() === standardLabelDate.year();

        if (!isSameYear) continue;

        const isSameMonth =
          dayjs(applicationDate).month() === standardLabelDate.month();

        isSameMonth && appsInDateRange[index]++;
        continue;
      }

      if (timeline === "1 week") {
        const isSameDate = dayjs(applicationDate).isSame(
          standardLabelDate,
          "date",
        );
        isSameDate && appsInDateRange[index]++;
        continue;
      }

      if (timeline === "1 month") {
        const oneMonthLabelDate = oneMonthLabelTolDate(label);
        const isBetween = dayjs(applicationDate).isBetween(
          oneMonthLabelDate.start,
          oneMonthLabelDate.end,
          "day",
          "[]",
        );

        isBetween && appsInDateRange[index]++;
        continue;
      }
    }
  }

  return appsInDateRange;
}

/**
 * Transform the label into a dayjs object
 */
function labelToDate({
  label,
  timeline,
}: {
  label: string;
  timeline: TimelineType;
}): dayjs.Dayjs {
  const currentYear = dayjs().year();

  if (timeline === "1 year" || timeline === "6 months") {
    const labelAsDate =
      label.length > 3 ? dayjs(label) : dayjs(`${label}, ${currentYear}`);
    return labelAsDate;
  }

  const labelAsDate = dayjs(`${currentYear}/${label}`);
  return labelAsDate;
}

/**
 * @param label E.g. "1 month"
 * @returns a start and end date derived from the label.
 * E.g. if your label is "1 month" the start date would be exactly one month ago
 */
function oneMonthLabelTolDate(label: string): {
  start: dayjs.Dayjs;
  end: dayjs.Dayjs;
} {
  const currentYear = dayjs().year();

  const labelSplit = label.split("-");
  const startDate = dayjs(`${currentYear}/${labelSplit[0]}`);
  const endDate = dayjs(`${currentYear}/${labelSplit[1]}`);

  const labelAsDate = { start: startDate, end: endDate };
  return labelAsDate;
}

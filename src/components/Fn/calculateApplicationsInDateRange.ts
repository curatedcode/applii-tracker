import {
  CalculateApplicationsInDateRangeProps,
  FixedArray,
} from "@/src/utils/customVariables";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

export default function calculateApplicationsInDateRange({
  applications,
  dateType,
  labels,
  timeline,
}: CalculateApplicationsInDateRangeProps) {
  const appsInYearRange: FixedArray<number, 13> = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ];
  const appsInSixMonthRange: FixedArray<number, 6> = [0, 0, 0, 0, 0, 0];
  const appsInOneMonthRange: FixedArray<number, 4> = [0, 0, 0, 0];
  const appsInWeekRange: FixedArray<number, 7> = [0, 0, 0, 0, 0, 0, 0];

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

  function getStandardLabelDate(label: string): dayjs.Dayjs {
    const currentYear = dayjs().year();

    if (timeline === "1 year") {
      const labelAsDate =
        label.length > 3 ? dayjs(label) : dayjs(`${label}, ${currentYear}`);
      return labelAsDate;
    }

    if (timeline === "6 months") {
      const labelAsDate =
        label.length > 3 ? dayjs(label) : dayjs(`${label}, ${currentYear}`);
      return labelAsDate;
    }

    const labelAsDate = dayjs(`${currentYear}/${label}`);
    return labelAsDate;
  }

  function getOneMonthLabelDate(label: string): {
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

  for (const application of applications) {
    const applicationDate = application[dateType];

    if (!applicationDate) continue;

    for (const label of labels) {
      const standardLabelDate = getStandardLabelDate(label);
      const labelIndex = labels.indexOf(label);

      if (timeline === "1 year" || timeline === "6 months") {
        const isSameYear =
          dayjs(applicationDate).year() === standardLabelDate.year();

        if (!isSameYear) continue;

        const isSameMonth =
          dayjs(applicationDate).month() === standardLabelDate.month();

        isSameMonth && appsInDateRange[labelIndex]++;
        continue;
      }

      if (timeline === "1 week") {
        const isSameDate = dayjs(applicationDate).isSame(
          standardLabelDate,
          "date",
        );
        isSameDate && appsInDateRange[labelIndex]++;
        continue;
      }

      if (timeline === "1 month") {
        const oneMonthLabelDate = getOneMonthLabelDate(label);
        const isBetween = dayjs(applicationDate).isBetween(
          oneMonthLabelDate.start,
          oneMonthLabelDate.end,
          "day",
          "[]",
        );

        isBetween && appsInDateRange[labelIndex]++;
        continue;
      }
    }
  }

  return appsInDateRange;
}

import { FullApplicationType } from "@/src/types/applications";
import { TimelineType } from "@/src/types/global";
import {
  ApplicationsInDateRangeType,
  ChartDataLabelType,
  timelineUnits,
} from "@/src/types/metrics";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

export type GroupApplicationsByDateRangeProps = {
  applications: FullApplicationType[];
  timeline: TimelineType;
  labels: ChartDataLabelType[];
};

/**
 * @param applications - An array of applications to be group
 * @param timeline - "1 year", "6 months", "1 month", "1 week"
 * @param labels - date labels to sort by, e.g., ["Oct, 2022", "Nov, 2022", "Dec, 2022", "Jan", "Feb", "Mar"]
 * @returns An object containing the label and applications in the labels range
 */
export default function groupApplicationsByDateRange({
  applications,
  timeline,
  labels,
}: GroupApplicationsByDateRangeProps): ApplicationsInDateRangeType[] {
  const applicationsInDateRange: ApplicationsInDateRangeType[] = [];

  const currentYear = dayjs().year();

  for (let i = 0; i < timelineUnits[timeline]; i++) {
    const currentLabel = labels[i];
    applicationsInDateRange.push({ label: currentLabel, applications: [] });

    for (let j = 0; j < applications.length; j++) {
      const application = applications[j];
      const applicationDate = application.dateCreated;

      // if any date label does not have a year, we need to add one otherwise it will default to 2001

      if (timeline === "1 year" || timeline === "6 months") {
        const labelFixed =
          currentLabel.length < 6
            ? currentLabel.concat(`, ${currentYear}`)
            : currentLabel;
        const isSameMonth = dayjs(applicationDate).isSame(labelFixed, "month");

        if (isSameMonth) {
          applicationsInDateRange[i].applications.push(application);
        }
        continue;
      }

      if (timeline === "1 month") {
        const labelsSplit = currentLabel.split("-");
        const startDate =
          labelsSplit[0].length < 5
            ? labelsSplit[0]
            : labelsSplit[0].concat(`/${currentYear}`);
        const endDate =
          labelsSplit[1].length < 5
            ? labelsSplit[1]
            : labelsSplit[1].concat(`/${currentYear}`);

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
        const labelFixed =
          currentLabel.length < 6
            ? currentLabel.concat(`/${currentYear}`)
            : currentLabel;

        const isSameDate = dayjs(applicationDate).isSame(labelFixed, "date");

        if (isSameDate) {
          applicationsInDateRange[i].applications.push(application);
        }
        continue;
      }
    }
  }

  return applicationsInDateRange;
}

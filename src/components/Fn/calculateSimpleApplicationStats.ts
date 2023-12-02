import { FixedArrayType, typeSafeObjectEntries } from "@/src/types/global";

export type CalculateSimpleApplicationStatsProps = {
  needToApplyApps: number[];
  appliedApps: number[];
  interviewingApps: number[];
  offerApps: number[];
  closedApps: number[];
};

export type CalculateSimpleApplicationStatsReturnType = {
  percents: FixedArrayType<{ percent: string; label: string }, 5>;
  totalApplications: number;
};

export default function calculateSimpleApplicationStats(
  applications: CalculateSimpleApplicationStatsProps,
): CalculateSimpleApplicationStatsReturnType {
  let totalApplications = 0;
  let needToApplyAppsTotal = 0;
  let appliedAppsTotal = 0;
  let interviewingAppsTotal = 0;
  let offerAppsTotal = 0;
  let closedAppsTotal = 0;

  for (const [key, property] of typeSafeObjectEntries(applications)) {
    for (const number of property) {
      totalApplications += number;
      switch (key) {
        case "needToApplyApps":
          needToApplyAppsTotal += number;
          break;
        case "appliedApps":
          appliedAppsTotal += number;
          break;
        case "interviewingApps":
          interviewingAppsTotal += number;
          break;
        case "offerApps":
          offerAppsTotal += number;
          break;
        case "closedApps":
          closedAppsTotal += number;
          break;
      }
    }
  }

  function percentage(num: number): string {
    if (totalApplications === 0) {
      return "0%";
    }
    const percent = (num / totalApplications) * 100;
    return Math.round(percent) + "%";
  }

  return {
    percents: [
      {
        percent: percentage(needToApplyAppsTotal),
        label: "Need To Apply",
      },
      { percent: percentage(appliedAppsTotal), label: "Applied" },
      {
        percent: percentage(interviewingAppsTotal),
        label: "Interviewing",
      },
      { percent: percentage(offerAppsTotal), label: "Offer" },
      { percent: percentage(closedAppsTotal), label: "Closed" },
    ],
    totalApplications,
  };
}

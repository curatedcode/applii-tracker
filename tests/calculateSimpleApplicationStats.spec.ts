import calculateSimpleApplicationStats from "@/src/components/Fn/calculateSimpleApplicationStats";
import { CalculateSimpleApplicationStatsReturnType } from "@/src/utils/customVariables";
import { expect, test } from "vitest";

test("simple application stats", () => {
  const result = calculateSimpleApplicationStats({
    needToApplyApps: [87, 7, 2, 98],
    appliedApps: [60, 68, 59, 11],
    interviewingApps: [17, 67, 47, 85],
    offerApps: [30, 69, 89, 45],
    closedApps: [100, 80, 20, 21],
  });

  const toEqual: CalculateSimpleApplicationStatsReturnType = {
    percents: [
      { percent: "18.3%", label: "Need To Apply" },
      { percent: "18.6%", label: "Applied" },
      { percent: "20.3%", label: "Interviewing" },
      { percent: "21.9%", label: "Offer" },
      { percent: "20.8%", label: "Closed" },
    ],
    totalApplications: 1062,
  };

  expect(result).toStrictEqual(toEqual);
});

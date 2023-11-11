import calculateSimpleApplicationStats from "@/src/components/Fn/calculateSimpleApplicationStats";
import { CalculateSimpleApplicationStatsReturnType } from "@/src/utils/customVariables";
import { describe, expect, test } from "vitest";

describe("simple application stats", () => {
  test("should return correct percentage and labels", () => {
    const result = calculateSimpleApplicationStats({
      needToApplyApps: [87, 7, 2, 98],
      appliedApps: [60, 68, 59, 11],
      interviewingApps: [17, 67, 47, 85],
      offerApps: [30, 69, 89, 45],
      closedApps: [100, 80, 20, 21],
    });

    const toEqual: CalculateSimpleApplicationStatsReturnType = {
      percents: [
        { percent: "18%", label: "Need To Apply" },
        { percent: "19%", label: "Applied" },
        { percent: "20%", label: "Interviewing" },
        { percent: "22%", label: "Offer" },
        { percent: "21%", label: "Closed" },
      ],
      totalApplications: 1062,
    };

    expect(result).toStrictEqual(toEqual);
  });

  test("should return 0% if apps are all zero", () => {
    const result = calculateSimpleApplicationStats({
      needToApplyApps: [87, 7, 2, 98],
      appliedApps: [60, 68, 59, 11],
      interviewingApps: [0, 0, 0, 0],
      offerApps: [0, 0, 0, 0],
      closedApps: [100, 80, 20, 21],
    });

    const toEqual: CalculateSimpleApplicationStatsReturnType = {
      percents: [
        { percent: "32%", label: "Need To Apply" },
        { percent: "32%", label: "Applied" },
        { percent: "0%", label: "Interviewing" },
        { percent: "0%", label: "Offer" },
        { percent: "36%", label: "Closed" },
      ],
      totalApplications: 613,
    };

    expect(result).toStrictEqual(toEqual);
  });
});

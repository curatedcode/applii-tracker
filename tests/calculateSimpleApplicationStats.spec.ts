import calculateSimpleApplicationStats from "@/src/components/Fn/calculateSimpleApplicationStats";
import { CalculateSimpleApplicationStatsReturnType } from "@/src/customVariables";
import { expect, test } from "vitest";

test("simple application stats", () => {
  const result = calculateSimpleApplicationStats({
    needToApplyLength: 77,
    appliedLength: 12,
    interviewingLength: 104,
    offerLength: 157,
    closedLength: 60,
  });

  const toEqual: CalculateSimpleApplicationStatsReturnType = {
    percents: [
      { percent: "18.8%", label: "Need To Apply" },
      { percent: "2.9%", label: "Applied" },
      { percent: "25.4%", label: "Interviewing" },
      { percent: "38.3%", label: "Offer" },
      { percent: "14.6%", label: "Closed" },
    ],
    totalApplications: 410,
  };

  expect(result).toStrictEqual(toEqual);
});

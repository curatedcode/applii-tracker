import {
  CalculateSimpleApplicationStatsProps,
  CalculateSimpleApplicationStatsReturnType,
  typeSafeObjectEntries,
} from "@/src/customVariables";

export default function calculateSimpleApplicationStats(
  applications: CalculateSimpleApplicationStatsProps,
): CalculateSimpleApplicationStatsReturnType {
  let totalApplications = 0;
  let needToApplyLength = 0;
  let appliedLength = 0;
  let interviewingLength = 0;
  let offerLength = 0;
  let closedLength = 0;

  for (const [key, property] of typeSafeObjectEntries(applications)) {
    for (const number of property) {
      totalApplications += number;
      switch (key) {
        case "needToApplyApps":
          needToApplyLength += number;
          break;
        case "appliedApps":
          appliedLength += number;
          break;
        case "interviewingApps":
          interviewingLength += number;
          break;
        case "offerApps":
          offerLength += number;
          break;
        case "closedApps":
          closedLength += number;
          break;
      }
    }
  }

  function getPercentage(number: number) {
    const percentage = (number / totalApplications) * 100;
    const fixedNumber = percentage.toFixed(1);

    if (fixedNumber[-1] === "0") {
      return fixedNumber.slice(0, -2) + "%";
    }

    return fixedNumber + "%";
  }

  return {
    percents: [
      {
        percent: getPercentage(needToApplyLength),
        label: "Need To Apply",
      },
      { percent: getPercentage(appliedLength), label: "Applied" },
      {
        percent: getPercentage(interviewingLength),
        label: "Interviewing",
      },
      { percent: getPercentage(offerLength), label: "Offer" },
      { percent: getPercentage(closedLength), label: "Closed" },
    ],
    totalApplications,
  };
}

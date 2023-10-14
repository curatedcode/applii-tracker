import {
  CalculateSimpleApplicationStatsProps,
  CalculateSimpleApplicationStatsReturnType,
} from "@/src/customVariables";

export default function calculateSimpleApplicationStats(
  applications: CalculateSimpleApplicationStatsProps,
): CalculateSimpleApplicationStatsReturnType {
  const {
    needToApplyLength,
    appliedLength,
    interviewingLength,
    offerLength,
    closedLength,
  } = applications;

  const totalApplications =
    needToApplyLength +
    appliedLength +
    interviewingLength +
    offerLength +
    closedLength;

  function getPercentage(number: number) {
    const percentage = (number / totalApplications) * 100;
    const fixedNumber = percentage.toFixed(1);

    if (fixedNumber[-1] === "0") {
      return fixedNumber.slice(0, -1) + "%";
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

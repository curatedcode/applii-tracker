import type { FixedArrayType } from "@/src/types/global";
import type { ApplicationsInDateRangeType } from "@/src/types/metrics";

export type GenerateSimpleMetricsReturnType = {
	percentages: FixedArrayType<{ percentage: string; label: string }, 5>;
	totalApplications: number;
};

export default function generateSimpleMetrics(
	applicationsInDateRange: ApplicationsInDateRangeType[],
): GenerateSimpleMetricsReturnType {
	const applications = applicationsInDateRange.flatMap(
		(val) => val.applications,
	);

	const totalApplications = applications.length;
	let totalNeedToApply = 0;
	let totalApplied = 0;
	let totalInterviewing = 0;
	let totalOffer = 0;
	let totalClosed = 0;

	for (const application of applications) {
		const status = application.status;

		switch (status) {
			case "Need To Apply":
				totalNeedToApply++;
				break;
			case "Applied":
				totalApplied++;
				break;
			case "Interviewing":
				totalInterviewing++;
				break;
			case "Offer":
				totalOffer++;
				break;
			case "Closed":
				totalClosed++;
				break;
		}
	}

	function percentage(num: number): string {
		if (totalApplications === 0) {
			return "0%";
		}
		const percentage = (num / totalApplications) * 100;
		return `${Math.round(percentage)}%`;
	}

	return {
		percentages: [
			{
				percentage: percentage(totalNeedToApply),
				label: "Need To Apply",
			},
			{ percentage: percentage(totalApplied), label: "Applied" },
			{
				percentage: percentage(totalInterviewing),
				label: "Interviewing",
			},
			{ percentage: percentage(totalOffer), label: "Offer" },
			{ percentage: percentage(totalClosed), label: "Closed" },
		],
		totalApplications,
	};
}

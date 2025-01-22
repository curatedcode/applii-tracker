import type { zApplication } from "@/src/types/db";
import { statusColors } from "@/src/types/global";
import type {
	ApplicationsInDateRangeType,
	FormattedChartDataType,
} from "@/src/types/metrics";

export default function formatApplicationData(
	data: ApplicationsInDateRangeType[],
): FormattedChartDataType[] {
	const dataFormatted = data.map((data) => {
		const { label, applications } = data;

		const needToApplyApps: zApplication["GET"][] = [];
		const appliedApps: zApplication["GET"][] = [];
		const interviewingApps: zApplication["GET"][] = [];
		const offerApps: zApplication["GET"][] = [];
		const closedApps: zApplication["GET"][] = [];

		for (const application of applications) {
			const status = application.status;
			switch (status) {
				case "Need To Apply":
					needToApplyApps.push(application);
					break;
				case "Applied":
					appliedApps.push(application);
					break;
				case "Interviewing":
					interviewingApps.push(application);
					break;
				case "Offer":
					offerApps.push(application);
					break;
				case "Closed":
					closedApps.push(application);
					break;
			}
		}

		const dataFormatted: FormattedChartDataType = {
			date: label,
			"Need To Apply": needToApplyApps.length,
			"Need To ApplyColor": statusColors.needToApply,
			Applied: appliedApps.length,
			AppliedColor: statusColors.applied,
			Interviewing: interviewingApps.length,
			InterviewingColor: statusColors.interviewing,
			Offer: offerApps.length,
			OfferColor: statusColors.offer,
			Closed: closedApps.length,
			ClosedColor: statusColors.closed,
		};

		return dataFormatted;
	});

	return dataFormatted;
}

import { FullApplicationType } from "@/src/types/applications";
import { statusColors } from "@/src/types/global";
import {
	ApplicationsInDateRangeType,
	FormattedChartDataType,
} from "@/src/types/metrics";

export default function formatApplicationData(
	data: ApplicationsInDateRangeType[],
): FormattedChartDataType[] {
	const dataFormatted = data.map((data) => {
		const { label, applications } = data;

		const needToApplyApps: FullApplicationType[] = [];
		const appliedApps: FullApplicationType[] = [];
		const interviewingApps: FullApplicationType[] = [];
		const offerApps: FullApplicationType[] = [];
		const closedApps: FullApplicationType[] = [];

		for (const application of applications) {
			const status = application.status;
			switch (status) {
				case "needToApply":
					needToApplyApps.push(application);
					break;
				case "applied":
					appliedApps.push(application);
					break;
				case "interviewing":
					interviewingApps.push(application);
					break;
				case "offer":
					offerApps.push(application);
					break;
				case "closed":
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

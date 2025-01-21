import type { zApplication } from "@/src/types/db";

export default function groupApplicationsByStatus(
	applications: zApplication["GET"][],
) {
	const needToApply: zApplication["GET"][] = [];
	const applied: zApplication["GET"][] = [];
	const interviewing: zApplication["GET"][] = [];
	const offer: zApplication["GET"][] = [];
	const closed: zApplication["GET"][] = [];

	for (let i = 0; i < applications.length; i++) {
		const application = applications[i];

		switch (application.status) {
			case "Need To Apply":
				needToApply.push(application);
				break;
			case "Applied":
				applied.push(application);
				break;
			case "Interviewing":
				interviewing.push(application);
				break;
			case "Offer":
				offer.push(application);
				break;
			case "Closed":
				closed.push(application);
				break;
		}
	}

	return {
		needToApply,
		applied,
		interviewing,
		offer,
		closed,
	};
}

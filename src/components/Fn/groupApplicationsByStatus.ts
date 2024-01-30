import { ApplicationType } from "@/src/types/applications";

export default function groupApplicationsByStatus(
	applications: ApplicationType[],
) {
	const needToApply: ApplicationType[] = [];
	const applied: ApplicationType[] = [];
	const interviewing: ApplicationType[] = [];
	const offer: ApplicationType[] = [];
	const closed: ApplicationType[] = [];

	for (let i = 0; i < applications.length; i++) {
		const application = applications[i];

		switch (application.status) {
			case "needToApply":
				needToApply.push(application);
				break;
			case "applied":
				applied.push(application);
				break;
			case "interviewing":
				interviewing.push(application);
				break;
			case "offer":
				offer.push(application);
				break;
			case "closed":
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

import { zApplication } from "@/src/types/db";
import getAllApplicationsInStorage from "./getAllDemoApplicationsInStorage";

export default function createDemoApplication(
	application: zApplication["INSERT"],
	id: number,
) {
	if (!window || !window.sessionStorage) return;

	const applicationsInStorage = getAllApplicationsInStorage();

	const contactsFormatted = application.contacts
		? application.contacts.map((contact, i) => ({
				...contact,
				id: id * i,
			}))
		: [];

	const applicationParsed = zApplication.GET.parse({
		...application,
		id,
		company: {
			...application.company,
			id,
		},
		contacts: contactsFormatted,
		companyId: id,
	});

	if (!applicationsInStorage) {
		window.sessionStorage.setItem(
			"demoApplications",
			JSON.stringify([applicationParsed]),
		);
		return;
	}

	const mergedApplications = applicationsInStorage.push(applicationParsed);

	window.sessionStorage.setItem(
		"demoApplications",
		JSON.stringify(mergedApplications),
	);
}

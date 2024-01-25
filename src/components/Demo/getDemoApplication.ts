import getAllDemoApplications from "./getAllDemoApplications";

export default function getDemoApplication(id: number) {
	const applications = getAllDemoApplications("dateCreated");

	return applications.find((app) => app.id === id);
}

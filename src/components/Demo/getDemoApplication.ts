import getAllDemoApplications from "./getAllDemoApplications";

export default function getDemoApplication(id: number) {
	const applications = getAllDemoApplications("dateCreated");

	console.log(
		applications.length > 0,
		applications.find((app) => app.id === id),
		id,
	);
	return applications.find((app) => app.id === id);
}

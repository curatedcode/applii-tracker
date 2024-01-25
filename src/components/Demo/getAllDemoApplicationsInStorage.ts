import {
	FormatApplicationsType,
	FullApplicationType,
	GroupedApplicationsType,
	zodFullApplicationArray,
} from "@/src/types/applications";
import groupApplicationsByStatus from "../Fn/groupApplicationsByStatus";

function getAllDemoApplicationsInStorage(): FullApplicationType[] | undefined;

function getAllDemoApplicationsInStorage(
	_format: FormatApplicationsType,
): GroupedApplicationsType | undefined;

function getAllDemoApplicationsInStorage(format?: "grouped") {
	if (typeof window === "undefined") return;

	const applicationsInStorage =
		window.sessionStorage.getItem("demoApplications");

	if (!applicationsInStorage) return;

	const storedApps = zodFullApplicationArray.safeParse(
		JSON.parse(applicationsInStorage),
	);

	if (!storedApps.success) return;

	if (format === "grouped") {
		const applications = storedApps.data;
		const grouped = groupApplicationsByStatus(applications);
		return grouped;
	}

	return storedApps.data;
}

export default getAllDemoApplicationsInStorage;

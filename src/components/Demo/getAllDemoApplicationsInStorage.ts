import {
	ApplicationType,
	FormatApplicationsType,
	GroupedApplicationsType,
	application,
} from "@/src/types/applications";
import { z } from "zod";
import groupApplicationsByStatus from "../Fn/groupApplicationsByStatus";

function getAllDemoApplicationsInStorage(): ApplicationType[] | undefined;

function getAllDemoApplicationsInStorage(
	_format: FormatApplicationsType,
): GroupedApplicationsType | undefined;

function getAllDemoApplicationsInStorage(format?: "grouped") {
	if (typeof window === "undefined") return;

	const applicationsInStorage =
		window.sessionStorage.getItem("demoApplications");

	if (!applicationsInStorage) return;

	const storedApps = z
		.array(application)
		.safeParse(JSON.parse(applicationsInStorage));

	if (!storedApps.success) return;

	if (format === "grouped") {
		const applications = storedApps.data;
		const grouped = groupApplicationsByStatus(applications);
		return grouped;
	}

	return storedApps.data;
}

export default getAllDemoApplicationsInStorage;

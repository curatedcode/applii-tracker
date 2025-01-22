import type { GroupedApplicationsType } from "@/src/types/applications";
import { zApplication } from "@/src/types/db";
import { z } from "zod";
import groupApplicationsByStatus from "../Fn/groupApplicationsByStatus";

function getAllDemoApplicationsInStorage(): zApplication["GET"][] | undefined;

function getAllDemoApplicationsInStorage(
	_format: "grouped",
): GroupedApplicationsType | undefined;

function getAllDemoApplicationsInStorage(format?: "grouped") {
	if (typeof window === "undefined") return;

	const applicationsInStorage =
		window.sessionStorage.getItem("demoApplications");

	if (!applicationsInStorage) return;

	const storedApps = z
		.array(zApplication.GET)
		.parse(JSON.parse(applicationsInStorage));

	if (format === "grouped") {
		const applications = storedApps;
		const grouped = groupApplicationsByStatus(applications);
		return grouped;
	}

	return storedApps;
}

export default getAllDemoApplicationsInStorage;

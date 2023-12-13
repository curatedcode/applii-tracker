import {
  FormatApplicationsType,
  FullApplicationType,
  GroupedApplicationsType,
  zodFullApplicationArray,
} from "@/src/types/applications";

function getAllDemoApplicationsInStorage(): FullApplicationType[];

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

    const needToApplyStoredApps = applications.filter(
      (app) => app.status === "needToApply",
    );
    const appliedStoredApps = applications.filter(
      (app) => app.status === "applied",
    );
    const interviewingStoredApps = applications.filter(
      (app) => app.status === "interviewing",
    );
    const offerStoredApps = applications.filter(
      (app) => app.status === "offer",
    );
    const closedStoredApps = applications.filter(
      (app) => app.status === "closed",
    );

    return {
      needToApply: needToApplyStoredApps,
      applied: appliedStoredApps,
      interviewing: interviewingStoredApps,
      offer: offerStoredApps,
      closed: closedStoredApps,
    };
  }

  return storedApps.data;
}

export default getAllDemoApplicationsInStorage;

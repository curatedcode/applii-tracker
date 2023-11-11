import {
  GetAllApplicationsReturnType,
  zodFullApplicationArray,
} from "@/src/utils/customVariables";

export default function getAllDemoApplicationsInStorage():
  | GetAllApplicationsReturnType
  | undefined {
  if (typeof window === "undefined") return;

  const applicationsInStorage =
    window.sessionStorage.getItem("demoApplications");

  if (!applicationsInStorage) return;

  const storedApps = zodFullApplicationArray.safeParse(
    JSON.parse(applicationsInStorage),
  );

  if (!storedApps.success) return;

  const needToApplyStoredApps = storedApps.data.filter(
    (app) => app.status === "needToApply",
  );
  const appliedStoredApps = storedApps.data.filter(
    (app) => app.status === "applied",
  );
  const interviewingStoredApps = storedApps.data.filter(
    (app) => app.status === "interviewing",
  );
  const offerStoredApps = storedApps.data.filter(
    (app) => app.status === "offer",
  );
  const closedStoredApps = storedApps.data.filter(
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

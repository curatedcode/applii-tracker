import { FullApplicationType } from "@/src/types/applications";
import getAllApplicationsInStorage from "./getAllDemoApplicationsInStorage";

export default function createDemoApplication(
  application: FullApplicationType,
) {
  if (!window || !window.sessionStorage) return;

  const applicationsInStorage = getAllApplicationsInStorage();

  if (!applicationsInStorage) {
    window.sessionStorage.setItem(
      "demoApplications",
      JSON.stringify([application]),
    );
    return;
  }

  const mergedApplications = applicationsInStorage.push(application);

  window.sessionStorage.setItem(
    "demoApplications",
    JSON.stringify(mergedApplications),
  );
}

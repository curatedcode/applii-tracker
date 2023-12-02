import { FullApplicationType } from "@/src/types/applications";
import getAllApplicationsInStorage from "./getAllDemoApplicationsInStorage";

export default function createDemoApplication(
  application: FullApplicationType,
) {
  if (!window || !window.sessionStorage) return;

  const dataInStorage = getAllApplicationsInStorage();

  if (!dataInStorage) {
    window.sessionStorage.setItem(
      "demoApplications",
      JSON.stringify([application]),
    );
    return;
  }

  const { needToApply, applied, interviewing, offer, closed } = dataInStorage;

  const dataMerged = needToApply.concat(applied, interviewing, offer, closed);

  window.sessionStorage.setItem(
    "demoApplications",
    JSON.stringify([...dataMerged, application]),
  );
}

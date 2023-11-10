import { GetAllApplicationsReturnType } from "@/src/utils/customVariables";
import {
  appliedMocks,
  closedMocks,
  interviewingMocks,
  needToApplyMocks,
  offerMocks,
} from "./mockDemoVariables";
import getAllApplicationsInStorage from "./getAllDemoApplicationsInStorage";

/**
 * Will get all default mock applications and check for any applications in session storage
 */
export default function getAllDemoApplications(): GetAllApplicationsReturnType {
  const defaultMockApplications = {
    needToApply: needToApplyMocks,
    applied: appliedMocks,
    interviewing: interviewingMocks,
    offer: offerMocks,
    closed: closedMocks,
  };

  const appsInStorage = getAllApplicationsInStorage();

  if (!appsInStorage) return defaultMockApplications;

  const { needToApply, applied, interviewing, offer, closed } = appsInStorage;

  return {
    needToApply: needToApply.concat(defaultMockApplications.needToApply),
    applied: applied.concat(defaultMockApplications.applied),
    interviewing: interviewing.concat(defaultMockApplications.interviewing),
    offer: offer.concat(defaultMockApplications.offer),
    closed: closed.concat(defaultMockApplications.closed),
  };
}

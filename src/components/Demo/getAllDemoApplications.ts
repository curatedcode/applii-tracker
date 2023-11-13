import {
  GetAllApplicationsReturnType,
  SortByValueType,
} from "@/src/utils/customVariables";
import {
  appliedMocks,
  closedMocks,
  interviewingMocks,
  needToApplyMocks,
  offerMocks,
} from "./mockDemoVariables";
import getAllApplicationsInStorage from "./getAllDemoApplicationsInStorage";
import dayjs from "dayjs";

/**
 * Will get all default mock applications and check for any applications in session storage
 */
export default function getAllDemoApplications(
  sortBy: SortByValueType,
): GetAllApplicationsReturnType {
  const defaultMockApplications = {
    needToApply: needToApplyMocks,
    applied: appliedMocks,
    interviewing: interviewingMocks,
    offer: offerMocks,
    closed: closedMocks,
  };

  const appsInStorage = getAllApplicationsInStorage();

  if (!appsInStorage) return defaultMockApplications;

  const needToApplyMerged = appsInStorage.needToApply.concat(needToApplyMocks);
  const appliedMerged = appsInStorage.applied.concat(appliedMocks);
  const interviewingMerged =
    appsInStorage.interviewing.concat(interviewingMocks);
  const offerMerged = appsInStorage.offer.concat(offerMocks);
  const closedMerged = appsInStorage.closed.concat(closedMocks);

  const needToApplySorted = needToApplyMerged.sort((a, b) =>
    dayjs(a[sortBy]).isAfter(dayjs(b[sortBy])) ? -1 : 1,
  );
  const appliedSorted = appliedMerged.sort((a, b) =>
    dayjs(a[sortBy]).isAfter(dayjs(b[sortBy])) ? -1 : 1,
  );
  const interviewingSorted = interviewingMerged.sort((a, b) =>
    dayjs(a[sortBy]).isAfter(dayjs(b[sortBy])) ? -1 : 1,
  );
  const offerSorted = offerMerged.sort((a, b) =>
    dayjs(a[sortBy]).isAfter(dayjs(b[sortBy])) ? -1 : 1,
  );
  const closedSorted = closedMerged.sort((a, b) =>
    dayjs(a[sortBy]).isAfter(dayjs(b[sortBy])) ? -1 : 1,
  );

  return {
    needToApply: needToApplySorted,
    applied: appliedSorted,
    interviewing: interviewingSorted,
    offer: offerSorted,
    closed: closedSorted,
  };
}

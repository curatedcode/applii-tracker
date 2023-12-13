import {
  FormatApplicationsType,
  FullApplicationType,
  GroupedApplicationsType,
} from "@/src/types/applications";
import { SortByValueType } from "@/src/types/global";
import dayjs from "dayjs";
import getAllDemoApplicationsInStorage from "./getAllDemoApplicationsInStorage";
import {
  appliedMocks,
  closedMocks,
  interviewingMocks,
  needToApplyMocks,
  offerMocks,
} from "./mockDemoVariables";

function getAllDemoApplications(
  _sortBy: SortByValueType,
): FullApplicationType[];

function getAllDemoApplications(
  _sortBy: SortByValueType,
  _format: FormatApplicationsType,
): GroupedApplicationsType;

/**
 * Will get all default mock applications and check for any applications in session storage
 */
function getAllDemoApplications(
  sortBy: SortByValueType,
  format?: FormatApplicationsType,
) {
  if (format === "grouped") {
    const appsInStorage = getAllDemoApplicationsInStorage(format);

    if (!appsInStorage) {
      return {
        needToApply: needToApplyMocks,
        applied: appliedMocks,
        interviewing: interviewingMocks,
        offer: offerMocks,
        closed: closedMocks,
      };
    }

    const needToApplyMerged =
      appsInStorage.needToApply.concat(needToApplyMocks);
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

  const appsInStorage = getAllDemoApplicationsInStorage();

  if (appsInStorage) {
    return needToApplyMocks.concat(
      appliedMocks,
      interviewingMocks,
      offerMocks,
      closedMocks,
      appsInStorage,
    );
  }

  return needToApplyMocks.concat(
    appliedMocks,
    interviewingMocks,
    offerMocks,
    closedMocks,
  );
}

export default getAllDemoApplications;

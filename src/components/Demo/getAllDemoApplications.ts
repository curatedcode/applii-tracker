import {
  FormatApplicationsType,
  FullApplicationType,
  GroupedApplicationsType,
} from "@/src/types/applications";
import { SortByValueType } from "@/src/types/global";
import sortApplicationsByDate from "../Fn/sortApplicationsByDate";
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
        needToApply: sortApplicationsByDate({
          applications: needToApplyMocks,
          sortBy,
        }),
        applied: sortApplicationsByDate({ applications: appliedMocks, sortBy }),
        interviewing: sortApplicationsByDate({
          applications: interviewingMocks,
          sortBy,
        }),
        offer: sortApplicationsByDate({ applications: offerMocks, sortBy }),
        closed: sortApplicationsByDate({ applications: closedMocks, sortBy }),
      };
    }

    const needToApplySorted = sortApplicationsByDate({
      applications: appsInStorage.needToApply.concat(needToApplyMocks),
      sortBy,
    });
    const appliedSorted = sortApplicationsByDate({
      applications: appsInStorage.applied.concat(appliedMocks),
      sortBy,
    });
    const interviewingSorted = sortApplicationsByDate({
      applications: appsInStorage.interviewing.concat(interviewingMocks),
      sortBy,
    });
    const offerSorted = sortApplicationsByDate({
      applications: appsInStorage.offer.concat(offerMocks),
      sortBy,
    });
    const closedSorted = sortApplicationsByDate({
      applications: appsInStorage.closed.concat(closedMocks),
      sortBy,
    });

    return {
      needToApply: needToApplySorted,
      applied: appliedSorted,
      interviewing: interviewingSorted,
      offer: offerSorted,
      closed: closedSorted,
    };
  }

  const appsInStorage = getAllDemoApplicationsInStorage();

  if (!appsInStorage) {
    const allApplications = needToApplyMocks.concat(
      appliedMocks,
      interviewingMocks,
      offerMocks,
      closedMocks,
    );
    const applicationsSorted = sortApplicationsByDate({
      applications: allApplications,
      sortBy,
    });

    return applicationsSorted;
  }

  const allApplications = needToApplyMocks.concat(
    appliedMocks,
    interviewingMocks,
    offerMocks,
    closedMocks,
    appsInStorage,
  );
  const applicationsSorted = sortApplicationsByDate({
    applications: allApplications,
    sortBy,
  });

  return applicationsSorted;
}

export default getAllDemoApplications;

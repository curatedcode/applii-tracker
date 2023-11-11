import {
  GetApplicationMetricsReturnType,
  TimelineType,
} from "@/src/utils/customVariables";
import getAllDemoApplications from "./getAllDemoApplications";
import calculateApplicationsInDateRange from "../Fn/calculateApplicationsInDateRange";
import generateMetricLabels from "../Fn/generateMetricLabels";
import dayjs from "dayjs";
import calculateSimpleApplicationStats from "../Fn/calculateSimpleApplicationStats";

export default function getDemoApplicationMetrics(
  timeline: TimelineType,
): GetApplicationMetricsReturnType {
  const applications = getAllDemoApplications();

  const { needToApply, applied, interviewing, offer, closed } = applications;

  const needToApplySorted = needToApply.sort((a, b) =>
    dayjs(a.dateCreated).isAfter(dayjs(b.dateCreated)) ? -1 : 1,
  );

  const appliedSorted = applied.sort((a, b) =>
    dayjs(a.dateCreated).isAfter(dayjs(b.dateCreated)) ? -1 : 1,
  );

  const interviewingSorted = interviewing.sort((a, b) =>
    dayjs(a.dateCreated).isAfter(dayjs(b.dateCreated)) ? -1 : 1,
  );

  const offerSorted = offer.sort((a, b) =>
    dayjs(a.dateCreated).isAfter(dayjs(b.dateCreated)) ? -1 : 1,
  );

  const closedSorted = closed.sort((a, b) =>
    dayjs(a.dateCreated).isAfter(dayjs(b.dateCreated)) ? -1 : 1,
  );

  const needToApplyApps = calculateApplicationsInDateRange({
    applications: needToApplySorted,
    dateType: "dateCreated",
    labels: generateMetricLabels(timeline),
    timeline,
  });

  const appliedApps = calculateApplicationsInDateRange({
    applications: appliedSorted,
    dateType: "dateApplied",
    labels: generateMetricLabels(timeline),
    timeline,
  });

  const interviewingApps = calculateApplicationsInDateRange({
    applications: interviewingSorted,
    dateType: "dateInterviewing",
    labels: generateMetricLabels(timeline),
    timeline,
  });

  const offerApps = calculateApplicationsInDateRange({
    applications: offerSorted,
    dateType: "dateOffered",
    labels: generateMetricLabels(timeline),
    timeline,
  });

  const closedApps = calculateApplicationsInDateRange({
    applications: closedSorted,
    dateType: "dateClosed",
    labels: generateMetricLabels(timeline),
    timeline,
  });

  const simpleStats = calculateSimpleApplicationStats({
    needToApplyApps,
    appliedApps,
    interviewingApps,
    offerApps,
    closedApps,
  });

  return {
    needToApply: needToApplyApps,
    applied: appliedApps,
    interviewing: interviewingApps,
    offer: offerApps,
    closed: closedApps,
    labels: generateMetricLabels(timeline),
    simpleStats,
  };
}

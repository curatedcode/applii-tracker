import {
  ApplicationType,
  CreateApplicationType,
  FullApplicationType,
  GetAllApplicationsReturnType,
  GetApplicationMetricsReturnType,
  TimelineType,
  UpdateApplicationType,
} from "./customVariables";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import generateMetricLabels from "../components/Fn/generateMetricLabels";
import calculateApplicationsInDateRange from "../components/Fn/calculateApplicationsInDateRange";
import calculateSimpleApplicationStats from "../components/Fn/calculateSimpleApplicationStats";
dayjs.extend(isSameOrBefore);

export async function applicationDB(): Promise<IDBObjectStore> {
  const objectStorePromise = new Promise((resolve, reject) => {
    const indexedDB = window.indexedDB;
    const DBrequest = indexedDB.open("appliiDatabase", 1);

    DBrequest.onerror = (event) =>
      reject(Error(`Unable to open database: ${event}`));

    DBrequest.onupgradeneeded = () => {
      const DB = DBrequest.result;
      const store = DB.createObjectStore("applications", {
        keyPath: "id",
        autoIncrement: true,
      });

      store.createIndex("application_status", ["status"], { unique: false });
    };

    DBrequest.onsuccess = () => {
      const DB = DBrequest.result;
      const transaction = DB.transaction(["applications"], "readwrite");
      const objectStore = transaction.objectStore("applications");

      resolve(objectStore);
    };
  });

  const objectStore = (await objectStorePromise) as IDBObjectStore;
  return objectStore;
}

export async function getApplication({
  id,
}: {
  id: number;
}): Promise<FullApplicationType> {
  const DB = await applicationDB();

  const application = new Promise((resolve, reject) => {
    const data = DB.get(id);

    data.onerror = (event) =>
      reject(Error(`Unable to fetch application with ID ${id}: ${event}`));
    data.onsuccess = () => resolve(data.result);
  }) as Promise<FullApplicationType>;

  return application;
}

export async function getAllApplications(
  sortBy: "dateModified" | "dateCreated",
): Promise<GetAllApplicationsReturnType> {
  const DB = await applicationDB();

  const applicationsPromise = new Promise((resolve, reject) => {
    const data = DB.getAll();

    data.onerror = (event) =>
      reject(Error(`Unable to fetch applications: ${event}`));
    data.onsuccess = () => resolve(data.result);
  }) as Promise<ApplicationType[]>;

  const applications: FullApplicationType[] = await applicationsPromise;

  const applicationsSorted = applications.sort((a, b) =>
    dayjs(a[sortBy]).isAfter(dayjs(b[sortBy])) ? -1 : 1,
  );

  const needToApplyApps: FullApplicationType[] = [];
  const appliedApps: FullApplicationType[] = [];
  const interviewingApps: FullApplicationType[] = [];
  const offerApps: FullApplicationType[] = [];
  const closedApps: FullApplicationType[] = [];

  for (const application of applicationsSorted) {
    switch (application.status) {
      case "needToApply":
        needToApplyApps.push(application);
        break;
      case "applied":
        appliedApps.push(application);
        break;
      case "interviewing":
        interviewingApps.push(application);
        break;
      case "offer":
        offerApps.push(application);
        break;
      case "closed":
        closedApps.push(application);
        break;
    }
  }

  return {
    needToApply: needToApplyApps,
    applied: appliedApps,
    interviewing: interviewingApps,
    offer: offerApps,
    closed: closedApps,
  };
}

export async function createApplication({
  position,
  company,
  postingURL,
  dateApplied,
  dateInterviewing,
  dateOffered,
  dateClosed,
  status,
  notes,
  contacts,
}: CreateApplicationType): Promise<{ id: number }> {
  const DB = await applicationDB();

  const application = new Promise((resolve, reject) => {
    const data = DB.add({
      position,
      company,
      postingURL,
      status,
      notes,
      contacts,
      dateCreated: dayjs().toISOString(),
      dateModified: dayjs().toISOString(),
      dateApplied,
      dateInterviewing,
      dateOffered,
      dateClosed,
    });

    data.onerror = (event) =>
      reject(Error(`Unable to create application: ${event}`));
    data.onsuccess = () => resolve(data.result);
  });

  const applicationId = (await application) as number;

  return { id: applicationId };
}

export async function updateApplication({
  id,
  position,
  company,
  postingURL,
  dateApplied,
  dateInterviewing,
  dateOffered,
  dateClosed,
  status,
}: UpdateApplicationType) {
  const DB = await applicationDB();

  const updatePromise = new Promise((resolve, reject) => {
    const storedData = DB.get(id);
    storedData.onerror = (event) =>
      reject(Error(`Unable to fetch application with ID ${id}: ${event}`));
    storedData.onsuccess = () => {
      const mergedData = {
        id,
        position: position ?? storedData.result.position,
        company: company ?? storedData.result.company,
        postingURL: postingURL ?? storedData.result.postingURL,
        dateCreated: storedData.result.dateCreated,
        dateModified: dayjs().toISOString(),
        dateApplied: dateApplied ?? storedData.result.dateApplied,
        dateInterviewing:
          dateInterviewing ?? storedData.result.dateInterviewing,
        dateOffered: dateOffered ?? storedData.result.dateOffered,
        dateClosed: dateClosed ?? storedData.result.dateClosed,
        status: status ?? storedData.result.status,
      };

      const updateRequest = DB.put(mergedData);
      updateRequest.onerror = (event) =>
        reject(Error(`Unable to update application with ID ${id}: ${event}`));
      updateRequest.onsuccess = () => resolve(null);
    };
  });

  await updatePromise;

  return;
}

export async function deleteApplication({ id }: { id: number }) {
  const DB = await applicationDB();

  const application = new Promise((resolve, reject) => {
    const deletion = DB.delete(id);

    deletion.onerror = () =>
      reject(Error(`Unable to delete application with ID ${id}`));
    deletion.onsuccess = () => resolve(deletion.result);
  });

  return application;
}

export async function getApplicationMetrics(
  timeline: TimelineType,
): Promise<GetApplicationMetricsReturnType> {
  const applicationData = await getAllApplications("dateCreated");
  const { needToApply, applied, interviewing, offer, closed } = applicationData;

  const needToApplyApps = calculateApplicationsInDateRange({
    applications: needToApply,
    dateType: "dateCreated",
    labels: generateMetricLabels(timeline),
    timeline,
  });

  const appliedApps = calculateApplicationsInDateRange({
    applications: applied,
    dateType: "dateApplied",
    labels: generateMetricLabels(timeline),
    timeline,
  });

  const interviewingApps = calculateApplicationsInDateRange({
    applications: interviewing,
    dateType: "dateInterviewing",
    labels: generateMetricLabels(timeline),
    timeline,
  });

  const offerApps = calculateApplicationsInDateRange({
    applications: offer,
    dateType: "dateOffered",
    labels: generateMetricLabels(timeline),
    timeline,
  });

  const closedApps = calculateApplicationsInDateRange({
    applications: closed,
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

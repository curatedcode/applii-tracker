import {
  ApplicationType,
  CreateApplicationType,
  FullApplicationType,
  GetAllApplicationsReturnType,
  GetApplicationMetricsReturnType,
  ImportExportDataType,
  SettingsNameType,
  SettingsType,
  TimelineType,
  UpdateApplicationType,
  promiseSeries,
} from "./customVariables";
import dayjs from "dayjs";
import generateMetricLabels from "../components/Fn/generateMetricLabels";
import calculateApplicationsInDateRange from "../components/Fn/calculateApplicationsInDateRange";
import calculateSimpleApplicationStats from "../components/Fn/calculateSimpleApplicationStats";

export async function applicationDB(): Promise<{
  applications: IDBObjectStore;
  settings: IDBObjectStore;
}> {
  const objectStorePromise = new Promise<{
    applicationStore: IDBObjectStore;
    settingStore: IDBObjectStore;
  }>((resolve, reject) => {
    const indexedDB = window.indexedDB;
    const DBrequest = indexedDB.open("appliiDatabase", 1);

    DBrequest.onerror = (event) =>
      reject(Error(`Unable to open database: ${event}`));

    DBrequest.onupgradeneeded = () => {
      const DB = DBrequest.result;
      const applicationStore = DB.createObjectStore("applications", {
        keyPath: "id",
        autoIncrement: true,
      });
      const settingStore = DB.createObjectStore("settings", {
        keyPath: "name",
      });
      applicationStore.createIndex("id", "id", { unique: true });
      settingStore.createIndex("name", "name", { unique: true });
    };

    DBrequest.onsuccess = () => {
      const DB = DBrequest.result;
      const applicationStore = DB.transaction(
        "applications",
        "readwrite",
      ).objectStore("applications");
      const settingStore = DB.transaction("settings", "readwrite").objectStore(
        "settings",
      );

      resolve({ applicationStore, settingStore });
    };
  });

  const result = await objectStorePromise;
  return {
    applications: result.applicationStore,
    settings: result.settingStore,
  };
}

export async function getApplication({
  id,
}: {
  id: number;
}): Promise<FullApplicationType> {
  const DB = (await applicationDB()).applications;

  const application = new Promise<FullApplicationType>((resolve, reject) => {
    const data = DB.get(id);

    data.onerror = (event) =>
      reject(Error(`Unable to fetch application with ID ${id}: ${event}`));
    data.onsuccess = () => resolve(data.result);
  });

  return application;
}

export async function getAllApplications(
  sortBy: "dateModified" | "dateCreated",
): Promise<GetAllApplicationsReturnType> {
  const DB = (await applicationDB()).applications;

  const applicationsPromise = new Promise<ApplicationType[]>(
    (resolve, reject) => {
      const data = DB.getAll();

      data.onerror = (event) =>
        reject(Error(`Unable to fetch applications: ${event}`));
      data.onsuccess = () => resolve(data.result);
    },
  );

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
  const DB = (await applicationDB()).applications;

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
  const DB = (await applicationDB()).applications;

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
  const DB = (await applicationDB()).applications;

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

export async function createSetting({
  name,
  value,
}: SettingsType): Promise<void> {
  const DB = (await applicationDB()).settings;

  const setting = await new Promise<void>((resolve, reject) => {
    const data = DB.add({ name, value });

    data.onerror = () => reject("Unable to add setting");
    data.onsuccess = () => resolve();
  });

  return setting;
}

export async function getAllSettings(): Promise<SettingsType[]> {
  const DB = (await applicationDB()).settings;

  const setting = await new Promise<SettingsType[]>((resolve, reject) => {
    const data = DB.getAll();

    data.onerror = () => reject("Unable to fetch all setting");
    data.onsuccess = () => resolve(data.result);
  });

  return setting;
}

export async function getSetting({
  name,
}: {
  name: SettingsNameType;
}): Promise<SettingsType> {
  const DB = (await applicationDB()).settings;

  const setting = await new Promise<SettingsType>((resolve, reject) => {
    const data = DB.get(name);

    data.onerror = () => reject("Unable to fetch setting");
    data.onsuccess = () => resolve(data.result);
  });

  return setting;
}

export async function updateSetting({
  name,
  value,
}: SettingsType): Promise<void> {
  const DB = (await applicationDB()).settings;

  const setting = await new Promise<void>((resolve, reject) => {
    const data = DB.put({ name, value });

    data.onerror = () => reject("Unable to update setting");
    data.onsuccess = () => resolve();
  });

  return setting;
}

export async function deleteSetting({ name }: { name: string }): Promise<void> {
  const DB = (await applicationDB()).settings;

  const setting = await new Promise<void>((resolve, reject) => {
    const data = DB.delete(name);

    data.onerror = () => reject("Unable to delete setting");
    data.onsuccess = () => resolve(data.result);
  });

  return setting;
}

export async function getAllData(): Promise<{
  applications: FullApplicationType[];
  settings: SettingsType[];
}> {
  const DB = await applicationDB();

  // Ugly but only way to ensure that indexedDB transactions don't fire in parallel
  const data = new Promise<{
    applications: FullApplicationType[];
    settings: SettingsType[];
  }>((resolve, reject) => {
    const applications = DB.applications.getAll();
    applications.onerror = () => reject("Unable to fetch applications data");
    applications.onsuccess = () => {
      getAllSettings().then((settings) => {
        resolve({ applications: applications.result, settings });
      });
    };
  });

  return data;
}

export async function importData(data: ImportExportDataType): Promise<void> {
  const { applications, settings } = data;

  const DB = await applicationDB();

  const deleteApplications = new Promise<void>((resolve, reject) => {
    const deleteOperation = DB.applications.clear();

    deleteOperation.onerror = (e) =>
      reject(`Error clearing applications store: ${e}`);
    deleteOperation.onsuccess = () => resolve();
  });

  const deleteSettings = new Promise<void>((resolve, reject) => {
    const deleteOperation = DB.settings.clear();

    deleteOperation.onerror = (e) =>
      reject(`Error clearing applications store: ${e}`);
    deleteOperation.onsuccess = () => resolve();
  });

  async function createApplication(
    application: FullApplicationType,
    DB: IDBObjectStore,
  ) {
    await new Promise((resolve, reject) => {
      const data = DB.add(application);

      data.onerror = (event) =>
        reject(Error(`Unable to create application: ${event}`));
      data.onsuccess = () => resolve(data.result);
    });
  }

  await promiseSeries([deleteApplications, deleteSettings]);

  const uploadApplication = applications.map((val) => importApplication(val));
  const uploadSettings = settings.map((val) => createSetting(val));

  await promiseSeries(uploadApplication);
  await promiseSeries(uploadSettings);
}

export async function importApplication(application: FullApplicationType) {
  const DB = (await applicationDB()).applications;

  await new Promise((resolve, reject) => {
    const data = DB.add(application);

    data.onerror = (event) =>
      reject(Error(`Unable to create application: ${event}`));
    data.onsuccess = () => resolve(data.result);
  });
}

export async function exportData() {
  const DB = await applicationDB();

  const settingsPromise = new Promise<SettingsType[]>((resolve, reject) => {
    const data = DB.settings.getAll();

    data.onerror = (event) =>
      reject(Error(`Unable to fetch settings: ${event}`));
    data.onsuccess = () => resolve(data.result);
  });

  const applicationsPromise = new Promise<ApplicationType[]>(
    (resolve, reject) => {
      const data = DB.applications.getAll();

      data.onerror = (event) =>
        reject(Error(`Unable to fetch applications: ${event}`));
      data.onsuccess = () => resolve(data.result);
    },
  );

  const result = await settingsPromise.then(async (settings) => {
    const applications = await applicationsPromise;

    return { settings, applications };
  });

  return result;
}

import {
  ApplicationType,
  CardApplicationType,
  CreateApplicationType,
  UpdateApplicationType,
} from "./customVariables";

async function applicationDB(): Promise<IDBObjectStore> {
  const indexedDB = window.indexedDB;
  const objectStorePromise = new Promise((resolve, reject) => {
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
}): Promise<ApplicationType> {
  const DB = await applicationDB();

  const application = new Promise((resolve, reject) => {
    const data = DB.get(id);

    data.onerror = (event) =>
      reject(Error(`Unable to fetch application with ID ${id}: ${event}`));
    data.onsuccess = () => resolve(data.result);
  }) as Promise<ApplicationType>;

  return application;
}

export type GetAllApplicationsReturnType = {
  needToApply: CardApplicationType[];
  applied: CardApplicationType[];
  interviewing: CardApplicationType[];
  offer: CardApplicationType[];
  closed: CardApplicationType[];
};

export async function getAllApplications(): Promise<GetAllApplicationsReturnType> {
  const DB = await applicationDB();

  const applicationsPromise = new Promise((resolve, reject) => {
    const data = DB.getAll();

    data.onerror = (event) =>
      reject(Error(`Unable to fetch applications: ${event}`));
    data.onsuccess = () => resolve(data.result);
  }) as Promise<ApplicationType[]>;

  const applications: CardApplicationType[] = (await applicationsPromise).map(
    (application) => {
      const { id, position, company, postingURL, status, dateModified } =
        application;
      return {
        id,
        position,
        company,
        postingURL,
        status,
        dateModified,
      };
    }
  );

  const needToApplyApps: CardApplicationType[] = [];
  const appliedApps: CardApplicationType[] = [];
  const interviewingApps: CardApplicationType[] = [];
  const offerApps: CardApplicationType[] = [];
  const closedApps: CardApplicationType[] = [];

  for (const application of applications) {
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
  dateCreated,
  dateModified,
  dateApplied,
  dateInterviewed,
  dateOffered,
  dateClosed,
  status,
}: CreateApplicationType) {
  const DB = await applicationDB();

  const application = new Promise((resolve, reject) => {
    const data = DB.add({
      position,
      company,
      postingURL,
      status,
      dateCreated,
      dateModified,
      dateApplied,
      dateInterviewed,
      dateOffered,
      dateClosed,
    });

    data.onerror = (event) =>
      reject(Error(`Unable to create application: ${event}`));
    data.onsuccess = () => resolve(data.result);
  });

  return application;
}

export async function updateApplication({
  id,
  position,
  company,
  postingURL,
  dateCreated,
  dateModified,
  dateApplied,
  dateInterviewed,
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
        dateCreated: dateCreated ?? storedData.result.dateCreated,
        dateModified: dateModified ?? storedData.result.dateModified,
        dateApplied: dateApplied ?? storedData.result.dateApplied,
        dateInterviewed: dateInterviewed ?? storedData.result.dateInterviewed,
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

  return updatePromise;
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

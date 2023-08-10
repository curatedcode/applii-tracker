import {
  ApplicationType,
  CreateApplicationType,
  UpdateApplicationType,
} from "./types";

const indexedDB =
  window.indexedDB ||
  /* @ts-ignore */
  window.mozIndexedDB ||
  /* @ts-ignore */
  window.webkitIndexedDB ||
  /* @ts-ignore */
  window.msIndexedDB ||
  /* @ts-ignore */
  window.shimIndexedDB;

if (!indexedDB) {
  console.log("IndexedDB not available in this browser.");
}

async function applicationDB(): Promise<IDBObjectStore> {
  const objectStorePromise = new Promise((resolve, reject) => {
    const DBrequest = indexedDB.open("appliiDatabase", 1);

    DBrequest.onerror = () => reject(Error("Unable to open database"));

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
      const transaction = DB.transaction(["applications"]);
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

    data.onerror = () => reject(Error("Unable to fetch data"));
    data.onsuccess = () => resolve(data.result);
  }) as Promise<ApplicationType>;

  return application;
}

export async function getAllApplications({
  id,
}: {
  id: number;
}): Promise<ApplicationType[]> {
  const DB = await applicationDB();

  const application = new Promise((resolve, reject) => {
    const data = DB.getAll();

    data.onerror = () => reject(Error("Unable to fetch data"));
    data.onsuccess = () => resolve(data.result);
  }) as Promise<ApplicationType[]>;

  return application;
}

export async function createApplication({
  position,
  company,
  postingURL,
  dateCreated,
  dateModified,
  dateApplied,
  dateInterviewed,
  dateClosed,
}: CreateApplicationType) {
  const DB = await applicationDB();

  const application = new Promise((resolve, reject) => {
    const data = DB.add({
      position,
      company,
      postingURL,
      dateCreated,
      dateModified,
      dateApplied,
      dateInterviewed,
      dateClosed,
    });

    data.onerror = () => reject(Error("Unable to create application"));
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
  dateClosed,
}: UpdateApplicationType) {
  const DB = await applicationDB();

  return new Promise(async (resolve, reject) => {
    const application = DB.get(id);

    const applicationPromise = (application.onsuccess = () => {
      const applicationResult = application.result;

      const updateApplication = new Promise((resolve, reject) => {
        const mergedData = {
          id,
          position: position ?? applicationResult.position,
          company: company ?? applicationResult.company,
          postingURL: postingURL ?? applicationResult.postingURL,
          dateCreated: dateCreated ?? applicationResult.dateCreated,
          dateModified: dateModified ?? applicationResult.dateModified,
          dateApplied: dateApplied ?? applicationResult.dateApplied,
          dateInterviewed: dateInterviewed ?? applicationResult.dateInterviewed,
          dateClosed: dateClosed ?? applicationResult.dateClosed,
        };

        const updateRequest = DB.put(mergedData);
        updateRequest.onerror = () =>
          reject(Error("Unable to update application data"));
        updateRequest.onsuccess = () => resolve(updateRequest.result);
      });

      return updateApplication;
    });

    const data = await applicationPromise();
    resolve(data);
  });
}

export async function deleteApplication({ id }: { id: string }) {
  const DB = await applicationDB();

  const application = new Promise((resolve, reject) => {
    const deletion = DB.delete(id);

    deletion.onerror = () => reject(Error("Unable to delete application"));
    deletion.onsuccess = () => resolve(deletion.result);
  });

  return application;
}

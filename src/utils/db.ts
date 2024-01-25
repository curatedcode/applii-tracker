import dayjs from "dayjs";
import { z } from "zod";
import groupApplicationsByStatus from "../components/Fn/groupApplicationsByStatus";
import sortApplicationsByDate from "../components/Fn/sortApplicationsByDate";
import {
	CreateApplicationType,
	FormatApplicationsType,
	FullApplicationType,
	GroupedApplicationsType,
	UpdateApplicationType,
	zodFullApplication,
	zodFullApplicationArray,
} from "../types/applications";
import {
	AllData,
	ImportExportDataType,
	SettingType,
	SettingsArrayType,
	SettingsNameType,
	SettingsType,
} from "../types/db";
import { SortByValueType, promiseSeries } from "../types/global";

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

		DBrequest.onerror = (error) =>
			reject(Error(`Unable to open database. Error: ${error}`));

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

	const rawApplicationData = await new Promise((resolve, reject) => {
		const data = DB.get(id);

		data.onerror = (error) =>
			reject(
				Error(`Unable to fetch application with ID ${id}. Error: ${error}`),
			);
		data.onsuccess = () => resolve(data.result);
	});

	const parsedApplicationData =
		zodFullApplication.safeParse(rawApplicationData);

	if (!parsedApplicationData.success) {
		throw new Error(
			`Application data received from database is incorrect type. Error: ${parsedApplicationData.error}`,
		);
	}

	return parsedApplicationData.data;
}

async function getAllApplications(
	_sortBy: SortByValueType,
): Promise<FullApplicationType[]>;

async function getAllApplications(
	_sortBy: SortByValueType,
	_format: FormatApplicationsType,
): Promise<GroupedApplicationsType>;

async function getAllApplications(sortBy: SortByValueType, format?: "grouped") {
	const DB = (await applicationDB()).applications;

	const rawApplicationsData = await new Promise((resolve, reject) => {
		const data = DB.getAll();

		data.onerror = (error) =>
			reject(
				Error(`Unable to fetch applications from database. Error: ${error}`),
			);
		data.onsuccess = () => resolve(data.result);
	});

	const parsedApplicationsData =
		zodFullApplicationArray.safeParse(rawApplicationsData);

	if (!parsedApplicationsData.success) {
		throw new Error(
			`Application data received from database is incorrect type. Error: ${parsedApplicationsData.error}`,
		);
	}

	if (format === "grouped") {
		const applicationsSorted = sortApplicationsByDate({
			applications: parsedApplicationsData.data,
			sortBy,
		});

		const grouped = groupApplicationsByStatus(applicationsSorted);

		return grouped;
	}

	return parsedApplicationsData.data;
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

	const applicationCreation = await new Promise((resolve, reject) => {
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
			reject(Error(`Unable to add application to database. Error: ${event}`));
		data.onsuccess = () => resolve(data.result);
	});

	const parsedApplicationCreation = z.number().safeParse(applicationCreation);

	if (!parsedApplicationCreation.success) {
		throw new Error(
			`Unable to return an ID after creating the application. Error: ${parsedApplicationCreation.error}`,
		);
	}

	return { id: parsedApplicationCreation.data };
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
	contacts,
	notes,
}: UpdateApplicationType) {
	const DB = (await applicationDB()).applications;

	await new Promise((resolve, reject) => {
		const rawStoredData = DB.get(id);

		rawStoredData.onerror = (error) =>
			reject(
				Error(`Unable to fetch application with ID ${id}. Error: ${error}`),
			);

		rawStoredData.onsuccess = () => {
			const parsedStoredData = zodFullApplication.safeParse(
				rawStoredData.result,
			);

			if (!parsedStoredData.success) {
				reject(
					Error(
						`Application data received from database is incorrect type. Error: ${parsedStoredData.error}`,
					),
				);
				return;
			}

			const storedData = parsedStoredData.data;
			const mergedData = {
				id,
				position: position ?? storedData.position,
				company: company ?? storedData.company,
				postingURL: postingURL ?? storedData.postingURL,
				dateCreated: storedData.dateCreated,
				dateModified: dayjs().toISOString(),
				dateApplied: dateApplied ?? storedData.dateApplied,
				dateInterviewing: dateInterviewing ?? storedData.dateInterviewing,
				dateOffered: dateOffered ?? storedData.dateOffered,
				dateClosed: dateClosed ?? storedData.dateClosed,
				status: status ?? storedData.status,
				contacts: contacts ?? storedData.contacts,
				notes: notes ?? storedData.notes,
			};

			const updateRequest = DB.put(mergedData);
			updateRequest.onerror = (error) =>
				reject(
					Error(`Unable to update application with ID ${id}. Error: ${error}`),
				);
			updateRequest.onsuccess = () => resolve(null);
		};
	});
}

export async function deleteApplication({ id }: { id: number }) {
	const DB = (await applicationDB()).applications;

	await new Promise((resolve, reject) => {
		const deletion = DB.delete(id);

		deletion.onerror = (error) =>
			reject(
				Error(`Unable to delete application with ID ${id}. Error: ${error}`),
			);
		deletion.onsuccess = () => resolve(deletion.result);
	});
}

export async function createSetting({ name, value }: SettingsType) {
	const DB = (await applicationDB()).settings;

	await new Promise((resolve, reject) => {
		const data = DB.add({ name, value });

		data.onerror = (error) =>
			reject(`Unable to add setting to database. Error: ${error}`);
		data.onsuccess = () => resolve(null);
	});
}

export async function getAllSettings(): Promise<SettingsType[]> {
	const DB = (await applicationDB()).settings;

	const rawSettingsData = await new Promise((resolve, reject) => {
		const data = DB.getAll();

		data.onerror = (error) =>
			reject(`Unable to fetch all settings from database. Error: ${error}`);
		data.onsuccess = () => resolve(data.result);
	});

	const parsedSettingsData = SettingsArrayType.safeParse(rawSettingsData);

	if (!parsedSettingsData.success) {
		throw new Error(
			`Settings data received from database is incorrect type. Error: ${parsedSettingsData.error}`,
		);
	}

	return parsedSettingsData.data;
}

export async function getSetting({
	name,
}: {
	name: SettingsNameType;
}): Promise<SettingsType | undefined> {
	const DB = (await applicationDB()).settings;

	const rawSettingData = await new Promise((resolve, reject) => {
		const data = DB.get(name);

		data.onerror = (error) =>
			reject(`Unable to fetch setting with name: ${name}. Error: ${error}`);
		data.onsuccess = () => resolve(data.result);
	});

	if (typeof rawSettingData === "undefined") {
		return undefined;
	}

	const parsedSettingData = SettingType.safeParse(rawSettingData);

	if (!parsedSettingData.success) {
		throw new Error(
			`Data received from database is incorrect type. Error: ${parsedSettingData.error}`,
		);
	}

	return parsedSettingData.data;
}

export async function updateSetting({ name, value }: SettingsType) {
	const DB = (await applicationDB()).settings;

	await new Promise((resolve, reject) => {
		const data = DB.put({ name, value });

		data.onerror = (error) =>
			reject(`Unable to update setting with name: ${name}. Error: ${error}`);
		data.onsuccess = () => resolve(null);
	});
}

export async function deleteSetting({ name }: { name: string }): Promise<void> {
	const DB = (await applicationDB()).settings;

	await new Promise<void>((resolve, reject) => {
		const data = DB.delete(name);

		data.onerror = (error) =>
			reject(`Unable to delete setting with name: ${name}. Error: ${error}`);
		data.onsuccess = () => resolve(data.result);
	});
}

export async function getAllData(): Promise<{
	applications: FullApplicationType[];
	settings: SettingsType[];
}> {
	const rawData = await new Promise((resolve) => {
		getAllApplications("dateCreated").then((applications) =>
			getAllSettings().then((settings) => {
				resolve({ applications, settings });
			}),
		);
	});

	const parsedData = AllData.safeParse(rawData);

	if (!parsedData.success) {
		throw new Error(
			`Data received from database is incorrect type. Error: ${parsedData.error}`,
		);
	}

	return parsedData.data;
}

export async function importData(data: ImportExportDataType): Promise<void> {
	const { applications, settings } = data;

	const DB = await applicationDB();

	const deleteApplications = new Promise((resolve, reject) => {
		const deleteOperation = DB.applications.clear();

		deleteOperation.onerror = (error) =>
			reject(`Error clearing applications store. Error: ${error}`);
		deleteOperation.onsuccess = () => resolve(null);
	});

	const deleteSettings = new Promise((resolve, reject) => {
		const deleteOperation = DB.settings.clear();

		deleteOperation.onerror = (error) =>
			reject(`Error clearing settings store. Error: ${error}`);
		deleteOperation.onsuccess = () => resolve(null);
	});

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

		data.onerror = (error) =>
			reject(Error(`Unable to create application. Error: ${error}`));
		data.onsuccess = () => resolve(data.result);
	});
}

export async function exportData(): Promise<{
	settings: SettingsType[];
	applications: FullApplicationType[];
}> {
	const settings = await getAllSettings();
	const applications = await getAllApplications("dateCreated");

	return {
		applications,
		settings,
	};
}

export { getAllApplications };

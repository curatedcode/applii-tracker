import {
	type ApplicationDBStore,
	type CompanyDBStore,
	type ContactDBStore,
	type IDBInsertPutResult,
	type IDBStoreNames,
	type SettingDBStore,
	zApplication,
	type zApplicationBase,
	zCompany,
	zContact,
	type zSetting,
} from "@/src/types/db";
import { z } from "zod";

async function openIndexedDB() {
	return await new Promise<IDBDatabase>((resolve, reject) => {
		const indexedDB = window.indexedDB;
		const DBrequest = indexedDB.open("appliiDatabase", 1);

		DBrequest.onerror = (error) =>
			reject(Error(`Unable to open database. Error: ${error}`));

		DBrequest.onupgradeneeded = () => {
			const DB = DBrequest.result;

			const companyStore = DB.createObjectStore("company", {
				keyPath: "id",
				autoIncrement: true,
			});

			const contactStore = DB.createObjectStore("contact", {
				keyPath: "id",
				autoIncrement: true,
			});

			const applicationStore = DB.createObjectStore("application", {
				keyPath: "id",
				autoIncrement: true,
			});

			const settingStore = DB.createObjectStore("setting", {
				keyPath: "name",
			});

			companyStore.createIndex("id", "id", { unique: true });
			contactStore.createIndex("id", "id", { unique: true });
			applicationStore.createIndex("id", "id", { unique: true });
			settingStore.createIndex("name", "name", { unique: true });
		};

		DBrequest.onsuccess = () => {
			resolve(DBrequest.result);
		};
	});
}

type IDBStoreMap = {
	company: CompanyDBStore;
	contact: ContactDBStore;
	application: ApplicationDBStore;
	setting: SettingDBStore;
};

export async function runTransaction<T extends IDBStoreNames[], R>(
	storeNames: T,
	mode: "readonly" | "readwrite",
	callback: (
		stores: { [K in T[number]]: IDBStoreMap[K] },
		transaction: IDBTransaction,
	) => Promise<R>,
): Promise<R> {
	const db = await openIndexedDB();
	const transaction = db.transaction(storeNames, mode);

	const stores: Partial<IDBStoreMap> = {};

	for (const storeName of storeNames) {
		switch (storeName) {
			case "company":
				stores.company = transaction.objectStore("company") as CompanyDBStore;
				break;
			case "contact":
				stores.contact = transaction.objectStore("contact") as ContactDBStore;
				break;
			case "application":
				stores.application = transaction.objectStore(
					"application",
				) as ApplicationDBStore;
				break;
			case "setting":
				stores.setting = transaction.objectStore("setting") as SettingDBStore;
				break;
		}
	}

	const typedStores = stores as { [K in T[number]]: IDBStoreMap[K] };

	const result = await callback(typedStores, transaction);

	await new Promise<void>((resolve, reject) => {
		transaction.oncomplete = () => {
			resolve();
		};
		transaction.onerror = (event) => {
			console.error("Transaction error:", (event.target as IDBRequest).error);
			reject(transaction.error);
		};
		transaction.onabort = (event) => {
			console.error("Transaction aborted:", (event.target as IDBRequest).error);
			reject(transaction.error);
		};
	});

	return result;
}

export function promisifyIDBRequest<T>(req: IDBRequest<T>): Promise<T> {
	return new Promise<T>((res, rej) => {
		req.onsuccess = () => res(req.result);
		req.onerror = () => rej(req.error);
	});
}

type GetCompanyReturn<T extends number | number[]> = T extends number[]
	? zCompany["GET"][]
	: zCompany["GET"];

const company = {
	schema: zCompany,
	/**
	 * Get company by id. can pass in a single one or an array.
	 */
	get: async <T extends number | number[]>({
		id,
	}: {
		id: T;
	}): Promise<GetCompanyReturn<T>> => {
		const idsAsArray = Array.isArray(id) ? id : [id];

		const result = await runTransaction(
			["company", "contact"],
			"readonly",
			async (db) => {
				const promises = idsAsArray.map(async (id) => {
					const companyData = await promisifyIDBRequest(db.company.get(id));

					const contactsPromise = companyData.contactIds.map((id) =>
						promisifyIDBRequest(db.contact.get(id)),
					);
					const contactData = await Promise.all(contactsPromise);

					return {
						...companyData,
						contacts: contactData,
					};
				});

				return Promise.all(promises);
			},
		);

		return (Array.isArray(id) ? result : result[0]) as GetCompanyReturn<T>;
	},

	/**
	 * Get company by id. can pass in a single one or an array.
	 */
	getAll: async () => {
		return runTransaction(["company", "contact"], "readonly", async (db) => {
			const data = await promisifyIDBRequest(db.company.getAll());

			const dataWithContacts = data.map(async (company) => {
				if (!company.contactIds) return company;

				const contactsPromise = company.contactIds.map((id) =>
					promisifyIDBRequest(db.contact.get(id)),
				);
				const contactData = await Promise.all(contactsPromise);

				return {
					...company,
					contacts: contactData,
				};
			});

			return Promise.all(dataWithContacts);
		});
	},

	/**
	 * Insert company, can pass in a single one or an array.
	 */
	insert: async <T extends zCompany["INSERT"] | zCompany["INSERT"][]>({
		data,
	}: { data: T }): IDBInsertPutResult<T, zCompany["INSERT"]> => {
		const dataAsArray: zCompany["INSERT"][] = Array.isArray(data)
			? data
			: [data];

		return runTransaction(["company", "contact"], "readwrite", async (db) => {
			const promises = dataAsArray.map(async (companyData) => {
				const companyId = await promisifyIDBRequest(
					db.company.add({
						...companyData,
						contactIds: [],
					}),
				);

				if (typeof companyId !== "number")
					throw new Error("Id returned from company insert is not a number");

				const contactPromises = companyData.contacts.map(async (contact) => {
					let id: number;

					if ("id" in contact) {
						await promisifyIDBRequest(
							db.contact.put(contact as zContact["PUT"]),
						);
						id = contact.id as number;
					} else {
						const insertedId = await promisifyIDBRequest(
							db.contact.add({
								...contact,
								companyId,
							}),
						);

						if (typeof insertedId !== "number")
							throw new Error(
								"Id returned from contact insert is not a number",
							);

						id = insertedId;
					}
					return id;
				});

				const contactIds = await Promise.all(contactPromises);

				await promisifyIDBRequest(
					db.company.put({
						...companyData,
						id: companyId,
						contactIds,
					}),
				);

				return companyId;
			});

			return (
				Array.isArray(data) ? Promise.all(promises) : promises[0]
			) as IDBInsertPutResult<T, zCompany["INSERT"]>;
		});
	},

	/**
	 * Update a company. Pass in an array to update multiple.
	 */
	put: async ({
		data,
	}: {
		data: zCompany["PUT"] | zCompany["PUT"][];
	}): Promise<void> => {
		const dataAsArray: zCompany["PUT"][] = Array.isArray(data) ? data : [data];

		return runTransaction(["company", "contact"], "readwrite", async (db) => {
			const promises = dataAsArray.map(async (companyData) => {
				const contactPromises = companyData.contacts.map(async (contact) => {
					let id: number;

					if ("id" in contact) {
						await promisifyIDBRequest(
							db.contact.put(contact as zContact["PUT"]),
						);
						id = contact.id as number;
					} else {
						const insertedId = await promisifyIDBRequest(
							db.contact.add({
								...contact,
								companyId: companyData.id,
							}),
						);

						if (typeof insertedId !== "number")
							throw new Error(
								"Id returned from contact insert is not a number",
							);

						id = insertedId;
					}
					return id;
				});

				const contactIds = await Promise.all(contactPromises);

				return promisifyIDBRequest(
					db.company.put({
						...companyData,
						contactIds,
					}),
				);
			});

			await Promise.all(promises);
		});
	},

	/**
	 * Delete a company. Pass in an array to delete multiple.
	 */
	delete: async ({ id }: { id: number | number[] }) => {
		const idsAsArray: number[] = Array.isArray(id) ? id : [id];

		return runTransaction(["company"], "readwrite", async (db) => {
			const promises = idsAsArray.map((id) =>
				promisifyIDBRequest(db.company.delete(id)),
			);

			await Promise.all(promises);
		});
	},
};

type GetContactReturn<T extends number | number[]> = T extends number[]
	? zContact["GET"][]
	: zContact["GET"];

const contact = {
	schema: zContact,
	/**
	 * Gets contact by id
	 */
	get: async <T extends number | number[]>({
		id,
	}: { id: T }): Promise<GetContactReturn<T>> => {
		const idsAsArray: number[] = Array.isArray(id) ? id : [id];

		return runTransaction(["contact", "company"], "readonly", async (db) => {
			const contactPromises = idsAsArray.map((id) =>
				promisifyIDBRequest(db.contact.get(id)),
			);

			const contacts = await Promise.all(contactPromises);

			const contactsWithCompanyIds = contacts.filter(
				(contact) => contact.companyId !== undefined,
			);
			const contactsWithoutCompanyIds = contacts.filter(
				(contact) => contact.companyId === undefined,
			);

			const contactCompanyPromises = contactsWithCompanyIds.map(
				async (contact) => {
					const company = await promisifyIDBRequest(
						db.company.get(contact.companyId as number),
					);

					return {
						...contact,
						company,
					};
				},
			);

			const contactsWithCompanies = await Promise.all(contactCompanyPromises);

			return contactsWithoutCompanyIds.concat(
				contactsWithCompanies,
			) as GetContactReturn<T>;
		});
	},

	/**
	 * Get all contacts
	 */
	getAll: async () => {
		return runTransaction(["contact", "company"], "readonly", async (db) => {
			const contacts = await promisifyIDBRequest(db.contact.getAll());

			const contactsWithCompanyIds = contacts.filter(
				(contact) => contact.companyId !== undefined,
			);
			const contactsWithoutCompanyIds = contacts.filter(
				(contact) => contact.companyId === undefined,
			);

			const contactCompanyPromises = contactsWithCompanyIds.map(
				async (contact) => {
					const company = await promisifyIDBRequest(
						db.company.get(contact.companyId as number),
					);

					return {
						...contact,
						company,
					};
				},
			);

			const contactsWithCompanies = await Promise.all(contactCompanyPromises);

			return contactsWithoutCompanyIds.concat(contactsWithCompanies);
		});
	},

	/**
	 * Insert contact
	 */
	insert: async <T extends zContact["INSERT"] | zContact["INSERT"][]>({
		data,
	}: { data: T }): IDBInsertPutResult<T, zContact["INSERT"]> => {
		const dataAsArray: zContact["INSERT"][] = Array.isArray(data)
			? data
			: [data];

		return runTransaction(["contact"], "readwrite", async (db) => {
			const promises = dataAsArray.map(async (contact) => {
				const id = await promisifyIDBRequest(db.contact.add(contact));

				if (typeof id !== "number")
					throw new Error("Id returned from contact update was not a number");

				return id;
			});

			return (
				Array.isArray(data) ? Promise.all(promises) : promises[0]
			) as IDBInsertPutResult<T, zContact["INSERT"]>;
		});
	},

	/**
	 * Update a contact. Pass in an array to update multiple.
	 */
	put: async ({
		data,
	}: { data: zContact["PUT"] | zContact["PUT"][] }): Promise<void> => {
		const dataAsArray: zContact["PUT"][] = Array.isArray(data) ? data : [data];

		return runTransaction(["contact"], "readwrite", async (db) => {
			const promises = dataAsArray.map(async (contact) => {
				const id = await promisifyIDBRequest(db.contact.put(contact));

				if (typeof id !== "number")
					throw new Error("Id returned from contact update was not a number");

				return id;
			});

			await Promise.all(promises);
		});
	},

	/**
	 * Delete a contact. Pass in an array to delete multiple.
	 */
	delete: async ({ id }: { id: number | number[] }) => {
		const idsToDelete: number[] = Array.isArray(id) ? id : [id];

		return runTransaction(["contact"], "readwrite", async (db) => {
			const promises = idsToDelete.map((id) =>
				promisifyIDBRequest(db.contact.delete(id)),
			);

			await Promise.all(promises);
		});
	},
};

type GetApplicationReturn<T extends number | number[]> = T extends number[]
	? zApplication["GET"][]
	: zApplication["GET"];

const application = {
	schema: zApplication,
	/**
	 * Gets application by id
	 */
	get: async <T extends number | number[]>({
		id,
	}: {
		id: T;
	}): Promise<GetApplicationReturn<T>> => {
		const result = await runTransaction(
			["application", "company", "contact"],
			"readonly",
			async (db) => {
				const idsAsArray: number[] = Array.isArray(id) ? id : [id];

				const appPromises = idsAsArray.map((id) =>
					promisifyIDBRequest(db.application.get(id)),
				);

				const appsData = await Promise.all(appPromises);

				const appsWithContactCompany = appsData.map(async (app) => {
					const companyData = await promisifyIDBRequest(
						db.company.get(app.companyId),
					);

					if (!app.contactIds)
						return { ...app, contacts: [], company: companyData };

					const contactPromises = app.contactIds.map((id) =>
						promisifyIDBRequest(db.contact.get(id)),
					);
					const contactData = await Promise.all(contactPromises);

					return {
						...app,
						contacts: contactData,
						company: companyData,
					};
				});

				return Promise.all(appsWithContactCompany);
			},
		);

		return (Array.isArray(id) ? result : result[0]) as GetApplicationReturn<T>;
	},

	/**
	 * Get all applications
	 */
	getAll: async (): Promise<zApplication["GET"][]> => {
		return runTransaction(
			["application", "contact", "company"],
			"readonly",
			async (db) => {
				const apps = await promisifyIDBRequest(db.application.getAll());

				const appsWithContactCompany = apps.map(
					async (app): Promise<zApplication["GET"]> => {
						const companyData = await promisifyIDBRequest(
							db.company.get(app.companyId),
						);

						if (!app.contactIds)
							return {
								...app,
								contacts: [],
								company: {
									...companyData,
									contacts: [],
								},
							};

						const contactPromises = app.contactIds.map((id) =>
							promisifyIDBRequest(db.contact.get(id)),
						);
						const contactData = await Promise.all(contactPromises);

						return {
							...app,
							contacts: contactData,
							company: {
								...companyData,
								contacts: [],
							},
						};
					},
				);

				return Promise.all(appsWithContactCompany);
			},
		);
	},

	/**
	 * Insert application
	 */
	insert: async <T extends zApplication["INSERT"] | zApplication["INSERT"][]>({
		data,
	}: { data: T }): IDBInsertPutResult<T, zApplication["INSERT"]> => {
		const dataAsArray: zApplication["INSERT"][] = Array.isArray(data)
			? data
			: [data];

		return runTransaction(
			["application", "contact", "company"],
			"readwrite",
			async (db) => {
				const promises = dataAsArray.map(async (data) => {
					const appId = await promisifyIDBRequest(
						db.application.add({
							...data,
							contactIds: [],
							companyId: 0,
						}),
					);

					if (typeof appId !== "number")
						throw new Error(
							"Id returned from application insert is not a number",
						);

					let companyId: number;

					if (!("id" in data.company)) {
						const id = await promisifyIDBRequest(
							db.company.add({ ...data.company, contactIds: [] }),
						);

						if (typeof id !== "number")
							throw new Error(
								"Id returned from company insert is not a number",
							);
						companyId = id;
					} else {
						companyId = data.company.id as number;
					}

					const contactsToInsert = data.contacts.filter((v) => !("id" in v));

					const contactsInsertedIds = await Promise.all(
						contactsToInsert.map((contact) =>
							promisifyIDBRequest(
								db.contact.add({ ...contact, applicationId: appId, companyId }),
							),
						),
					);

					const contactsToUpdate = data.contacts.filter(
						(v) => "id" in v,
					) as zContact["GET"][];

					await Promise.all(
						contactsToUpdate.map((val) =>
							promisifyIDBRequest(
								db.contact.put({ ...val, applicationId: appId, companyId }),
							),
						),
					);

					const allContactIds = contactsInsertedIds.concat(
						contactsToUpdate.map((val) => val.id),
					);

					const contactIdsParsed = z.array(z.number()).safeParse(allContactIds);
					if (!contactIdsParsed.success)
						throw new Error(
							"Ids returned from contact insert are not a number",
						);

					await promisifyIDBRequest(
						db.application.put({
							...data,
							id: appId,
							contactIds: contactIdsParsed.data,
							companyId,
						}),
					);

					await promisifyIDBRequest(
						db.company.put({
							...data.company,
							name: data.company.name,
							id: companyId,
							contactIds: contactIdsParsed.data,
						}),
					);

					return appId;
				});

				return (
					Array.isArray(data) ? Promise.all(promises) : promises[0]
				) as IDBInsertPutResult<T, zApplication["INSERT"]>;
			},
		);
	},

	/**
	 * Update a application. Pass in an array to update multiple.
	 */
	put: async ({
		data,
	}: {
		data: zApplication["PUT"] | zApplication["PUT"][];
	}): Promise<void> => {
		const dataAsArray: zApplication["PUT"][] = Array.isArray(data)
			? data
			: [data];

		return runTransaction(
			["application", "contact", "company"],
			"readwrite",
			async (db) => {
				const promises = dataAsArray.map(async (data) => {
					const storedData = await promisifyIDBRequest(
						db.application.get(data.id),
					);

					const mergedData: zApplicationBase["PUT"] = {
						id: data.id,
						position: data.position ?? storedData.position,
						postingURL: data.postingURL ?? storedData.postingURL,
						status: data.status ?? storedData.status,
						dateCreated: data.dateCreated ?? storedData.dateCreated,
						dateModified: data.dateModified ?? storedData.dateModified,
						dateApplied: data.dateApplied ?? storedData.dateApplied,
						dateInterviewing:
							data.dateInterviewing ?? storedData.dateInterviewing,
						dateOffered: data.dateOffered ?? storedData.dateOffered,
						dateClosed: data.dateClosed ?? storedData.dateClosed,
						cardColor: data.cardColor ?? storedData.cardColor,
						notes: data.notes ?? storedData.notes,
						contactIds: storedData.contactIds,
						companyId: storedData.companyId,
					};

					await promisifyIDBRequest(db.application.put(mergedData));

					let companyId: number;

					if (!("id" in data.company)) {
						const id = await promisifyIDBRequest(
							db.company.add({ ...data.company, contactIds: [] }),
						);

						if (typeof id !== "number")
							throw new Error(
								"Id returned from company insert is not a number",
							);
						companyId = id;
					} else {
						companyId = data.company.id as number;
					}

					const contactsToInsert = data.contacts.filter((v) => !("id" in v));

					const contactsInsertedIds = await Promise.all(
						contactsToInsert.map((contact) =>
							promisifyIDBRequest(
								db.contact.add({
									...contact,
									applicationId: data.id,
									companyId,
								}),
							),
						),
					);

					const contactsToUpdate = data.contacts.filter(
						(v) => "id" in v,
					) as zContact["GET"][];

					await Promise.all(
						contactsToUpdate.map((val) =>
							promisifyIDBRequest(
								db.contact.put({ ...val, applicationId: data.id, companyId }),
							),
						),
					);

					const allContactIds = contactsInsertedIds.concat(
						contactsToUpdate.map((val) => val.id),
					);

					const contactIdsParsed = z.array(z.number()).safeParse(allContactIds);
					if (!contactIdsParsed.success)
						throw new Error(
							"Ids returned from contact insert are not a number",
						);

					await promisifyIDBRequest(
						db.application.put({
							...data,
							contactIds: contactIdsParsed.data,
							companyId,
						}),
					);

					await promisifyIDBRequest(
						db.company.put({
							...data.company,
							id: companyId,
							contactIds: contactIdsParsed.data,
						}),
					);
				});

				await Promise.all(promises);
			},
		);
	},

	/**
	 * Delete a application. Pass in an array to delete multiple.
	 */
	delete: async ({ id }: { id: number | number[] }) => {
		const idsToDelete: number[] = Array.isArray(id) ? id : [id];

		return runTransaction(["application"], "readwrite", async (db) => {
			const promises = idsToDelete.map((id) =>
				promisifyIDBRequest(db.application.delete(id)),
			);

			await Promise.all(promises);
		});
	},
};

type GetSettingReturn<
	T extends zSetting["GET"]["name"] | zSetting["GET"]["name"][],
> = T extends zSetting["GET"]["name"] ? zSetting["GET"] : zSetting["GET"][];

const setting = {
	get: async <T extends zSetting["GET"]["name"] | zSetting["GET"]["name"][]>({
		name,
	}: { name: T }): Promise<GetSettingReturn<T>> => {
		const nameAsArray = Array.isArray(name) ? name : [name];

		const result = await runTransaction(["setting"], "readonly", async (db) => {
			const promises = nameAsArray.map((name) =>
				promisifyIDBRequest(db.setting.get(name)),
			);

			return Promise.all(promises);
		});

		return (Array.isArray(name) ? result : result[0]) as GetSettingReturn<T>;
	},

	getAll: async () => {
		return runTransaction(["setting"], "readonly", async (db) =>
			promisifyIDBRequest(db.setting.getAll()),
		);
	},

	insert: async <T extends zSetting["INSERT"] | zSetting["INSERT"][]>({
		data,
	}: { data: T }): IDBInsertPutResult<T, zSetting["INSERT"]> => {
		const dataAsArray = Array.isArray(data) ? data : [data];

		return runTransaction(["setting"], "readwrite", async (db) => {
			const promises = dataAsArray.map(async (data) => {
				const id = await promisifyIDBRequest(db.setting.add(data));

				if (typeof id !== "number")
					throw new Error("Id returned from setting insert is not a number");

				return id;
			});

			return (
				Array.isArray(dataAsArray) ? Promise.all(promises) : promises[0]
			) as IDBInsertPutResult<T, zSetting["INSERT"]>;
		});
	},

	put: async ({
		data,
	}: { data: zSetting["PUT"] | zSetting["PUT"][] }): Promise<void> => {
		const dataAsArray = Array.isArray(data) ? data : [data];

		await runTransaction(["setting"], "readwrite", async (db) => {
			const promises = dataAsArray.map(async (data) =>
				promisifyIDBRequest(db.setting.put(data)),
			);

			await Promise.all(promises);
		});
	},

	delete: async ({
		name,
	}: {
		name: zSetting["GET"]["name"] | zSetting["GET"]["name"][];
	}): Promise<void> => {
		const nameAsArray = Array.isArray(name) ? name : [name];

		await runTransaction(["setting"], "readwrite", async (db) => {
			const promises = nameAsArray.map((name) =>
				promisifyIDBRequest(db.setting.delete(name)),
			);

			await Promise.all(promises);
		});
	},
};

const db = {
	company,
	contact,
	application,
	setting,
} as const;

export default db;

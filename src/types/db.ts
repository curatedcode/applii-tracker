import { z } from "zod";

export interface CompanyDBStore extends IDBObjectStore {
	add(value: zCompanyBase["INSERT"]): IDBRequest<IDBValidKey>;
	delete(query: number): IDBRequest<undefined>;
	get(key: number): IDBRequest<zCompanyBase["GET"]>;
	getAll(): IDBRequest<zCompanyBase["GET"][]>;
	put(value: zCompanyBase["PUT"]): IDBRequest<IDBValidKey>;
}

export interface ContactDBStore extends IDBObjectStore {
	add(value: z.infer<(typeof zContactBase)["INSERT"]>): IDBRequest<IDBValidKey>;
	delete(query: number): IDBRequest<undefined>;
	get(key: number): IDBRequest<z.infer<(typeof zContactBase)["GET"]>>;
	getAll(): IDBRequest<z.infer<(typeof zContactBase)["GET"]>[]>;
	put(value: z.infer<(typeof zContactBase)["PUT"]>): IDBRequest<IDBValidKey>;
}

export interface ApplicationDBStore extends IDBObjectStore {
	add(
		value: z.infer<(typeof zApplicationBase)["INSERT"]>,
	): IDBRequest<IDBValidKey>;
	delete(query: number): IDBRequest<undefined>;
	get(key: number): IDBRequest<z.infer<(typeof zApplicationBase)["GET"]>>;
	getAll(): IDBRequest<z.infer<(typeof zApplicationBase)["GET"]>[]>;
	put(
		value: z.infer<(typeof zApplicationBase)["PUT"]>,
	): IDBRequest<IDBValidKey>;
}

export interface SettingDBStore extends IDBObjectStore {
	add(value: zSetting["INSERT"]): IDBRequest<IDBValidKey>;
	delete(query: zSetting["GET"]["name"]): IDBRequest<undefined>;
	get(key: zSetting["GET"]["name"]): IDBRequest<zSetting["GET"]>;
	getAll(): IDBRequest<zSetting["GET"][]>;
	put(value: zSetting["PUT"]): IDBRequest<IDBValidKey>;
}

export type IDBObjectStores = {
	company: CompanyDBStore;
	contact: ContactDBStore;
	application: ApplicationDBStore;
	setting: SettingDBStore;
};

export const IDBStoreNames = [
	"company",
	"contact",
	"application",
	"setting",
] as const;

export type IDBStoreNames = "company" | "contact" | "application" | "setting";

export type IDBInsertPutResult<T, G> = Promise<
	T extends G[] ? number[] : T extends G ? number : never
>;

export const zNote = z.object({
	body: z.string().min(1, { message: "Body can't be empty" }),
});

export type zNote = z.infer<typeof zNote>;

export const zContactBase = {
	GET: z.object({
		id: z.number(),
		name: z.string(),
		position: z.string().optional(),
		phone: z.string().optional(),
		email: z.string().optional(),
		notes: z.array(zNote).optional(),
		companyId: z.number().optional(),
		applicationId: z.number().optional(),
	}),
	INSERT: z.object({
		name: z.string().min(1, { message: "Name can't be empty" }),
		position: z.string().optional(),
		phone: z.string().optional(),
		email: z.string().optional(),
		notes: z.array(zNote).optional(),
		companyId: z.number().optional(),
		applicationId: z.number().optional(),
	}),
	PUT: z.object({
		id: z.number(),
		name: z.string(),
		position: z.string().optional(),
		phone: z.string().optional(),
		email: z.string().optional(),
		notes: z.array(zNote).optional(),
		companyId: z.number().optional(),
		applicationId: z.number().optional(),
	}),
};

export type zContactBase = {
	GET: z.infer<(typeof zContactBase)["GET"]>;
	INSERT: z.infer<(typeof zContactBase)["INSERT"]>;
	PUT: z.infer<(typeof zContactBase)["PUT"]>;
};

export const zContact = {
	GET: zContactBase.GET,
	INSERT: zContactBase.INSERT,
	PUT: zContactBase.PUT,
};

export type zContact = {
	GET: z.infer<(typeof zContact)["GET"]>;
	INSERT: z.infer<(typeof zContact)["INSERT"]>;
	PUT: z.infer<(typeof zContact)["PUT"]>;
};

export const zCompanyBase = {
	GET: z.object({
		id: z.number(),
		name: z.string(),
		website: z.string().optional(),
		address: z.string().optional(),
		industry: z.string().optional(),
		notes: z.array(zNote).optional(),
		contactIds: z.array(z.number()).optional(),
	}),
	INSERT: z.object({
		name: z.string().min(1, { message: "Name can't be empty" }),
		website: z.string().optional(),
		address: z.string().optional(),
		industry: z.string().optional(),
		notes: z.array(zNote).optional(),
		contactIds: z.array(z.number()).optional(),
	}),
	PUT: z.object({
		id: z.number(),
		name: z.string(),
		website: z.string().optional(),
		address: z.string().optional(),
		industry: z.string().optional(),
		notes: z.array(zNote).optional(),
		contactIds: z.array(z.number()).optional(),
	}),
};

export type zCompanyBase = {
	GET: z.infer<(typeof zCompanyBase)["GET"]>;
	INSERT: z.infer<(typeof zCompanyBase)["INSERT"]>;
	PUT: z.infer<(typeof zCompanyBase)["PUT"]>;
};

export const zCompany = {
	GET: zCompanyBase.GET.extend({
		contacts: z.array(zContact.GET.partial({ id: true })).optional(),
	}),
	INSERT: zCompanyBase.INSERT.extend({
		contacts: z.array(zContact.GET.partial({ id: true })).optional(),
	}),
	PUT: zCompanyBase.PUT.extend({
		contacts: z.array(zContact.GET.partial({ id: true })).optional(),
	}),
};

export type zCompany = {
	GET: z.infer<(typeof zCompany)["GET"]>;
	INSERT: z.infer<(typeof zCompany)["INSERT"]>;
	PUT: z.infer<(typeof zCompany)["PUT"]>;
};

export const zStatus = z.enum([
	"Need To Apply",
	"Applied",
	"Interviewing",
	"Offer",
	"Closed",
]);

export type zStatus = z.infer<typeof zStatus>;

export const zWageBase = z.object({
	currency: z.string().length(3),
});

export const zWageHourly = zWageBase.extend({
	type: z.literal("hourly"),
	rate: z.number(),
});

export const zWageSalary = zWageBase.extend({
	type: z.literal("salary"),
	annualSalary: z.number(),
});

export const zWageContract = zWageBase.extend({
	type: z.literal("contract"),
	totalAmount: z.number(),
	duration: z.string(),
});

export const zWage = z.discriminatedUnion("type", [
	zWageHourly,
	zWageSalary,
	zWageContract,
]);

export const zApplicationBase = {
	GET: z.object({
		id: z.number(),
		position: z.string(),
		postingURL: z.string().optional(),
		status: z.enum([
			"Need To Apply",
			"Applied",
			"Interviewing",
			"Offer",
			"Closed",
		]),
		dateCreated: z.string(),
		dateModified: z.string(),
		dateApplied: z.string().optional(),
		dateInterviewing: z.string().optional(),
		dateOffered: z.string().optional(),
		dateClosed: z.string().optional(),
		cardColor: z.string(),
		notes: z.array(zNote).optional(),
		contactIds: z.array(z.number()).optional(),
		companyId: z.number(),
		wage: zWage.optional(),
		type: z
			.enum(["full-time", "part-time", "contract", "internship", "freelance"])
			.optional(),
		applicationMethod: z
			.enum([
				"online",
				"in-person",
				"email",
				"referral",
				"job fair",
				"recruitment agency",
				"other",
			])
			.optional(),
		location: z.enum(["in-person", "remote", "hybrid"]).optional(),
		customFields: z.array(z.record(z.string(), z.string())).optional(),
	}),
	INSERT: z.object({
		position: z.string().min(1, { message: "Position can't be empty" }),
		postingURL: z.string().optional(),
		status: z.enum([
			"Need To Apply",
			"Applied",
			"Interviewing",
			"Offer",
			"Closed",
		]),
		dateCreated: z.string(),
		dateModified: z.string(),
		dateApplied: z.string().optional(),
		dateInterviewing: z.string().optional(),
		dateOffered: z.string().optional(),
		dateClosed: z.string().optional(),
		cardColor: z.string(),
		notes: z.array(zNote).optional(),
		contactIds: z.array(z.number()).optional(),
		companyId: z.number(),
		wage: zWage.optional(),
		type: z
			.enum(["full-time", "part-time", "contract", "internship", "freelance"])
			.optional(),
		applicationMethod: z
			.enum([
				"online",
				"in-person",
				"email",
				"referral",
				"job fair",
				"recruitment agency",
				"other",
			])
			.optional(),
		location: z.enum(["in-person", "remote", "hybrid"]).optional(),
		customFields: z.array(z.record(z.string(), z.string())).optional(),
	}),
	PUT: z.object({
		id: z.number(),
		position: z.string(),
		postingURL: z.string().optional(),
		status: z.enum([
			"Need To Apply",
			"Applied",
			"Interviewing",
			"Offer",
			"Closed",
		]),
		dateCreated: z.string(),
		dateModified: z.string(),
		dateApplied: z.string().optional(),
		dateInterviewing: z.string().optional(),
		dateOffered: z.string().optional(),
		dateClosed: z.string().optional(),
		cardColor: z.string(),
		notes: z.array(zNote).optional(),
		contactIds: z.array(z.number()).optional(),
		companyId: z.number(),
		wage: zWage.optional(),
		type: z
			.enum(["full-time", "part-time", "contract", "internship", "freelance"])
			.optional(),
		applicationMethod: z
			.enum([
				"online",
				"in-person",
				"email",
				"referral",
				"job fair",
				"recruitment agency",
				"other",
			])
			.optional(),
		location: z.enum(["in-person", "remote", "hybrid"]).optional(),
		customFields: z.array(z.record(z.string(), z.string())).optional(),
	}),
};

export type zApplicationBase = {
	GET: z.infer<(typeof zApplicationBase)["GET"]>;
	INSERT: z.infer<(typeof zApplicationBase)["INSERT"]>;
	PUT: z.infer<(typeof zApplicationBase)["PUT"]>;
};

export const zApplication = {
	GET: zApplicationBase.GET.extend({
		contacts: z.array(zContact.GET).optional(),
		company: zCompany.GET,
	}),
	INSERT: zApplicationBase.INSERT.omit({ companyId: true }).extend({
		contacts: z.array(zContact.GET.partial({ id: true })).optional(),
		company: zCompany.GET.partial({ id: true }),
	}),
	PUT: zApplicationBase.PUT.omit({ companyId: true }).extend({
		contacts: z.array(zContact.GET.partial({ id: true })).optional(),
		company: zCompany.GET.partial({ id: true }),
		companyId: z.number().optional(),
	}),
};

export type zApplication = {
	GET: z.infer<(typeof zApplication)["GET"]>;
	INSERT: z.infer<(typeof zApplication)["INSERT"]>;
	PUT: z.infer<(typeof zApplication)["PUT"]>;
};

/**
 * @todo make cancel buttons just bring you back to the application not to the home page
 */

export const zSettingBase = {
	GET: z.object({
		name: z.enum(["syncInterval", "theme", "lastSuccessfulSync"]),
		value: z.string(),
	}),
	INSERT: z.object({
		name: z.enum(["syncInterval", "theme", "lastSuccessfulSync"]),
		value: z.string(),
	}),
	PUT: z.object({
		name: z.enum(["syncInterval", "theme", "lastSuccessfulSync"]),
		value: z.string(),
	}),
};

export type zSettingBase = {
	GET: z.infer<(typeof zSettingBase)["GET"]>;
	INSERT: z.infer<(typeof zSettingBase)["INSERT"]>;
	PUT: z.infer<(typeof zSettingBase)["PUT"]>;
};

export const zSetting = {
	GET: zSettingBase.GET,
	INSERT: zSettingBase.INSERT,
	PUT: zSettingBase.PUT,
};

export type zSetting = {
	GET: z.infer<(typeof zSetting)["GET"]>;
	INSERT: z.infer<(typeof zSetting)["INSERT"]>;
	PUT: z.infer<(typeof zSetting)["PUT"]>;
};

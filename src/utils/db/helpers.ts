import { zApplication, zCompany, zContact, zSetting } from "@/src/types/db";
import { promisifyIDBRequest, runTransaction } from "@/src/utils/db";
import { z } from "zod";

export async function importData(data: unknown) {
	const dataParsed = z
		.object({
			application: z.array(zApplication.GET),
			company: z.array(zCompany.GET),
			contact: z.array(zContact.GET),
			setting: z.array(zSetting.GET),
		})
		.safeParse(data);

	if (!dataParsed.success) {
		throw new Error(
			`Input data is not of the correct type. ${dataParsed.error.flatten()}`,
		);
	}

	await runTransaction(["application"], "readwrite", async (db) => {
		await promisifyIDBRequest(db.application.clear());

		for (const data of dataParsed.data.application) {
			await promisifyIDBRequest(db.application.add(data));
		}
	});
	await runTransaction(["company"], "readwrite", async (db) => {
		await promisifyIDBRequest(db.company.clear());

		for (const data of dataParsed.data.company) {
			await promisifyIDBRequest(db.company.add(data));
		}
	});
	await runTransaction(["contact"], "readwrite", async (db) => {
		await promisifyIDBRequest(db.contact.clear());

		for (const data of dataParsed.data.contact) {
			await promisifyIDBRequest(db.contact.add(data));
		}
	});
	await runTransaction(["setting"], "readwrite", async (db) => {
		await promisifyIDBRequest(db.setting.clear());

		for (const data of dataParsed.data.setting) {
			await promisifyIDBRequest(db.setting.add(data));
		}
	});
}

export async function exportData() {
	const applicationData = await runTransaction(
		["application"],
		"readonly",
		async (db) => await promisifyIDBRequest(db.application.getAll()),
	);
	const companyData = await runTransaction(
		["company"],
		"readonly",
		async (db) => await promisifyIDBRequest(db.company.getAll()),
	);
	const contactData = await runTransaction(
		["contact"],
		"readonly",
		async (db) => await promisifyIDBRequest(db.contact.getAll()),
	);
	const settingData = await runTransaction(
		["setting"],
		"readonly",
		async (db) => await promisifyIDBRequest(db.setting.getAll()),
	);

	return {
		application: applicationData,
		company: companyData,
		contact: contactData,
		setting: settingData,
	};
}

/**
 * @todo have copilot generate tsdoc for all db stuff and error messages
 */

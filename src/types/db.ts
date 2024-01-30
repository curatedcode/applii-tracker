import { z } from "zod";
import { ApplicationType, application } from "./applications";

const SettingsNames = z.enum(["syncInterval", "theme", "lastSuccessfulSync"]);

export type SettingsNameType = z.infer<typeof SettingsNames>;

export const settingsKeyValue = z.object({
	name: SettingsNames,
	value: z.string(),
});

export type SettingsType = z.infer<typeof settingsKeyValue>;

export const syncSettingsSchema = z.object({
	syncInterval: z
		.string()
		.min(1, { message: "Sync interval must not be blank" })
		.optional(),
});

export const allData = z.object({
	applications: z.array(application),
	settings: z.array(settingsKeyValue),
});

export type ImportExportDataType = {
	applications: ApplicationType[];
	settings: SettingsType[];
};

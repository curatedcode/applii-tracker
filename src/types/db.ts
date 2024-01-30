import { z } from "zod";
import { ApplicationType, application } from "./applications";

const SettingsNames = z.enum(["syncInterval", "theme"]);

export type SettingsNameType = z.infer<typeof SettingsNames>;

export const SettingType = z.object({ name: SettingsNames, value: z.string() });

export type SettingsType = z.infer<typeof SettingType>;

export const SettingsArrayType = z.array(
	z.object({ name: SettingsNames, value: z.string() }),
);

export const syncSettingsSchema = z.object({
	syncInterval: z
		.string()
		.min(1, { message: "Sync interval must not be blank" })
		.optional(),
});

export const AllData = z.object({
	applications: z.array(application),
	settings: SettingsArrayType,
});

export type ImportExportDataType = {
	applications: ApplicationType[];
	settings: SettingsType[];
};

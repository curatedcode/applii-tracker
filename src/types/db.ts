import { z } from "zod";
import { FullApplicationType, zodFullApplicationArray } from "./applications";

const SettingsNames = z.enum(["syncInterval", "theme"]);

export type SettingsNameType = z.infer<typeof SettingsNames>;

export const SettingType = z.object({ name: SettingsNames, value: z.string() });

export type SettingsType = z.infer<typeof SettingType>;

export const SettingsArrayType = z.array(
  z.object({ name: SettingsNames, value: z.string() }),
);

export const syncSettingsSchema = z.object({
  syncInterval: z.string().optional(),
});

export const AllData = z.object({
  applications: zodFullApplicationArray,
  settings: SettingsArrayType,
});

export type ImportExportDataType = {
  applications: FullApplicationType[];
  settings: SettingsType[];
};

import { z } from "zod";
import {
  FullApplicationType,
  applicationStatusLabel,
  applicationStatuses,
} from "./applications";

export type SettingsNameType = "syncInterval" | "theme";

export type SettingsType = {
  name: SettingsNameType;
  value: string;
};

export const syncSettingsSchema = z.object({
  syncInterval: z.string().optional(),
});

export type ImportExportDataType = {
  applications: FullApplicationType[];
  settings: SettingsType[];
};

export const importDataFullApplicationSchema = z.object({
  position: z.string().min(1, { message: "Position can't be empty" }),
  company: z.string().min(1, { message: "Company can't be empty" }),
  postingURL: z.string().optional(),
  status: z.object({
    label: applicationStatusLabel,
    value: applicationStatuses,
  }),
  dateCreated: z.string(),
  dateModified: z.string(),
  dateApplied: z.string().optional(),
  dateInterviewing: z.string().optional(),
  dateOffered: z.string().optional(),
  dateClosed: z.string().optional(),
  contacts: z
    .array(
      z.object({
        name: z.string(),
        position: z.string().optional(),
        phone: z.string().optional(),
        email: z.string().optional(),
      }),
    )
    .optional(),
  notes: z.array(z.object({ title: z.string(), body: z.string() })).optional(),
});

export const importDataSettingsSchema = z.object({
  name: z.string(),
  value: z.string(),
});

export const importDataSchema = z.object({
  applications: z.array(importDataFullApplicationSchema).optional(),
  settings: z.array(importDataSettingsSchema).optional(),
});

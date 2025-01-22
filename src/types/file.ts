import { z } from "zod";

export const fileExportTypeOption = z.enum(["JSON", "CSV"]);

export type fileExportTypeOption = z.infer<typeof fileExportTypeOption>;

export const fileExportFormSchema = z.object({
	fileType: fileExportTypeOption,
	fileName: z.string(),
});

export type fileExportFormSchema = z.infer<typeof fileExportFormSchema>;

export const defaultFileExportName =
	process.env.NODE_ENV === "development" ? "data-dev" : "data";

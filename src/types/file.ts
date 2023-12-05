import { z } from "zod";
import { OptionType } from "./global";

export const fileExportTypeOptionsValue = z.enum(["csv", "json"]);
export const fileExportTypeOptionsLabel = z.enum(["CSV", "JSON"]);

export type FileExportTypeOptionsType = z.infer<
  typeof fileExportTypeOptionsValue
>;

export const fileExportTypeSelectOptions: OptionType<
  z.infer<typeof fileExportTypeOptionsLabel>,
  z.infer<typeof fileExportTypeOptionsValue>
>[] = [
  {
    label: "JSON",
    value: "json",
  },
  {
    label: "CSV",
    value: "csv",
  },
];

export const fileExportFormSchema = z.object({
  fileType: z.object({
    label: fileExportTypeOptionsLabel,
    value: fileExportTypeOptionsValue,
  }),
  fileName: z.string(),
});

export const defaultFileExportName =
  process.env.NODE_ENV === "development" ? "data-dev" : "data";

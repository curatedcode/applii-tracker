import { DropboxResponse, files } from "dropbox";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { Control, UseFormRegister } from "react-hook-form";
import { z } from "zod";

export type ApplicationStatusType = z.infer<typeof applicationStatuses>;

export const applicationStatusesArray: ApplicationStatusType[] = [
  "needToApply",
  "applied",
  "interviewing",
  "offer",
  "closed",
];

export const applicationStatuses = z.enum([
  "needToApply",
  "applied",
  "interviewing",
  "offer",
  "closed",
]);

export const zodFullApplication = z.object({
  id: z.number(),
  position: z.string(),
  company: z.string(),
  postingURL: z.string().optional(),
  status: applicationStatuses,
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
  notes: z
    .array(
      z.object({
        title: z.string(),
        body: z.string(),
      }),
    )
    .optional(),
});

export const zodFullApplicationArray = z.array(zodFullApplication);

export type GetAllApplicationsReturnType = {
  needToApply: FullApplicationType[];
  applied: FullApplicationType[];
  interviewing: FullApplicationType[];
  offer: FullApplicationType[];
  closed: FullApplicationType[];
};

export type ApplicationType = {
  id: number;
  position: string;
  company: string;
  postingURL?: string;
  status: ApplicationStatusType;
  dateCreated: string;
  dateModified: string;
  dateApplied?: string;
  dateInterviewing?: string;
  dateOffered?: string;
  dateClosed?: string;
};

export type CreateApplicationType = {
  position: string;
  company: string;
  postingURL?: string;
  status: ApplicationStatusType;
  dateApplied?: string;
  dateInterviewing?: string;
  dateOffered?: string;
  dateClosed?: string;
  notes?: NotesType[];
  contacts?: ContactType[];
};

export type UpdateApplicationType = {
  id: number;
  position: string;
  company: string;
  postingURL?: string;
  status: ApplicationStatusType;
  dateApplied?: string;
  dateInterviewing?: string;
  dateOffered?: string;
  dateClosed?: string;
  notes?: NotesType[];
  contacts?: ContactType[];
};

export type NotesType = {
  title: string;
  body: string;
};

export type ContactType = {
  name: string;
  position?: string;
  phone?: string;
  email?: string;
};

export type FullApplicationType = {
  notes?: NotesType[];
  contacts?: ContactType[];
} & ApplicationType;

export type FormInputProps = {
  id: string;
  type?: "text" | "email" | "date" | "number";
  label: string;
  registerName?: string;
  register: UseFormRegister<any>;
  error?: string;
  className?: string;
  placeholder?: string;
  hiddenLabel?: boolean;
  isRequired?: boolean;
};

export type FormTextareaProps = {
  id: string;
  label: string;
  rows?: number;
  registerName?: string;
  register: UseFormRegister<any>;
  error?: string;
  className?: string;
  placeholder?: string;
  hiddenLabel?: boolean;
  isRequired?: boolean;
};

export type ApplicationStatusLabelValueType = {
  label: z.infer<typeof applicationStatusLabel>;
  value: z.infer<typeof applicationStatuses>;
};

export const applicationStatusLabel = z.enum([
  "Need To Apply",
  "Applied",
  "Interviewing",
  "Offer",
  "Closed",
]);

export const formSchema = z.object({
  position: z.string().min(1, { message: "Position can't be empty" }),
  company: z.string().min(1, { message: "Company can't be empty" }),
  postingURL: z.string().optional(),
  status: z.object({
    label: applicationStatusLabel,
    value: applicationStatuses,
  }),
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

export type FormContextType = {
  contactsData: ContactType[];
  setContactsData: Dispatch<SetStateAction<ContactType[]>>;
  notesData: NotesType[];
  setNotesData: Dispatch<SetStateAction<NotesType[]>>;
  isFormCompleted: boolean;
  setIsFormCompleted: Dispatch<SetStateAction<boolean>>;
};

export type ArrayFieldProps = {
  register: UseFormRegister<z.infer<typeof formSchema>>;
  control: Control<z.infer<typeof formSchema>>;
  className?: string;
};

export type StandardButtonProps = {
  style?: "icon" | "shaded";
} & ButtonProps;

export type ButtonProps = {
  id?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  title?: string;
};

export type IconButtonProps = {
  title: string;
} & ButtonProps;

export type ExternalLinkProps = {
  href: string;
  style?: "button";
  title?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  openInNewTab?: boolean;
};

export const applicationColors = {
  needToApply: "#ADD8E6",
  applied: "#22C55E",
  interviewing: "#FFDB58",
  offer: "#4169E1",
  closed: "#D9534F",
};

export type TimelineType = "1 week" | "1 month" | "6 months" | "1 year";

export type TimelineLabelValueType = {
  label: TimelineType;
  value: TimelineType;
};

export const timelineOptions: TimelineLabelValueType[] = [
  { label: "1 week", value: "1 week" },
  { label: "1 month", value: "1 month" },
  { label: "6 months", value: "6 months" },
  { label: "1 year", value: "1 year" },
];

export type GetApplicationMetrics = {
  timeline: TimelineType;
};

export type GetApplicationMetricsReturnType = {
  needToApply: number[];
  applied: number[];
  interviewing: number[];
  offer: number[];
  closed: number[];
  labels: string[];
  simpleStats: CalculateSimpleApplicationStatsReturnType;
};

type GrowToSize<
  T,
  N extends number,
  A extends T[],
  L extends number = A["length"],
> = L extends N ? A : L extends 999 ? T[] : GrowToSize<T, N, [...A, T]>;
export type FixedArray<T, N extends number> = GrowToSize<T, N, []>;

export type ApplicationDateType =
  | "dateCreated"
  | "dateApplied"
  | "dateInterviewing"
  | "dateOffered"
  | "dateClosed";

export type MetricLabelType = {
  label: string;
  date: string | { start: string; end: string };
};

export type GenerateMetricLabelsReturnType = MetricLabelType[];

export type CalculateApplicationsInDateRangeProps = {
  applications: FullApplicationType[];
  dateType: ApplicationDateType;
  timeline: TimelineType;
  labels: string[];
};

export type CalculateSimpleApplicationStatsProps = {
  needToApplyApps: number[];
  appliedApps: number[];
  interviewingApps: number[];
  offerApps: number[];
  closedApps: number[];
};

export type CalculateSimpleApplicationStatsReturnType = {
  percents: FixedArray<{ percent: string; label: string }, 5>;
  totalApplications: number;
};

export type InternalLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  title?: string;
  onClick?: () => void;
  style?: "buttonShaded" | "button";
};

type ApplicationPageParamType = {
  searchParams: { id: string | undefined };
};

export type FormEditPageProps = ApplicationPageParamType;

export type ApplicationPageProps = ApplicationPageParamType;

export type ULItemProps = {
  label: string;
  body: string;
  isLink?: boolean;
  className?: string;
};

export type BoardSectionCardProps = {
  sortBy: SortByValueType;
  mode?: "demo";
} & FullApplicationType;

export type SortByValueType = "dateModified" | "dateCreated";
export type SortByLabelType = "Date Modified" | "Date Created";

export type BoardSectionProps = {
  title: "Need To Apply" | "Applied" | "Interviewing" | "Offer" | "Closed";
  Icon: React.ReactNode;
  cards: FullApplicationType[];
  sortBy: SortByValueType;
  mode?: "demo";
};

export const typeSafeObjectEntries = <T extends Record<PropertyKey, unknown>>(
  obj: T,
): { [K in keyof T]: [K, T[K]] }[keyof T][] => {
  return Object.entries(obj) as { [K in keyof T]: [K, T[K]] }[keyof T][];
};

export type OptionType<TLabel, TValue> = { label: TLabel; value: TValue };

export type SelectInputProps<TLabel, TValue> = {
  options: OptionType<TLabel, TValue>[];
  setSelected: Dispatch<SetStateAction<OptionType<TLabel, TValue>>>;
  selected: OptionType<TLabel, TValue>;
};

export const sortByOptions: OptionType<SortByLabelType, SortByValueType>[] = [
  { label: "Date Created", value: "dateCreated" },
  { label: "Date Modified", value: "dateModified" },
];

export type FormOptionType = {
  label: z.infer<typeof applicationStatusLabel>;
  value: z.infer<typeof applicationStatuses>;
};

export type FormSelectInputProps = {
  label: string;
  error?: string;
  selected: FormOptionType;
  options: FormOptionType[];
  setSelected: Dispatch<SetStateAction<FormOptionType>>;
};

export const applicationStatusSelectOptions: ApplicationStatusLabelValueType[] =
  [
    { value: "needToApply", label: "Need To Apply" },
    { value: "applied", label: "Applied" },
    { value: "interviewing", label: "Interviewing" },
    { value: "offer", label: "Offer" },
    { value: "closed", label: "Closed" },
  ];

export interface DropboxFetchFileType
  extends DropboxResponse<files.FileMetadata> {
  result: {
    client_modified: string;
    content_hash: string;
    fileBlob: Blob;
    id: string;
    is_downloadable: boolean;
    name: string;
    path_display: string;
    path_lower: string;
    rev: string;
    server_modified: string;
    size: number;
  };
}

export type ThemesType = "light" | "dark" | "system";
export type ThemeLabels = "Light" | "Dark" | "System";

export const themes: ThemesType[] = ["light", "dark", "system"];
export const themesLabels: ThemeLabels[] = ["Light", "Dark", "System"];

export type ThemeOption = {
  label: ThemeLabels;
  value: ThemesType;
};

export const themeOptions: ThemeOption[] = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "System", value: "system" },
];

export type ToastNamesType = "sync" | "import" | "export";

export type AllToastsType = [
  { name: "sync"; show: boolean },
  { name: "import"; show: boolean },
  { name: "export"; show: boolean },
];

export type ToastProps = {
  children: ReactNode;
  name: ToastNamesType;
};

export type DropboxResponseError = {
  error: { error: { ".tag": string }; error_summary: string };
  headers: Headers;
  name: string;
  status: number;
};

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

export async function promiseSeries(array: Promise<unknown>[]) {
  for (const promise of array) {
    await promise;
  }
}

export type SyncContextType = {
  setForceStop: (_value: SetStateAction<boolean>) => void;
  triggerSync: (_value?: string) => void;
};

export type GenerateDropboxAuthReturnType = {
  codeVerifier: string;
  codeChallenge: string;
  url: string;
};

export type DropboxGetAccessTokenResponseType = {
  result: {
    access_token: string;
    expires_in: number;
    token_type: string;
    scope: string;
    account_id?: string;
    team_id?: string;
    refresh_token: string;
    id_token?: string;
    uid: string;
  };
  status: number;
};

export const zodTutorialStatus = z.enum(["completed", "notStarted"]);

export type ModalProps = {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};
